(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Clock

function Clock () {
  this.lastTime = Date.now()
  this.thisTime = this.lastTime
  this.dT       = this.thisTime - this.lastTime
}

Clock.prototype.tick = function () {
  this.lastTime = this.thisTime
  this.thisTime = Date.now()
  this.dT       = this.thisTime - this.lastTime
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
var Clock           = require("./Clock")
var resizeWithRatio = require("./dom-utils").resizeWithRatio

module.exports = GLShell

function GLShell (parentNode, aspectRatio) {
  var canvas = document.createElement("canvas")
  var gl     = canvas.getContext("webgl")
  var clock  = new Clock

  var render = function () {
    var ratio = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight

    resizeWithRatio(this.aspectRatio, this.parentNode, this.gl.canvas)
    this.render() 
    requestAnimationFrame(render)
  }.bind(this)

  var update = function () {
    this.clock.tick()
    this.update(this.clock.dT) 
  }.bind(this)

  parentNode.appendChild(canvas)
  this.parentNode  = parentNode
  this.gl          = gl
  this.aspectRatio = aspectRatio
  this.clock       = clock

  requestAnimationFrame(render)
  setInterval(update, 25)
}

GLShell.prototype.render = function () {
  //over write this with your own render function
}

//for convenience, the time since last update is passed as a paramater
GLShell.prototype.update = function (dT) {
  //overwrite this with your own update function
}

},{"./Clock":1,"./dom-utils":6}],5:[function(require,module,exports){
module.exports = ScreenQuad

function ScreenQuad () {
  return new Float32Array([
    1, 1, -1, 1, -1, -1,
    1, 1, -1, -1, 1, -1
  ])
}

},{}],6:[function(require,module,exports){
module.exports.resizeWithRatio = resizeWithRatio

function resizeWithRatio (ratio, reference, subject) {
  var targetAspect = reference.clientWidth / reference.clientHeight
  var newWidth     = ratio < targetAspect
    ? ~~(reference.clientHeight * ratio)
    : reference.clientWidth
  var newHeight    = ~~(newWidth / ratio)
  var oldWidth     = subject.clientWidth
  var oldHeight    = subject.clientHeight

  if (oldWidth === newWidth && oldHeight === newHeight) return
  subject.clientWidth  = newWidth
  subject.clientHeight = newHeight
  subject.width        = newWidth
  subject.height       = newHeight
}

},{}],7:[function(require,module,exports){

var GLProgram     = require("./GLProgram")
var GLShell       = require("./GLShell")
var ScreenQuad    = require("./ScreenQuad")
var shell         = new GLShell(document.body, 1920 / 1080)

// CONSTANTS
//var ROW_SIZE      = Math.pow(2, 10)
var ROW_SIZE        = Math.pow(2, 2)
var MAX_PARTICLES   = ROW_SIZE * ROW_SIZE
var PARTICLE_STRIDE = 4

// SETUP SIMPLE EMITTER
var emitter = {
  position: new Float32Array([.5, .5, .5]),
  velocity: new Float32Array([.5, .5, .5])
}

// SETUP CPU MEMORY BUFFERS FOR POSITION AND VELOCITY DATA
var positions  = new Float32Array(4 * ROW_SIZE * ROW_SIZE)
var velocities = new Float32Array(4 * ROW_SIZE * ROW_SIZE)

for (var i = 0; i < MAX_PARTICLES; i++) {
  setParticleXYZ(positions, i, 
                 emitter.position[0], emitter.position[1], emitter.position[2])
}

window.positions  = positions
window.velocities = velocities

function setParticleXYZ (array, index, x, y, z) {
  array[PARTICLE_STRIDE * index]     = x
  array[PARTICLE_STRIDE * index + 1] = y
  array[PARTICLE_STRIDE * index + 2] = z
}

function configureTextureParams (gl, data, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 
                ROW_SIZE, ROW_SIZE, 
                0, gl.RGBA, gl.FLOAT, data)
  gl.bindTexture(gl.TEXTURE_2D, null)
  return texture
}

function configureFrameBuffer (gl, texture, frameBuffer) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, 
                          gl.TEXTURE_2D, texture, 0) 
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return frameBuffer
}

// SETUP TEXTURES
var velocityTexture = shell.gl.createTexture()
var positionTexture = shell.gl.createTexture()

