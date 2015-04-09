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
module.exports = GLFloatTexture

function GLFloatTexture (gl, unit, width, height, data) {
  var handle = gl.createTexture()

  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, handle)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, data)

  this.unit   = unit
  this.handle = handle
  this.width  = width
  this.height = height
}

},{}],3:[function(require,module,exports){
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

},{"./GLShader":5}],4:[function(require,module,exports){
module.exports = GLRenderTarget

function GLRenderTarget (gl, width, height, data) {
  var texture = gl.createTexture()
  var handle  = gl.createFramebuffer()

  //configure the texture and upload the data
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, data)
  gl.bindTexture(gl.TEXTURE_2D, null)

  gl.bindFramebuffer(gl.FRAMEBUFFER, handle)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
                          texture, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  this.handle  = handle
  this.width   = width
  this.height  = height
  this.texture = texture
}

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
var Clock           = require("./Clock")
var resizeWithRatio = require("./dom-utils").resizeWithRatio

module.exports = GLShell

function GLShell (parentNode, aspectRatio) {
  var canvas           = document.createElement("canvas")
  var gl               = canvas.getContext("webgl")
  var clock            = new Clock
  var textureUnitIndex = 0

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

  Object.defineProperty(this, "nextTextureUnit", {
    get: function () { return textureUnitIndex++ } 
  })

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

},{"./Clock":1,"./dom-utils":10}],7:[function(require,module,exports){
var GLFloatTexture = require("./GLFloatTexture")
var GLRenderTarget = require("./GLRenderTarget")

module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

function GPUEmitter (gl, x, y, z) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var ROW_SIZE       = 256
  var COUNT          = ROW_SIZE * ROW_SIZE
  var positions      = initializeParticleXYZ(x, y, z, new Float32Array(4 * COUNT))
  var velocities     = new Float32Array(4 * COUNT)
  var posTarget1     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, positions)
  var posTarget2     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, positions)
  var velTarget1     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, velocities)
  var velTarget2     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, velocities)
  var particleCoords = buildParticleCoords(ROW_SIZE, ROW_SIZE)
  var coordBuffer    = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, coordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, particleCoords, gl.STATIC_DRAW)

  this.posTargets   = [posTarget1, posTarget2]
  this.velTargets   = [velTarget1, velTarget2]
  this.coordBuffer  = coordBuffer
}

function buildParticleCoords (width, height) {
  var array = new Float32Array(width * 2 * height)

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      array[j * 2 * width + i * 2]     = [i / width]
      array[j * 2 * width + i * 2 + 1] = [j / height]
    } 
  }
  return array
}

function setParticleXYZ (index, x, y, z, array) {
  array[PARTICLE_STRIDE * index]     = x
  array[PARTICLE_STRIDE * index + 1] = y
  array[PARTICLE_STRIDE * index + 2] = z
  array[PARTICLE_STRIDE * index + 3] = 1
}

function initializeParticleXYZ (x, y, z, array) {
  for (var i = 0; i < array.length / PARTICLE_STRIDE; i++) {
    setParticleXYZ(i, x + Math.random() - .5, y + Math.random() - .5, z, array)
  }
  return array
}

},{"./GLFloatTexture":2,"./GLRenderTarget":4}],8:[function(require,module,exports){

var GLProgram  = require("./GLProgram")
var ScreenQuad = require("./ScreenQuad")

module.exports = GPUParticleSystem

var velocityVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var velocityFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n\n  gl_FragColor = vec4(0.0 * dT + velocity, 1.0);\n}\n"
var positionVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var positionFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\nuniform sampler2D positions;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n  vec3 position     = texture2D(positions, textureIndex).xyz;\n\n  gl_FragColor  = vec4((dT * velocity) + position, 1.0);\n}\n"
var renderVSrc   = "#define GLSLIFY 1\n\nattribute vec2 particleCoord;\n\nuniform sampler2D positions;\n\nvoid main () {\n  vec3 pos     = texture2D(positions, particleCoord).xyz;\n  gl_Position  = vec4(pos, 1.0);\n  gl_PointSize = 2.0;\n}\n"
var renderFSrc   = "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(0.5, 0.5, 0.5, 0.6);\n} \n"

