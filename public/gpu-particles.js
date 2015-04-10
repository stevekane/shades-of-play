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

},{"./GLShader":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
var Clock           = require("./Clock")
var resizeWithRatio = require("./dom-utils").resizeWithRatio

module.exports = GLShell

function GLShell (parentNode, aspectRatio) {
  var canvas           = document.createElement("canvas")
  var gl               = canvas.getContext("webgl")
  var clock            = new Clock

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

},{"./Clock":1,"./dom-utils":9}],6:[function(require,module,exports){
var GLRenderTarget = require("./GLRenderTarget")

module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

function GPUEmitter (gl, x, y, z) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var ROW_SIZE       = 256
  var COUNT          = ROW_SIZE * ROW_SIZE
  var positions      = initializeParticleXYZ(x, y, z, new Float32Array(4 * COUNT))
  var velocities     = initializeParticleXYZ(x, y, z, new Float32Array(4 * COUNT))
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
  this.aliveCount   = ROW_SIZE * ROW_SIZE
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

},{"./GLRenderTarget":3}],7:[function(require,module,exports){

var GLProgram  = require("./GLProgram")
var ScreenQuad = require("./ScreenQuad")

module.exports = GPUParticleSystem

var velocityVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var velocityFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n\n  gl_FragColor = vec4(0.0 * dT + velocity, 1.0);\n}\n"
var positionVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var positionFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\nuniform sampler2D positions;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n  vec3 position     = texture2D(positions, textureIndex).xyz;\n\n  gl_FragColor  = vec4((dT / 10.0 * velocity) + position, 1.0);\n}\n"
var renderVSrc   = "#define GLSLIFY 1\n\nattribute vec2 particleCoord;\n\nuniform sampler2D positions;\n\nvoid main () {\n  vec3 pos     = texture2D(positions, particleCoord).xyz;\n  gl_Position  = vec4(pos, 1.0);\n  gl_PointSize = 2.0;\n}\n"
var renderFSrc   = "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(1.0, 0.5, 0.5, 0.8);\n} \n"

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
  gl.enableVertexAttribArray(velocityProgram.attributes.screenCoord)
  gl.enableVertexAttribArray(positionProgram.attributes.screenCoord)
  gl.enableVertexAttribArray(renderProgram.attributes.particleCoord)

  this.gl              = gl
  this.screenBuffer    = screenBuffer
  this.velocityProgram = velocityProgram
  this.positionProgram = positionProgram
  this.renderProgram   = renderProgram
}


