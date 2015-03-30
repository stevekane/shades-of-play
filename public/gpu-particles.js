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

},{"./Clock":1,"./dom-utils":8}],5:[function(require,module,exports){
module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

/* Calculate the size of the teture needed to represent this system
 * Build CPU memory buffers containing initial values for position
 * and velocity
 * Create textures for both position and velocity data and populate them 
 * with the initial values for position and velocity
 * Initialize framebuffers for each texture and bind the texture to the buffer
 * Create array of particle coordinates which are used to lookup a particle
 * in the shaders.
 * Buffer this array of particle coordinates in GPU memory and store a reference
 * to the handle.
 **/
function GPUEmitter (glShell, MAX_COUNT, x, y, z) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var gl             = glShell.gl
  var ROW_SIZE       = calculateRowSize(1, MAX_COUNT)
  var COUNT          = ROW_SIZE * ROW_SIZE
  var positions      = initializeParticleXYZ(x, y, z, new Float32Array(4 * COUNT))
  var velocities     = new Float32Array(4 * COUNT)

  var posTexture1    = configureTexture(glShell, ROW_SIZE, ROW_SIZE, 
                                        positions, gl.createTexture())
  var posTexture2    = configureTexture(glShell, ROW_SIZE, ROW_SIZE, 
                                        positions, gl.createTexture())
  var velTexture1    = configureTexture(glShell, ROW_SIZE, ROW_SIZE, 
                                        velocities, gl.createTexture())
  var velTexture2    = configureTexture(glShell, ROW_SIZE, ROW_SIZE, 
                                        velocities, gl.createTexture())
  var particleCoords = buildParticleCoords(ROW_SIZE, ROW_SIZE)
  var coordBuffer    = gl.createBuffer()


  gl.bindBuffer(gl.ARRAY_BUFFER, coordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, particleCoords, gl.STATIC_DRAW)

  this.livingIndex  = 4
  this.width        = ROW_SIZE
  this.height       = ROW_SIZE
  this.posTextures  = [posTexture1, posTexture2]
  this.velTextures  = [velTexture1, velTexture2]
  this.readIndex    = 0
  this.coordBuffer  = coordBuffer
}

function calculateRowSize (val, target) {
  while ( val * val < target ) {
    val++ 
  }
  return val
}

function buildParticleCoords (width, height) {
  var array = new Float32Array(width * 2 * height)

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      array[j * 2 * width + i * 2]     = [i]
      array[j * 2 * width + i * 2 + 1] = [j]
    } 
  }
  return array
}

function setParticleXYZ (index, x, y, z, array) {
  array[PARTICLE_STRIDE * index]     = x
  array[PARTICLE_STRIDE * index + 1] = y
  array[PARTICLE_STRIDE * index + 2] = z
}

function initializeParticleXYZ (x, y, z, array) {
  for (var i = 0; i < array.length / PARTICLE_STRIDE; i++) {
    setParticleXYZ(i, x, y, z, array)
  }
  return array
}