function GPUParticleSystem (gl) {
  var velocityProgram = new GLProgram.fromSource(gl, velocityVSrc, velocityFSrc)
  var positionProgram = new GLProgram.fromSource(gl, positionVSrc, positionFSrc)
  var renderProgram   = new GLProgram.fromSource(gl, renderVSrc, renderFSrc)
  var screenQuad      = new ScreenQuad
  var screenBuffer    = gl.createBuffer()

  if (velocityProgram instanceof Error) console.log(velocityProgram)
  if (positionProgram instanceof Error) console.log(positionProgram)
  if (renderProgram instanceof Error)   console.log(renderProgram)

  //buffer full screen quad coord for both velocity and position prog
  gl.bindBuffer(gl.ARRAY_BUFFER, screenBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, screenQuad, gl.STATIC_DRAW)

  gl.clearColor(0, 0, 0, 0)

  //enable attribute arrays for all programs
  //gl.enableVertexAttribArray(velocityProgram.attributes.screenCoord)
  gl.enableVertexAttribArray(positionProgram.attributes.screenCoord)
  gl.enableVertexAttribArray(renderProgram.attributes.particleCoord)

  this.gl              = gl
  this.screenBuffer    = screenBuffer
  this.velocityProgram = velocityProgram
  this.positionProgram = positionProgram
  this.renderProgram   = renderProgram
}


GPUParticleSystem.prototype.update = function (dT, gpuEmitters) {
  var gl = this.gl
  var emitter 
  var tmpBuf

  gl.useProgram(this.positionProgram.program)
  gl.disable(gl.DEPTH_TEST)
  gl.blendFunc(gl.ONE, gl.ZERO)
  gl.uniform1f(this.positionProgram.uniforms.dT, dT)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.enableVertexAttribArray(this.positionProgram.attributes.screenCoord)
  gl.vertexAttribPointer(this.positionProgram.attributes.screenCoord, 
                         2, gl.FLOAT, gl.FALSE, 0, 0)

  for (var j = 0; j < gpuEmitters.length; j++) {
    emitter = gpuEmitters[j]

    gl.bindFramebuffer(gl.FRAMEBUFFER, emitter.posTargets[1].handle) 
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.positionProgram.uniforms.positions, 0)
    gl.uniform2f(this.positionProgram.uniforms.viewport, 
                 emitter.posTargets[1].width, 
                 emitter.posTargets[1].height)
    gl.viewport(0, 0, emitter.posTargets[1].width, 
                      emitter.posTargets[1].height)
    //gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    tmpBuf                = emitter.posTargets[0]
    emitter.posTargets[0] = emitter.posTargets[1]
    emitter.posTargets[1] = tmpBuf

    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  gl.disableVertexAttribArray(this.positionProgram.attributes.screenCoord)
  gl.useProgram(null)
}