GPUParticleSystem.prototype.update = function (dT, gpuEmitters) {
  var gl        = this.gl
  var dTSeconds = dT / 1000
  var emitter 
  var tmpBuf

  gl.useProgram(this.velocityProgram.program)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ZERO)
  gl.disable(gl.DEPTH_TEST)
  gl.depthMask(false)
  gl.uniform1f(this.velocityProgram.uniforms.dT, dTSeconds)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.enableVertexAttribArray(this.velocityProgram.attributes.screenCoord)
  gl.vertexAttribPointer(this.velocityProgram.attributes.screenCoord, 
                         2, gl.FLOAT, gl.FALSE, 0, 0)

  for (var i = 0; i < gpuEmitters.length; i++) {
    emitter = gpuEmitters[i]

    gl.bindFramebuffer(gl.FRAMEBUFFER, emitter.velTargets[1].handle) 
    gl.viewport(0, 0, emitter.velTargets[1].width, 
                      emitter.velTargets[1].height)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.velTargets[0].texture)
    gl.uniform1i(this.velocityProgram.uniforms.velocities, 0)
    gl.uniform2f(this.velocityProgram.uniforms.viewport, 
                 emitter.velTargets[1].width, 
                 emitter.velTargets[1].height)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    tmpBuf                = emitter.velTargets[0]
    emitter.velTargets[0] = emitter.velTargets[1]
    emitter.velTargets[1] = tmpBuf

    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  gl.disableVertexAttribArray(this.velocityProgram.attributes.screenCoord)

  gl.useProgram(this.positionProgram.program)
  gl.uniform1f(this.positionProgram.uniforms.dT, dTSeconds)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.enableVertexAttribArray(this.positionProgram.attributes.screenCoord)
  gl.vertexAttribPointer(this.positionProgram.attributes.screenCoord, 
                         2, gl.FLOAT, gl.FALSE, 0, 0)

  for (var j = 0; j < gpuEmitters.length; j++) {
    emitter = gpuEmitters[j]

    gl.bindFramebuffer(gl.FRAMEBUFFER, emitter.posTargets[1].handle) 
    gl.viewport(0, 0, emitter.posTargets[1].width, 
                      emitter.posTargets[1].height)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.velTargets[0].texture)
    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.positionProgram.uniforms.velocities, 0)
    gl.uniform1i(this.positionProgram.uniforms.positions, 1)
    gl.uniform2f(this.positionProgram.uniforms.viewport, 
                 emitter.posTargets[1].width, 
                 emitter.posTargets[1].height)
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

  for (var i = 0; i < gpuEmitters.length; i++) {
    emitter = gpuEmitters[i] 

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.renderProgram.uniforms.positions, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, emitter.coordBuffer)
    gl.enableVertexAttribArray(this.renderProgram.attributes.particleCoord)
    gl.vertexAttribPointer(this.renderProgram.attributes.particleCoord, 
                           2, gl.FLOAT, gl.FALSE, 0, 0)
    gl.drawArrays(gl.POINTS, 0, emitter.aliveCount)
  }
  
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.disableVertexAttribArray(this.renderProgram.attributes.particleCoord)
  //gl.disable(gl.BLEND)
  gl.useProgram(null)
}

},{"./GLProgram":2,"./ScreenQuad":8}],8:[function(require,module,exports){
module.exports = ScreenQuad

function ScreenQuad () {
  return new Float32Array([
    1, 1, -1, 1, -1, -1,
    1, 1, -1, -1, 1, -1
  ])
}

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var emitter           = new GPUEmitter(shell.gl, 0, 0, 0)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

shell.render = function () {
  gpuParticleSystem.render(emitters)
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, emitters)
}

},{"./GLShell":5,"./GPUEmitter":6,"./GPUParticleSystem":7}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMUmVuZGVyVGFyZ2V0LmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvR1BVRW1pdHRlci5qcyIsInNyYy9HUFVQYXJ0aWNsZVN5c3RlbS5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IENsb2NrXG5cbmZ1bmN0aW9uIENsb2NrICgpIHtcbiAgdGhpcy5sYXN0VGltZSA9IERhdGUubm93KClcbiAgdGhpcy50aGlzVGltZSA9IHRoaXMubGFzdFRpbWVcbiAgdGhpcy5kVCAgICAgICA9IHRoaXMudGhpc1RpbWUgLSB0aGlzLmxhc3RUaW1lXG59XG5cbkNsb2NrLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxhc3RUaW1lID0gdGhpcy50aGlzVGltZVxuICB0aGlzLnRoaXNUaW1lID0gRGF0ZS5ub3coKVxuICB0aGlzLmRUICAgICAgID0gdGhpcy50aGlzVGltZSAtIHRoaXMubGFzdFRpbWVcbn1cbiIsInZhciBHTFNoYWRlciA9IHJlcXVpcmUoXCIuL0dMU2hhZGVyXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gR0xQcm9ncmFtXG5cbmZ1bmN0aW9uIGVpdGhlckluc3RhbmNlT2YgKGN0b3IsIHYxLCB2Mikge1xuICByZXR1cm4gKCh2MSBpbnN0YW5jZW9mIGN0b3IpIHx8ICh2MiBpbnN0YW5jZW9mIGN0b3IpKSA/IHRydWUgOiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjb21iaW5lRXJyb3JzICh2MSwgdjIpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcigodjEubWVzc2FnZSB8fCBcIlwiKSArIFwiXFxuXCIgKyAodjIubWVzc2FnZSB8fCBcIlwiKSlcbn1cblxuZnVuY3Rpb24gR0xQcm9ncmFtIChnbCwgdnMsIGZzKSB7XG4gIHZhciBwcm9ncmFtICAgICAgID0gZ2wuY3JlYXRlUHJvZ3JhbSh2cywgZnMpXG4gIHZhciBhdHRyaWJ1dGVzICAgID0ge31cbiAgdmFyIHVuaWZvcm1zICAgICAgPSB7fVxuICB2YXIgbnVtQXR0cmlidXRlc1xuICB2YXIgbnVtVW5pZm9ybXNcbiAgdmFyIGFOYW1lXG4gIHZhciB1TmFtZVxuXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cylcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZzKVxuICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKVxuXG4gIG51bUF0dHJpYnV0ZXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9BVFRSSUJVVEVTKVxuICBudW1Vbmlmb3JtcyAgID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfVU5JRk9STVMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1BdHRyaWJ1dGVzOyArK2kpIHtcbiAgICBhTmFtZSAgICAgICAgICAgICA9IGdsLmdldEFjdGl2ZUF0dHJpYihwcm9ncmFtLCBpKS5uYW1lXG4gICAgYXR0cmlidXRlc1thTmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhTmFtZSlcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJ1dGVzW2FOYW1lXSlcbiAgfVxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgbnVtVW5pZm9ybXM7ICsraikge1xuICAgIHVOYW1lICAgICAgICAgICA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaikubmFtZVxuICAgIHVuaWZvcm1zW3VOYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1TmFtZSlcbiAgfVxuXG4gIHRoaXMucHJvZ3JhbSAgICA9IHByb2dyYW1cbiAgdGhpcy51bmlmb3JtcyAgID0gdW5pZm9ybXNcbiAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xufVxuXG4vL0dMQ29udGV4dCAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IEVpdGhlciBFcnJvciB8IEdMUHJvZ3JhbVxuR0xQcm9ncmFtLmZyb21Tb3VyY2UgPSBmdW5jdGlvbiAoZ2wsIHZTcmMsIGZTcmMpIHtcbiAgdmFyIHZTaGFkZXIgPSBuZXcgR0xTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZTcmMpXG4gIHZhciBmU2hhZGVyID0gbmV3IEdMU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZTcmMpXG5cbiAgcmV0dXJuIChlaXRoZXJJbnN0YW5jZU9mKEVycm9yLCB2U2hhZGVyLCBmU2hhZGVyKSlcbiAgICA/IGNvbWJpbmVFcnJvcnModlNoYWRlciwgZlNoYWRlcilcbiAgICA6IG5ldyBHTFByb2dyYW0oZ2wsIHZTaGFkZXIsIGZTaGFkZXIpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdMUmVuZGVyVGFyZ2V0XG5cbmZ1bmN0aW9uIEdMUmVuZGVyVGFyZ2V0IChnbCwgd2lkdGgsIGhlaWdodCwgZGF0YSkge1xuICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKVxuICB2YXIgaGFuZGxlICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcblxuICAvL2NvbmZpZ3VyZSB0aGUgdGV4dHVyZSBhbmQgdXBsb2FkIHRoZSBkYXRhXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCB3aWR0aCwgaGVpZ2h0LCAwLCBnbC5SR0JBLCBnbC5GTE9BVCwgZGF0YSlcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcblxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGhhbmRsZSlcbiAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLCAwKVxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpXG5cbiAgdGhpcy5oYW5kbGUgID0gaGFuZGxlXG4gIHRoaXMud2lkdGggICA9IHdpZHRoXG4gIHRoaXMuaGVpZ2h0ICA9IGhlaWdodFxuICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdMU2hhZGVyXG5cbi8vR0xDb250ZXh0IC0+IEVudW0gLT4gU3RyaW5nIC0+IEVpdGhlciBHTFNoYWRlciB8IEVycm9yXG5mdW5jdGlvbiBHTFNoYWRlciAoZ2wsIHR5cGUsIHNyYykge1xuICB2YXIgc2hhZGVyICA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKVxuXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNyYylcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXG4gIHJldHVybiBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUylcbiAgICA/IHNoYWRlclxuICAgIDogbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcbn1cbiIsInZhciBDbG9jayAgICAgICAgICAgPSByZXF1aXJlKFwiLi9DbG9ja1wiKVxudmFyIHJlc2l6ZVdpdGhSYXRpbyA9IHJlcXVpcmUoXCIuL2RvbS11dGlsc1wiKS5yZXNpemVXaXRoUmF0aW9cblxubW9kdWxlLmV4cG9ydHMgPSBHTFNoZWxsXG5cbmZ1bmN0aW9uIEdMU2hlbGwgKHBhcmVudE5vZGUsIGFzcGVjdFJhdGlvKSB7XG4gIHZhciBjYW52YXMgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICB2YXIgZ2wgICAgICAgICAgICAgICA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIilcbiAgdmFyIGNsb2NrICAgICAgICAgICAgPSBuZXcgQ2xvY2tcblxuICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByYXRpbyA9IHRoaXMuZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5nbC5jYW52YXMuY2xpZW50SGVpZ2h0XG5cbiAgICByZXNpemVXaXRoUmF0aW8odGhpcy5hc3BlY3RSYXRpbywgdGhpcy5wYXJlbnROb2RlLCB0aGlzLmdsLmNhbnZhcylcbiAgICB0aGlzLnJlbmRlcigpIFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gIH0uYmluZCh0aGlzKVxuXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jbG9jay50aWNrKClcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmNsb2NrLmRUKSBcbiAgfS5iaW5kKHRoaXMpXG5cbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjYW52YXMpXG4gIHRoaXMucGFyZW50Tm9kZSAgPSBwYXJlbnROb2RlXG4gIHRoaXMuZ2wgICAgICAgICAgPSBnbFxuICB0aGlzLmFzcGVjdFJhdGlvID0gYXNwZWN0UmF0aW9cbiAgdGhpcy5jbG9jayAgICAgICA9IGNsb2NrXG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgc2V0SW50ZXJ2YWwodXBkYXRlLCAyNSlcbn1cblxuR0xTaGVsbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAvL292ZXIgd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHJlbmRlciBmdW5jdGlvblxufVxuXG4vL2ZvciBjb252ZW5pZW5jZSwgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgaXMgcGFzc2VkIGFzIGEgcGFyYW1hdGVyXG5HTFNoZWxsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcbiAgLy9vdmVyd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHVwZGF0ZSBmdW5jdGlvblxufVxuIiwidmFyIEdMUmVuZGVyVGFyZ2V0ID0gcmVxdWlyZShcIi4vR0xSZW5kZXJUYXJnZXRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHUFVFbWl0dGVyXG5cbnZhciBQQVJUSUNMRV9TVFJJREUgPSA0XG5cbmZ1bmN0aW9uIEdQVUVtaXR0ZXIgKGdsLCB4LCB5LCB6KSB7XG4gIGlmICghZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIikpIHRocm93IG5ldyBFcnJvcihcIm5vIGZsb2F0IHRleHR1cmVzXCIpXG5cbiAgdmFyIFJPV19TSVpFICAgICAgID0gMjU2XG4gIHZhciBDT1VOVCAgICAgICAgICA9IFJPV19TSVpFICogUk9XX1NJWkVcbiAgdmFyIHBvc2l0aW9ucyAgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKHgsIHksIHosIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcbiAgdmFyIHZlbG9jaXRpZXMgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKHgsIHksIHosIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcbiAgdmFyIHBvc1RhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHBvc2l0aW9ucylcbiAgdmFyIHBvc1RhcmdldDIgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHBvc2l0aW9ucylcbiAgdmFyIHZlbFRhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXG4gIHZhciB2ZWxUYXJnZXQyICAgICA9IG5ldyBHTFJlbmRlclRhcmdldChnbCwgUk9XX1NJWkUsIFJPV19TSVpFLCB2ZWxvY2l0aWVzKVxuICB2YXIgcGFydGljbGVDb29yZHMgPSBidWlsZFBhcnRpY2xlQ29vcmRzKFJPV19TSVpFLCBST1dfU0laRSlcbiAgdmFyIGNvb3JkQnVmZmVyICAgID0gZ2wuY3JlYXRlQnVmZmVyKClcblxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY29vcmRCdWZmZXIpXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZUNvb3JkcywgZ2wuU1RBVElDX0RSQVcpXG5cbiAgdGhpcy5wb3NUYXJnZXRzICAgPSBbcG9zVGFyZ2V0MSwgcG9zVGFyZ2V0Ml1cbiAgdGhpcy52ZWxUYXJnZXRzICAgPSBbdmVsVGFyZ2V0MSwgdmVsVGFyZ2V0Ml1cbiAgdGhpcy5jb29yZEJ1ZmZlciAgPSBjb29yZEJ1ZmZlclxuICB0aGlzLmFsaXZlQ291bnQgICA9IFJPV19TSVpFICogUk9XX1NJWkVcbn1cblxuZnVuY3Rpb24gYnVpbGRQYXJ0aWNsZUNvb3JkcyAod2lkdGgsIGhlaWdodCkge1xuICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogMiAqIGhlaWdodClcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDJdICAgICA9IFtpIC8gd2lkdGhdXG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDIgKyAxXSA9IFtqIC8gaGVpZ2h0XVxuICAgIH0gXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmZ1bmN0aW9uIHNldFBhcnRpY2xlWFlaIChpbmRleCwgeCwgeSwgeiwgYXJyYXkpIHtcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXhdICAgICA9IHhcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAxXSA9IHlcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAyXSA9IHpcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAzXSA9IDFcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaICh4LCB5LCB6LCBhcnJheSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAvIFBBUlRJQ0xFX1NUUklERTsgaSsrKSB7XG4gICAgc2V0UGFydGljbGVYWVooaSwgeCArIE1hdGgucmFuZG9tKCkgLSAuNSwgeSArIE1hdGgucmFuZG9tKCkgLSAuNSwgeiwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG4iLCJcbnZhciBHTFByb2dyYW0gID0gcmVxdWlyZShcIi4vR0xQcm9ncmFtXCIpXG52YXIgU2NyZWVuUXVhZCA9IHJlcXVpcmUoXCIuL1NjcmVlblF1YWRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHUFVQYXJ0aWNsZVN5c3RlbVxuXG52YXIgdmVsb2NpdHlWU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHNjcmVlbkNvb3JkO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoc2NyZWVuQ29vcmQsIDAuMCwgMS4wKTtcXG59XFxuXCJcbnZhciB2ZWxvY2l0eUZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxudW5pZm9ybSBmbG9hdCBkVDtcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgdmVjMiB0ZXh0dXJlSW5kZXggPSBnbF9GcmFnQ29vcmQueHkgLyB2aWV3cG9ydDtcXG4gIHZlYzMgdmVsb2NpdHkgICAgID0gdGV4dHVyZTJEKHZlbG9jaXRpZXMsIHRleHR1cmVJbmRleCkueHl6O1xcblxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjAgKiBkVCArIHZlbG9jaXR5LCAxLjApO1xcbn1cXG5cIlxudmFyIHBvc2l0aW9uVlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBzY3JlZW5Db29yZDtcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHNjcmVlbkNvb3JkLCAwLjAsIDEuMCk7XFxufVxcblwiXG52YXIgcG9zaXRpb25GU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnVuaWZvcm0gZmxvYXQgZFQ7XFxudW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1xcbnVuaWZvcm0gc2FtcGxlcjJEIHZlbG9jaXRpZXM7XFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxuICB2ZWMzIHBvc2l0aW9uICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHRleHR1cmVJbmRleCkueHl6O1xcblxcbiAgZ2xfRnJhZ0NvbG9yICA9IHZlYzQoKGRUIC8gMTAuMCAqIHZlbG9jaXR5KSArIHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIlxudmFyIHJlbmRlclZTcmMgICA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBwYXJ0aWNsZUNvb3JkO1xcblxcbnVuaWZvcm0gc2FtcGxlcjJEIHBvc2l0aW9ucztcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgdmVjMyBwb3MgICAgID0gdGV4dHVyZTJEKHBvc2l0aW9ucywgcGFydGljbGVDb29yZCkueHl6O1xcbiAgZ2xfUG9zaXRpb24gID0gdmVjNChwb3MsIDEuMCk7XFxuICBnbF9Qb2ludFNpemUgPSAyLjA7XFxufVxcblwiXG52YXIgcmVuZGVyRlNyYyAgID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMC41LCAwLjUsIDAuOCk7XFxufSBcXG5cIlxuXG5mdW5jdGlvbiBHUFVQYXJ0aWNsZVN5c3RlbSAoZ2wpIHtcbiAgdmFyIHZlbG9jaXR5UHJvZ3JhbSA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgdmVsb2NpdHlWU3JjLCB2ZWxvY2l0eUZTcmMpXG4gIHZhciBwb3NpdGlvblByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHBvc2l0aW9uVlNyYywgcG9zaXRpb25GU3JjKVxuICB2YXIgcmVuZGVyUHJvZ3JhbSAgID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCByZW5kZXJWU3JjLCByZW5kZXJGU3JjKVxuICB2YXIgc2NyZWVuUXVhZCAgICAgID0gbmV3IFNjcmVlblF1YWRcbiAgdmFyIHNjcmVlbkJ1ZmZlciAgICA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG5cbiAgaWYgKHZlbG9jaXR5UHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSBjb25zb2xlLmxvZyh2ZWxvY2l0eVByb2dyYW0pXG4gIGlmIChwb3NpdGlvblByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgY29uc29sZS5sb2cocG9zaXRpb25Qcm9ncmFtKVxuICBpZiAocmVuZGVyUHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSAgIGNvbnNvbGUubG9nKHJlbmRlclByb2dyYW0pXG5cbiAgLy9idWZmZXIgZnVsbCBzY3JlZW4gcXVhZCBjb29yZCBmb3IgYm90aCB2ZWxvY2l0eSBhbmQgcG9zaXRpb24gcHJvZ1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuQnVmZmVyKVxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuUXVhZCwgZ2wuU1RBVElDX0RSQVcpXG5cbiAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKVxuXG4gIC8vZW5hYmxlIGF0dHJpYnV0ZSBhcnJheXMgZm9yIGFsbCBwcm9ncmFtc1xuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkKVxuXG4gIHRoaXMuZ2wgICAgICAgICAgICAgID0gZ2xcbiAgdGhpcy5zY3JlZW5CdWZmZXIgICAgPSBzY3JlZW5CdWZmZXJcbiAgdGhpcy52ZWxvY2l0eVByb2dyYW0gPSB2ZWxvY2l0eVByb2dyYW1cbiAgdGhpcy5wb3NpdGlvblByb2dyYW0gPSBwb3NpdGlvblByb2dyYW1cbiAgdGhpcy5yZW5kZXJQcm9ncmFtICAgPSByZW5kZXJQcm9ncmFtXG59XG5cblxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCwgZ3B1RW1pdHRlcnMpIHtcbiAgdmFyIGdsICAgICAgICA9IHRoaXMuZ2xcbiAgdmFyIGRUU2Vjb25kcyA9IGRUIC8gMTAwMFxuICB2YXIgZW1pdHRlciBcbiAgdmFyIHRtcEJ1ZlxuXG4gIGdsLnVzZVByb2dyYW0odGhpcy52ZWxvY2l0eVByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuZW5hYmxlKGdsLkJMRU5EKVxuICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5aRVJPKVxuICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpXG4gIGdsLmRlcHRoTWFzayhmYWxzZSlcbiAgZ2wudW5pZm9ybTFmKHRoaXMudmVsb2NpdHlQcm9ncmFtLnVuaWZvcm1zLmRULCBkVFNlY29uZHMpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNjcmVlbkJ1ZmZlcilcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy52ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnZlbG9jaXR5UHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBncHVFbWl0dGVycy5sZW5ndGg7IGkrKykge1xuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tpXVxuXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0uaGFuZGxlKSBcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0ud2lkdGgsIFxuICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXS5oZWlnaHQpXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIudmVsVGFyZ2V0c1swXS50ZXh0dXJlKVxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy52ZWxvY2l0aWVzLCAwKVxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXS53aWR0aCwgXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXS5oZWlnaHQpXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpXG5cbiAgICB0bXBCdWYgICAgICAgICAgICAgICAgPSBlbWl0dGVyLnZlbFRhcmdldHNbMF1cbiAgICBlbWl0dGVyLnZlbFRhcmdldHNbMF0gPSBlbWl0dGVyLnZlbFRhcmdldHNbMV1cbiAgICBlbWl0dGVyLnZlbFRhcmdldHNbMV0gPSB0bXBCdWZcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcbiAgfVxuXG4gIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkKVxuXG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wudW5pZm9ybTFmKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLmRULCBkVFNlY29uZHMpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNjcmVlbkJ1ZmZlcilcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnBvc2l0aW9uUHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBncHVFbWl0dGVycy5sZW5ndGg7IGorKykge1xuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tqXVxuXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBlbWl0dGVyLnBvc1RhcmdldHNbMV0uaGFuZGxlKSBcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLnBvc1RhcmdldHNbMV0ud2lkdGgsIFxuICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oZWlnaHQpXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIudmVsVGFyZ2V0c1swXS50ZXh0dXJlKVxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAxKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS50ZXh0dXJlKVxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52ZWxvY2l0aWVzLCAwKVxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDEpXG4gICAgZ2wudW5pZm9ybTJmKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLnZpZXdwb3J0LCBcbiAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcbiAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUYXJnZXRzWzFdLmhlaWdodClcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNilcblxuICAgIHRtcEJ1ZiAgICAgICAgICAgICAgICA9IGVtaXR0ZXIucG9zVGFyZ2V0c1swXVxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1swXSA9IGVtaXR0ZXIucG9zVGFyZ2V0c1sxXVxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICB9XG5cbiAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIGdsLnVzZVByb2dyYW0obnVsbClcbn1cblxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChncHVFbWl0dGVycykge1xuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIHZhciBlbWl0dGVyXG5cbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVClcbiAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVyV2lkdGgsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlckhlaWdodClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgZW1pdHRlciA9IGdwdUVtaXR0ZXJzW2ldIFxuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnBvc1RhcmdldHNbMF0udGV4dHVyZSlcbiAgICBnbC51bmlmb3JtMWkodGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zLnBvc2l0aW9ucywgMClcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgZW1pdHRlci5jb29yZEJ1ZmZlcilcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkKVxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5yZW5kZXJQcm9ncmFtLmF0dHJpYnV0ZXMucGFydGljbGVDb29yZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIGVtaXR0ZXIuYWxpdmVDb3VudClcbiAgfVxuICBcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkKVxuICAvL2dsLmRpc2FibGUoZ2wuQkxFTkQpXG4gIGdsLnVzZVByb2dyYW0obnVsbClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUXVhZFxuXG5mdW5jdGlvbiBTY3JlZW5RdWFkICgpIHtcbiAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgIDEsIDEsIC0xLCAxLCAtMSwgLTEsXG4gICAgMSwgMSwgLTEsIC0xLCAxLCAtMVxuICBdKVxufVxuIiwibW9kdWxlLmV4cG9ydHMucmVzaXplV2l0aFJhdGlvID0gcmVzaXplV2l0aFJhdGlvXG5cbmZ1bmN0aW9uIHJlc2l6ZVdpdGhSYXRpbyAocmF0aW8sIHJlZmVyZW5jZSwgc3ViamVjdCkge1xuICB2YXIgdGFyZ2V0QXNwZWN0ID0gcmVmZXJlbmNlLmNsaWVudFdpZHRoIC8gcmVmZXJlbmNlLmNsaWVudEhlaWdodFxuICB2YXIgbmV3V2lkdGggICAgID0gcmF0aW8gPCB0YXJnZXRBc3BlY3RcbiAgICA/IH5+KHJlZmVyZW5jZS5jbGllbnRIZWlnaHQgKiByYXRpbylcbiAgICA6IHJlZmVyZW5jZS5jbGllbnRXaWR0aFxuICB2YXIgbmV3SGVpZ2h0ICAgID0gfn4obmV3V2lkdGggLyByYXRpbylcbiAgdmFyIG9sZFdpZHRoICAgICA9IHN1YmplY3QuY2xpZW50V2lkdGhcbiAgdmFyIG9sZEhlaWdodCAgICA9IHN1YmplY3QuY2xpZW50SGVpZ2h0XG5cbiAgaWYgKG9sZFdpZHRoID09PSBuZXdXaWR0aCAmJiBvbGRIZWlnaHQgPT09IG5ld0hlaWdodCkgcmV0dXJuXG4gIHN1YmplY3QuY2xpZW50V2lkdGggID0gbmV3V2lkdGhcbiAgc3ViamVjdC5jbGllbnRIZWlnaHQgPSBuZXdIZWlnaHRcbiAgc3ViamVjdC53aWR0aCAgICAgICAgPSBuZXdXaWR0aFxuICBzdWJqZWN0LmhlaWdodCAgICAgICA9IG5ld0hlaWdodFxufVxuIiwidmFyIEdMU2hlbGwgICAgICAgICAgID0gcmVxdWlyZShcIi4vR0xTaGVsbFwiKVxudmFyIEdQVUVtaXR0ZXIgICAgICAgID0gcmVxdWlyZShcIi4vR1BVRW1pdHRlclwiKVxudmFyIEdQVVBhcnRpY2xlU3lzdGVtID0gcmVxdWlyZShcIi4vR1BVUGFydGljbGVTeXN0ZW1cIilcblxudmFyIHNoZWxsICAgICAgICAgICAgID0gbmV3IEdMU2hlbGwoZG9jdW1lbnQuYm9keSwgMTkyMCAvIDEwODApXG52YXIgZW1pdHRlciAgICAgICAgICAgPSBuZXcgR1BVRW1pdHRlcihzaGVsbC5nbCwgMCwgMCwgMClcbnZhciBncHVQYXJ0aWNsZVN5c3RlbSA9IG5ldyBHUFVQYXJ0aWNsZVN5c3RlbShzaGVsbC5nbClcbnZhciBlbWl0dGVycyAgICAgICAgICA9IFtlbWl0dGVyXVxuXG5zaGVsbC5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihlbWl0dGVycylcbn1cblxuc2hlbGwudXBkYXRlID0gZnVuY3Rpb24gKGRUKSB7XG4gIGdwdVBhcnRpY2xlU3lzdGVtLnVwZGF0ZShkVCwgZW1pdHRlcnMpXG59XG4iXX0=
