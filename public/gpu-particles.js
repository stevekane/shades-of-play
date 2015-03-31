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

function GPUEmitter (glShell, MAX_COUNT, x, y, z) {
  if (!glShell.gl.getExtension("OES_texture_float")) throw new Error("no float textures")

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

  console.log(particleCoords)

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
    setParticleXYZ(i, x + Math.random(), y + Math.random(), z, array)
  }
  return array
}

//TODO: this is gross.  we are attaching an additional parameter to the handle
//that we don't own because reasons.  probably should create wrapper object
function configureTexture (glShell, width, height, data, texture) {
  var gl          = glShell.gl
  var textureUnit = glShell.nextTextureUnit

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

var velocityVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var velocityFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n\n  gl_FragColor = vec4(0.0 * dT + velocity, 1.0);\n}\n"
var positionVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var positionFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\nuniform sampler2D positions;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n  vec3 position     = texture2D(positions, textureIndex).xyz;\n\n  gl_FragColor  = vec4((dT * velocity) + position, 1.0);\n}\n"
var renderVSrc   = "#define GLSLIFY 1\n\nattribute vec2 particleCoord;\n\nuniform sampler2D positions;\n\nvoid main () {\n  //TODO: we should probably implement some kind of perspective shit here as well\n  vec3 pos     = texture2D(positions, particleCoord).xyz;\n  gl_Position  = vec4(pos, 1.0);\n  gl_PointSize = 12.0;\n}\n"
var renderFSrc   = "#define GLSLIFY 1\n\nvoid main () {\n  gl_FragColor = vec4(0.5, 0.5, 0.5, 0.6);\n} \n"

function GPUParticleSystem (gl) {
  var velocityProgram = new GLProgram.fromSource(gl, velocityVSrc, velocityFSrc)
  var positionProgram = new GLProgram.fromSource(gl, positionVSrc, positionFSrc)
  var renderProgram   = new GLProgram.fromSource(gl, renderVSrc, renderFSrc)
  var positionBuffer  = gl.createFramebuffer()
  var velocityBuffer  = gl.createFramebuffer()
  var screenQuad      = new ScreenQuad
  var screenBuffer    = gl.createBuffer()

  if (velocityProgram instanceof Error) console.log(velocityProgram)
  if (positionProgram instanceof Error) console.log(positionProgram)
  if (renderProgram instanceof Error)   console.log(renderProgram)

  //bind full screen quad coord buffer for both velocity and position prog
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
  this.velocityBuffer  = velocityBuffer
  this.positionBuffer  = positionBuffer
  this.renderProgram   = renderProgram
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
  gl.uniform1f(this.velocityProgram.uniforms.dT, dT)
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.velocityBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.vertexAttribPointer(this.velocityProgram.attributes.screenCoord, 2,
                         gl.FLOAT, gl.FALSE, 0, 0)

  //update velocities using drawCall for each emitter
  for (var i = 0; i < gpuEmitters.length; i++) {
    emitter       = gpuEmitters[i]
    readFromIndex = emitter.readIndex
    writeToIndex  = emitter.readIndex === 0 ? 1 : 0

    gl.uniform1i(this.velocityProgram.uniforms.velocities, 
                 emitter.velTextures[readFromIndex].unit)
    gl.uniform2f(this.velocityProgram.uniforms.viewport, 
                 emitter.width, emitter.height)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
                            emitter.velTextures[writeToIndex], 0)
    gl.viewport(0, 0, emitter.width, emitter.height)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  gl.useProgram(this.positionProgram.program)
  gl.uniform1f(this.positionProgram.uniforms.dT, dT)
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.vertexAttribPointer(this.positionProgram.attributes.screenCoord, 2,
                         gl.FLOAT, gl.FALSE, 0, 0)

  //update positions using drawCall for each emitter
  for (var j = 0; j < gpuEmitters.length; j++) {
    emitter       = gpuEmitters[j] 
    readFromIndex = emitter.readIndex
    writeToIndex  = emitter.readIndex === 0 ? 1 : 0

    gl.uniform1i(this.positionProgram.uniforms.positions, 
                emitter.posTextures[readFromIndex].unit)
    gl.uniform2f(this.positionProgram.uniforms.viewport, 
                emitter.width, emitter.height)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
                           emitter.posTextures[writeToIndex], 0)
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
    emitter       = gpuEmitters[i] 
    readFromIndex = emitter.readIndex

    gl.uniform1i(this.renderProgram.uniforms.positions,
                 emitter.posTextures[readFromIndex].unit)
    gl.bindBuffer(gl.ARRAY_BUFFER, emitter.coordBuffer)
    gl.vertexAttribPointer(this.renderProgram.attributes.particleCoord, 2,
                           gl.FLOAT, gl.FALSE, 0, 0)
    gl.drawArrays(gl.POINTS, 0, emitter.width * emitter.height)
    //gl.drawArrays(gl.POINTS, 0, 2)
  }
  gl.disable(gl.BLEND)
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
var emitter           = new GPUEmitter(shell, 10, 0, 0, 0)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