GPUParticleSystem.prototype.render = function (gpuEmitters) {
  var gl = this.gl
  var emitter

  gl.useProgram(this.renderProgram.program)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

  for (var i = 0; i < gpuEmitters.length; i++) {
    emitter = gpuEmitters[i] 

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.renderProgram.uniforms.positions, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, emitter.coordBuffer)
    gl.enableVertexAttribArray(this.renderProgram.attributes.particleCoord)
    gl.vertexAttribPointer(this.renderProgram.attributes.particleCoord, 
                           2, gl.FLOAT, gl.FALSE, 0, 0)
    gl.drawArrays(gl.POINTS, 0, 
                  emitter.posTargets[0].width * emitter.posTargets[0].height)
  }
  
  //gl.bindBuffer(gl.ARRAY_BUFFER, null)
  //gl.disableVertexAttribArray(this.renderProgram.attributes.particleCoord)
  //gl.disable(gl.BLEND)
  //gl.useProgram(null)
}

},{"./GLProgram":3,"./ScreenQuad":9}],9:[function(require,module,exports){
module.exports = ScreenQuad

function ScreenQuad () {
  return new Float32Array([
    1, 1, -1, 1, -1, -1,
    1, 1, -1, -1, 1, -1
  ])
}

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var emitter           = new GPUEmitter(shell.gl, 0, 0, 0)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

//shell.render = function () {
//  gpuParticleSystem.render(emitters)
//}
//
//shell.update = function (dT) {
//  gpuParticleSystem.update(dT, emitters)
//}

gpuParticleSystem.update(1, emitters)
gpuParticleSystem.render(emitters)
gpuParticleSystem.update(1, emitters)
gpuParticleSystem.render(emitters)
gpuParticleSystem.update(1, emitters)
gpuParticleSystem.render(emitters)
debugger
//gpuParticleSystem.render(emitters)
//gpuParticleSystem.update(dT, emitters)
//gpuParticleSystem.render(emitters)

},{"./GLShell":6,"./GPUEmitter":7,"./GPUParticleSystem":8}]},{},[11])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xGbG9hdFRleHR1cmUuanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMUmVuZGVyVGFyZ2V0LmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvR1BVRW1pdHRlci5qcyIsInNyYy9HUFVQYXJ0aWNsZVN5c3RlbS5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gQ2xvY2tcblxuZnVuY3Rpb24gQ2xvY2sgKCkge1xuICB0aGlzLmxhc3RUaW1lID0gRGF0ZS5ub3coKVxuICB0aGlzLnRoaXNUaW1lID0gdGhpcy5sYXN0VGltZVxuICB0aGlzLmRUICAgICAgID0gdGhpcy50aGlzVGltZSAtIHRoaXMubGFzdFRpbWVcbn1cblxuQ2xvY2sucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGFzdFRpbWUgPSB0aGlzLnRoaXNUaW1lXG4gIHRoaXMudGhpc1RpbWUgPSBEYXRlLm5vdygpXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTEZsb2F0VGV4dHVyZVxuXG5mdW5jdGlvbiBHTEZsb2F0VGV4dHVyZSAoZ2wsIHVuaXQsIHdpZHRoLCBoZWlnaHQsIGRhdGEpIHtcbiAgdmFyIGhhbmRsZSA9IGdsLmNyZWF0ZVRleHR1cmUoKVxuXG4gIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyB1bml0KVxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBoYW5kbGUpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCB3aWR0aCwgaGVpZ2h0LCAwLCBnbC5SR0JBLCBnbC5GTE9BVCwgZGF0YSlcblxuICB0aGlzLnVuaXQgICA9IHVuaXRcbiAgdGhpcy5oYW5kbGUgPSBoYW5kbGVcbiAgdGhpcy53aWR0aCAgPSB3aWR0aFxuICB0aGlzLmhlaWdodCA9IGhlaWdodFxufVxuIiwidmFyIEdMU2hhZGVyID0gcmVxdWlyZShcIi4vR0xTaGFkZXJcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHTFByb2dyYW1cblxuZnVuY3Rpb24gZWl0aGVySW5zdGFuY2VPZiAoY3RvciwgdjEsIHYyKSB7XG4gIHJldHVybiAoKHYxIGluc3RhbmNlb2YgY3RvcikgfHwgKHYyIGluc3RhbmNlb2YgY3RvcikpID8gdHJ1ZSA6IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVFcnJvcnMgKHYxLCB2Mikge1xuICByZXR1cm4gbmV3IEVycm9yKCh2MS5tZXNzYWdlIHx8IFwiXCIpICsgXCJcXG5cIiArICh2Mi5tZXNzYWdlIHx8IFwiXCIpKVxufVxuXG5mdW5jdGlvbiBHTFByb2dyYW0gKGdsLCB2cywgZnMpIHtcbiAgdmFyIHByb2dyYW0gICAgICAgPSBnbC5jcmVhdGVQcm9ncmFtKHZzLCBmcylcbiAgdmFyIGF0dHJpYnV0ZXMgICAgPSB7fVxuICB2YXIgdW5pZm9ybXMgICAgICA9IHt9XG4gIHZhciBudW1BdHRyaWJ1dGVzXG4gIHZhciBudW1Vbmlmb3Jtc1xuICB2YXIgYU5hbWVcbiAgdmFyIHVOYW1lXG5cbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZzKVxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpXG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pXG5cbiAgbnVtQXR0cmlidXRlcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpXG4gIG51bVVuaWZvcm1zICAgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUF0dHJpYnV0ZXM7ICsraSkge1xuICAgIGFOYW1lICAgICAgICAgICAgID0gZ2wuZ2V0QWN0aXZlQXR0cmliKHByb2dyYW0sIGkpLm5hbWVcbiAgICBhdHRyaWJ1dGVzW2FOYW1lXSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIGFOYW1lKVxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZXNbYU5hbWVdKVxuICB9XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1Vbmlmb3JtczsgKytqKSB7XG4gICAgdU5hbWUgICAgICAgICAgID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBqKS5uYW1lXG4gICAgdW5pZm9ybXNbdU5hbWVdID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVOYW1lKVxuICB9XG5cbiAgdGhpcy5wcm9ncmFtICAgID0gcHJvZ3JhbVxuICB0aGlzLnVuaWZvcm1zICAgPSB1bmlmb3Jtc1xuICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzXG59XG5cbi8vR0xDb250ZXh0IC0+IFN0cmluZyAtPiBTdHJpbmcgLT4gRWl0aGVyIEVycm9yIHwgR0xQcm9ncmFtXG5HTFByb2dyYW0uZnJvbVNvdXJjZSA9IGZ1bmN0aW9uIChnbCwgdlNyYywgZlNyYykge1xuICB2YXIgdlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdlNyYylcbiAgdmFyIGZTaGFkZXIgPSBuZXcgR0xTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZlNyYylcblxuICByZXR1cm4gKGVpdGhlckluc3RhbmNlT2YoRXJyb3IsIHZTaGFkZXIsIGZTaGFkZXIpKVxuICAgID8gY29tYmluZUVycm9ycyh2U2hhZGVyLCBmU2hhZGVyKVxuICAgIDogbmV3IEdMUHJvZ3JhbShnbCwgdlNoYWRlciwgZlNoYWRlcilcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gR0xSZW5kZXJUYXJnZXRcblxuZnVuY3Rpb24gR0xSZW5kZXJUYXJnZXQgKGdsLCB3aWR0aCwgaGVpZ2h0LCBkYXRhKSB7XG4gIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpXG4gIHZhciBoYW5kbGUgID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKVxuXG4gIC8vY29uZmlndXJlIHRoZSB0ZXh0dXJlIGFuZCB1cGxvYWQgdGhlIGRhdGFcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxuICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIHdpZHRoLCBoZWlnaHQsIDAsIGdsLlJHQkEsIGdsLkZMT0FULCBkYXRhKVxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKVxuXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgaGFuZGxlKVxuICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUsIDApXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcblxuICB0aGlzLmhhbmRsZSAgPSBoYW5kbGVcbiAgdGhpcy53aWR0aCAgID0gd2lkdGhcbiAgdGhpcy5oZWlnaHQgID0gaGVpZ2h0XG4gIHRoaXMudGV4dHVyZSA9IHRleHR1cmVcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gR0xTaGFkZXJcblxuLy9HTENvbnRleHQgLT4gRW51bSAtPiBTdHJpbmcgLT4gRWl0aGVyIEdMU2hhZGVyIHwgRXJyb3JcbmZ1bmN0aW9uIEdMU2hhZGVyIChnbCwgdHlwZSwgc3JjKSB7XG4gIHZhciBzaGFkZXIgID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpXG5cbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3JjKVxuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcbiAgcmV0dXJuIGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKVxuICAgID8gc2hhZGVyXG4gICAgOiBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKVxufVxuIiwidmFyIENsb2NrICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0Nsb2NrXCIpXG52YXIgcmVzaXplV2l0aFJhdGlvID0gcmVxdWlyZShcIi4vZG9tLXV0aWxzXCIpLnJlc2l6ZVdpdGhSYXRpb1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdMU2hlbGxcblxuZnVuY3Rpb24gR0xTaGVsbCAocGFyZW50Tm9kZSwgYXNwZWN0UmF0aW8pIHtcbiAgdmFyIGNhbnZhcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gIHZhciBnbCAgICAgICAgICAgICAgID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiKVxuICB2YXIgY2xvY2sgICAgICAgICAgICA9IG5ldyBDbG9ja1xuICB2YXIgdGV4dHVyZVVuaXRJbmRleCA9IDBcblxuICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByYXRpbyA9IHRoaXMuZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5nbC5jYW52YXMuY2xpZW50SGVpZ2h0XG5cbiAgICByZXNpemVXaXRoUmF0aW8odGhpcy5hc3BlY3RSYXRpbywgdGhpcy5wYXJlbnROb2RlLCB0aGlzLmdsLmNhbnZhcylcbiAgICB0aGlzLnJlbmRlcigpIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gIH0uYmluZCh0aGlzKVxuXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jbG9jay50aWNrKClcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmNsb2NrLmRUKSBcbiAgfS5iaW5kKHRoaXMpXG5cbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjYW52YXMpXG4gIHRoaXMucGFyZW50Tm9kZSAgPSBwYXJlbnROb2RlXG4gIHRoaXMuZ2wgICAgICAgICAgPSBnbFxuICB0aGlzLmFzcGVjdFJhdGlvID0gYXNwZWN0UmF0aW9cbiAgdGhpcy5jbG9jayAgICAgICA9IGNsb2NrXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwibmV4dFRleHR1cmVVbml0XCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRleHR1cmVVbml0SW5kZXgrKyB9IFxuICB9KVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gIHNldEludGVydmFsKHVwZGF0ZSwgMjUpXG59XG5cbkdMU2hlbGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgLy9vdmVyIHdyaXRlIHRoaXMgd2l0aCB5b3VyIG93biByZW5kZXIgZnVuY3Rpb25cbn1cblxuLy9mb3IgY29udmVuaWVuY2UsIHRoZSB0aW1lIHNpbmNlIGxhc3QgdXBkYXRlIGlzIHBhc3NlZCBhcyBhIHBhcmFtYXRlclxuR0xTaGVsbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRUKSB7XG4gIC8vb3ZlcndyaXRlIHRoaXMgd2l0aCB5b3VyIG93biB1cGRhdGUgZnVuY3Rpb25cbn1cbiIsInZhciBHTEZsb2F0VGV4dHVyZSA9IHJlcXVpcmUoXCIuL0dMRmxvYXRUZXh0dXJlXCIpXG52YXIgR0xSZW5kZXJUYXJnZXQgPSByZXF1aXJlKFwiLi9HTFJlbmRlclRhcmdldFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdQVUVtaXR0ZXJcblxudmFyIFBBUlRJQ0xFX1NUUklERSA9IDRcblxuZnVuY3Rpb24gR1BVRW1pdHRlciAoZ2wsIHgsIHksIHopIHtcbiAgaWYgKCFnbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKSkgdGhyb3cgbmV3IEVycm9yKFwibm8gZmxvYXQgdGV4dHVyZXNcIilcblxuICB2YXIgUk9XX1NJWkUgICAgICAgPSAyNTZcbiAgdmFyIENPVU5UICAgICAgICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxuICB2YXIgcG9zaXRpb25zICAgICAgPSBpbml0aWFsaXplUGFydGljbGVYWVooeCwgeSwgeiwgbmV3IEZsb2F0MzJBcnJheSg0ICogQ09VTlQpKVxuICB2YXIgdmVsb2NpdGllcyAgICAgPSBuZXcgRmxvYXQzMkFycmF5KDQgKiBDT1VOVClcbiAgdmFyIHBvc1RhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHBvc2l0aW9ucylcbiAgdmFyIHBvc1RhcmdldDIgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHBvc2l0aW9ucylcbiAgdmFyIHZlbFRhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXG4gIHZhciB2ZWxUYXJnZXQyICAgICA9IG5ldyBHTFJlbmRlclRhcmdldChnbCwgUk9XX1NJWkUsIFJPV19TSVpFLCB2ZWxvY2l0aWVzKVxuICB2YXIgcGFydGljbGVDb29yZHMgPSBidWlsZFBhcnRpY2xlQ29vcmRzKFJPV19TSVpFLCBST1dfU0laRSlcbiAgdmFyIGNvb3JkQnVmZmVyICAgID0gZ2wuY3JlYXRlQnVmZmVyKClcblxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY29vcmRCdWZmZXIpXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZUNvb3JkcywgZ2wuU1RBVElDX0RSQVcpXG5cbiAgdGhpcy5wb3NUYXJnZXRzICAgPSBbcG9zVGFyZ2V0MSwgcG9zVGFyZ2V0Ml1cbiAgdGhpcy52ZWxUYXJnZXRzICAgPSBbdmVsVGFyZ2V0MSwgdmVsVGFyZ2V0Ml1cbiAgdGhpcy5jb29yZEJ1ZmZlciAgPSBjb29yZEJ1ZmZlclxufVxuXG5mdW5jdGlvbiBidWlsZFBhcnRpY2xlQ29vcmRzICh3aWR0aCwgaGVpZ2h0KSB7XG4gIHZhciBhcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkod2lkdGggKiAyICogaGVpZ2h0KVxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgIGFycmF5W2ogKiAyICogd2lkdGggKyBpICogMl0gICAgID0gW2kgLyB3aWR0aF1cbiAgICAgIGFycmF5W2ogKiAyICogd2lkdGggKyBpICogMiArIDFdID0gW2ogLyBoZWlnaHRdXG4gICAgfSBcbiAgfVxuICByZXR1cm4gYXJyYXlcbn1cblxuZnVuY3Rpb24gc2V0UGFydGljbGVYWVogKGluZGV4LCB4LCB5LCB6LCBhcnJheSkge1xuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleF0gICAgID0geFxuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleCArIDFdID0geVxuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleCArIDJdID0gelxuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleCArIDNdID0gMVxufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplUGFydGljbGVYWVogKHgsIHksIHosIGFycmF5KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC8gUEFSVElDTEVfU1RSSURFOyBpKyspIHtcbiAgICBzZXRQYXJ0aWNsZVhZWihpLCB4ICsgTWF0aC5yYW5kb20oKSAtIC41LCB5ICsgTWF0aC5yYW5kb20oKSAtIC41LCB6LCBhcnJheSlcbiAgfVxuICByZXR1cm4gYXJyYXlcbn1cbiIsIlxudmFyIEdMUHJvZ3JhbSAgPSByZXF1aXJlKFwiLi9HTFByb2dyYW1cIilcbnZhciBTY3JlZW5RdWFkID0gcmVxdWlyZShcIi4vU2NyZWVuUXVhZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdQVVBhcnRpY2xlU3lzdGVtXG5cbnZhciB2ZWxvY2l0eVZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIHZlYzIgc2NyZWVuQ29vcmQ7XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChzY3JlZW5Db29yZCwgMC4wLCAxLjApO1xcbn1cXG5cIlxudmFyIHZlbG9jaXR5RlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXG51bmlmb3JtIGZsb2F0IGRUO1xcbnVuaWZvcm0gdmVjMiB2aWV3cG9ydDtcXG51bmlmb3JtIHNhbXBsZXIyRCB2ZWxvY2l0aWVzO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxuXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDAuMCAqIGRUICsgdmVsb2NpdHksIDEuMCk7XFxufVxcblwiXG52YXIgcG9zaXRpb25WU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHNjcmVlbkNvb3JkO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoc2NyZWVuQ29vcmQsIDAuMCwgMS4wKTtcXG59XFxuXCJcbnZhciBwb3NpdGlvbkZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxudW5pZm9ybSBmbG9hdCBkVDtcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXG51bmlmb3JtIHNhbXBsZXIyRCBwb3NpdGlvbnM7XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIHZlYzIgdGV4dHVyZUluZGV4ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdmlld3BvcnQ7XFxuICB2ZWMzIHZlbG9jaXR5ICAgICA9IHRleHR1cmUyRCh2ZWxvY2l0aWVzLCB0ZXh0dXJlSW5kZXgpLnh5ejtcXG4gIHZlYzMgcG9zaXRpb24gICAgID0gdGV4dHVyZTJEKHBvc2l0aW9ucywgdGV4dHVyZUluZGV4KS54eXo7XFxuXFxuICBnbF9GcmFnQ29sb3IgID0gdmVjNCgoZFQgKiB2ZWxvY2l0eSkgKyBwb3NpdGlvbiwgMS4wKTtcXG59XFxuXCJcbnZhciByZW5kZXJWU3JjICAgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIHZlYzIgcGFydGljbGVDb29yZDtcXG5cXG51bmlmb3JtIHNhbXBsZXIyRCBwb3NpdGlvbnM7XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIHZlYzMgcG9zICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHBhcnRpY2xlQ29vcmQpLnh5ejtcXG4gIGdsX1Bvc2l0aW9uICA9IHZlYzQocG9zLCAxLjApO1xcbiAgZ2xfUG9pbnRTaXplID0gMi4wO1xcbn1cXG5cIlxudmFyIHJlbmRlckZTcmMgICA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjUsIDAuNSwgMC41LCAwLjYpO1xcbn0gXFxuXCJcblxuZnVuY3Rpb24gR1BVUGFydGljbGVTeXN0ZW0gKGdsKSB7XG4gIHZhciB2ZWxvY2l0eVByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHZlbG9jaXR5VlNyYywgdmVsb2NpdHlGU3JjKVxuICB2YXIgcG9zaXRpb25Qcm9ncmFtID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCBwb3NpdGlvblZTcmMsIHBvc2l0aW9uRlNyYylcbiAgdmFyIHJlbmRlclByb2dyYW0gICA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgcmVuZGVyVlNyYywgcmVuZGVyRlNyYylcbiAgdmFyIHNjcmVlblF1YWQgICAgICA9IG5ldyBTY3JlZW5RdWFkXG4gIHZhciBzY3JlZW5CdWZmZXIgICAgPSBnbC5jcmVhdGVCdWZmZXIoKVxuXG4gIGlmICh2ZWxvY2l0eVByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgY29uc29sZS5sb2codmVsb2NpdHlQcm9ncmFtKVxuICBpZiAocG9zaXRpb25Qcm9ncmFtIGluc3RhbmNlb2YgRXJyb3IpIGNvbnNvbGUubG9nKHBvc2l0aW9uUHJvZ3JhbSlcbiAgaWYgKHJlbmRlclByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgICBjb25zb2xlLmxvZyhyZW5kZXJQcm9ncmFtKVxuXG4gIC8vYnVmZmVyIGZ1bGwgc2NyZWVuIHF1YWQgY29vcmQgZm9yIGJvdGggdmVsb2NpdHkgYW5kIHBvc2l0aW9uIHByb2dcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHNjcmVlbkJ1ZmZlcilcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHNjcmVlblF1YWQsIGdsLlNUQVRJQ19EUkFXKVxuXG4gIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMClcblxuICAvL2VuYWJsZSBhdHRyaWJ1dGUgYXJyYXlzIGZvciBhbGwgcHJvZ3JhbXNcbiAgLy9nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkKVxuXG4gIHRoaXMuZ2wgICAgICAgICAgICAgID0gZ2xcbiAgdGhpcy5zY3JlZW5CdWZmZXIgICAgPSBzY3JlZW5CdWZmZXJcbiAgdGhpcy52ZWxvY2l0eVByb2dyYW0gPSB2ZWxvY2l0eVByb2dyYW1cbiAgdGhpcy5wb3NpdGlvblByb2dyYW0gPSBwb3NpdGlvblByb2dyYW1cbiAgdGhpcy5yZW5kZXJQcm9ncmFtICAgPSByZW5kZXJQcm9ncmFtXG59XG5cblxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCwgZ3B1RW1pdHRlcnMpIHtcbiAgdmFyIGdsID0gdGhpcy5nbFxuICB2YXIgZW1pdHRlciBcbiAgdmFyIHRtcEJ1ZlxuXG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKVxuICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5aRVJPKVxuICBnbC51bmlmb3JtMWYodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMuZFQsIGRUKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBqKyspIHtcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbal1cblxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLmhhbmRsZSkgXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnBvc1RhcmdldHNbMF0udGV4dHVyZSlcbiAgICBnbC51bmlmb3JtMWkodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMucG9zaXRpb25zLCAwKVxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS53aWR0aCwgXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oZWlnaHQpXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcbiAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc1RhcmdldHNbMV0uaGVpZ2h0KVxuICAgIC8vZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNilcblxuICAgIHRtcEJ1ZiAgICAgICAgICAgICAgICA9IGVtaXR0ZXIucG9zVGFyZ2V0c1swXVxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1swXSA9IGVtaXR0ZXIucG9zVGFyZ2V0c1sxXVxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICB9XG5cbiAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIGdsLnVzZVByb2dyYW0obnVsbClcbn1cblxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChncHVFbWl0dGVycykge1xuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIHZhciBlbWl0dGVyXG5cbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVClcbiAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVyV2lkdGgsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlckhlaWdodClcbiAgZ2wuZW5hYmxlKGdsLkJMRU5EKVxuICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkUpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBncHVFbWl0dGVycy5sZW5ndGg7IGkrKykge1xuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tpXSBcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZW1pdHRlci5wb3NUYXJnZXRzWzBdLnRleHR1cmUpXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDApXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGVtaXR0ZXIuY29vcmRCdWZmZXIpXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5yZW5kZXJQcm9ncmFtLmF0dHJpYnV0ZXMucGFydGljbGVDb29yZClcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCBcbiAgICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS53aWR0aCAqIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS5oZWlnaHQpXG4gIH1cbiAgXG4gIC8vZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gIC8vZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXG4gIC8vZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgLy9nbC51c2VQcm9ncmFtKG51bGwpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNjcmVlblF1YWRcblxuZnVuY3Rpb24gU2NyZWVuUXVhZCAoKSB7XG4gIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAxLCAxLCAtMSwgMSwgLTEsIC0xLFxuICAgIDEsIDEsIC0xLCAtMSwgMSwgLTFcbiAgXSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzLnJlc2l6ZVdpdGhSYXRpbyA9IHJlc2l6ZVdpdGhSYXRpb1xuXG5mdW5jdGlvbiByZXNpemVXaXRoUmF0aW8gKHJhdGlvLCByZWZlcmVuY2UsIHN1YmplY3QpIHtcbiAgdmFyIHRhcmdldEFzcGVjdCA9IHJlZmVyZW5jZS5jbGllbnRXaWR0aCAvIHJlZmVyZW5jZS5jbGllbnRIZWlnaHRcbiAgdmFyIG5ld1dpZHRoICAgICA9IHJhdGlvIDwgdGFyZ2V0QXNwZWN0XG4gICAgPyB+fihyZWZlcmVuY2UuY2xpZW50SGVpZ2h0ICogcmF0aW8pXG4gICAgOiByZWZlcmVuY2UuY2xpZW50V2lkdGhcbiAgdmFyIG5ld0hlaWdodCAgICA9IH5+KG5ld1dpZHRoIC8gcmF0aW8pXG4gIHZhciBvbGRXaWR0aCAgICAgPSBzdWJqZWN0LmNsaWVudFdpZHRoXG4gIHZhciBvbGRIZWlnaHQgICAgPSBzdWJqZWN0LmNsaWVudEhlaWdodFxuXG4gIGlmIChvbGRXaWR0aCA9PT0gbmV3V2lkdGggJiYgb2xkSGVpZ2h0ID09PSBuZXdIZWlnaHQpIHJldHVyblxuICBzdWJqZWN0LmNsaWVudFdpZHRoICA9IG5ld1dpZHRoXG4gIHN1YmplY3QuY2xpZW50SGVpZ2h0ID0gbmV3SGVpZ2h0XG4gIHN1YmplY3Qud2lkdGggICAgICAgID0gbmV3V2lkdGhcbiAgc3ViamVjdC5oZWlnaHQgICAgICAgPSBuZXdIZWlnaHRcbn1cbiIsInZhciBHTFNoZWxsICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0dMU2hlbGxcIilcbnZhciBHUFVFbWl0dGVyICAgICAgICA9IHJlcXVpcmUoXCIuL0dQVUVtaXR0ZXJcIilcbnZhciBHUFVQYXJ0aWNsZVN5c3RlbSA9IHJlcXVpcmUoXCIuL0dQVVBhcnRpY2xlU3lzdGVtXCIpXG5cbnZhciBzaGVsbCAgICAgICAgICAgICA9IG5ldyBHTFNoZWxsKGRvY3VtZW50LmJvZHksIDE5MjAgLyAxMDgwKVxudmFyIGVtaXR0ZXIgICAgICAgICAgID0gbmV3IEdQVUVtaXR0ZXIoc2hlbGwuZ2wsIDAsIDAsIDApXG52YXIgZ3B1UGFydGljbGVTeXN0ZW0gPSBuZXcgR1BVUGFydGljbGVTeXN0ZW0oc2hlbGwuZ2wpXG52YXIgZW1pdHRlcnMgICAgICAgICAgPSBbZW1pdHRlcl1cblxuLy9zaGVsbC5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4vLyAgZ3B1UGFydGljbGVTeXN0ZW0ucmVuZGVyKGVtaXR0ZXJzKVxuLy99XG4vL1xuLy9zaGVsbC51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcbi8vICBncHVQYXJ0aWNsZVN5c3RlbS51cGRhdGUoZFQsIGVtaXR0ZXJzKVxuLy99XG5cbmdwdVBhcnRpY2xlU3lzdGVtLnVwZGF0ZSgxLCBlbWl0dGVycylcbmdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihlbWl0dGVycylcbmdwdVBhcnRpY2xlU3lzdGVtLnVwZGF0ZSgxLCBlbWl0dGVycylcbmdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihlbWl0dGVycylcbmdwdVBhcnRpY2xlU3lzdGVtLnVwZGF0ZSgxLCBlbWl0dGVycylcbmdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihlbWl0dGVycylcbmRlYnVnZ2VyXG4vL2dwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihlbWl0dGVycylcbi8vZ3B1UGFydGljbGVTeXN0ZW0udXBkYXRlKGRULCBlbWl0dGVycylcbi8vZ3B1UGFydGljbGVTeXN0ZW0ucmVuZGVyKGVtaXR0ZXJzKVxuIl19