//TODO: this is gross.  we are attaching an additional parameter to the handle
//that we don't own because reasons.  probably should create wrapper object
function configureTexture (glShell, width, height, data, texture) {
  var gl          = glShell.gl
  var textureUnit = glShell.nextTextureUnit

  console.log(textureUnit)

  texture.unit = textureUnit
  gl.activeTexture(gl.TEXTURE0 + textureUnit)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 
                width, height, 
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


},{}],6:[function(require,module,exports){

var GLProgram  = require("./GLProgram")
var ScreenQuad = require("./ScreenQuad")

module.exports = GPUParticleSystem

var velocityVSrc = "#define GLSLIFY 1\n\nprecision highp float;\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var velocityFSrc = "#define GLSLIFY 1\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex);\n\n  gl_FragColor = velocity;\n}\n"
var positionVSrc = "#define GLSLIFY 1\n\nprecision highp float;\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var positionFSrc = "#define GLSLIFY 1\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\nuniform sampler2D positions;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex);\n  vec3 position     = texture2D(positions, textureIndex);\n\n  gl_FragColor  = dT * velocity + position;\n}\n"
var renderVSrc   = "#define GLSLIFY 1\n\nprecision highp float;\n\nattribute vec2 particleCoord;\n\nuniform sampler2D positions;\n\nvoid main () {\n  //TODO: we should probably implement some kind of perspective shit here as well\n  gl_Position = texture2D(positions, particleCoord);\n}\n"
var renderFSrc   = "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);\n} \n"

function GPUParticleSystem (gl) {
  var velocityProgram = new GLProgram.fromSource(gl, velocityVSrc, velocityFSrc)
  var positionProgram = new GLProgram.fromSource(gl, positionVSrc, positionFSrc)
  var renderProgram   = new GLProgram.fromSource(gl, renderVSrc, renderFSrc)
  var positionBuffer  = gl.createFramebuffer()
  var velocityBuffer  = gl.createFramebuffer()
  var screenQuad      = new ScreenQuad
  var screenBuffer    = gl.createBuffer()

  //bind full screen quad coord buffer for both velocity and position prog
  gl.bindBuffer(gl.ARRAY_BUFFER, screenBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, screenQuad, gl.STATIC_DRAW)

  //enable attribute arrays for all programs
  gl.enableVertexAttribArray(velocityProgram.attributes.screenCoord)
  gl.enableVertexAttribArray(positionProgram.attributes.screenCoord)
  //gl.enableVertexAttribArray(renderProgram.attributes.particleCoord)

  this.gl              = gl
  this.screenBuffer    = screenBuffer
  this.velocityProgram = velocityProgram
  this.positionProgram = positionProgram
  this.velocityBuffer  = velocityBuffer
  this.positionBuffer  = positionBuffer
  this.renderProrgam   = renderProgram
}

/*
 *
 **/
GPUParticleSystem.prototype.update = function (dT, gpuEmitters) {
  var gl = this.gl
  var emitter 
  var readFromIndex
  var writeToIndex

  gl.useProgram(this.velocityProgram.program)
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.velocityBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.vertexAttribPointer(this.velocityProgram.attributes.screenCoord, 2,
                         gl.FLOAT, gl.FALSE, 0, 0)

  //update velocities using drawCall for each emitter
  for (var i = 0; i < gpuEmitters.length; i++) {
    emitter       = gpuEmitters[i]
    readFromIndex = emitter.readIndex
    writeToIndex  = emitter.readIndex === 0 ? 1 : 0

    //TODO: we need to attach sampler uniform for appropriate textures
    //gl.uniform1i(this.velocityProgram.uniforms.velocities, 
    //             emitter.velTextures[readFromIndex].unit)
    gl.viewport(0, 0, emitter.width, emitter.height)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE2D,
                            emitter.posTextures[writeToIndex], 0)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
  gl.useProgram(this.positionProgram.program)
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.vertexAttribPointer(this.positionProgram.attributes.screenCoord, 2,
                         gl.FLOAT, gl.FALSE, 0, 0)

  //update positions using drawCall for each emitter
  for (var j = 0; j < gpuEmitters.length; j++) {
    emitter = gpuEmitters[j] 
    //TODO: we need to attach sampler uniform for appropriate textures
    //gl.uniform1i(this.positionProgram.uniforms.positions, 
    //             emitter.posTextures[readFromIndex].unit)
    gl.viewport(0, 0, emitter.width, emitter.height)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  //toggle all readFrom indices 
  for (var k = 0; k < gpuEmitters.length; k++) {
    emitter           = gpuEmitters[k]
    emitter.readIndex = emitter.readIndex === 0 ? 1 : 0
  }
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
    gl.bindBuffer(gl.ARRAY_BUFFER, emitter.coordBuffer)
    gl.vertexAttribPointer(this.renderProgram.attributes.particleCoord, 2,
                           gl.FLOAT, gl.FALSE, 0, 0)
    gl.drawArrays(gl.POINTS, 0, emitter.livingIndex)
  }
}

},{"./GLProgram":2,"./ScreenQuad":7}],7:[function(require,module,exports){
module.exports = ScreenQuad

function ScreenQuad () {
  return new Float32Array([
    1, 1, -1, 1, -1, -1,
    1, 1, -1, -1, 1, -1
  ])
}

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var emitter           = new GPUEmitter(shell, 10e5, 1, 1, 1)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

window.emitter = emitter
window.shell   = shell

shell.render = function () {
  //gpuParticleSystem.render()
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, emitters)
}

},{"./GLShell":4,"./GPUEmitter":5,"./GPUParticleSystem":6}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvR1BVRW1pdHRlci5qcyIsInNyYy9HUFVQYXJ0aWNsZVN5c3RlbS5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBDbG9ja1xuXG5mdW5jdGlvbiBDbG9jayAoKSB7XG4gIHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpXG4gIHRoaXMudGhpc1RpbWUgPSB0aGlzLmxhc3RUaW1lXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxufVxuXG5DbG9jay5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sYXN0VGltZSA9IHRoaXMudGhpc1RpbWVcbiAgdGhpcy50aGlzVGltZSA9IERhdGUubm93KClcbiAgdGhpcy5kVCAgICAgICA9IHRoaXMudGhpc1RpbWUgLSB0aGlzLmxhc3RUaW1lXG59XG4iLCJ2YXIgR0xTaGFkZXIgPSByZXF1aXJlKFwiLi9HTFNoYWRlclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbVxuXG5mdW5jdGlvbiBlaXRoZXJJbnN0YW5jZU9mIChjdG9yLCB2MSwgdjIpIHtcbiAgcmV0dXJuICgodjEgaW5zdGFuY2VvZiBjdG9yKSB8fCAodjIgaW5zdGFuY2VvZiBjdG9yKSkgPyB0cnVlIDogZmFsc2Vcbn1cblxuZnVuY3Rpb24gY29tYmluZUVycm9ycyAodjEsIHYyKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoKHYxLm1lc3NhZ2UgfHwgXCJcIikgKyBcIlxcblwiICsgKHYyLm1lc3NhZ2UgfHwgXCJcIikpXG59XG5cbmZ1bmN0aW9uIEdMUHJvZ3JhbSAoZ2wsIHZzLCBmcykge1xuICB2YXIgcHJvZ3JhbSAgICAgICA9IGdsLmNyZWF0ZVByb2dyYW0odnMsIGZzKVxuICB2YXIgYXR0cmlidXRlcyAgICA9IHt9XG4gIHZhciB1bmlmb3JtcyAgICAgID0ge31cbiAgdmFyIG51bUF0dHJpYnV0ZXNcbiAgdmFyIG51bVVuaWZvcm1zXG4gIHZhciBhTmFtZVxuICB2YXIgdU5hbWVcblxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnMpXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcylcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcblxuICBudW1BdHRyaWJ1dGVzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfQVRUUklCVVRFUylcbiAgbnVtVW5pZm9ybXMgICA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQXR0cmlidXRlczsgKytpKSB7XG4gICAgYU5hbWUgICAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSkubmFtZVxuICAgIGF0dHJpYnV0ZXNbYU5hbWVdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgYU5hbWUpXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlc1thTmFtZV0pXG4gIH1cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IG51bVVuaWZvcm1zOyArK2opIHtcbiAgICB1TmFtZSAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGopLm5hbWVcbiAgICB1bmlmb3Jtc1t1TmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdU5hbWUpXG4gIH1cblxuICB0aGlzLnByb2dyYW0gICAgPSBwcm9ncmFtXG4gIHRoaXMudW5pZm9ybXMgICA9IHVuaWZvcm1zXG4gIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcbn1cblxuLy9HTENvbnRleHQgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBFaXRoZXIgRXJyb3IgfCBHTFByb2dyYW1cbkdMUHJvZ3JhbS5mcm9tU291cmNlID0gZnVuY3Rpb24gKGdsLCB2U3JjLCBmU3JjKSB7XG4gIHZhciB2U2hhZGVyID0gbmV3IEdMU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2U3JjKVxuICB2YXIgZlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmU3JjKVxuXG4gIHJldHVybiAoZWl0aGVySW5zdGFuY2VPZihFcnJvciwgdlNoYWRlciwgZlNoYWRlcikpXG4gICAgPyBjb21iaW5lRXJyb3JzKHZTaGFkZXIsIGZTaGFkZXIpXG4gICAgOiBuZXcgR0xQcm9ncmFtKGdsLCB2U2hhZGVyLCBmU2hhZGVyKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFNoYWRlclxuXG4vL0dMQ29udGV4dCAtPiBFbnVtIC0+IFN0cmluZyAtPiBFaXRoZXIgR0xTaGFkZXIgfCBFcnJvclxuZnVuY3Rpb24gR0xTaGFkZXIgKGdsLCB0eXBlLCBzcmMpIHtcbiAgdmFyIHNoYWRlciAgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSlcblxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICByZXR1cm4gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpXG4gICAgPyBzaGFkZXJcbiAgICA6IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXG59XG4iLCJ2YXIgQ2xvY2sgICAgICAgICAgID0gcmVxdWlyZShcIi4vQ2xvY2tcIilcbnZhciByZXNpemVXaXRoUmF0aW8gPSByZXF1aXJlKFwiLi9kb20tdXRpbHNcIikucmVzaXplV2l0aFJhdGlvXG5cbm1vZHVsZS5leHBvcnRzID0gR0xTaGVsbFxuXG5mdW5jdGlvbiBHTFNoZWxsIChwYXJlbnROb2RlLCBhc3BlY3RSYXRpbykge1xuICB2YXIgY2FudmFzICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgdmFyIGdsICAgICAgICAgICAgICAgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpXG4gIHZhciBjbG9jayAgICAgICAgICAgID0gbmV3IENsb2NrXG4gIHZhciB0ZXh0dXJlVW5pdEluZGV4ID0gMFxuXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJhdGlvID0gdGhpcy5nbC5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmdsLmNhbnZhcy5jbGllbnRIZWlnaHRcblxuICAgIHJlc2l6ZVdpdGhSYXRpbyh0aGlzLmFzcGVjdFJhdGlvLCB0aGlzLnBhcmVudE5vZGUsIHRoaXMuZ2wuY2FudmFzKVxuICAgIHRoaXMucmVuZGVyKCkgXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgfS5iaW5kKHRoaXMpXG5cbiAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsb2NrLnRpY2soKVxuICAgIHRoaXMudXBkYXRlKHRoaXMuY2xvY2suZFQpIFxuICB9LmJpbmQodGhpcylcblxuICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGNhbnZhcylcbiAgdGhpcy5wYXJlbnROb2RlICA9IHBhcmVudE5vZGVcbiAgdGhpcy5nbCAgICAgICAgICA9IGdsXG4gIHRoaXMuYXNwZWN0UmF0aW8gPSBhc3BlY3RSYXRpb1xuICB0aGlzLmNsb2NrICAgICAgID0gY2xvY2tcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuZXh0VGV4dHVyZVVuaXRcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGV4dHVyZVVuaXRJbmRleCsrIH0gXG4gIH0pXG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgc2V0SW50ZXJ2YWwodXBkYXRlLCAyNSlcbn1cblxuR0xTaGVsbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAvL292ZXIgd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHJlbmRlciBmdW5jdGlvblxufVxuXG4vL2ZvciBjb252ZW5pZW5jZSwgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgaXMgcGFzc2VkIGFzIGEgcGFyYW1hdGVyXG5HTFNoZWxsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcbiAgLy9vdmVyd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHVwZGF0ZSBmdW5jdGlvblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBHUFVFbWl0dGVyXG5cbnZhciBQQVJUSUNMRV9TVFJJREUgPSA0XG5cbi8qIENhbGN1bGF0ZSB0aGUgc2l6ZSBvZiB0aGUgdGV0dXJlIG5lZWRlZCB0byByZXByZXNlbnQgdGhpcyBzeXN0ZW1cbiAqIEJ1aWxkIENQVSBtZW1vcnkgYnVmZmVycyBjb250YWluaW5nIGluaXRpYWwgdmFsdWVzIGZvciBwb3NpdGlvblxuICogYW5kIHZlbG9jaXR5XG4gKiBDcmVhdGUgdGV4dHVyZXMgZm9yIGJvdGggcG9zaXRpb24gYW5kIHZlbG9jaXR5IGRhdGEgYW5kIHBvcHVsYXRlIHRoZW0gXG4gKiB3aXRoIHRoZSBpbml0aWFsIHZhbHVlcyBmb3IgcG9zaXRpb24gYW5kIHZlbG9jaXR5XG4gKiBJbml0aWFsaXplIGZyYW1lYnVmZmVycyBmb3IgZWFjaCB0ZXh0dXJlIGFuZCBiaW5kIHRoZSB0ZXh0dXJlIHRvIHRoZSBidWZmZXJcbiAqIENyZWF0ZSBhcnJheSBvZiBwYXJ0aWNsZSBjb29yZGluYXRlcyB3aGljaCBhcmUgdXNlZCB0byBsb29rdXAgYSBwYXJ0aWNsZVxuICogaW4gdGhlIHNoYWRlcnMuXG4gKiBCdWZmZXIgdGhpcyBhcnJheSBvZiBwYXJ0aWNsZSBjb29yZGluYXRlcyBpbiBHUFUgbWVtb3J5IGFuZCBzdG9yZSBhIHJlZmVyZW5jZVxuICogdG8gdGhlIGhhbmRsZS5cbiAqKi9cbmZ1bmN0aW9uIEdQVUVtaXR0ZXIgKGdsU2hlbGwsIE1BWF9DT1VOVCwgeCwgeSwgeikge1xuICBpZiAoIWdsLmdldEV4dGVuc2lvbihcIk9FU190ZXh0dXJlX2Zsb2F0XCIpKSB0aHJvdyBuZXcgRXJyb3IoXCJubyBmbG9hdCB0ZXh0dXJlc1wiKVxuXG4gIHZhciBnbCAgICAgICAgICAgICA9IGdsU2hlbGwuZ2xcbiAgdmFyIFJPV19TSVpFICAgICAgID0gY2FsY3VsYXRlUm93U2l6ZSgxLCBNQVhfQ09VTlQpXG4gIHZhciBDT1VOVCAgICAgICAgICA9IFJPV19TSVpFICogUk9XX1NJWkVcbiAgdmFyIHBvc2l0aW9ucyAgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKHgsIHksIHosIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcbiAgdmFyIHZlbG9jaXRpZXMgICAgID0gbmV3IEZsb2F0MzJBcnJheSg0ICogQ09VTlQpXG5cbiAgdmFyIHBvc1RleHR1cmUxICAgID0gY29uZmlndXJlVGV4dHVyZShnbFNoZWxsLCBST1dfU0laRSwgUk9XX1NJWkUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucywgZ2wuY3JlYXRlVGV4dHVyZSgpKVxuICB2YXIgcG9zVGV4dHVyZTIgICAgPSBjb25maWd1cmVUZXh0dXJlKGdsU2hlbGwsIFJPV19TSVpFLCBST1dfU0laRSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLCBnbC5jcmVhdGVUZXh0dXJlKCkpXG4gIHZhciB2ZWxUZXh0dXJlMSAgICA9IGNvbmZpZ3VyZVRleHR1cmUoZ2xTaGVsbCwgUk9XX1NJWkUsIFJPV19TSVpFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0aWVzLCBnbC5jcmVhdGVUZXh0dXJlKCkpXG4gIHZhciB2ZWxUZXh0dXJlMiAgICA9IGNvbmZpZ3VyZVRleHR1cmUoZ2xTaGVsbCwgUk9XX1NJWkUsIFJPV19TSVpFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0aWVzLCBnbC5jcmVhdGVUZXh0dXJlKCkpXG4gIHZhciBwYXJ0aWNsZUNvb3JkcyA9IGJ1aWxkUGFydGljbGVDb29yZHMoUk9XX1NJWkUsIFJPV19TSVpFKVxuICB2YXIgY29vcmRCdWZmZXIgICAgPSBnbC5jcmVhdGVCdWZmZXIoKVxuXG5cbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGNvb3JkQnVmZmVyKVxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGVDb29yZHMsIGdsLlNUQVRJQ19EUkFXKVxuXG4gIHRoaXMubGl2aW5nSW5kZXggID0gNFxuICB0aGlzLndpZHRoICAgICAgICA9IFJPV19TSVpFXG4gIHRoaXMuaGVpZ2h0ICAgICAgID0gUk9XX1NJWkVcbiAgdGhpcy5wb3NUZXh0dXJlcyAgPSBbcG9zVGV4dHVyZTEsIHBvc1RleHR1cmUyXVxuICB0aGlzLnZlbFRleHR1cmVzICA9IFt2ZWxUZXh0dXJlMSwgdmVsVGV4dHVyZTJdXG4gIHRoaXMucmVhZEluZGV4ICAgID0gMFxuICB0aGlzLmNvb3JkQnVmZmVyICA9IGNvb3JkQnVmZmVyXG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVJvd1NpemUgKHZhbCwgdGFyZ2V0KSB7XG4gIHdoaWxlICggdmFsICogdmFsIDwgdGFyZ2V0ICkge1xuICAgIHZhbCsrIFxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuZnVuY3Rpb24gYnVpbGRQYXJ0aWNsZUNvb3JkcyAod2lkdGgsIGhlaWdodCkge1xuICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogMiAqIGhlaWdodClcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDJdICAgICA9IFtpXVxuICAgICAgYXJyYXlbaiAqIDIgKiB3aWR0aCArIGkgKiAyICsgMV0gPSBbal1cbiAgICB9IFxuICB9XG4gIHJldHVybiBhcnJheVxufVxuXG5mdW5jdGlvbiBzZXRQYXJ0aWNsZVhZWiAoaW5kZXgsIHgsIHksIHosIGFycmF5KSB7XG4gIGFycmF5W1BBUlRJQ0xFX1NUUklERSAqIGluZGV4XSAgICAgPSB4XG4gIGFycmF5W1BBUlRJQ0xFX1NUUklERSAqIGluZGV4ICsgMV0gPSB5XG4gIGFycmF5W1BBUlRJQ0xFX1NUUklERSAqIGluZGV4ICsgMl0gPSB6XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQYXJ0aWNsZVhZWiAoeCwgeSwgeiwgYXJyYXkpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLyBQQVJUSUNMRV9TVFJJREU7IGkrKykge1xuICAgIHNldFBhcnRpY2xlWFlaKGksIHgsIHksIHosIGFycmF5KVxuICB9XG4gIHJldHVybiBhcnJheVxufVxuXG4vL1RPRE86IHRoaXMgaXMgZ3Jvc3MuICB3ZSBhcmUgYXR0YWNoaW5nIGFuIGFkZGl0aW9uYWwgcGFyYW1ldGVyIHRvIHRoZSBoYW5kbGVcbi8vdGhhdCB3ZSBkb24ndCBvd24gYmVjYXVzZSByZWFzb25zLiAgcHJvYmFibHkgc2hvdWxkIGNyZWF0ZSB3cmFwcGVyIG9iamVjdFxuZnVuY3Rpb24gY29uZmlndXJlVGV4dHVyZSAoZ2xTaGVsbCwgd2lkdGgsIGhlaWdodCwgZGF0YSwgdGV4dHVyZSkge1xuICB2YXIgZ2wgICAgICAgICAgPSBnbFNoZWxsLmdsXG4gIHZhciB0ZXh0dXJlVW5pdCA9IGdsU2hlbGwubmV4dFRleHR1cmVVbml0XG5cbiAgY29uc29sZS5sb2codGV4dHVyZVVuaXQpXG5cbiAgdGV4dHVyZS51bml0ID0gdGV4dHVyZVVuaXRcbiAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHRleHR1cmVVbml0KVxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKVxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVClcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpXG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgXG4gICAgICAgICAgICAgICAgd2lkdGgsIGhlaWdodCwgXG4gICAgICAgICAgICAgICAgMCwgZ2wuUkdCQSwgZ2wuRkxPQVQsIGRhdGEpXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpXG4gIHJldHVybiB0ZXh0dXJlXG59XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZUZyYW1lQnVmZmVyIChnbCwgdGV4dHVyZSwgZnJhbWVCdWZmZXIpIHtcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBmcmFtZUJ1ZmZlcilcbiAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSwgMCkgXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcbiAgcmV0dXJuIGZyYW1lQnVmZmVyXG59XG5cbiIsIlxudmFyIEdMUHJvZ3JhbSAgPSByZXF1aXJlKFwiLi9HTFByb2dyYW1cIilcbnZhciBTY3JlZW5RdWFkID0gcmVxdWlyZShcIi4vU2NyZWVuUXVhZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdQVVBhcnRpY2xlU3lzdGVtXG5cbnZhciB2ZWxvY2l0eVZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbmF0dHJpYnV0ZSB2ZWMyIHNjcmVlbkNvb3JkO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoc2NyZWVuQ29vcmQsIDAuMCwgMS4wKTtcXG59XFxuXCJcbnZhciB2ZWxvY2l0eUZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudW5pZm9ybSBmbG9hdCBkVDtcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgdmVjMiB0ZXh0dXJlSW5kZXggPSBnbF9GcmFnQ29vcmQueHkgLyB2aWV3cG9ydDtcXG4gIHZlYzMgdmVsb2NpdHkgICAgID0gdGV4dHVyZTJEKHZlbG9jaXRpZXMsIHRleHR1cmVJbmRleCk7XFxuXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWxvY2l0eTtcXG59XFxuXCJcbnZhciBwb3NpdGlvblZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbmF0dHJpYnV0ZSB2ZWMyIHNjcmVlbkNvb3JkO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoc2NyZWVuQ29vcmQsIDAuMCwgMS4wKTtcXG59XFxuXCJcbnZhciBwb3NpdGlvbkZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudW5pZm9ybSBmbG9hdCBkVDtcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXG51bmlmb3JtIHNhbXBsZXIyRCBwb3NpdGlvbnM7XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIHZlYzIgdGV4dHVyZUluZGV4ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdmlld3BvcnQ7XFxuICB2ZWMzIHZlbG9jaXR5ICAgICA9IHRleHR1cmUyRCh2ZWxvY2l0aWVzLCB0ZXh0dXJlSW5kZXgpO1xcbiAgdmVjMyBwb3NpdGlvbiAgICAgPSB0ZXh0dXJlMkQocG9zaXRpb25zLCB0ZXh0dXJlSW5kZXgpO1xcblxcbiAgZ2xfRnJhZ0NvbG9yICA9IGRUICogdmVsb2NpdHkgKyBwb3NpdGlvbjtcXG59XFxuXCJcbnZhciByZW5kZXJWU3JjICAgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbmF0dHJpYnV0ZSB2ZWMyIHBhcnRpY2xlQ29vcmQ7XFxuXFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICAvL1RPRE86IHdlIHNob3VsZCBwcm9iYWJseSBpbXBsZW1lbnQgc29tZSBraW5kIG9mIHBlcnNwZWN0aXZlIHNoaXQgaGVyZSBhcyB3ZWxsXFxuICBnbF9Qb3NpdGlvbiA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHBhcnRpY2xlQ29vcmQpO1xcbn1cXG5cIlxudmFyIHJlbmRlckZTcmMgICA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDAuNSwgMC41LCAxLjApO1xcbn0gXFxuXCJcblxuZnVuY3Rpb24gR1BVUGFydGljbGVTeXN0ZW0gKGdsKSB7XG4gIHZhciB2ZWxvY2l0eVByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHZlbG9jaXR5VlNyYywgdmVsb2NpdHlGU3JjKVxuICB2YXIgcG9zaXRpb25Qcm9ncmFtID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCBwb3NpdGlvblZTcmMsIHBvc2l0aW9uRlNyYylcbiAgdmFyIHJlbmRlclByb2dyYW0gICA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgcmVuZGVyVlNyYywgcmVuZGVyRlNyYylcbiAgdmFyIHBvc2l0aW9uQnVmZmVyICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcbiAgdmFyIHZlbG9jaXR5QnVmZmVyICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcbiAgdmFyIHNjcmVlblF1YWQgICAgICA9IG5ldyBTY3JlZW5RdWFkXG4gIHZhciBzY3JlZW5CdWZmZXIgICAgPSBnbC5jcmVhdGVCdWZmZXIoKVxuXG4gIC8vYmluZCBmdWxsIHNjcmVlbiBxdWFkIGNvb3JkIGJ1ZmZlciBmb3IgYm90aCB2ZWxvY2l0eSBhbmQgcG9zaXRpb24gcHJvZ1xuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuQnVmZmVyKVxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuUXVhZCwgZ2wuU1RBVElDX0RSQVcpXG5cbiAgLy9lbmFibGUgYXR0cmlidXRlIGFycmF5cyBmb3IgYWxsIHByb2dyYW1zXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlbG9jaXR5UHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkKVxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcbiAgLy9nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShyZW5kZXJQcm9ncmFtLmF0dHJpYnV0ZXMucGFydGljbGVDb29yZClcblxuICB0aGlzLmdsICAgICAgICAgICAgICA9IGdsXG4gIHRoaXMuc2NyZWVuQnVmZmVyICAgID0gc2NyZWVuQnVmZmVyXG4gIHRoaXMudmVsb2NpdHlQcm9ncmFtID0gdmVsb2NpdHlQcm9ncmFtXG4gIHRoaXMucG9zaXRpb25Qcm9ncmFtID0gcG9zaXRpb25Qcm9ncmFtXG4gIHRoaXMudmVsb2NpdHlCdWZmZXIgID0gdmVsb2NpdHlCdWZmZXJcbiAgdGhpcy5wb3NpdGlvbkJ1ZmZlciAgPSBwb3NpdGlvbkJ1ZmZlclxuICB0aGlzLnJlbmRlclByb3JnYW0gICA9IHJlbmRlclByb2dyYW1cbn1cblxuLypcbiAqXG4gKiovXG5HUFVQYXJ0aWNsZVN5c3RlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRULCBncHVFbWl0dGVycykge1xuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIHZhciBlbWl0dGVyIFxuICB2YXIgcmVhZEZyb21JbmRleFxuICB2YXIgd3JpdGVUb0luZGV4XG5cbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS5wcm9ncmFtKVxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMudmVsb2NpdHlCdWZmZXIpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNjcmVlbkJ1ZmZlcilcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnZlbG9jaXR5UHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkLCAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGdsLkZMT0FULCBnbC5GQUxTRSwgMCwgMClcblxuICAvL3VwZGF0ZSB2ZWxvY2l0aWVzIHVzaW5nIGRyYXdDYWxsIGZvciBlYWNoIGVtaXR0ZXJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBncHVFbWl0dGVycy5sZW5ndGg7IGkrKykge1xuICAgIGVtaXR0ZXIgICAgICAgPSBncHVFbWl0dGVyc1tpXVxuICAgIHJlYWRGcm9tSW5kZXggPSBlbWl0dGVyLnJlYWRJbmRleFxuICAgIHdyaXRlVG9JbmRleCAgPSBlbWl0dGVyLnJlYWRJbmRleCA9PT0gMCA/IDEgOiAwXG5cbiAgICAvL1RPRE86IHdlIG5lZWQgdG8gYXR0YWNoIHNhbXBsZXIgdW5pZm9ybSBmb3IgYXBwcm9wcmlhdGUgdGV4dHVyZXNcbiAgICAvL2dsLnVuaWZvcm0xaSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy52ZWxvY2l0aWVzLCBcbiAgICAvLyAgICAgICAgICAgICBlbWl0dGVyLnZlbFRleHR1cmVzW3JlYWRGcm9tSW5kZXhdLnVuaXQpXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZW1pdHRlci53aWR0aCwgZW1pdHRlci5oZWlnaHQpXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFMkQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUZXh0dXJlc1t3cml0ZVRvSW5kZXhdLCAwKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KVxuICB9XG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLnBvc2l0aW9uQnVmZmVyKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZCwgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXG5cbiAgLy91cGRhdGUgcG9zaXRpb25zIHVzaW5nIGRyYXdDYWxsIGZvciBlYWNoIGVtaXR0ZXJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBncHVFbWl0dGVycy5sZW5ndGg7IGorKykge1xuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tqXSBcbiAgICAvL1RPRE86IHdlIG5lZWQgdG8gYXR0YWNoIHNhbXBsZXIgdW5pZm9ybSBmb3IgYXBwcm9wcmlhdGUgdGV4dHVyZXNcbiAgICAvL2dsLnVuaWZvcm0xaSh0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIFxuICAgIC8vICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGV4dHVyZXNbcmVhZEZyb21JbmRleF0udW5pdClcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLndpZHRoLCBlbWl0dGVyLmhlaWdodClcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNilcbiAgfVxuXG4gIC8vdG9nZ2xlIGFsbCByZWFkRnJvbSBpbmRpY2VzIFxuICBmb3IgKHZhciBrID0gMDsgayA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaysrKSB7XG4gICAgZW1pdHRlciAgICAgICAgICAgPSBncHVFbWl0dGVyc1trXVxuICAgIGVtaXR0ZXIucmVhZEluZGV4ID0gZW1pdHRlci5yZWFkSW5kZXggPT09IDAgPyAxIDogMFxuICB9XG59XG5cbkdQVVBhcnRpY2xlU3lzdGVtLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZ3B1RW1pdHRlcnMpIHtcbiAgdmFyIGdsID0gdGhpcy5nbFxuICB2YXIgZW1pdHRlclxuXG4gIGdsLnVzZVByb2dyYW0odGhpcy5yZW5kZXJQcm9ncmFtLnByb2dyYW0pXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpXG4gIGdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJIZWlnaHQpXG4gIGdsLmVuYWJsZShnbC5CTEVORClcbiAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbaV0gXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGVtaXR0ZXIuY29vcmRCdWZmZXIpXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkLCAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCBlbWl0dGVyLmxpdmluZ0luZGV4KVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNjcmVlblF1YWRcblxuZnVuY3Rpb24gU2NyZWVuUXVhZCAoKSB7XG4gIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAxLCAxLCAtMSwgMSwgLTEsIC0xLFxuICAgIDEsIDEsIC0xLCAtMSwgMSwgLTFcbiAgXSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzLnJlc2l6ZVdpdGhSYXRpbyA9IHJlc2l6ZVdpdGhSYXRpb1xuXG5mdW5jdGlvbiByZXNpemVXaXRoUmF0aW8gKHJhdGlvLCByZWZlcmVuY2UsIHN1YmplY3QpIHtcbiAgdmFyIHRhcmdldEFzcGVjdCA9IHJlZmVyZW5jZS5jbGllbnRXaWR0aCAvIHJlZmVyZW5jZS5jbGllbnRIZWlnaHRcbiAgdmFyIG5ld1dpZHRoICAgICA9IHJhdGlvIDwgdGFyZ2V0QXNwZWN0XG4gICAgPyB+fihyZWZlcmVuY2UuY2xpZW50SGVpZ2h0ICogcmF0aW8pXG4gICAgOiByZWZlcmVuY2UuY2xpZW50V2lkdGhcbiAgdmFyIG5ld0hlaWdodCAgICA9IH5+KG5ld1dpZHRoIC8gcmF0aW8pXG4gIHZhciBvbGRXaWR0aCAgICAgPSBzdWJqZWN0LmNsaWVudFdpZHRoXG4gIHZhciBvbGRIZWlnaHQgICAgPSBzdWJqZWN0LmNsaWVudEhlaWdodFxuXG4gIGlmIChvbGRXaWR0aCA9PT0gbmV3V2lkdGggJiYgb2xkSGVpZ2h0ID09PSBuZXdIZWlnaHQpIHJldHVyblxuICBzdWJqZWN0LmNsaWVudFdpZHRoICA9IG5ld1dpZHRoXG4gIHN1YmplY3QuY2xpZW50SGVpZ2h0ID0gbmV3SGVpZ2h0XG4gIHN1YmplY3Qud2lkdGggICAgICAgID0gbmV3V2lkdGhcbiAgc3ViamVjdC5oZWlnaHQgICAgICAgPSBuZXdIZWlnaHRcbn1cbiIsInZhciBHTFNoZWxsICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0dMU2hlbGxcIilcbnZhciBHUFVFbWl0dGVyICAgICAgICA9IHJlcXVpcmUoXCIuL0dQVUVtaXR0ZXJcIilcbnZhciBHUFVQYXJ0aWNsZVN5c3RlbSA9IHJlcXVpcmUoXCIuL0dQVVBhcnRpY2xlU3lzdGVtXCIpXG5cbnZhciBzaGVsbCAgICAgICAgICAgICA9IG5ldyBHTFNoZWxsKGRvY3VtZW50LmJvZHksIDE5MjAgLyAxMDgwKVxudmFyIGVtaXR0ZXIgICAgICAgICAgID0gbmV3IEdQVUVtaXR0ZXIoc2hlbGwsIDEwZTUsIDEsIDEsIDEpXG52YXIgZ3B1UGFydGljbGVTeXN0ZW0gPSBuZXcgR1BVUGFydGljbGVTeXN0ZW0oc2hlbGwuZ2wpXG52YXIgZW1pdHRlcnMgICAgICAgICAgPSBbZW1pdHRlcl1cblxud2luZG93LmVtaXR0ZXIgPSBlbWl0dGVyXG53aW5kb3cuc2hlbGwgICA9IHNoZWxsXG5cbnNoZWxsLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgLy9ncHVQYXJ0aWNsZVN5c3RlbS5yZW5kZXIoKVxufVxuXG5zaGVsbC51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcbiAgZ3B1UGFydGljbGVTeXN0ZW0udXBkYXRlKGRULCBlbWl0dGVycylcbn1cbiJdfQ==