window.emitter = emitter
window.shell   = shell
window.system = gpuParticleSystem

shell.render = function () {
  gpuParticleSystem.render(emitters)
}

shell.update = function (dT) {
  //gpuParticleSystem.update(dT, emitters)
}

},{"./GLShell":4,"./GPUEmitter":5,"./GPUParticleSystem":6}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvR1BVRW1pdHRlci5qcyIsInNyYy9HUFVQYXJ0aWNsZVN5c3RlbS5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBDbG9ja1xuXG5mdW5jdGlvbiBDbG9jayAoKSB7XG4gIHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpXG4gIHRoaXMudGhpc1RpbWUgPSB0aGlzLmxhc3RUaW1lXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxufVxuXG5DbG9jay5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sYXN0VGltZSA9IHRoaXMudGhpc1RpbWVcbiAgdGhpcy50aGlzVGltZSA9IERhdGUubm93KClcbiAgdGhpcy5kVCAgICAgICA9IHRoaXMudGhpc1RpbWUgLSB0aGlzLmxhc3RUaW1lXG59XG4iLCJ2YXIgR0xTaGFkZXIgPSByZXF1aXJlKFwiLi9HTFNoYWRlclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbVxuXG5mdW5jdGlvbiBlaXRoZXJJbnN0YW5jZU9mIChjdG9yLCB2MSwgdjIpIHtcbiAgcmV0dXJuICgodjEgaW5zdGFuY2VvZiBjdG9yKSB8fCAodjIgaW5zdGFuY2VvZiBjdG9yKSkgPyB0cnVlIDogZmFsc2Vcbn1cblxuZnVuY3Rpb24gY29tYmluZUVycm9ycyAodjEsIHYyKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoKHYxLm1lc3NhZ2UgfHwgXCJcIikgKyBcIlxcblwiICsgKHYyLm1lc3NhZ2UgfHwgXCJcIikpXG59XG5cbmZ1bmN0aW9uIEdMUHJvZ3JhbSAoZ2wsIHZzLCBmcykge1xuICB2YXIgcHJvZ3JhbSAgICAgICA9IGdsLmNyZWF0ZVByb2dyYW0odnMsIGZzKVxuICB2YXIgYXR0cmlidXRlcyAgICA9IHt9XG4gIHZhciB1bmlmb3JtcyAgICAgID0ge31cbiAgdmFyIG51bUF0dHJpYnV0ZXNcbiAgdmFyIG51bVVuaWZvcm1zXG4gIHZhciBhTmFtZVxuICB2YXIgdU5hbWVcblxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnMpXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcylcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcblxuICBudW1BdHRyaWJ1dGVzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfQVRUUklCVVRFUylcbiAgbnVtVW5pZm9ybXMgICA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQXR0cmlidXRlczsgKytpKSB7XG4gICAgYU5hbWUgICAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSkubmFtZVxuICAgIGF0dHJpYnV0ZXNbYU5hbWVdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgYU5hbWUpXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0cmlidXRlc1thTmFtZV0pXG4gIH1cblxuICBmb3IgKHZhciBqID0gMDsgaiA8IG51bVVuaWZvcm1zOyArK2opIHtcbiAgICB1TmFtZSAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGopLm5hbWVcbiAgICB1bmlmb3Jtc1t1TmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgdU5hbWUpXG4gIH1cblxuICB0aGlzLnByb2dyYW0gICAgPSBwcm9ncmFtXG4gIHRoaXMudW5pZm9ybXMgICA9IHVuaWZvcm1zXG4gIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcbn1cblxuLy9HTENvbnRleHQgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBFaXRoZXIgRXJyb3IgfCBHTFByb2dyYW1cbkdMUHJvZ3JhbS5mcm9tU291cmNlID0gZnVuY3Rpb24gKGdsLCB2U3JjLCBmU3JjKSB7XG4gIHZhciB2U2hhZGVyID0gbmV3IEdMU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2U3JjKVxuICB2YXIgZlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmU3JjKVxuXG4gIHJldHVybiAoZWl0aGVySW5zdGFuY2VPZihFcnJvciwgdlNoYWRlciwgZlNoYWRlcikpXG4gICAgPyBjb21iaW5lRXJyb3JzKHZTaGFkZXIsIGZTaGFkZXIpXG4gICAgOiBuZXcgR0xQcm9ncmFtKGdsLCB2U2hhZGVyLCBmU2hhZGVyKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFNoYWRlclxuXG4vL0dMQ29udGV4dCAtPiBFbnVtIC0+IFN0cmluZyAtPiBFaXRoZXIgR0xTaGFkZXIgfCBFcnJvclxuZnVuY3Rpb24gR0xTaGFkZXIgKGdsLCB0eXBlLCBzcmMpIHtcbiAgdmFyIHNoYWRlciAgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSlcblxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICByZXR1cm4gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpXG4gICAgPyBzaGFkZXJcbiAgICA6IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpXG59XG4iLCJ2YXIgQ2xvY2sgICAgICAgICAgID0gcmVxdWlyZShcIi4vQ2xvY2tcIilcbnZhciByZXNpemVXaXRoUmF0aW8gPSByZXF1aXJlKFwiLi9kb20tdXRpbHNcIikucmVzaXplV2l0aFJhdGlvXG5cbm1vZHVsZS5leHBvcnRzID0gR0xTaGVsbFxuXG5mdW5jdGlvbiBHTFNoZWxsIChwYXJlbnROb2RlLCBhc3BlY3RSYXRpbykge1xuICB2YXIgY2FudmFzICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgdmFyIGdsICAgICAgICAgICAgICAgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpXG4gIHZhciBjbG9jayAgICAgICAgICAgID0gbmV3IENsb2NrXG4gIHZhciB0ZXh0dXJlVW5pdEluZGV4ID0gMFxuXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJhdGlvID0gdGhpcy5nbC5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmdsLmNhbnZhcy5jbGllbnRIZWlnaHRcblxuICAgIHJlc2l6ZVdpdGhSYXRpbyh0aGlzLmFzcGVjdFJhdGlvLCB0aGlzLnBhcmVudE5vZGUsIHRoaXMuZ2wuY2FudmFzKVxuICAgIHRoaXMucmVuZGVyKCkgXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgfS5iaW5kKHRoaXMpXG5cbiAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsb2NrLnRpY2soKVxuICAgIHRoaXMudXBkYXRlKHRoaXMuY2xvY2suZFQpIFxuICB9LmJpbmQodGhpcylcblxuICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGNhbnZhcylcbiAgdGhpcy5wYXJlbnROb2RlICA9IHBhcmVudE5vZGVcbiAgdGhpcy5nbCAgICAgICAgICA9IGdsXG4gIHRoaXMuYXNwZWN0UmF0aW8gPSBhc3BlY3RSYXRpb1xuICB0aGlzLmNsb2NrICAgICAgID0gY2xvY2tcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuZXh0VGV4dHVyZVVuaXRcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGV4dHVyZVVuaXRJbmRleCsrIH0gXG4gIH0pXG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcbiAgc2V0SW50ZXJ2YWwodXBkYXRlLCAyNSlcbn1cblxuR0xTaGVsbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAvL292ZXIgd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHJlbmRlciBmdW5jdGlvblxufVxuXG4vL2ZvciBjb252ZW5pZW5jZSwgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgaXMgcGFzc2VkIGFzIGEgcGFyYW1hdGVyXG5HTFNoZWxsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcbiAgLy9vdmVyd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHVwZGF0ZSBmdW5jdGlvblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBHUFVFbWl0dGVyXG5cbnZhciBQQVJUSUNMRV9TVFJJREUgPSA0XG5cbmZ1bmN0aW9uIEdQVUVtaXR0ZXIgKGdsU2hlbGwsIE1BWF9DT1VOVCwgeCwgeSwgeikge1xuICBpZiAoIWdsU2hlbGwuZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIikpIHRocm93IG5ldyBFcnJvcihcIm5vIGZsb2F0IHRleHR1cmVzXCIpXG5cbiAgdmFyIGdsICAgICAgICAgICAgID0gZ2xTaGVsbC5nbFxuICB2YXIgUk9XX1NJWkUgICAgICAgPSBjYWxjdWxhdGVSb3dTaXplKDEsIE1BWF9DT1VOVClcbiAgdmFyIENPVU5UICAgICAgICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxuICB2YXIgcG9zaXRpb25zICAgICAgPSBpbml0aWFsaXplUGFydGljbGVYWVooeCwgeSwgeiwgbmV3IEZsb2F0MzJBcnJheSg0ICogQ09VTlQpKVxuICB2YXIgdmVsb2NpdGllcyAgICAgPSBuZXcgRmxvYXQzMkFycmF5KDQgKiBDT1VOVClcblxuICB2YXIgcG9zVGV4dHVyZTEgICAgPSBjb25maWd1cmVUZXh0dXJlKGdsU2hlbGwsIFJPV19TSVpFLCBST1dfU0laRSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLCBnbC5jcmVhdGVUZXh0dXJlKCkpXG4gIHZhciBwb3NUZXh0dXJlMiAgICA9IGNvbmZpZ3VyZVRleHR1cmUoZ2xTaGVsbCwgUk9XX1NJWkUsIFJPV19TSVpFLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnMsIGdsLmNyZWF0ZVRleHR1cmUoKSlcbiAgdmFyIHZlbFRleHR1cmUxICAgID0gY29uZmlndXJlVGV4dHVyZShnbFNoZWxsLCBST1dfU0laRSwgUk9XX1NJWkUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbG9jaXRpZXMsIGdsLmNyZWF0ZVRleHR1cmUoKSlcbiAgdmFyIHZlbFRleHR1cmUyICAgID0gY29uZmlndXJlVGV4dHVyZShnbFNoZWxsLCBST1dfU0laRSwgUk9XX1NJWkUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlbG9jaXRpZXMsIGdsLmNyZWF0ZVRleHR1cmUoKSlcbiAgdmFyIHBhcnRpY2xlQ29vcmRzID0gYnVpbGRQYXJ0aWNsZUNvb3JkcyhST1dfU0laRSwgUk9XX1NJWkUpXG4gIHZhciBjb29yZEJ1ZmZlciAgICA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG5cbiAgY29uc29sZS5sb2cocGFydGljbGVDb29yZHMpXG5cbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGNvb3JkQnVmZmVyKVxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcGFydGljbGVDb29yZHMsIGdsLlNUQVRJQ19EUkFXKVxuXG4gIHRoaXMubGl2aW5nSW5kZXggID0gNFxuICB0aGlzLndpZHRoICAgICAgICA9IFJPV19TSVpFXG4gIHRoaXMuaGVpZ2h0ICAgICAgID0gUk9XX1NJWkVcbiAgdGhpcy5wb3NUZXh0dXJlcyAgPSBbcG9zVGV4dHVyZTEsIHBvc1RleHR1cmUyXVxuICB0aGlzLnZlbFRleHR1cmVzICA9IFt2ZWxUZXh0dXJlMSwgdmVsVGV4dHVyZTJdXG4gIHRoaXMucmVhZEluZGV4ICAgID0gMFxuICB0aGlzLmNvb3JkQnVmZmVyICA9IGNvb3JkQnVmZmVyXG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVJvd1NpemUgKHZhbCwgdGFyZ2V0KSB7XG4gIHdoaWxlICggdmFsICogdmFsIDwgdGFyZ2V0ICkge1xuICAgIHZhbCsrIFxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuZnVuY3Rpb24gYnVpbGRQYXJ0aWNsZUNvb3JkcyAod2lkdGgsIGhlaWdodCkge1xuICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogMiAqIGhlaWdodClcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDJdICAgICA9IFtpIC8gd2lkdGhdXG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDIgKyAxXSA9IFtqIC8gaGVpZ2h0XVxuICAgIH0gXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmZ1bmN0aW9uIHNldFBhcnRpY2xlWFlaIChpbmRleCwgeCwgeSwgeiwgYXJyYXkpIHtcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXhdICAgICA9IHhcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAxXSA9IHlcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAyXSA9IHpcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAzXSA9IDFcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaICh4LCB5LCB6LCBhcnJheSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAvIFBBUlRJQ0xFX1NUUklERTsgaSsrKSB7XG4gICAgc2V0UGFydGljbGVYWVooaSwgeCArIE1hdGgucmFuZG9tKCksIHkgKyBNYXRoLnJhbmRvbSgpLCB6LCBhcnJheSlcbiAgfVxuICByZXR1cm4gYXJyYXlcbn1cblxuLy9UT0RPOiB0aGlzIGlzIGdyb3NzLiAgd2UgYXJlIGF0dGFjaGluZyBhbiBhZGRpdGlvbmFsIHBhcmFtZXRlciB0byB0aGUgaGFuZGxlXG4vL3RoYXQgd2UgZG9uJ3Qgb3duIGJlY2F1c2UgcmVhc29ucy4gIHByb2JhYmx5IHNob3VsZCBjcmVhdGUgd3JhcHBlciBvYmplY3RcbmZ1bmN0aW9uIGNvbmZpZ3VyZVRleHR1cmUgKGdsU2hlbGwsIHdpZHRoLCBoZWlnaHQsIGRhdGEsIHRleHR1cmUpIHtcbiAgdmFyIGdsICAgICAgICAgID0gZ2xTaGVsbC5nbFxuICB2YXIgdGV4dHVyZVVuaXQgPSBnbFNoZWxsLm5leHRUZXh0dXJlVW5pdFxuXG4gIHRleHR1cmUudW5pdCA9IHRleHR1cmVVbml0XG4gIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyB0ZXh0dXJlVW5pdClcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxuICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIFxuICAgICAgICAgICAgICAgIHdpZHRoLCBoZWlnaHQsIFxuICAgICAgICAgICAgICAgIDAsIGdsLlJHQkEsIGdsLkZMT0FULCBkYXRhKVxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKVxuICByZXR1cm4gdGV4dHVyZVxufVxuXG5mdW5jdGlvbiBjb25maWd1cmVGcmFtZUJ1ZmZlciAoZ2wsIHRleHR1cmUsIGZyYW1lQnVmZmVyKSB7XG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZnJhbWVCdWZmZXIpXG4gIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGdsLkZSQU1FQlVGRkVSLCBnbC5DT0xPUl9BVFRBQ0hNRU5UMCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdsLlRFWFRVUkVfMkQsIHRleHR1cmUsIDApIFxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpXG4gIHJldHVybiBmcmFtZUJ1ZmZlclxufVxuXG4iLCJcbnZhciBHTFByb2dyYW0gID0gcmVxdWlyZShcIi4vR0xQcm9ncmFtXCIpXG52YXIgU2NyZWVuUXVhZCA9IHJlcXVpcmUoXCIuL1NjcmVlblF1YWRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHUFVQYXJ0aWNsZVN5c3RlbVxuXG52YXIgdmVsb2NpdHlWU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHNjcmVlbkNvb3JkO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoc2NyZWVuQ29vcmQsIDAuMCwgMS4wKTtcXG59XFxuXCJcbnZhciB2ZWxvY2l0eUZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuXFxudW5pZm9ybSBmbG9hdCBkVDtcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgdmVjMiB0ZXh0dXJlSW5kZXggPSBnbF9GcmFnQ29vcmQueHkgLyB2aWV3cG9ydDtcXG4gIHZlYzMgdmVsb2NpdHkgICAgID0gdGV4dHVyZTJEKHZlbG9jaXRpZXMsIHRleHR1cmVJbmRleCkueHl6O1xcblxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjAgKiBkVCArIHZlbG9jaXR5LCAxLjApO1xcbn1cXG5cIlxudmFyIHBvc2l0aW9uVlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBzY3JlZW5Db29yZDtcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHNjcmVlbkNvb3JkLCAwLjAsIDEuMCk7XFxufVxcblwiXG52YXIgcG9zaXRpb25GU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnVuaWZvcm0gZmxvYXQgZFQ7XFxudW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1xcbnVuaWZvcm0gc2FtcGxlcjJEIHZlbG9jaXRpZXM7XFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxuICB2ZWMzIHBvc2l0aW9uICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHRleHR1cmVJbmRleCkueHl6O1xcblxcbiAgZ2xfRnJhZ0NvbG9yICA9IHZlYzQoKGRUICogdmVsb2NpdHkpICsgcG9zaXRpb24sIDEuMCk7XFxufVxcblwiXG52YXIgcmVuZGVyVlNyYyAgID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHBhcnRpY2xlQ29vcmQ7XFxuXFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICAvL1RPRE86IHdlIHNob3VsZCBwcm9iYWJseSBpbXBsZW1lbnQgc29tZSBraW5kIG9mIHBlcnNwZWN0aXZlIHNoaXQgaGVyZSBhcyB3ZWxsXFxuICB2ZWMzIHBvcyAgICAgPSB0ZXh0dXJlMkQocG9zaXRpb25zLCBwYXJ0aWNsZUNvb3JkKS54eXo7XFxuICBnbF9Qb3NpdGlvbiAgPSB2ZWM0KHBvcywgMS4wKTtcXG4gIGdsX1BvaW50U2l6ZSA9IDEyLjA7XFxufVxcblwiXG52YXIgcmVuZGVyRlNyYyAgID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnZvaWQgbWFpbiAoKSB7XFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDAuNSwgMC41LCAwLjUsIDAuNik7XFxufSBcXG5cIlxuXG5mdW5jdGlvbiBHUFVQYXJ0aWNsZVN5c3RlbSAoZ2wpIHtcbiAgdmFyIHZlbG9jaXR5UHJvZ3JhbSA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgdmVsb2NpdHlWU3JjLCB2ZWxvY2l0eUZTcmMpXG4gIHZhciBwb3NpdGlvblByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHBvc2l0aW9uVlNyYywgcG9zaXRpb25GU3JjKVxuICB2YXIgcmVuZGVyUHJvZ3JhbSAgID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCByZW5kZXJWU3JjLCByZW5kZXJGU3JjKVxuICB2YXIgcG9zaXRpb25CdWZmZXIgID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKVxuICB2YXIgdmVsb2NpdHlCdWZmZXIgID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKVxuICB2YXIgc2NyZWVuUXVhZCAgICAgID0gbmV3IFNjcmVlblF1YWRcbiAgdmFyIHNjcmVlbkJ1ZmZlciAgICA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG5cbiAgaWYgKHZlbG9jaXR5UHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSBjb25zb2xlLmxvZyh2ZWxvY2l0eVByb2dyYW0pXG4gIGlmIChwb3NpdGlvblByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgY29uc29sZS5sb2cocG9zaXRpb25Qcm9ncmFtKVxuICBpZiAocmVuZGVyUHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSAgIGNvbnNvbGUubG9nKHJlbmRlclByb2dyYW0pXG5cbiAgLy9iaW5kIGZ1bGwgc2NyZWVuIHF1YWQgY29vcmQgYnVmZmVyIGZvciBib3RoIHZlbG9jaXR5IGFuZCBwb3NpdGlvbiBwcm9nXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBzY3JlZW5CdWZmZXIpXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBzY3JlZW5RdWFkLCBnbC5TVEFUSUNfRFJBVylcblxuICBnbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApXG5cbiAgLy9lbmFibGUgYXR0cmlidXRlIGFycmF5cyBmb3IgYWxsIHByb2dyYW1zXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlbG9jaXR5UHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkKVxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXG5cbiAgdGhpcy5nbCAgICAgICAgICAgICAgPSBnbFxuICB0aGlzLnNjcmVlbkJ1ZmZlciAgICA9IHNjcmVlbkJ1ZmZlclxuICB0aGlzLnZlbG9jaXR5UHJvZ3JhbSA9IHZlbG9jaXR5UHJvZ3JhbVxuICB0aGlzLnBvc2l0aW9uUHJvZ3JhbSA9IHBvc2l0aW9uUHJvZ3JhbVxuICB0aGlzLnZlbG9jaXR5QnVmZmVyICA9IHZlbG9jaXR5QnVmZmVyXG4gIHRoaXMucG9zaXRpb25CdWZmZXIgID0gcG9zaXRpb25CdWZmZXJcbiAgdGhpcy5yZW5kZXJQcm9ncmFtICAgPSByZW5kZXJQcm9ncmFtXG59XG5cbi8qXG4gKlxuICoqL1xuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCwgZ3B1RW1pdHRlcnMpIHtcbiAgdmFyIGdsID0gdGhpcy5nbFxuICB2YXIgZW1pdHRlciBcbiAgdmFyIHJlYWRGcm9tSW5kZXhcbiAgdmFyIHdyaXRlVG9JbmRleFxuXG4gIGdsLnVzZVByb2dyYW0odGhpcy52ZWxvY2l0eVByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wudW5pZm9ybTFmKHRoaXMudmVsb2NpdHlQcm9ncmFtLnVuaWZvcm1zLmRULCBkVClcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLnZlbG9jaXR5QnVmZmVyKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy52ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZCwgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXG5cbiAgLy91cGRhdGUgdmVsb2NpdGllcyB1c2luZyBkcmF3Q2FsbCBmb3IgZWFjaCBlbWl0dGVyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBlbWl0dGVyICAgICAgID0gZ3B1RW1pdHRlcnNbaV1cbiAgICByZWFkRnJvbUluZGV4ID0gZW1pdHRlci5yZWFkSW5kZXhcbiAgICB3cml0ZVRvSW5kZXggID0gZW1pdHRlci5yZWFkSW5kZXggPT09IDAgPyAxIDogMFxuXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMudmVsb2NpdHlQcm9ncmFtLnVuaWZvcm1zLnZlbG9jaXRpZXMsIFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnZlbFRleHR1cmVzW3JlYWRGcm9tSW5kZXhdLnVuaXQpXG4gICAgZ2wudW5pZm9ybTJmKHRoaXMudmVsb2NpdHlQcm9ncmFtLnVuaWZvcm1zLnZpZXdwb3J0LCBcbiAgICAgICAgICAgICAgICAgZW1pdHRlci53aWR0aCwgZW1pdHRlci5oZWlnaHQpXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIudmVsVGV4dHVyZXNbd3JpdGVUb0luZGV4XSwgMClcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLndpZHRoLCBlbWl0dGVyLmhlaWdodClcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNilcbiAgfVxuXG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wudW5pZm9ybTFmKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLmRULCBkVClcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLnBvc2l0aW9uQnVmZmVyKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZCwgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXG5cbiAgLy91cGRhdGUgcG9zaXRpb25zIHVzaW5nIGRyYXdDYWxsIGZvciBlYWNoIGVtaXR0ZXJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBncHVFbWl0dGVycy5sZW5ndGg7IGorKykge1xuICAgIGVtaXR0ZXIgICAgICAgPSBncHVFbWl0dGVyc1tqXSBcbiAgICByZWFkRnJvbUluZGV4ID0gZW1pdHRlci5yZWFkSW5kZXhcbiAgICB3cml0ZVRvSW5kZXggID0gZW1pdHRlci5yZWFkSW5kZXggPT09IDAgPyAxIDogMFxuXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLnBvc2l0aW9ucywgXG4gICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUZXh0dXJlc1tyZWFkRnJvbUluZGV4XS51bml0KVxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXG4gICAgICAgICAgICAgICAgZW1pdHRlci53aWR0aCwgZW1pdHRlci5oZWlnaHQpXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUZXh0dXJlc1t3cml0ZVRvSW5kZXhdLCAwKVxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIGVtaXR0ZXIud2lkdGgsIGVtaXR0ZXIuaGVpZ2h0KVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KVxuICB9XG5cbiAgLy90b2dnbGUgYWxsIHJlYWRGcm9tIGluZGljZXMgXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBrKyspIHtcbiAgICBlbWl0dGVyICAgICAgICAgICA9IGdwdUVtaXR0ZXJzW2tdXG4gICAgZW1pdHRlci5yZWFkSW5kZXggPSBlbWl0dGVyLnJlYWRJbmRleCA9PT0gMCA/IDEgOiAwXG4gIH1cbn1cblxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChncHVFbWl0dGVycykge1xuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIHZhciBlbWl0dGVyXG5cbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVClcbiAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVyV2lkdGgsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlckhlaWdodClcbiAgZ2wuZW5hYmxlKGdsLkJMRU5EKVxuICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkUpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBncHVFbWl0dGVycy5sZW5ndGg7IGkrKykge1xuICAgIGVtaXR0ZXIgICAgICAgPSBncHVFbWl0dGVyc1tpXSBcbiAgICByZWFkRnJvbUluZGV4ID0gZW1pdHRlci5yZWFkSW5kZXhcblxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnJlbmRlclByb2dyYW0udW5pZm9ybXMucG9zaXRpb25zLFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc1RleHR1cmVzW3JlYWRGcm9tSW5kZXhdLnVuaXQpXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGVtaXR0ZXIuY29vcmRCdWZmZXIpXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkLCAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxuICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCBlbWl0dGVyLndpZHRoICogZW1pdHRlci5oZWlnaHQpXG4gICAgLy9nbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgMilcbiAgfVxuICBnbC5kaXNhYmxlKGdsLkJMRU5EKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTY3JlZW5RdWFkXG5cbmZ1bmN0aW9uIFNjcmVlblF1YWQgKCkge1xuICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgMSwgMSwgLTEsIDEsIC0xLCAtMSxcbiAgICAxLCAxLCAtMSwgLTEsIDEsIC0xXG4gIF0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cy5yZXNpemVXaXRoUmF0aW8gPSByZXNpemVXaXRoUmF0aW9cblxuZnVuY3Rpb24gcmVzaXplV2l0aFJhdGlvIChyYXRpbywgcmVmZXJlbmNlLCBzdWJqZWN0KSB7XG4gIHZhciB0YXJnZXRBc3BlY3QgPSByZWZlcmVuY2UuY2xpZW50V2lkdGggLyByZWZlcmVuY2UuY2xpZW50SGVpZ2h0XG4gIHZhciBuZXdXaWR0aCAgICAgPSByYXRpbyA8IHRhcmdldEFzcGVjdFxuICAgID8gfn4ocmVmZXJlbmNlLmNsaWVudEhlaWdodCAqIHJhdGlvKVxuICAgIDogcmVmZXJlbmNlLmNsaWVudFdpZHRoXG4gIHZhciBuZXdIZWlnaHQgICAgPSB+fihuZXdXaWR0aCAvIHJhdGlvKVxuICB2YXIgb2xkV2lkdGggICAgID0gc3ViamVjdC5jbGllbnRXaWR0aFxuICB2YXIgb2xkSGVpZ2h0ICAgID0gc3ViamVjdC5jbGllbnRIZWlnaHRcblxuICBpZiAob2xkV2lkdGggPT09IG5ld1dpZHRoICYmIG9sZEhlaWdodCA9PT0gbmV3SGVpZ2h0KSByZXR1cm5cbiAgc3ViamVjdC5jbGllbnRXaWR0aCAgPSBuZXdXaWR0aFxuICBzdWJqZWN0LmNsaWVudEhlaWdodCA9IG5ld0hlaWdodFxuICBzdWJqZWN0LndpZHRoICAgICAgICA9IG5ld1dpZHRoXG4gIHN1YmplY3QuaGVpZ2h0ICAgICAgID0gbmV3SGVpZ2h0XG59XG4iLCJ2YXIgR0xTaGVsbCAgICAgICAgICAgPSByZXF1aXJlKFwiLi9HTFNoZWxsXCIpXG52YXIgR1BVRW1pdHRlciAgICAgICAgPSByZXF1aXJlKFwiLi9HUFVFbWl0dGVyXCIpXG52YXIgR1BVUGFydGljbGVTeXN0ZW0gPSByZXF1aXJlKFwiLi9HUFVQYXJ0aWNsZVN5c3RlbVwiKVxuXG52YXIgc2hlbGwgICAgICAgICAgICAgPSBuZXcgR0xTaGVsbChkb2N1bWVudC5ib2R5LCAxOTIwIC8gMTA4MClcbnZhciBlbWl0dGVyICAgICAgICAgICA9IG5ldyBHUFVFbWl0dGVyKHNoZWxsLCAxMCwgMCwgMCwgMClcbnZhciBncHVQYXJ0aWNsZVN5c3RlbSA9IG5ldyBHUFVQYXJ0aWNsZVN5c3RlbShzaGVsbC5nbClcbnZhciBlbWl0dGVycyAgICAgICAgICA9IFtlbWl0dGVyXVxuXG53aW5kb3cuZW1pdHRlciA9IGVtaXR0ZXJcbndpbmRvdy5zaGVsbCAgID0gc2hlbGxcbndpbmRvdy5zeXN0ZW0gPSBncHVQYXJ0aWNsZVN5c3RlbVxuXG5zaGVsbC5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihlbWl0dGVycylcbn1cblxuc2hlbGwudXBkYXRlID0gZnVuY3Rpb24gKGRUKSB7XG4gIC8vZ3B1UGFydGljbGVTeXN0ZW0udXBkYXRlKGRULCBlbWl0dGVycylcbn1cbiJdfQ==
