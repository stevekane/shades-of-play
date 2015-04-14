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

},{"./Clock":1,"./dom-utils":10}],6:[function(require,module,exports){
module.exports = GLVideoTexture

function GLVideoTexture (gl) {
  var texture = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

},{}],7:[function(require,module,exports){
var GLRenderTarget = require("./GLRenderTarget")

module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

function GPUEmitter (gl, x, y, z, sourceTexture) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var ROW_SIZE       = 16
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

  this.posTargets    = [posTarget1, posTarget2]
  this.velTargets    = [velTarget1, velTarget2]
  this.coordBuffer   = coordBuffer
  this.aliveCount    = ROW_SIZE * ROW_SIZE
  this.sourceTexture = sourceTexture
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

},{"./GLRenderTarget":3}],8:[function(require,module,exports){

var GLProgram  = require("./GLProgram")
var ScreenQuad = require("./ScreenQuad")

module.exports = GPUParticleSystem

var velocityVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\r\n\r\nvoid main () {\r\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\r\n}\r\n"
var velocityFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\r\n\r\nuniform float dT;\r\nuniform vec2 viewport;\r\nuniform sampler2D velocities;\r\n\r\nvoid main () {\r\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\r\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\r\n\r\n  gl_FragColor = vec4(0.0 * dT + velocity, 1.0);\r\n}\r\n"
var positionVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\r\n\r\nvoid main () {\r\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\r\n}\r\n"
var positionFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\r\n\r\nuniform float dT;\r\nuniform vec2 viewport;\r\nuniform sampler2D velocities;\r\nuniform sampler2D positions;\r\n\r\n\r\nvoid main () {\r\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\r\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\r\n  vec3 position     = texture2D(positions, textureIndex).xyz;\r\n\r\n  gl_FragColor  = vec4((dT / 10.0 * velocity) + position, 1.0);\r\n}\r\n"
var renderVSrc   = "#define GLSLIFY 1\n\nattribute vec2 particleCoord;\r\n\r\nuniform sampler2D positions;\r\n\r\nvarying vec3 position;\r\n\r\nvoid main () {\r\n  vec3 pos     = texture2D(positions, particleCoord).xyz;\r\n\r\n  position     = pos;\r\n  gl_Position  = vec4(pos, 1.0);\r\n  gl_PointSize = 2.0;\r\n}\r\n"
var renderFSrc   = "#define GLSLIFY 1\n\nprecision mediump float;\r\n\r\nuniform sampler2D source;\r\n\r\nvarying vec3 position;\r\n\r\nvoid main () {\r\n  vec2 texturePos = vec2(position.x * 0.5 + 0.5, position.y * 0.5 + 0.5);\r\n  vec4 color      = texture2D(source, texturePos);\r\n\r\n  gl_FragColor = color;\r\n} \r\n"

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

    //NOTE: I have added some stuff about binding a source texture here
    gl.activeTexture(gl.TEXTURE0 + 10)
    gl.bindTexture(gl.TEXTURE_2D, emitter.sourceTexture)
    gl.uniform1i(this.renderProgram.uniforms.source, 10)

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

},{"./GLProgram":2,"./ScreenQuad":9}],9:[function(require,module,exports){
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
var GLVideoTexture    = require("./GLVideoTexture")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var vidTexture        = new GLVideoTexture(shell.gl)
var emitter           = new GPUEmitter(shell.gl, 0, 0, 0, vidTexture)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]
var videoEl           = document.getElementById("video")

videoEl.src   = "small.mp4"
videoEl.muted = true


shell.render = function () {
  var gl = this.gl

  //just a quick hack to ensure camera is ready
  if (videoEl.readyState === 4) {
    gl.activeTexture(gl.TEXTURE0 + 10)
    gl.bindTexture(gl.TEXTURE_2D, emitter.sourceTexture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                  gl.UNSIGNED_BYTE, videoEl)
    gpuParticleSystem.render(emitters)
  }
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, emitters)
}

},{"./GLShell":5,"./GLVideoTexture":6,"./GPUEmitter":7,"./GPUParticleSystem":8}]},{},[11])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMUmVuZGVyVGFyZ2V0LmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvR0xWaWRlb1RleHR1cmUuanMiLCJzcmMvR1BVRW1pdHRlci5qcyIsInNyYy9HUFVQYXJ0aWNsZVN5c3RlbS5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBDbG9ja1xyXG5cclxuZnVuY3Rpb24gQ2xvY2sgKCkge1xyXG4gIHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpXHJcbiAgdGhpcy50aGlzVGltZSA9IHRoaXMubGFzdFRpbWVcclxuICB0aGlzLmRUICAgICAgID0gdGhpcy50aGlzVGltZSAtIHRoaXMubGFzdFRpbWVcclxufVxyXG5cclxuQ2xvY2sucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5sYXN0VGltZSA9IHRoaXMudGhpc1RpbWVcclxuICB0aGlzLnRoaXNUaW1lID0gRGF0ZS5ub3coKVxyXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxyXG59XHJcbiIsInZhciBHTFNoYWRlciA9IHJlcXVpcmUoXCIuL0dMU2hhZGVyXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbVxyXG5cclxuZnVuY3Rpb24gZWl0aGVySW5zdGFuY2VPZiAoY3RvciwgdjEsIHYyKSB7XHJcbiAgcmV0dXJuICgodjEgaW5zdGFuY2VvZiBjdG9yKSB8fCAodjIgaW5zdGFuY2VvZiBjdG9yKSkgPyB0cnVlIDogZmFsc2VcclxufVxyXG5cclxuZnVuY3Rpb24gY29tYmluZUVycm9ycyAodjEsIHYyKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcigodjEubWVzc2FnZSB8fCBcIlwiKSArIFwiXFxuXCIgKyAodjIubWVzc2FnZSB8fCBcIlwiKSlcclxufVxyXG5cclxuZnVuY3Rpb24gR0xQcm9ncmFtIChnbCwgdnMsIGZzKSB7XHJcbiAgdmFyIHByb2dyYW0gICAgICAgPSBnbC5jcmVhdGVQcm9ncmFtKHZzLCBmcylcclxuICB2YXIgYXR0cmlidXRlcyAgICA9IHt9XHJcbiAgdmFyIHVuaWZvcm1zICAgICAgPSB7fVxyXG4gIHZhciBudW1BdHRyaWJ1dGVzXHJcbiAgdmFyIG51bVVuaWZvcm1zXHJcbiAgdmFyIGFOYW1lXHJcbiAgdmFyIHVOYW1lXHJcblxyXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cylcclxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpXHJcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcclxuXHJcbiAgbnVtQXR0cmlidXRlcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpXHJcbiAgbnVtVW5pZm9ybXMgICA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUF0dHJpYnV0ZXM7ICsraSkge1xyXG4gICAgYU5hbWUgICAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSkubmFtZVxyXG4gICAgYXR0cmlidXRlc1thTmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhTmFtZSlcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZXNbYU5hbWVdKVxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1Vbmlmb3JtczsgKytqKSB7XHJcbiAgICB1TmFtZSAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGopLm5hbWVcclxuICAgIHVuaWZvcm1zW3VOYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1TmFtZSlcclxuICB9XHJcblxyXG4gIHRoaXMucHJvZ3JhbSAgICA9IHByb2dyYW1cclxuICB0aGlzLnVuaWZvcm1zICAgPSB1bmlmb3Jtc1xyXG4gIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcclxufVxyXG5cclxuLy9HTENvbnRleHQgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBFaXRoZXIgRXJyb3IgfCBHTFByb2dyYW1cclxuR0xQcm9ncmFtLmZyb21Tb3VyY2UgPSBmdW5jdGlvbiAoZ2wsIHZTcmMsIGZTcmMpIHtcclxuICB2YXIgdlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdlNyYylcclxuICB2YXIgZlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmU3JjKVxyXG5cclxuICByZXR1cm4gKGVpdGhlckluc3RhbmNlT2YoRXJyb3IsIHZTaGFkZXIsIGZTaGFkZXIpKVxyXG4gICAgPyBjb21iaW5lRXJyb3JzKHZTaGFkZXIsIGZTaGFkZXIpXHJcbiAgICA6IG5ldyBHTFByb2dyYW0oZ2wsIHZTaGFkZXIsIGZTaGFkZXIpXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFJlbmRlclRhcmdldFxyXG5cclxuZnVuY3Rpb24gR0xSZW5kZXJUYXJnZXQgKGdsLCB3aWR0aCwgaGVpZ2h0LCBkYXRhKSB7XHJcbiAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKClcclxuICB2YXIgaGFuZGxlICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcclxuXHJcbiAgLy9jb25maWd1cmUgdGhlIHRleHR1cmUgYW5kIHVwbG9hZCB0aGUgZGF0YVxyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpXHJcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSlcclxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxyXG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgd2lkdGgsIGhlaWdodCwgMCwgZ2wuUkdCQSwgZ2wuRkxPQVQsIGRhdGEpXHJcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcclxuXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBoYW5kbGUpXHJcbiAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUsIDApXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG5cclxuICB0aGlzLmhhbmRsZSAgPSBoYW5kbGVcclxuICB0aGlzLndpZHRoICAgPSB3aWR0aFxyXG4gIHRoaXMuaGVpZ2h0ICA9IGhlaWdodFxyXG4gIHRoaXMudGV4dHVyZSA9IHRleHR1cmVcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdMU2hhZGVyXHJcblxyXG4vL0dMQ29udGV4dCAtPiBFbnVtIC0+IFN0cmluZyAtPiBFaXRoZXIgR0xTaGFkZXIgfCBFcnJvclxyXG5mdW5jdGlvbiBHTFNoYWRlciAoZ2wsIHR5cGUsIHNyYykge1xyXG4gIHZhciBzaGFkZXIgID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpXHJcblxyXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNyYylcclxuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcclxuICByZXR1cm4gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpXHJcbiAgICA/IHNoYWRlclxyXG4gICAgOiBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKVxyXG59XHJcbiIsInZhciBDbG9jayAgICAgICAgICAgPSByZXF1aXJlKFwiLi9DbG9ja1wiKVxyXG52YXIgcmVzaXplV2l0aFJhdGlvID0gcmVxdWlyZShcIi4vZG9tLXV0aWxzXCIpLnJlc2l6ZVdpdGhSYXRpb1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHTFNoZWxsXHJcblxyXG5mdW5jdGlvbiBHTFNoZWxsIChwYXJlbnROb2RlLCBhc3BlY3RSYXRpbykge1xyXG4gIHZhciBjYW52YXMgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxyXG4gIHZhciBnbCAgICAgICAgICAgICAgID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiKVxyXG4gIHZhciBjbG9jayAgICAgICAgICAgID0gbmV3IENsb2NrXHJcblxyXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcmF0aW8gPSB0aGlzLmdsLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuZ2wuY2FudmFzLmNsaWVudEhlaWdodFxyXG5cclxuICAgIHJlc2l6ZVdpdGhSYXRpbyh0aGlzLmFzcGVjdFJhdGlvLCB0aGlzLnBhcmVudE5vZGUsIHRoaXMuZ2wuY2FudmFzKVxyXG4gICAgdGhpcy5yZW5kZXIoKSBcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXHJcbiAgfS5iaW5kKHRoaXMpXHJcblxyXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNsb2NrLnRpY2soKVxyXG4gICAgdGhpcy51cGRhdGUodGhpcy5jbG9jay5kVCkgXHJcbiAgfS5iaW5kKHRoaXMpXHJcblxyXG4gIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY2FudmFzKVxyXG4gIHRoaXMucGFyZW50Tm9kZSAgPSBwYXJlbnROb2RlXHJcbiAgdGhpcy5nbCAgICAgICAgICA9IGdsXHJcbiAgdGhpcy5hc3BlY3RSYXRpbyA9IGFzcGVjdFJhdGlvXHJcbiAgdGhpcy5jbG9jayAgICAgICA9IGNsb2NrXHJcblxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXHJcbiAgc2V0SW50ZXJ2YWwodXBkYXRlLCAyNSlcclxufVxyXG5cclxuR0xTaGVsbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vb3ZlciB3cml0ZSB0aGlzIHdpdGggeW91ciBvd24gcmVuZGVyIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vZm9yIGNvbnZlbmllbmNlLCB0aGUgdGltZSBzaW5jZSBsYXN0IHVwZGF0ZSBpcyBwYXNzZWQgYXMgYSBwYXJhbWF0ZXJcclxuR0xTaGVsbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRUKSB7XHJcbiAgLy9vdmVyd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHVwZGF0ZSBmdW5jdGlvblxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gR0xWaWRlb1RleHR1cmVcclxuXHJcbmZ1bmN0aW9uIEdMVmlkZW9UZXh0dXJlIChnbCkge1xyXG4gIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpXHJcblxyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpXHJcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUilcclxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpXHJcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSlcclxuICByZXR1cm4gdGV4dHVyZVxyXG59XHJcbiIsInZhciBHTFJlbmRlclRhcmdldCA9IHJlcXVpcmUoXCIuL0dMUmVuZGVyVGFyZ2V0XCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdQVUVtaXR0ZXJcclxuXHJcbnZhciBQQVJUSUNMRV9TVFJJREUgPSA0XHJcblxyXG5mdW5jdGlvbiBHUFVFbWl0dGVyIChnbCwgeCwgeSwgeiwgc291cmNlVGV4dHVyZSkge1xyXG4gIGlmICghZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIikpIHRocm93IG5ldyBFcnJvcihcIm5vIGZsb2F0IHRleHR1cmVzXCIpXHJcblxyXG4gIHZhciBST1dfU0laRSAgICAgICA9IDE2XHJcbiAgdmFyIENPVU5UICAgICAgICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxyXG4gIHZhciBwb3NpdGlvbnMgICAgICA9IGluaXRpYWxpemVQYXJ0aWNsZVhZWih4LCB5LCB6LCBuZXcgRmxvYXQzMkFycmF5KDQgKiBDT1VOVCkpXHJcbiAgdmFyIHZlbG9jaXRpZXMgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKHgsIHksIHosIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcclxuICB2YXIgcG9zVGFyZ2V0MSAgICAgPSBuZXcgR0xSZW5kZXJUYXJnZXQoZ2wsIFJPV19TSVpFLCBST1dfU0laRSwgcG9zaXRpb25zKVxyXG4gIHZhciBwb3NUYXJnZXQyICAgICA9IG5ldyBHTFJlbmRlclRhcmdldChnbCwgUk9XX1NJWkUsIFJPV19TSVpFLCBwb3NpdGlvbnMpXHJcbiAgdmFyIHZlbFRhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXHJcbiAgdmFyIHZlbFRhcmdldDIgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXHJcbiAgdmFyIHBhcnRpY2xlQ29vcmRzID0gYnVpbGRQYXJ0aWNsZUNvb3JkcyhST1dfU0laRSwgUk9XX1NJWkUpXHJcbiAgdmFyIGNvb3JkQnVmZmVyICAgID0gZ2wuY3JlYXRlQnVmZmVyKClcclxuXHJcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGNvb3JkQnVmZmVyKVxyXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZUNvb3JkcywgZ2wuU1RBVElDX0RSQVcpXHJcblxyXG4gIHRoaXMucG9zVGFyZ2V0cyAgICA9IFtwb3NUYXJnZXQxLCBwb3NUYXJnZXQyXVxyXG4gIHRoaXMudmVsVGFyZ2V0cyAgICA9IFt2ZWxUYXJnZXQxLCB2ZWxUYXJnZXQyXVxyXG4gIHRoaXMuY29vcmRCdWZmZXIgICA9IGNvb3JkQnVmZmVyXHJcbiAgdGhpcy5hbGl2ZUNvdW50ICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxyXG4gIHRoaXMuc291cmNlVGV4dHVyZSA9IHNvdXJjZVRleHR1cmVcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRQYXJ0aWNsZUNvb3JkcyAod2lkdGgsIGhlaWdodCkge1xyXG4gIHZhciBhcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkod2lkdGggKiAyICogaGVpZ2h0KVxyXG5cclxuICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcclxuICAgICAgYXJyYXlbaiAqIDIgKiB3aWR0aCArIGkgKiAyXSAgICAgPSBbaSAvIHdpZHRoXVxyXG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDIgKyAxXSA9IFtqIC8gaGVpZ2h0XVxyXG4gICAgfSBcclxuICB9XHJcbiAgcmV0dXJuIGFycmF5XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFBhcnRpY2xlWFlaIChpbmRleCwgeCwgeSwgeiwgYXJyYXkpIHtcclxuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleF0gICAgID0geFxyXG4gIGFycmF5W1BBUlRJQ0xFX1NUUklERSAqIGluZGV4ICsgMV0gPSB5XHJcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAyXSA9IHpcclxuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleCArIDNdID0gMVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplUGFydGljbGVYWVogKHgsIHksIHosIGFycmF5KSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLyBQQVJUSUNMRV9TVFJJREU7IGkrKykge1xyXG4gICAgc2V0UGFydGljbGVYWVooaSwgeCArIE1hdGgucmFuZG9tKCkgLSAuNSwgeSArIE1hdGgucmFuZG9tKCkgLSAuNSwgeiwgYXJyYXkpXHJcbiAgfVxyXG4gIHJldHVybiBhcnJheVxyXG59XHJcbiIsIlxyXG52YXIgR0xQcm9ncmFtICA9IHJlcXVpcmUoXCIuL0dMUHJvZ3JhbVwiKVxyXG52YXIgU2NyZWVuUXVhZCA9IHJlcXVpcmUoXCIuL1NjcmVlblF1YWRcIilcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR1BVUGFydGljbGVTeXN0ZW1cclxuXHJcbnZhciB2ZWxvY2l0eVZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIHZlYzIgc2NyZWVuQ29vcmQ7XFxyXFxuXFxyXFxudm9pZCBtYWluICgpIHtcXHJcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChzY3JlZW5Db29yZCwgMC4wLCAxLjApO1xcclxcbn1cXHJcXG5cIlxyXG52YXIgdmVsb2NpdHlGU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcclxcblxcclxcbnVuaWZvcm0gZmxvYXQgZFQ7XFxyXFxudW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHZlbG9jaXRpZXM7XFxyXFxuXFxyXFxudm9pZCBtYWluICgpIHtcXHJcXG4gIHZlYzIgdGV4dHVyZUluZGV4ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdmlld3BvcnQ7XFxyXFxuICB2ZWMzIHZlbG9jaXR5ICAgICA9IHRleHR1cmUyRCh2ZWxvY2l0aWVzLCB0ZXh0dXJlSW5kZXgpLnh5ejtcXHJcXG5cXHJcXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoMC4wICogZFQgKyB2ZWxvY2l0eSwgMS4wKTtcXHJcXG59XFxyXFxuXCJcclxudmFyIHBvc2l0aW9uVlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBzY3JlZW5Db29yZDtcXHJcXG5cXHJcXG52b2lkIG1haW4gKCkge1xcclxcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHNjcmVlbkNvb3JkLCAwLjAsIDEuMCk7XFxyXFxufVxcclxcblwiXHJcbnZhciBwb3NpdGlvbkZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxyXFxuXFxyXFxudW5pZm9ybSBmbG9hdCBkVDtcXHJcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCBwb3NpdGlvbnM7XFxyXFxuXFxyXFxuXFxyXFxudm9pZCBtYWluICgpIHtcXHJcXG4gIHZlYzIgdGV4dHVyZUluZGV4ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdmlld3BvcnQ7XFxyXFxuICB2ZWMzIHZlbG9jaXR5ICAgICA9IHRleHR1cmUyRCh2ZWxvY2l0aWVzLCB0ZXh0dXJlSW5kZXgpLnh5ejtcXHJcXG4gIHZlYzMgcG9zaXRpb24gICAgID0gdGV4dHVyZTJEKHBvc2l0aW9ucywgdGV4dHVyZUluZGV4KS54eXo7XFxyXFxuXFxyXFxuICBnbF9GcmFnQ29sb3IgID0gdmVjNCgoZFQgLyAxMC4wICogdmVsb2NpdHkpICsgcG9zaXRpb24sIDEuMCk7XFxyXFxufVxcclxcblwiXHJcbnZhciByZW5kZXJWU3JjICAgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIHZlYzIgcGFydGljbGVDb29yZDtcXHJcXG5cXHJcXG51bmlmb3JtIHNhbXBsZXIyRCBwb3NpdGlvbnM7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMzIHBvc2l0aW9uO1xcclxcblxcclxcbnZvaWQgbWFpbiAoKSB7XFxyXFxuICB2ZWMzIHBvcyAgICAgPSB0ZXh0dXJlMkQocG9zaXRpb25zLCBwYXJ0aWNsZUNvb3JkKS54eXo7XFxyXFxuXFxyXFxuICBwb3NpdGlvbiAgICAgPSBwb3M7XFxyXFxuICBnbF9Qb3NpdGlvbiAgPSB2ZWM0KHBvcywgMS4wKTtcXHJcXG4gIGdsX1BvaW50U2l6ZSA9IDIuMDtcXHJcXG59XFxyXFxuXCJcclxudmFyIHJlbmRlckZTcmMgICA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXHJcXG5cXHJcXG51bmlmb3JtIHNhbXBsZXIyRCBzb3VyY2U7XFxyXFxuXFxyXFxudmFyeWluZyB2ZWMzIHBvc2l0aW9uO1xcclxcblxcclxcbnZvaWQgbWFpbiAoKSB7XFxyXFxuICB2ZWMyIHRleHR1cmVQb3MgPSB2ZWMyKHBvc2l0aW9uLnggKiAwLjUgKyAwLjUsIHBvc2l0aW9uLnkgKiAwLjUgKyAwLjUpO1xcclxcbiAgdmVjNCBjb2xvciAgICAgID0gdGV4dHVyZTJEKHNvdXJjZSwgdGV4dHVyZVBvcyk7XFxyXFxuXFxyXFxuICBnbF9GcmFnQ29sb3IgPSBjb2xvcjtcXHJcXG59IFxcclxcblwiXHJcblxyXG5mdW5jdGlvbiBHUFVQYXJ0aWNsZVN5c3RlbSAoZ2wpIHtcclxuICB2YXIgdmVsb2NpdHlQcm9ncmFtID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCB2ZWxvY2l0eVZTcmMsIHZlbG9jaXR5RlNyYylcclxuICB2YXIgcG9zaXRpb25Qcm9ncmFtID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCBwb3NpdGlvblZTcmMsIHBvc2l0aW9uRlNyYylcclxuICB2YXIgcmVuZGVyUHJvZ3JhbSAgID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCByZW5kZXJWU3JjLCByZW5kZXJGU3JjKVxyXG4gIHZhciBzY3JlZW5RdWFkICAgICAgPSBuZXcgU2NyZWVuUXVhZFxyXG4gIHZhciBzY3JlZW5CdWZmZXIgICAgPSBnbC5jcmVhdGVCdWZmZXIoKVxyXG5cclxuICBpZiAodmVsb2NpdHlQcm9ncmFtIGluc3RhbmNlb2YgRXJyb3IpIGNvbnNvbGUubG9nKHZlbG9jaXR5UHJvZ3JhbSlcclxuICBpZiAocG9zaXRpb25Qcm9ncmFtIGluc3RhbmNlb2YgRXJyb3IpIGNvbnNvbGUubG9nKHBvc2l0aW9uUHJvZ3JhbSlcclxuICBpZiAocmVuZGVyUHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSAgIGNvbnNvbGUubG9nKHJlbmRlclByb2dyYW0pXHJcblxyXG4gIC8vYnVmZmVyIGZ1bGwgc2NyZWVuIHF1YWQgY29vcmQgZm9yIGJvdGggdmVsb2NpdHkgYW5kIHBvc2l0aW9uIHByb2dcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuQnVmZmVyKVxyXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBzY3JlZW5RdWFkLCBnbC5TVEFUSUNfRFJBVylcclxuXHJcbiAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKVxyXG5cclxuICAvL2VuYWJsZSBhdHRyaWJ1dGUgYXJyYXlzIGZvciBhbGwgcHJvZ3JhbXNcclxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcclxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcclxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShyZW5kZXJQcm9ncmFtLmF0dHJpYnV0ZXMucGFydGljbGVDb29yZClcclxuXHJcbiAgdGhpcy5nbCAgICAgICAgICAgICAgPSBnbFxyXG4gIHRoaXMuc2NyZWVuQnVmZmVyICAgID0gc2NyZWVuQnVmZmVyXHJcbiAgdGhpcy52ZWxvY2l0eVByb2dyYW0gPSB2ZWxvY2l0eVByb2dyYW1cclxuICB0aGlzLnBvc2l0aW9uUHJvZ3JhbSA9IHBvc2l0aW9uUHJvZ3JhbVxyXG4gIHRoaXMucmVuZGVyUHJvZ3JhbSAgID0gcmVuZGVyUHJvZ3JhbVxyXG59XHJcblxyXG5cclxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCwgZ3B1RW1pdHRlcnMpIHtcclxuICB2YXIgZ2wgICAgICAgID0gdGhpcy5nbFxyXG4gIHZhciBkVFNlY29uZHMgPSBkVCAvIDEwMDBcclxuICB2YXIgZW1pdHRlciBcclxuICB2YXIgdG1wQnVmXHJcblxyXG4gIGdsLnVzZVByb2dyYW0odGhpcy52ZWxvY2l0eVByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC5lbmFibGUoZ2wuQkxFTkQpXHJcbiAgZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuWkVSTylcclxuICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpXHJcbiAgZ2wuZGVwdGhNYXNrKGZhbHNlKVxyXG4gIGdsLnVuaWZvcm0xZih0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy5kVCwgZFRTZWNvbmRzKVxyXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNjcmVlbkJ1ZmZlcilcclxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkKVxyXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy52ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tpXVxyXG5cclxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZW1pdHRlci52ZWxUYXJnZXRzWzFdLmhhbmRsZSkgXHJcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0ud2lkdGgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLmhlaWdodClcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZW1pdHRlci52ZWxUYXJnZXRzWzBdLnRleHR1cmUpXHJcbiAgICBnbC51bmlmb3JtMWkodGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXMudmVsb2NpdGllcywgMClcclxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnZlbFRhcmdldHNbMV0uaGVpZ2h0KVxyXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpXHJcblxyXG4gICAgdG1wQnVmICAgICAgICAgICAgICAgID0gZW1pdHRlci52ZWxUYXJnZXRzWzBdXHJcbiAgICBlbWl0dGVyLnZlbFRhcmdldHNbMF0gPSBlbWl0dGVyLnZlbFRhcmdldHNbMV1cclxuICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxyXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG4gIH1cclxuXHJcbiAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMudmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcblxyXG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC51bmlmb3JtMWYodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMuZFQsIGRUU2Vjb25kcylcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcclxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxyXG5cclxuICBmb3IgKHZhciBqID0gMDsgaiA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbal1cclxuXHJcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oYW5kbGUpIFxyXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oZWlnaHQpXHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKVxyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIudmVsVGFyZ2V0c1swXS50ZXh0dXJlKVxyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIDEpXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnBvc1RhcmdldHNbMF0udGV4dHVyZSlcclxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52ZWxvY2l0aWVzLCAwKVxyXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLnBvc2l0aW9ucywgMSlcclxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc1RhcmdldHNbMV0uaGVpZ2h0KVxyXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpXHJcblxyXG4gICAgdG1wQnVmICAgICAgICAgICAgICAgID0gZW1pdHRlci5wb3NUYXJnZXRzWzBdXHJcbiAgICBlbWl0dGVyLnBvc1RhcmdldHNbMF0gPSBlbWl0dGVyLnBvc1RhcmdldHNbMV1cclxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxyXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG4gIH1cclxuXHJcbiAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcbiAgZ2wudXNlUHJvZ3JhbShudWxsKVxyXG59XHJcblxyXG5HUFVQYXJ0aWNsZVN5c3RlbS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGdwdUVtaXR0ZXJzKSB7XHJcbiAgdmFyIGdsID0gdGhpcy5nbFxyXG4gIHZhciBlbWl0dGVyXHJcblxyXG4gIGdsLnVzZVByb2dyYW0odGhpcy5yZW5kZXJQcm9ncmFtLnByb2dyYW0pXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG4gIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKVxyXG4gIGdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJIZWlnaHQpXHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tpXSBcclxuXHJcbiAgICAvL05PVEU6IEkgaGF2ZSBhZGRlZCBzb21lIHN0dWZmIGFib3V0IGJpbmRpbmcgYSBzb3VyY2UgdGV4dHVyZSBoZXJlXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgMTApXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnNvdXJjZVRleHR1cmUpXHJcbiAgICBnbC51bmlmb3JtMWkodGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zLnNvdXJjZSwgMTApXHJcblxyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS50ZXh0dXJlKVxyXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDApXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgZW1pdHRlci5jb29yZEJ1ZmZlcilcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXHJcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgZW1pdHRlci5hbGl2ZUNvdW50KVxyXG4gIH1cclxuICBcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbClcclxuICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5yZW5kZXJQcm9ncmFtLmF0dHJpYnV0ZXMucGFydGljbGVDb29yZClcclxuICAvL2dsLmRpc2FibGUoZ2wuQkxFTkQpXHJcbiAgZ2wudXNlUHJvZ3JhbShudWxsKVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUXVhZFxyXG5cclxuZnVuY3Rpb24gU2NyZWVuUXVhZCAoKSB7XHJcbiAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgMSwgMSwgLTEsIDEsIC0xLCAtMSxcclxuICAgIDEsIDEsIC0xLCAtMSwgMSwgLTFcclxuICBdKVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzLnJlc2l6ZVdpdGhSYXRpbyA9IHJlc2l6ZVdpdGhSYXRpb1xyXG5cclxuZnVuY3Rpb24gcmVzaXplV2l0aFJhdGlvIChyYXRpbywgcmVmZXJlbmNlLCBzdWJqZWN0KSB7XHJcbiAgdmFyIHRhcmdldEFzcGVjdCA9IHJlZmVyZW5jZS5jbGllbnRXaWR0aCAvIHJlZmVyZW5jZS5jbGllbnRIZWlnaHRcclxuICB2YXIgbmV3V2lkdGggICAgID0gcmF0aW8gPCB0YXJnZXRBc3BlY3RcclxuICAgID8gfn4ocmVmZXJlbmNlLmNsaWVudEhlaWdodCAqIHJhdGlvKVxyXG4gICAgOiByZWZlcmVuY2UuY2xpZW50V2lkdGhcclxuICB2YXIgbmV3SGVpZ2h0ICAgID0gfn4obmV3V2lkdGggLyByYXRpbylcclxuICB2YXIgb2xkV2lkdGggICAgID0gc3ViamVjdC5jbGllbnRXaWR0aFxyXG4gIHZhciBvbGRIZWlnaHQgICAgPSBzdWJqZWN0LmNsaWVudEhlaWdodFxyXG5cclxuICBpZiAob2xkV2lkdGggPT09IG5ld1dpZHRoICYmIG9sZEhlaWdodCA9PT0gbmV3SGVpZ2h0KSByZXR1cm5cclxuICBzdWJqZWN0LmNsaWVudFdpZHRoICA9IG5ld1dpZHRoXHJcbiAgc3ViamVjdC5jbGllbnRIZWlnaHQgPSBuZXdIZWlnaHRcclxuICBzdWJqZWN0LndpZHRoICAgICAgICA9IG5ld1dpZHRoXHJcbiAgc3ViamVjdC5oZWlnaHQgICAgICAgPSBuZXdIZWlnaHRcclxufVxyXG4iLCJ2YXIgR0xTaGVsbCAgICAgICAgICAgPSByZXF1aXJlKFwiLi9HTFNoZWxsXCIpXHJcbnZhciBHUFVFbWl0dGVyICAgICAgICA9IHJlcXVpcmUoXCIuL0dQVUVtaXR0ZXJcIilcclxudmFyIEdMVmlkZW9UZXh0dXJlICAgID0gcmVxdWlyZShcIi4vR0xWaWRlb1RleHR1cmVcIilcclxudmFyIEdQVVBhcnRpY2xlU3lzdGVtID0gcmVxdWlyZShcIi4vR1BVUGFydGljbGVTeXN0ZW1cIilcclxuXHJcbnZhciBzaGVsbCAgICAgICAgICAgICA9IG5ldyBHTFNoZWxsKGRvY3VtZW50LmJvZHksIDE5MjAgLyAxMDgwKVxyXG52YXIgdmlkVGV4dHVyZSAgICAgICAgPSBuZXcgR0xWaWRlb1RleHR1cmUoc2hlbGwuZ2wpXHJcbnZhciBlbWl0dGVyICAgICAgICAgICA9IG5ldyBHUFVFbWl0dGVyKHNoZWxsLmdsLCAwLCAwLCAwLCB2aWRUZXh0dXJlKVxyXG52YXIgZ3B1UGFydGljbGVTeXN0ZW0gPSBuZXcgR1BVUGFydGljbGVTeXN0ZW0oc2hlbGwuZ2wpXHJcbnZhciBlbWl0dGVycyAgICAgICAgICA9IFtlbWl0dGVyXVxyXG52YXIgdmlkZW9FbCAgICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvXCIpXHJcblxyXG52aWRlb0VsLnNyYyAgID0gXCJzbWFsbC5tcDRcIlxyXG52aWRlb0VsLm11dGVkID0gdHJ1ZVxyXG5cclxuXHJcbnNoZWxsLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZ2wgPSB0aGlzLmdsXHJcblxyXG4gIC8vanVzdCBhIHF1aWNrIGhhY2sgdG8gZW5zdXJlIGNhbWVyYSBpcyByZWFkeVxyXG4gIGlmICh2aWRlb0VsLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAxMClcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIuc291cmNlVGV4dHVyZSlcclxuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpXHJcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsXHJcbiAgICAgICAgICAgICAgICAgIGdsLlVOU0lHTkVEX0JZVEUsIHZpZGVvRWwpXHJcbiAgICBncHVQYXJ0aWNsZVN5c3RlbS5yZW5kZXIoZW1pdHRlcnMpXHJcbiAgfVxyXG59XHJcblxyXG5zaGVsbC51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcclxuICBncHVQYXJ0aWNsZVN5c3RlbS51cGRhdGUoZFQsIGVtaXR0ZXJzKVxyXG59XHJcbiJdfQ==