// SETUP FRAMEBUFFERS
var velocityBuffer = shell.gl.createFramebuffer() 
var positionBuffer = shell.gl.createFramebuffer()

// SETUP PROGRAMS
var renderProgram = new GLProgram.fromSource(
  shell.gl, 
  "#define GLSLIFY 1\n\nprecision highp float;\n\nattribute vec2 a_quadVert;\n\nvoid main () {\n  gl_Position = vec4(a_quadVert, 0.0, 1.0);\n}\n",
  "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);\n} \n"
)

var physicsVelocityProgram = new GLProgram.fromSource(
  shell.gl,
  "#define GLSLIFY 1\n\nprecision highp float;\n\nattribute vec2 a_quadVert;\n\nvoid main () {\n  gl_Position = vec4(a_quadVert, 0.0, 1.0);\n}\n",
  "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);\n} \n"
)

var physicsPositionProgram = new GLProgram.fromSource(
  shell.gl,
  "#define GLSLIFY 1\n\nprecision highp float;\n\nattribute vec2 a_quadVert;\n\nvoid main () {\n  gl_Position = vec4(a_quadVert, 0.0, 1.0);\n}\n",
  "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);\n} \n"
)


shell.gl.viewport

shell.render = function () {
  //console.log("render")
}

shell.update = function (dT) {
  //console.log(dT)
}

},{"./GLProgram":2,"./GLShell":4,"./ScreenQuad":5}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvU2NyZWVuUXVhZC5qcyIsInNyYy9kb20tdXRpbHMuanMiLCJzcmMvZ3B1LXBhcnRpY2xlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IENsb2NrXG5cbmZ1bmN0aW9uIENsb2NrICgpIHtcbiAgdGhpcy5sYXN0VGltZSA9IERhdGUubm93KClcbiAgdGhpcy50aGlzVGltZSA9IHRoaXMubGFzdFRpbWVcbiAgdGhpcy5kVCAgICAgICA9IHRoaXMudGhpc1RpbWUgLSB0aGlzLmxhc3RUaW1lXG59XG5cbkNsb2NrLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxhc3RUaW1lID0gdGhpcy50aGlzVGltZVxuICB0aGlzLnRoaXNUaW1lID0gRGF0ZS5ub3coKVxuICB0aGlzLmRUICAgICAgID0gdGhpcy50aGlzVGltZSAtIHRoaXMubGFzdFRpbWVcbn1cbiIsInZhciBHTFNoYWRlciA9IHJlcXVpcmUoXCIuL0dMU2hhZGVyXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gR0xQcm9ncmFtXG5cbmZ1bmN0aW9uIGVpdGhlckluc3RhbmNlT2YgKGN0b3IsIHYxLCB2Mikge1xuICByZXR1cm4gKCh2MSBpbnN0YW5jZW9mIGN0b3IpIHx8ICh2MiBpbnN0YW5jZW9mIGN0b3IpKSA/IHRydWUgOiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjb21iaW5lRXJyb3JzICh2MSwgdjIpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcigodjEubWVzc2FnZSB8fCBcIlwiKSArIFwiXFxuXCIgKyAodjIubWVzc2FnZSB8fCBcIlwiKSlcbn1cblxuZnVuY3Rpb24gR0xQcm9ncmFtIChnbCwgdnMsIGZzKSB7XG4gIHZhciBwcm9ncmFtICAgICAgID0gZ2wuY3JlYXRlUHJvZ3JhbSh2cywgZnMpXG4gIHZhciBhdHRyaWJ1dGVzICAgID0ge31cbiAgdmFyIHVuaWZvcm1zICAgICAgPSB7fVxuICB2YXIgbnVtQXR0cmlidXRlc1xuICB2YXIgbnVtVW5pZm9ybXNcbiAgdmFyIGFOYW1lXG4gIHZhciB1TmFtZVxuXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cylcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZzKVxuICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKVxuXG4gIG51bUF0dHJpYnV0ZXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9BVFRSSUJVVEVTKVxuICBudW1Vbmlmb3JtcyAgID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfVU5JRk9STVMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1BdHRyaWJ1dGVzOyArK2kpIHtcbiAgICBhTmFtZSAgICAgICAgICAgICA9IGdsLmdldEFjdGl2ZUF0dHJpYihwcm9ncmFtLCBpKS5uYW1lXG4gICAgYXR0cmlidXRlc1thTmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhTmFtZSlcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJ1dGVzW2FOYW1lXSlcbiAgfVxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgbnVtVW5pZm9ybXM7ICsraikge1xuICAgIHVOYW1lICAgICAgICAgICA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaikubmFtZVxuICAgIHVuaWZvcm1zW3VOYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1TmFtZSlcbiAgfVxuXG4gIHRoaXMucHJvZ3JhbSAgICA9IHByb2dyYW1cbiAgdGhpcy51bmlmb3JtcyAgID0gdW5pZm9ybXNcbiAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xufVxuXG4vL0dMQ29udGV4dCAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IEVpdGhlciBFcnJvciB8IEdMUHJvZ3JhbVxuR0xQcm9ncmFtLmZyb21Tb3VyY2UgPSBmdW5jdGlvbiAoZ2wsIHZTcmMsIGZTcmMpIHtcbiAgdmFyIHZTaGFkZXIgPSBuZXcgR0xTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZTcmMpXG4gIHZhciBmU2hhZGVyID0gbmV3IEdMU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZTcmMpXG5cbiAgcmV0dXJuIChlaXRoZXJJbnN0YW5jZU9mKEVycm9yLCB2U2hhZGVyLCBmU2hhZGVyKSlcbiAgICA/IGNvbWJpbmVFcnJvcnModlNoYWRlciwgZlNoYWRlcilcbiAgICA6IG5ldyBHTFByb2dyYW0oZ2wsIHZTaGFkZXIsIGZTaGFkZXIpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdMU2hhZGVyXG5cbi8vR0xDb250ZXh0IC0+IEVudW0gLT4gU3RyaW5nIC0+IEVpdGhlciBHTFNoYWRlciB8IEVycm9yXG5mdW5jdGlvbiBHTFNoYWRlciAoZ2wsIHR5cGUsIHNyYykge1xuICB2YXIgc2hhZGVyICA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKVxuXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNyYylcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXG4gIHJldHVybiBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUylcbiAgICA/IHNoYWRlclxuICAgIDogbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcbn1cbiIsInZhciBDbG9jayAgICAgICAgICAgPSByZXF1aXJlKFwiLi9DbG9ja1wiKVxudmFyIHJlc2l6ZVdpdGhSYXRpbyA9IHJlcXVpcmUoXCIuL2RvbS11dGlsc1wiKS5yZXNpemVXaXRoUmF0aW9cblxubW9kdWxlLmV4cG9ydHMgPSBHTFNoZWxsXG5cbmZ1bmN0aW9uIEdMU2hlbGwgKHBhcmVudE5vZGUsIGFzcGVjdFJhdGlvKSB7XG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gIHZhciBnbCAgICAgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpXG4gIHZhciBjbG9jayAgPSBuZXcgQ2xvY2tcblxuICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByYXRpbyA9IHRoaXMuZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5nbC5jYW52YXMuY2xpZW50SGVpZ2h0XG5cbiAgICByZXNpemVXaXRoUmF0aW8odGhpcy5hc3BlY3RSYXRpbywgdGhpcy5wYXJlbnROb2RlLCB0aGlzLmdsLmNhbnZhcylcbiAgICB0aGlzLnJlbmRlcigpIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gIH0uYmluZCh0aGlzKVxuXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jbG9jay50aWNrKClcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmNsb2NrLmRUKSBcbiAgfS5iaW5kKHRoaXMpXG5cbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjYW52YXMpXG4gIHRoaXMucGFyZW50Tm9kZSAgPSBwYXJlbnROb2RlXG4gIHRoaXMuZ2wgICAgICAgICAgPSBnbFxuICB0aGlzLmFzcGVjdFJhdGlvID0gYXNwZWN0UmF0aW9cbiAgdGhpcy5jbG9jayAgICAgICA9IGNsb2NrXG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgc2V0SW50ZXJ2YWwodXBkYXRlLCAyNSlcbn1cblxuR0xTaGVsbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAvL292ZXIgd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHJlbmRlciBmdW5jdGlvblxufVxuXG4vL2ZvciBjb252ZW5pZW5jZSwgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgaXMgcGFzc2VkIGFzIGEgcGFyYW1hdGVyXG5HTFNoZWxsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcbiAgLy9vdmVyd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHVwZGF0ZSBmdW5jdGlvblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTY3JlZW5RdWFkXG5cbmZ1bmN0aW9uIFNjcmVlblF1YWQgKCkge1xuICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgMSwgMSwgLTEsIDEsIC0xLCAtMSxcbiAgICAxLCAxLCAtMSwgLTEsIDEsIC0xXG4gIF0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cy5yZXNpemVXaXRoUmF0aW8gPSByZXNpemVXaXRoUmF0aW9cblxuZnVuY3Rpb24gcmVzaXplV2l0aFJhdGlvIChyYXRpbywgcmVmZXJlbmNlLCBzdWJqZWN0KSB7XG4gIHZhciB0YXJnZXRBc3BlY3QgPSByZWZlcmVuY2UuY2xpZW50V2lkdGggLyByZWZlcmVuY2UuY2xpZW50SGVpZ2h0XG4gIHZhciBuZXdXaWR0aCAgICAgPSByYXRpbyA8IHRhcmdldEFzcGVjdFxuICAgID8gfn4ocmVmZXJlbmNlLmNsaWVudEhlaWdodCAqIHJhdGlvKVxuICAgIDogcmVmZXJlbmNlLmNsaWVudFdpZHRoXG4gIHZhciBuZXdIZWlnaHQgICAgPSB+fihuZXdXaWR0aCAvIHJhdGlvKVxuICB2YXIgb2xkV2lkdGggICAgID0gc3ViamVjdC5jbGllbnRXaWR0aFxuICB2YXIgb2xkSGVpZ2h0ICAgID0gc3ViamVjdC5jbGllbnRIZWlnaHRcblxuICBpZiAob2xkV2lkdGggPT09IG5ld1dpZHRoICYmIG9sZEhlaWdodCA9PT0gbmV3SGVpZ2h0KSByZXR1cm5cbiAgc3ViamVjdC5jbGllbnRXaWR0aCAgPSBuZXdXaWR0aFxuICBzdWJqZWN0LmNsaWVudEhlaWdodCA9IG5ld0hlaWdodFxuICBzdWJqZWN0LndpZHRoICAgICAgICA9IG5ld1dpZHRoXG4gIHN1YmplY3QuaGVpZ2h0ICAgICAgID0gbmV3SGVpZ2h0XG59XG4iLCJcbnZhciBHTFByb2dyYW0gICAgID0gcmVxdWlyZShcIi4vR0xQcm9ncmFtXCIpXG52YXIgR0xTaGVsbCAgICAgICA9IHJlcXVpcmUoXCIuL0dMU2hlbGxcIilcbnZhciBTY3JlZW5RdWFkICAgID0gcmVxdWlyZShcIi4vU2NyZWVuUXVhZFwiKVxudmFyIHNoZWxsICAgICAgICAgPSBuZXcgR0xTaGVsbChkb2N1bWVudC5ib2R5LCAxOTIwIC8gMTA4MClcblxuLy8gQ09OU1RBTlRTXG4vL3ZhciBST1dfU0laRSAgICAgID0gTWF0aC5wb3coMiwgMTApXG52YXIgUk9XX1NJWkUgICAgICAgID0gTWF0aC5wb3coMiwgMilcbnZhciBNQVhfUEFSVElDTEVTICAgPSBST1dfU0laRSAqIFJPV19TSVpFXG52YXIgUEFSVElDTEVfU1RSSURFID0gNFxuXG4vLyBTRVRVUCBTSU1QTEUgRU1JVFRFUlxudmFyIGVtaXR0ZXIgPSB7XG4gIHBvc2l0aW9uOiBuZXcgRmxvYXQzMkFycmF5KFsuNSwgLjUsIC41XSksXG4gIHZlbG9jaXR5OiBuZXcgRmxvYXQzMkFycmF5KFsuNSwgLjUsIC41XSlcbn1cblxuLy8gU0VUVVAgQ1BVIE1FTU9SWSBCVUZGRVJTIEZPUiBQT1NJVElPTiBBTkQgVkVMT0NJVFkgREFUQVxudmFyIHBvc2l0aW9ucyAgPSBuZXcgRmxvYXQzMkFycmF5KDQgKiBST1dfU0laRSAqIFJPV19TSVpFKVxudmFyIHZlbG9jaXRpZXMgPSBuZXcgRmxvYXQzMkFycmF5KDQgKiBST1dfU0laRSAqIFJPV19TSVpFKVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IE1BWF9QQVJUSUNMRVM7IGkrKykge1xuICBzZXRQYXJ0aWNsZVhZWihwb3NpdGlvbnMsIGksIFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc2l0aW9uWzBdLCBlbWl0dGVyLnBvc2l0aW9uWzFdLCBlbWl0dGVyLnBvc2l0aW9uWzJdKVxufVxuXG53aW5kb3cucG9zaXRpb25zICA9IHBvc2l0aW9uc1xud2luZG93LnZlbG9jaXRpZXMgPSB2ZWxvY2l0aWVzXG5cbmZ1bmN0aW9uIHNldFBhcnRpY2xlWFlaIChhcnJheSwgaW5kZXgsIHgsIHksIHopIHtcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXhdICAgICA9IHhcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAxXSA9IHlcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAyXSA9IHpcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlVGV4dHVyZVBhcmFtcyAoZ2wsIGRhdGEsIHRleHR1cmUpIHtcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSlcbiAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCAxLCAxLCAwLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBudWxsKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpXG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgXG4gICAgICAgICAgICAgICAgUk9XX1NJWkUsIFJPV19TSVpFLCBcbiAgICAgICAgICAgICAgICAwLCBnbC5SR0JBLCBnbC5GTE9BVCwgZGF0YSlcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcbiAgcmV0dXJuIHRleHR1cmVcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlRnJhbWVCdWZmZXIgKGdsLCB0ZXh0dXJlLCBmcmFtZUJ1ZmZlcikge1xuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGZyYW1lQnVmZmVyKVxuICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnbC5URVhUVVJFXzJELCB0ZXh0dXJlLCAwKSBcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICByZXR1cm4gZnJhbWVCdWZmZXJcbn1cblxuLy8gU0VUVVAgVEVYVFVSRVNcbnZhciB2ZWxvY2l0eVRleHR1cmUgPSBzaGVsbC5nbC5jcmVhdGVUZXh0dXJlKClcbnZhciBwb3NpdGlvblRleHR1cmUgPSBzaGVsbC5nbC5jcmVhdGVUZXh0dXJlKClcblxuLy8gU0VUVVAgRlJBTUVCVUZGRVJTXG52YXIgdmVsb2NpdHlCdWZmZXIgPSBzaGVsbC5nbC5jcmVhdGVGcmFtZWJ1ZmZlcigpIFxudmFyIHBvc2l0aW9uQnVmZmVyID0gc2hlbGwuZ2wuY3JlYXRlRnJhbWVidWZmZXIoKVxuXG4vLyBTRVRVUCBQUk9HUkFNU1xudmFyIHJlbmRlclByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoXG4gIHNoZWxsLmdsLCBcbiAgXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5cXG5hdHRyaWJ1dGUgdmVjMiBhX3F1YWRWZXJ0O1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoYV9xdWFkVmVydCwgMC4wLCAxLjApO1xcbn1cXG5cIixcbiAgXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMC41LCAwLjUsIDEuMCk7XFxufSBcXG5cIlxuKVxuXG52YXIgcGh5c2ljc1ZlbG9jaXR5UHJvZ3JhbSA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShcbiAgc2hlbGwuZ2wsXG4gIFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuXFxuYXR0cmlidXRlIHZlYzIgYV9xdWFkVmVydDtcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KGFfcXVhZFZlcnQsIDAuMCwgMS4wKTtcXG59XFxuXCIsXG4gIFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDAuNSwgMC41LCAxLjApO1xcbn0gXFxuXCJcbilcblxudmFyIHBoeXNpY3NQb3NpdGlvblByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoXG4gIHNoZWxsLmdsLFxuICBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbmF0dHJpYnV0ZSB2ZWMyIGFfcXVhZFZlcnQ7XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChhX3F1YWRWZXJ0LCAwLjAsIDEuMCk7XFxufVxcblwiLFxuICBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudm9pZCBtYWluICgpIHtcXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAwLjUsIDAuNSwgMS4wKTtcXG59IFxcblwiXG4pXG5cblxuc2hlbGwuZ2wudmlld3BvcnRcblxuc2hlbGwucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAvL2NvbnNvbGUubG9nKFwicmVuZGVyXCIpXG59XG5cbnNoZWxsLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCkge1xuICAvL2NvbnNvbGUubG9nKGRUKVxufVxuIl19
