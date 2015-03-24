(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = GLFrameBuffer

function GLFrameBuffer (gl, width, height) {
  var fbo     = gl.createFramebuffer()
  var texture = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, texture)
  //TODO: some params probably should be width, height?
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return fbo
}

},{}],2:[function(require,module,exports){
var GLShader = require("./GLShader")

module.exports = GLProgram

function eitherInstanceOf (ctor, v1, v2) {
  return ((v1 instanceof ctor) || (v2 instanceof ctor)) ? true : false
}

function combineErrors (v1, v2) {
  return new Error((v1.message || "") + "\n" + (v2.message || ""))
}

function GLProgram (gl, vs, fs) {
  var program       = gl.createProgram(vs, fs)
  var attributes    = {}
  var uniforms      = {}
  var numAttributes
  var numUniforms
  var aName
  var uName

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
  numUniforms   = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)

  for (var i = 0; i < numAttributes; ++i) {
    aName             = gl.getActiveAttrib(program, i).name
    attributes[aName] = gl.getAttribLocation(program, aName)
    gl.enableVertexAttribArray(attributes[aName])
  }

  for (var j = 0; j < numUniforms; ++j) {
    uName           = gl.getActiveUniform(program, j).name
    uniforms[uName] = gl.getUniformLocation(program, uName)
  }

  this.program    = program
  this.uniforms   = uniforms
  this.attributes = attributes
}

//GLContext -> String -> String -> Either Error | GLProgram
GLProgram.fromSource = function (gl, vSrc, fSrc) {
  var vShader = new GLShader(gl, gl.VERTEX_SHADER, vSrc)
  var fShader = new GLShader(gl, gl.FRAGMENT_SHADER, fSrc)

  return (eitherInstanceOf(Error, vShader, fShader))
    ? combineErrors(vShader, fShader)
    : new GLProgram(gl, vShader, fShader)
}

},{"./GLShader":3}],3:[function(require,module,exports){
module.exports = GLShader

//GLContext -> Enum -> String -> Either GLShader | Error
function GLShader (gl, type, src) {
  var shader  = gl.createShader(type)

  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    ? shader
    : new Error(gl.getShaderInfoLog(shader))
}

},{}],4:[function(require,module,exports){
var GLProgram       = require("./GLProgram")
var GLFrameBuffer   = require("./GLFrameBuffer")
var domUtils        = require("./dom-utils")
var resizeWithRatio = domUtils.resizeWithRatio
var socket          = io.connect("http://localhost:4003")
var vertexSource    = document.getElementById("vertexSource").text
var fragmentSource  = document.getElementById("fragmentSource").text

var POLL_RATE = 250 //ms

var STATE = {
  activeSource:    "",
  candidateSource: "",
  activeGLProgram: null,
  errors:          ""
}

var DOMNODES = {
  status: document.getElementById("status"),
  source: document.getElementById("source"),
  errors: document.getElementById("errors"),
  canvas: document.getElementById("canvas")
}

var gl = DOMNODES.canvas.getContext("webgl")

window.gl = gl

//TODO: DISABLED for GPU particle dev
//socket.on("sourceChange", function (data) {
//  STATE.candidateSource = data.source
//})

function drawUI () {
  DOMNODES.status.innerHTML = socket.connected ? "connected" : "disconnected"
  DOMNODES.source.innerHTML = STATE.activeSource
  DOMNODES.errors.innerHTML = STATE.errors
}

function updateSource (gl, vSrc, fSrc) {
  if (!STATE.candidateSource) return

  var program = new GLProgram.fromSource(gl, vSrc, fSrc)

  if (program instanceof Error) {
    STATE.errors          = program.message
    STATE.activeSource    = STATE.activeSource
    STATE.activeGLProgram = STATE.activeGLProgram
  } else {
    STATE.errors          = ""
    STATE.activeSource    = STATE.candidateSource
    STATE.activeGLProgram = program
    gl.useProgram(program.program)
  }
  STATE.candidateSource = ""
}

var squareVerts = new Float32Array([
  1, 1, -1, 1, -1, -1,
  1, 1, -1, -1, 1, -1
])

function makeRender (gl) {
  var squareBuffer = gl.createBuffer()
  var fbo          = new GLFrameBuffer(gl, 100, 100)

  gl.enable(gl.BLEND)
  gl.enable(gl.CULL_FACE)
  gl.viewport(0, 0, DOMNODES.canvas.clientWidth, DOMNODES.canvas.clientHeight)
  gl.clearColor(1.0, 1.0, 1.0, 0.0)
  gl.colorMask(true, true, true, true)
  gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, squareVerts, gl.STATIC_DRAW)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(0) //TODO: this seems bullshitty
  return function render () {
    if (STATE.activeGLProgram) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.clearColor(1.0, 0.4, 0.8, 0.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    drawUI()  
    requestAnimationFrame(render)
  }
}

function makeUpdate () {
  STATE.activeSource    = ""
  STATE.candidateSource = fragmentSource

  return function update () {
    updateSource(gl, vertexSource, STATE.candidateSource) 
  }
}

requestAnimationFrame(makeRender(gl))
setInterval(makeUpdate(), POLL_RATE)
window.addEventListener("DOMContentLoaded", function () {
  resizeWithRatio(1, document.body, DOMNODES.canvas)
  gl.viewport(0, 0, DOMNODES.canvas.clientWidth, DOMNODES.canvas.clientHeight)
})
window.addEventListener("resize", function () {
  resizeWithRatio(1, document.body, DOMNODES.canvas)
  gl.viewport(0, 0, DOMNODES.canvas.clientWidth, DOMNODES.canvas.clientHeight)
})

},{"./GLFrameBuffer":1,"./GLProgram":2,"./dom-utils":5}],5:[function(require,module,exports){
module.exports.resizeWithRatio = resizeWithRatio

function resizeWithRatio (ratio, reference, subject) {
  var targetAspect = reference.clientWidth / reference.clientHeight
  var newWidth     = ratio < targetAspect
    ? reference.clientHeight * ratio
    : reference.clientWidth
  var newHeight    = newWidth / ratio

  subject.clientWidth  = newWidth
  subject.clientHeight = newHeight
  subject.width        = newWidth
  subject.height       = newHeight
}

},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR0xGcmFtZUJ1ZmZlci5qcyIsInNyYy9HTFByb2dyYW0uanMiLCJzcmMvR0xTaGFkZXIuanMiLCJzcmMvY2xpZW50LmpzIiwic3JjL2RvbS11dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gR0xGcmFtZUJ1ZmZlclxuXG5mdW5jdGlvbiBHTEZyYW1lQnVmZmVyIChnbCwgd2lkdGgsIGhlaWdodCkge1xuICB2YXIgZmJvICAgICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcbiAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKClcblxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKVxuICAvL1RPRE86IHNvbWUgcGFyYW1zIHByb2JhYmx5IHNob3VsZCBiZSB3aWR0aCwgaGVpZ2h0P1xuICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIDEsIDEsIDAsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIG51bGwpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBmYm8pXG4gIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGdsLkZSQU1FQlVGRkVSLCBnbC5DT0xPUl9BVFRBQ0hNRU5UMCwgZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSwgMClcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICByZXR1cm4gZmJvXG59XG4iLCJ2YXIgR0xTaGFkZXIgPSByZXF1aXJlKFwiLi9HTFNoYWRlclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbVxuXG5mdW5jdGlvbiBlaXRoZXJJbnN0YW5jZU9mIChjdG9yLCB2MSwgdjIpIHtcbiAgcmV0dXJuICgodjEgaW5zdGFuY2VvZiBjdG9yKSB8fCAodjIgaW5zdGFuY2VvZiBjdG9yKSkgPyB0cnVlIDogZmFsc2Vcbn1cblxuZnVuY3Rpb24gY29tYmluZUVycm9ycyAodjEsIHYyKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoKHYxLm1lc3NhZ2UgfHwgXCJcIikgKyBcIlxcblwiICsgKHYyLm1lc3NhZ2UgfHwgXCJcIikpXG59XG5cbmZ1bmN0aW9uIEdMUHJvZ3JhbSAoZ2wsIHZzLCBmcykge1xuICB2YXIgcHJvZ3JhbSAgICAgICA9IGdsLmNyZWF0ZVByb2dyYW0odnMsIGZzKVxuICB2YXIgYXR0cmlidXRlcyAgICA9IHt9XG4gIHZhciB1bmlmb3JtcyAgICAgID0ge31cbiAgdmFyIG51bUF0dHJpYnV0ZXNcbiAgdmFyIG51bVVuaWZvcm1zXG4gIHZhciBhTmFtZVxuICB2YXIgdU5hbWVcblxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnMpXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcylcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcblxuICBudW1BdHRyaWJ1dGVzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfQVRUUklCVVRFUylcbiAgbnVtVW5pZm9ybXMgICA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQXR0cmlidXRlczsgKytpKSB7XG4gICAgYU5hbWUgICAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSkubmFtZVxuICAgIGF0dHJpYnV0ZXNbYU5hbWVdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgYU5hbWUpXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlc1thTmFtZV0pXG4gIH1cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IG51bVVuaWZvcm1zOyArK2opIHtcbiAgICB1TmFtZSAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGopLm5hbWVcbiAgICB1bmlmb3Jtc1t1TmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdU5hbWUpXG4gIH1cblxuICB0aGlzLnByb2dyYW0gICAgPSBwcm9ncmFtXG4gIHRoaXMudW5pZm9ybXMgICA9IHVuaWZvcm1zXG4gIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcbn1cblxuLy9HTENvbnRleHQgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBFaXRoZXIgRXJyb3IgfCBHTFByb2dyYW1cbkdMUHJvZ3JhbS5mcm9tU291cmNlID0gZnVuY3Rpb24gKGdsLCB2U3JjLCBmU3JjKSB7XG4gIHZhciB2U2hhZGVyID0gbmV3IEdMU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2U3JjKVxuICB2YXIgZlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmU3JjKVxuXG4gIHJldHVybiAoZWl0aGVySW5zdGFuY2VPZihFcnJvciwgdlNoYWRlciwgZlNoYWRlcikpXG4gICAgPyBjb21iaW5lRXJyb3JzKHZTaGFkZXIsIGZTaGFkZXIpXG4gICAgOiBuZXcgR0xQcm9ncmFtKGdsLCB2U2hhZGVyLCBmU2hhZGVyKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFNoYWRlclxuXG4vL0dMQ29udGV4dCAtPiBFbnVtIC0+IFN0cmluZyAtPiBFaXRoZXIgR0xTaGFkZXIgfCBFcnJvclxuZnVuY3Rpb24gR0xTaGFkZXIgKGdsLCB0eXBlLCBzcmMpIHtcbiAgdmFyIHNoYWRlciAgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSlcblxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICByZXR1cm4gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpXG4gICAgPyBzaGFkZXJcbiAgICA6IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXG59XG4iLCJ2YXIgR0xQcm9ncmFtICAgICAgID0gcmVxdWlyZShcIi4vR0xQcm9ncmFtXCIpXG52YXIgR0xGcmFtZUJ1ZmZlciAgID0gcmVxdWlyZShcIi4vR0xGcmFtZUJ1ZmZlclwiKVxudmFyIGRvbVV0aWxzICAgICAgICA9IHJlcXVpcmUoXCIuL2RvbS11dGlsc1wiKVxudmFyIHJlc2l6ZVdpdGhSYXRpbyA9IGRvbVV0aWxzLnJlc2l6ZVdpdGhSYXRpb1xudmFyIHNvY2tldCAgICAgICAgICA9IGlvLmNvbm5lY3QoXCJodHRwOi8vbG9jYWxob3N0OjQwMDNcIilcbnZhciB2ZXJ0ZXhTb3VyY2UgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZlcnRleFNvdXJjZVwiKS50ZXh0XG52YXIgZnJhZ21lbnRTb3VyY2UgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmFnbWVudFNvdXJjZVwiKS50ZXh0XG5cbnZhciBQT0xMX1JBVEUgPSAyNTAgLy9tc1xuXG52YXIgU1RBVEUgPSB7XG4gIGFjdGl2ZVNvdXJjZTogICAgXCJcIixcbiAgY2FuZGlkYXRlU291cmNlOiBcIlwiLFxuICBhY3RpdmVHTFByb2dyYW06IG51bGwsXG4gIGVycm9yczogICAgICAgICAgXCJcIlxufVxuXG52YXIgRE9NTk9ERVMgPSB7XG4gIHN0YXR1czogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNcIiksXG4gIHNvdXJjZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb3VyY2VcIiksXG4gIGVycm9yczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvcnNcIiksXG4gIGNhbnZhczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIilcbn1cblxudmFyIGdsID0gRE9NTk9ERVMuY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiKVxuXG53aW5kb3cuZ2wgPSBnbFxuXG4vL1RPRE86IERJU0FCTEVEIGZvciBHUFUgcGFydGljbGUgZGV2XG4vL3NvY2tldC5vbihcInNvdXJjZUNoYW5nZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xuLy8gIFNUQVRFLmNhbmRpZGF0ZVNvdXJjZSA9IGRhdGEuc291cmNlXG4vL30pXG5cbmZ1bmN0aW9uIGRyYXdVSSAoKSB7XG4gIERPTU5PREVTLnN0YXR1cy5pbm5lckhUTUwgPSBzb2NrZXQuY29ubmVjdGVkID8gXCJjb25uZWN0ZWRcIiA6IFwiZGlzY29ubmVjdGVkXCJcbiAgRE9NTk9ERVMuc291cmNlLmlubmVySFRNTCA9IFNUQVRFLmFjdGl2ZVNvdXJjZVxuICBET01OT0RFUy5lcnJvcnMuaW5uZXJIVE1MID0gU1RBVEUuZXJyb3JzXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNvdXJjZSAoZ2wsIHZTcmMsIGZTcmMpIHtcbiAgaWYgKCFTVEFURS5jYW5kaWRhdGVTb3VyY2UpIHJldHVyblxuXG4gIHZhciBwcm9ncmFtID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCB2U3JjLCBmU3JjKVxuXG4gIGlmIChwcm9ncmFtIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBTVEFURS5lcnJvcnMgICAgICAgICAgPSBwcm9ncmFtLm1lc3NhZ2VcbiAgICBTVEFURS5hY3RpdmVTb3VyY2UgICAgPSBTVEFURS5hY3RpdmVTb3VyY2VcbiAgICBTVEFURS5hY3RpdmVHTFByb2dyYW0gPSBTVEFURS5hY3RpdmVHTFByb2dyYW1cbiAgfSBlbHNlIHtcbiAgICBTVEFURS5lcnJvcnMgICAgICAgICAgPSBcIlwiXG4gICAgU1RBVEUuYWN0aXZlU291cmNlICAgID0gU1RBVEUuY2FuZGlkYXRlU291cmNlXG4gICAgU1RBVEUuYWN0aXZlR0xQcm9ncmFtID0gcHJvZ3JhbVxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbS5wcm9ncmFtKVxuICB9XG4gIFNUQVRFLmNhbmRpZGF0ZVNvdXJjZSA9IFwiXCJcbn1cblxudmFyIHNxdWFyZVZlcnRzID0gbmV3IEZsb2F0MzJBcnJheShbXG4gIDEsIDEsIC0xLCAxLCAtMSwgLTEsXG4gIDEsIDEsIC0xLCAtMSwgMSwgLTFcbl0pXG5cbmZ1bmN0aW9uIG1ha2VSZW5kZXIgKGdsKSB7XG4gIHZhciBzcXVhcmVCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKVxuICB2YXIgZmJvICAgICAgICAgID0gbmV3IEdMRnJhbWVCdWZmZXIoZ2wsIDEwMCwgMTAwKVxuXG4gIGdsLmVuYWJsZShnbC5CTEVORClcbiAgZ2wuZW5hYmxlKGdsLkNVTExfRkFDRSlcbiAgZ2wudmlld3BvcnQoMCwgMCwgRE9NTk9ERVMuY2FudmFzLmNsaWVudFdpZHRoLCBET01OT0RFUy5jYW52YXMuY2xpZW50SGVpZ2h0KVxuICBnbC5jbGVhckNvbG9yKDEuMCwgMS4wLCAxLjAsIDAuMClcbiAgZ2wuY29sb3JNYXNrKHRydWUsIHRydWUsIHRydWUsIHRydWUpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBzcXVhcmVCdWZmZXIpXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBzcXVhcmVWZXJ0cywgZ2wuU1RBVElDX0RSQVcpXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoMCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSgwKSAvL1RPRE86IHRoaXMgc2VlbXMgYnVsbHNoaXR0eVxuICByZXR1cm4gZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICBpZiAoU1RBVEUuYWN0aXZlR0xQcm9ncmFtKSB7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGZibylcbiAgICAgIGdsLmNsZWFyQ29sb3IoMS4wLCAwLjQsIDAuOCwgMC4wKVxuICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcbiAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KVxuICAgIH1cbiAgICBkcmF3VUkoKSAgXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlVXBkYXRlICgpIHtcbiAgU1RBVEUuYWN0aXZlU291cmNlICAgID0gXCJcIlxuICBTVEFURS5jYW5kaWRhdGVTb3VyY2UgPSBmcmFnbWVudFNvdXJjZVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIHVwZGF0ZVNvdXJjZShnbCwgdmVydGV4U291cmNlLCBTVEFURS5jYW5kaWRhdGVTb3VyY2UpIFxuICB9XG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShtYWtlUmVuZGVyKGdsKSlcbnNldEludGVydmFsKG1ha2VVcGRhdGUoKSwgUE9MTF9SQVRFKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVzaXplV2l0aFJhdGlvKDEsIGRvY3VtZW50LmJvZHksIERPTU5PREVTLmNhbnZhcylcbiAgZ2wudmlld3BvcnQoMCwgMCwgRE9NTk9ERVMuY2FudmFzLmNsaWVudFdpZHRoLCBET01OT0RFUy5jYW52YXMuY2xpZW50SGVpZ2h0KVxufSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVzaXplV2l0aFJhdGlvKDEsIGRvY3VtZW50LmJvZHksIERPTU5PREVTLmNhbnZhcylcbiAgZ2wudmlld3BvcnQoMCwgMCwgRE9NTk9ERVMuY2FudmFzLmNsaWVudFdpZHRoLCBET01OT0RFUy5jYW52YXMuY2xpZW50SGVpZ2h0KVxufSlcbiIsIm1vZHVsZS5leHBvcnRzLnJlc2l6ZVdpdGhSYXRpbyA9IHJlc2l6ZVdpdGhSYXRpb1xuXG5mdW5jdGlvbiByZXNpemVXaXRoUmF0aW8gKHJhdGlvLCByZWZlcmVuY2UsIHN1YmplY3QpIHtcbiAgdmFyIHRhcmdldEFzcGVjdCA9IHJlZmVyZW5jZS5jbGllbnRXaWR0aCAvIHJlZmVyZW5jZS5jbGllbnRIZWlnaHRcbiAgdmFyIG5ld1dpZHRoICAgICA9IHJhdGlvIDwgdGFyZ2V0QXNwZWN0XG4gICAgPyByZWZlcmVuY2UuY2xpZW50SGVpZ2h0ICogcmF0aW9cbiAgICA6IHJlZmVyZW5jZS5jbGllbnRXaWR0aFxuICB2YXIgbmV3SGVpZ2h0ICAgID0gbmV3V2lkdGggLyByYXRpb1xuXG4gIHN1YmplY3QuY2xpZW50V2lkdGggID0gbmV3V2lkdGhcbiAgc3ViamVjdC5jbGllbnRIZWlnaHQgPSBuZXdIZWlnaHRcbiAgc3ViamVjdC53aWR0aCAgICAgICAgPSBuZXdXaWR0aFxuICBzdWJqZWN0LmhlaWdodCAgICAgICA9IG5ld0hlaWdodFxufVxuIl19
