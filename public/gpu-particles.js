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

},{"./Clock":1,"./dom-utils":11}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){

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
    emitter = gpuEmitters[i].gpuEmitter

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
    emitter = gpuEmitters[j].gpuEmitter

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
    emitter = gpuEmitters[i].gpuEmitter

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

},{"./GLProgram":2,"./ScreenQuad":7}],7:[function(require,module,exports){
module.exports = ScreenQuad

function ScreenQuad () {
  return new Float32Array([
    1, 1, -1, 1, -1, -1,
    1, 1, -1, -1, 1, -1
  ])
}

},{}],8:[function(require,module,exports){
var GPUEmitter = require("../components/GPUEmitter")
var Physics    = require("../components/Physics")

module.exports = GPUParticleEmitter

function GPUParticleEmitter (x, y, z, gl, sourceTexture) {
  this.physics    = new Physics(x, y, z, 0, 0, 0)
  this.gpuEmitter = new GPUEmitter(gl, sourceTexture)
}

},{"../components/GPUEmitter":9,"../components/Physics":10}],9:[function(require,module,exports){
var GLRenderTarget = require("../types/GLRenderTarget")

module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

function GPUEmitter (gl, sourceTexture) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var ROW_SIZE       = 256
  var COUNT          = ROW_SIZE * ROW_SIZE
  var positions      = initializeParticleXYZ(0, 0, 0, new Float32Array(4 * COUNT))
  var velocities     = initializeParticleXYZ(0, 0, 0, new Float32Array(4 * COUNT))
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

},{"../types/GLRenderTarget":13}],10:[function(require,module,exports){
module.exports = Physics

function Physics (x, y, z, dx, dy, dz) {
  this.mass         = 1
  this.acceleration = [0, 0, 0]
  this.position     = [x, y, z]
  this.velocity     = [dx, dy, dz]
}

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
var GLShell            = require("./GLShell")
var GLVideoTexture     = require("./GLVideoTexture")
var GPUParticleSystem  = require("./GPUParticleSystem")
var GPUParticleEmitter = require("./assemblies/GPUParticleEmitter")

var shell             = new GLShell(document.body, 1920 / 1080)
var vidTexture        = new GLVideoTexture(shell.gl)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)

var emitter     = new GPUParticleEmitter(0, 0, 0, shell.gl, vidTexture)
var entities    = [emitter]
var gpuEmitters = entities.filter(function (e) { return !!e.gpuEmitter })

var videoEl           = document.getElementById("video")

videoEl.src   = "small.mp4"
videoEl.muted = true

window.emitter = emitter

shell.render = function () {
  var gl = this.gl

  //just a quick hack to ensure camera is ready
  if (videoEl.readyState === 4) {
    gl.activeTexture(gl.TEXTURE0 + 10)
    gl.bindTexture(gl.TEXTURE_2D, emitter.gpuEmitter.sourceTexture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                  gl.UNSIGNED_BYTE, videoEl)
    gpuParticleSystem.render(gpuEmitters)
  }
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, gpuEmitters)
}

},{"./GLShell":4,"./GLVideoTexture":5,"./GPUParticleSystem":6,"./assemblies/GPUParticleEmitter":8}],13:[function(require,module,exports){
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

},{}]},{},[12])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2xvY2suanMiLCJzcmMvR0xQcm9ncmFtLmpzIiwic3JjL0dMU2hhZGVyLmpzIiwic3JjL0dMU2hlbGwuanMiLCJzcmMvR0xWaWRlb1RleHR1cmUuanMiLCJzcmMvR1BVUGFydGljbGVTeXN0ZW0uanMiLCJzcmMvU2NyZWVuUXVhZC5qcyIsInNyYy9hc3NlbWJsaWVzL0dQVVBhcnRpY2xlRW1pdHRlci5qcyIsInNyYy9jb21wb25lbnRzL0dQVUVtaXR0ZXIuanMiLCJzcmMvY29tcG9uZW50cy9QaHlzaWNzLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIiwic3JjL3R5cGVzL0dMUmVuZGVyVGFyZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBDbG9ja1xyXG5cclxuZnVuY3Rpb24gQ2xvY2sgKCkge1xyXG4gIHRoaXMubGFzdFRpbWUgPSBEYXRlLm5vdygpXHJcbiAgdGhpcy50aGlzVGltZSA9IHRoaXMubGFzdFRpbWVcclxuICB0aGlzLmRUICAgICAgID0gdGhpcy50aGlzVGltZSAtIHRoaXMubGFzdFRpbWVcclxufVxyXG5cclxuQ2xvY2sucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5sYXN0VGltZSA9IHRoaXMudGhpc1RpbWVcclxuICB0aGlzLnRoaXNUaW1lID0gRGF0ZS5ub3coKVxyXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxyXG59XHJcbiIsInZhciBHTFNoYWRlciA9IHJlcXVpcmUoXCIuL0dMU2hhZGVyXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbVxyXG5cclxuZnVuY3Rpb24gZWl0aGVySW5zdGFuY2VPZiAoY3RvciwgdjEsIHYyKSB7XHJcbiAgcmV0dXJuICgodjEgaW5zdGFuY2VvZiBjdG9yKSB8fCAodjIgaW5zdGFuY2VvZiBjdG9yKSkgPyB0cnVlIDogZmFsc2VcclxufVxyXG5cclxuZnVuY3Rpb24gY29tYmluZUVycm9ycyAodjEsIHYyKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcigodjEubWVzc2FnZSB8fCBcIlwiKSArIFwiXFxuXCIgKyAodjIubWVzc2FnZSB8fCBcIlwiKSlcclxufVxyXG5cclxuZnVuY3Rpb24gR0xQcm9ncmFtIChnbCwgdnMsIGZzKSB7XHJcbiAgdmFyIHByb2dyYW0gICAgICAgPSBnbC5jcmVhdGVQcm9ncmFtKHZzLCBmcylcclxuICB2YXIgYXR0cmlidXRlcyAgICA9IHt9XHJcbiAgdmFyIHVuaWZvcm1zICAgICAgPSB7fVxyXG4gIHZhciBudW1BdHRyaWJ1dGVzXHJcbiAgdmFyIG51bVVuaWZvcm1zXHJcbiAgdmFyIGFOYW1lXHJcbiAgdmFyIHVOYW1lXHJcblxyXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cylcclxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpXHJcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcclxuXHJcbiAgbnVtQXR0cmlidXRlcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpXHJcbiAgbnVtVW5pZm9ybXMgICA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUF0dHJpYnV0ZXM7ICsraSkge1xyXG4gICAgYU5hbWUgICAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSkubmFtZVxyXG4gICAgYXR0cmlidXRlc1thTmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhTmFtZSlcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZXNbYU5hbWVdKVxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1Vbmlmb3JtczsgKytqKSB7XHJcbiAgICB1TmFtZSAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGopLm5hbWVcclxuICAgIHVuaWZvcm1zW3VOYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1TmFtZSlcclxuICB9XHJcblxyXG4gIHRoaXMucHJvZ3JhbSAgICA9IHByb2dyYW1cclxuICB0aGlzLnVuaWZvcm1zICAgPSB1bmlmb3Jtc1xyXG4gIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcclxufVxyXG5cclxuLy9HTENvbnRleHQgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBFaXRoZXIgRXJyb3IgfCBHTFByb2dyYW1cclxuR0xQcm9ncmFtLmZyb21Tb3VyY2UgPSBmdW5jdGlvbiAoZ2wsIHZTcmMsIGZTcmMpIHtcclxuICB2YXIgdlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdlNyYylcclxuICB2YXIgZlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmU3JjKVxyXG5cclxuICByZXR1cm4gKGVpdGhlckluc3RhbmNlT2YoRXJyb3IsIHZTaGFkZXIsIGZTaGFkZXIpKVxyXG4gICAgPyBjb21iaW5lRXJyb3JzKHZTaGFkZXIsIGZTaGFkZXIpXHJcbiAgICA6IG5ldyBHTFByb2dyYW0oZ2wsIHZTaGFkZXIsIGZTaGFkZXIpXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFNoYWRlclxyXG5cclxuLy9HTENvbnRleHQgLT4gRW51bSAtPiBTdHJpbmcgLT4gRWl0aGVyIEdMU2hhZGVyIHwgRXJyb3JcclxuZnVuY3Rpb24gR0xTaGFkZXIgKGdsLCB0eXBlLCBzcmMpIHtcclxuICB2YXIgc2hhZGVyICA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKVxyXG5cclxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpXHJcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXHJcbiAgcmV0dXJuIGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKVxyXG4gICAgPyBzaGFkZXJcclxuICAgIDogbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSlcclxufVxyXG4iLCJ2YXIgQ2xvY2sgICAgICAgICAgID0gcmVxdWlyZShcIi4vQ2xvY2tcIilcclxudmFyIHJlc2l6ZVdpdGhSYXRpbyA9IHJlcXVpcmUoXCIuL2RvbS11dGlsc1wiKS5yZXNpemVXaXRoUmF0aW9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR0xTaGVsbFxyXG5cclxuZnVuY3Rpb24gR0xTaGVsbCAocGFyZW50Tm9kZSwgYXNwZWN0UmF0aW8pIHtcclxuICB2YXIgY2FudmFzICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcclxuICB2YXIgZ2wgICAgICAgICAgICAgICA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIilcclxuICB2YXIgY2xvY2sgICAgICAgICAgICA9IG5ldyBDbG9ja1xyXG5cclxuICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHJhdGlvID0gdGhpcy5nbC5jYW52YXMuY2xpZW50V2lkdGggLyB0aGlzLmdsLmNhbnZhcy5jbGllbnRIZWlnaHRcclxuXHJcbiAgICByZXNpemVXaXRoUmF0aW8odGhpcy5hc3BlY3RSYXRpbywgdGhpcy5wYXJlbnROb2RlLCB0aGlzLmdsLmNhbnZhcylcclxuICAgIHRoaXMucmVuZGVyKCkgXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxyXG4gIH0uYmluZCh0aGlzKVxyXG5cclxuICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jbG9jay50aWNrKClcclxuICAgIHRoaXMudXBkYXRlKHRoaXMuY2xvY2suZFQpIFxyXG4gIH0uYmluZCh0aGlzKVxyXG5cclxuICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGNhbnZhcylcclxuICB0aGlzLnBhcmVudE5vZGUgID0gcGFyZW50Tm9kZVxyXG4gIHRoaXMuZ2wgICAgICAgICAgPSBnbFxyXG4gIHRoaXMuYXNwZWN0UmF0aW8gPSBhc3BlY3RSYXRpb1xyXG4gIHRoaXMuY2xvY2sgICAgICAgPSBjbG9ja1xyXG5cclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxyXG4gIHNldEludGVydmFsKHVwZGF0ZSwgMjUpXHJcbn1cclxuXHJcbkdMU2hlbGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAvL292ZXIgd3JpdGUgdGhpcyB3aXRoIHlvdXIgb3duIHJlbmRlciBmdW5jdGlvblxyXG59XHJcblxyXG4vL2ZvciBjb252ZW5pZW5jZSwgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgaXMgcGFzc2VkIGFzIGEgcGFyYW1hdGVyXHJcbkdMU2hlbGwucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCkge1xyXG4gIC8vb3ZlcndyaXRlIHRoaXMgd2l0aCB5b3VyIG93biB1cGRhdGUgZnVuY3Rpb25cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdMVmlkZW9UZXh0dXJlXHJcblxyXG5mdW5jdGlvbiBHTFZpZGVvVGV4dHVyZSAoZ2wpIHtcclxuICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKVxyXG5cclxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpXHJcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUilcclxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpXHJcbiAgcmV0dXJuIHRleHR1cmVcclxufVxyXG4iLCJcclxudmFyIEdMUHJvZ3JhbSAgPSByZXF1aXJlKFwiLi9HTFByb2dyYW1cIilcclxudmFyIFNjcmVlblF1YWQgPSByZXF1aXJlKFwiLi9TY3JlZW5RdWFkXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdQVVBhcnRpY2xlU3lzdGVtXHJcblxyXG52YXIgdmVsb2NpdHlWU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHNjcmVlbkNvb3JkO1xcclxcblxcclxcbnZvaWQgbWFpbiAoKSB7XFxyXFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoc2NyZWVuQ29vcmQsIDAuMCwgMS4wKTtcXHJcXG59XFxyXFxuXCJcclxudmFyIHZlbG9jaXR5RlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGRUO1xcclxcbnVuaWZvcm0gdmVjMiB2aWV3cG9ydDtcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB2ZWxvY2l0aWVzO1xcclxcblxcclxcbnZvaWQgbWFpbiAoKSB7XFxyXFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcclxcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxyXFxuXFxyXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDAuMCAqIGRUICsgdmVsb2NpdHksIDEuMCk7XFxyXFxufVxcclxcblwiXHJcbnZhciBwb3NpdGlvblZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIHZlYzIgc2NyZWVuQ29vcmQ7XFxyXFxuXFxyXFxudm9pZCBtYWluICgpIHtcXHJcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChzY3JlZW5Db29yZCwgMC4wLCAxLjApO1xcclxcbn1cXHJcXG5cIlxyXG52YXIgcG9zaXRpb25GU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcclxcblxcclxcbnVuaWZvcm0gZmxvYXQgZFQ7XFxyXFxudW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHZlbG9jaXRpZXM7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcclxcblxcclxcblxcclxcbnZvaWQgbWFpbiAoKSB7XFxyXFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcclxcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxyXFxuICB2ZWMzIHBvc2l0aW9uICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHRleHR1cmVJbmRleCkueHl6O1xcclxcblxcclxcbiAgZ2xfRnJhZ0NvbG9yICA9IHZlYzQoKGRUIC8gMTAuMCAqIHZlbG9jaXR5KSArIHBvc2l0aW9uLCAxLjApO1xcclxcbn1cXHJcXG5cIlxyXG52YXIgcmVuZGVyVlNyYyAgID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHBhcnRpY2xlQ29vcmQ7XFxyXFxuXFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMyBwb3NpdGlvbjtcXHJcXG5cXHJcXG52b2lkIG1haW4gKCkge1xcclxcbiAgdmVjMyBwb3MgICAgID0gdGV4dHVyZTJEKHBvc2l0aW9ucywgcGFydGljbGVDb29yZCkueHl6O1xcclxcblxcclxcbiAgcG9zaXRpb24gICAgID0gcG9zO1xcclxcbiAgZ2xfUG9zaXRpb24gID0gdmVjNChwb3MsIDEuMCk7XFxyXFxuICBnbF9Qb2ludFNpemUgPSAyLjA7XFxyXFxufVxcclxcblwiXHJcbnZhciByZW5kZXJGU3JjICAgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxyXFxuXFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgc291cmNlO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMyBwb3NpdGlvbjtcXHJcXG5cXHJcXG52b2lkIG1haW4gKCkge1xcclxcbiAgdmVjMiB0ZXh0dXJlUG9zID0gdmVjMihwb3NpdGlvbi54ICogMC41ICsgMC41LCBwb3NpdGlvbi55ICogMC41ICsgMC41KTtcXHJcXG4gIHZlYzQgY29sb3IgICAgICA9IHRleHR1cmUyRChzb3VyY2UsIHRleHR1cmVQb3MpO1xcclxcblxcclxcbiAgZ2xfRnJhZ0NvbG9yID0gY29sb3I7XFxyXFxufSBcXHJcXG5cIlxyXG5cclxuZnVuY3Rpb24gR1BVUGFydGljbGVTeXN0ZW0gKGdsKSB7XHJcbiAgdmFyIHZlbG9jaXR5UHJvZ3JhbSA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgdmVsb2NpdHlWU3JjLCB2ZWxvY2l0eUZTcmMpXHJcbiAgdmFyIHBvc2l0aW9uUHJvZ3JhbSA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgcG9zaXRpb25WU3JjLCBwb3NpdGlvbkZTcmMpXHJcbiAgdmFyIHJlbmRlclByb2dyYW0gICA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgcmVuZGVyVlNyYywgcmVuZGVyRlNyYylcclxuICB2YXIgc2NyZWVuUXVhZCAgICAgID0gbmV3IFNjcmVlblF1YWRcclxuICB2YXIgc2NyZWVuQnVmZmVyICAgID0gZ2wuY3JlYXRlQnVmZmVyKClcclxuXHJcbiAgaWYgKHZlbG9jaXR5UHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSBjb25zb2xlLmxvZyh2ZWxvY2l0eVByb2dyYW0pXHJcbiAgaWYgKHBvc2l0aW9uUHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSBjb25zb2xlLmxvZyhwb3NpdGlvblByb2dyYW0pXHJcbiAgaWYgKHJlbmRlclByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgICBjb25zb2xlLmxvZyhyZW5kZXJQcm9ncmFtKVxyXG5cclxuICAvL2J1ZmZlciBmdWxsIHNjcmVlbiBxdWFkIGNvb3JkIGZvciBib3RoIHZlbG9jaXR5IGFuZCBwb3NpdGlvbiBwcm9nXHJcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHNjcmVlbkJ1ZmZlcilcclxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuUXVhZCwgZ2wuU1RBVElDX0RSQVcpXHJcblxyXG4gIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMClcclxuXHJcbiAgLy9lbmFibGUgYXR0cmlidXRlIGFycmF5cyBmb3IgYWxsIHByb2dyYW1zXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXHJcblxyXG4gIHRoaXMuZ2wgICAgICAgICAgICAgID0gZ2xcclxuICB0aGlzLnNjcmVlbkJ1ZmZlciAgICA9IHNjcmVlbkJ1ZmZlclxyXG4gIHRoaXMudmVsb2NpdHlQcm9ncmFtID0gdmVsb2NpdHlQcm9ncmFtXHJcbiAgdGhpcy5wb3NpdGlvblByb2dyYW0gPSBwb3NpdGlvblByb2dyYW1cclxuICB0aGlzLnJlbmRlclByb2dyYW0gICA9IHJlbmRlclByb2dyYW1cclxufVxyXG5cclxuXHJcbkdQVVBhcnRpY2xlU3lzdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZFQsIGdwdUVtaXR0ZXJzKSB7XHJcbiAgdmFyIGdsICAgICAgICA9IHRoaXMuZ2xcclxuICB2YXIgZFRTZWNvbmRzID0gZFQgLyAxMDAwXHJcbiAgdmFyIGVtaXR0ZXIgXHJcbiAgdmFyIHRtcEJ1ZlxyXG5cclxuICBnbC51c2VQcm9ncmFtKHRoaXMudmVsb2NpdHlQcm9ncmFtLnByb2dyYW0pXHJcbiAgZ2wuZW5hYmxlKGdsLkJMRU5EKVxyXG4gIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLlpFUk8pXHJcbiAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKVxyXG4gIGdsLmRlcHRoTWFzayhmYWxzZSlcclxuICBnbC51bmlmb3JtMWYodGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXMuZFQsIGRUU2Vjb25kcylcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy52ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcclxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMudmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbaV0uZ3B1RW1pdHRlclxyXG5cclxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZW1pdHRlci52ZWxUYXJnZXRzWzFdLmhhbmRsZSkgXHJcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0ud2lkdGgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLmhlaWdodClcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZW1pdHRlci52ZWxUYXJnZXRzWzBdLnRleHR1cmUpXHJcbiAgICBnbC51bmlmb3JtMWkodGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXMudmVsb2NpdGllcywgMClcclxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnZlbFRhcmdldHNbMV0uaGVpZ2h0KVxyXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpXHJcblxyXG4gICAgdG1wQnVmICAgICAgICAgICAgICAgID0gZW1pdHRlci52ZWxUYXJnZXRzWzBdXHJcbiAgICBlbWl0dGVyLnZlbFRhcmdldHNbMF0gPSBlbWl0dGVyLnZlbFRhcmdldHNbMV1cclxuICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxyXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG4gIH1cclxuXHJcbiAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMudmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcblxyXG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC51bmlmb3JtMWYodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMuZFQsIGRUU2Vjb25kcylcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcclxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxyXG5cclxuICBmb3IgKHZhciBqID0gMDsgaiA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbal0uZ3B1RW1pdHRlclxyXG5cclxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLmhhbmRsZSkgXHJcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLnBvc1RhcmdldHNbMV0ud2lkdGgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUYXJnZXRzWzFdLmhlaWdodClcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZW1pdHRlci52ZWxUYXJnZXRzWzBdLnRleHR1cmUpXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgMSlcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS50ZXh0dXJlKVxyXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLnZlbG9jaXRpZXMsIDApXHJcbiAgICBnbC51bmlmb3JtMWkodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMucG9zaXRpb25zLCAxKVxyXG4gICAgZ2wudW5pZm9ybTJmKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLnZpZXdwb3J0LCBcclxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc1RhcmdldHNbMV0ud2lkdGgsIFxyXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oZWlnaHQpXHJcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNilcclxuXHJcbiAgICB0bXBCdWYgICAgICAgICAgICAgICAgPSBlbWl0dGVyLnBvc1RhcmdldHNbMF1cclxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1swXSA9IGVtaXR0ZXIucG9zVGFyZ2V0c1sxXVxyXG4gICAgZW1pdHRlci5wb3NUYXJnZXRzWzFdID0gdG1wQnVmXHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXHJcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpXHJcbiAgfVxyXG5cclxuICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb3NpdGlvblByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZClcclxuICBnbC51c2VQcm9ncmFtKG51bGwpXHJcbn1cclxuXHJcbkdQVVBhcnRpY2xlU3lzdGVtLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZ3B1RW1pdHRlcnMpIHtcclxuICB2YXIgZ2wgPSB0aGlzLmdsXHJcbiAgdmFyIGVtaXR0ZXJcclxuXHJcbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpXHJcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpXHJcbiAgZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVyV2lkdGgsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlckhlaWdodClcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBncHVFbWl0dGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgZW1pdHRlciA9IGdwdUVtaXR0ZXJzW2ldLmdwdUVtaXR0ZXJcclxuXHJcbiAgICAvL05PVEU6IEkgaGF2ZSBhZGRlZCBzb21lIHN0dWZmIGFib3V0IGJpbmRpbmcgYSBzb3VyY2UgdGV4dHVyZSBoZXJlXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgMTApXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnNvdXJjZVRleHR1cmUpXHJcbiAgICBnbC51bmlmb3JtMWkodGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zLnNvdXJjZSwgMTApXHJcblxyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS50ZXh0dXJlKVxyXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDApXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgZW1pdHRlci5jb29yZEJ1ZmZlcilcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXHJcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgZW1pdHRlci5hbGl2ZUNvdW50KVxyXG4gIH1cclxuICBcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbClcclxuICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5yZW5kZXJQcm9ncmFtLmF0dHJpYnV0ZXMucGFydGljbGVDb29yZClcclxuICAvL2dsLmRpc2FibGUoZ2wuQkxFTkQpXHJcbiAgZ2wudXNlUHJvZ3JhbShudWxsKVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gU2NyZWVuUXVhZFxyXG5cclxuZnVuY3Rpb24gU2NyZWVuUXVhZCAoKSB7XHJcbiAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgMSwgMSwgLTEsIDEsIC0xLCAtMSxcclxuICAgIDEsIDEsIC0xLCAtMSwgMSwgLTFcclxuICBdKVxyXG59XHJcbiIsInZhciBHUFVFbWl0dGVyID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvR1BVRW1pdHRlclwiKVxudmFyIFBoeXNpY3MgICAgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9QaHlzaWNzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gR1BVUGFydGljbGVFbWl0dGVyXG5cbmZ1bmN0aW9uIEdQVVBhcnRpY2xlRW1pdHRlciAoeCwgeSwgeiwgZ2wsIHNvdXJjZVRleHR1cmUpIHtcbiAgdGhpcy5waHlzaWNzICAgID0gbmV3IFBoeXNpY3MoeCwgeSwgeiwgMCwgMCwgMClcbiAgdGhpcy5ncHVFbWl0dGVyID0gbmV3IEdQVUVtaXR0ZXIoZ2wsIHNvdXJjZVRleHR1cmUpXG59XG4iLCJ2YXIgR0xSZW5kZXJUYXJnZXQgPSByZXF1aXJlKFwiLi4vdHlwZXMvR0xSZW5kZXJUYXJnZXRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHUFVFbWl0dGVyXG5cbnZhciBQQVJUSUNMRV9TVFJJREUgPSA0XG5cbmZ1bmN0aW9uIEdQVUVtaXR0ZXIgKGdsLCBzb3VyY2VUZXh0dXJlKSB7XG4gIGlmICghZ2wuZ2V0RXh0ZW5zaW9uKFwiT0VTX3RleHR1cmVfZmxvYXRcIikpIHRocm93IG5ldyBFcnJvcihcIm5vIGZsb2F0IHRleHR1cmVzXCIpXG5cbiAgdmFyIFJPV19TSVpFICAgICAgID0gMjU2XG4gIHZhciBDT1VOVCAgICAgICAgICA9IFJPV19TSVpFICogUk9XX1NJWkVcbiAgdmFyIHBvc2l0aW9ucyAgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKDAsIDAsIDAsIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcbiAgdmFyIHZlbG9jaXRpZXMgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKDAsIDAsIDAsIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcbiAgdmFyIHBvc1RhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHBvc2l0aW9ucylcbiAgdmFyIHBvc1RhcmdldDIgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHBvc2l0aW9ucylcbiAgdmFyIHZlbFRhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXG4gIHZhciB2ZWxUYXJnZXQyICAgICA9IG5ldyBHTFJlbmRlclRhcmdldChnbCwgUk9XX1NJWkUsIFJPV19TSVpFLCB2ZWxvY2l0aWVzKVxuICB2YXIgcGFydGljbGVDb29yZHMgPSBidWlsZFBhcnRpY2xlQ29vcmRzKFJPV19TSVpFLCBST1dfU0laRSlcbiAgdmFyIGNvb3JkQnVmZmVyICAgID0gZ2wuY3JlYXRlQnVmZmVyKClcblxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY29vcmRCdWZmZXIpXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZUNvb3JkcywgZ2wuU1RBVElDX0RSQVcpXG5cbiAgdGhpcy5wb3NUYXJnZXRzICAgID0gW3Bvc1RhcmdldDEsIHBvc1RhcmdldDJdXG4gIHRoaXMudmVsVGFyZ2V0cyAgICA9IFt2ZWxUYXJnZXQxLCB2ZWxUYXJnZXQyXVxuICB0aGlzLmNvb3JkQnVmZmVyICAgPSBjb29yZEJ1ZmZlclxuICB0aGlzLmFsaXZlQ291bnQgICAgPSBST1dfU0laRSAqIFJPV19TSVpFXG4gIHRoaXMuc291cmNlVGV4dHVyZSA9IHNvdXJjZVRleHR1cmVcbn1cblxuZnVuY3Rpb24gYnVpbGRQYXJ0aWNsZUNvb3JkcyAod2lkdGgsIGhlaWdodCkge1xuICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogMiAqIGhlaWdodClcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDJdICAgICA9IFtpIC8gd2lkdGhdXG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDIgKyAxXSA9IFtqIC8gaGVpZ2h0XVxuICAgIH0gXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmZ1bmN0aW9uIHNldFBhcnRpY2xlWFlaIChpbmRleCwgeCwgeSwgeiwgYXJyYXkpIHtcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXhdICAgICA9IHhcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAxXSA9IHlcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAyXSA9IHpcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAzXSA9IDFcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaICh4LCB5LCB6LCBhcnJheSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAvIFBBUlRJQ0xFX1NUUklERTsgaSsrKSB7XG4gICAgc2V0UGFydGljbGVYWVooaSwgeCArIE1hdGgucmFuZG9tKCkgLSAuNSwgeSArIE1hdGgucmFuZG9tKCkgLSAuNSwgeiwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NcblxuZnVuY3Rpb24gUGh5c2ljcyAoeCwgeSwgeiwgZHgsIGR5LCBkeikge1xuICB0aGlzLm1hc3MgICAgICAgICA9IDFcbiAgdGhpcy5hY2NlbGVyYXRpb24gPSBbMCwgMCwgMF1cbiAgdGhpcy5wb3NpdGlvbiAgICAgPSBbeCwgeSwgel1cbiAgdGhpcy52ZWxvY2l0eSAgICAgPSBbZHgsIGR5LCBkel1cbn1cbiIsIm1vZHVsZS5leHBvcnRzLnJlc2l6ZVdpdGhSYXRpbyA9IHJlc2l6ZVdpdGhSYXRpb1xyXG5cclxuZnVuY3Rpb24gcmVzaXplV2l0aFJhdGlvIChyYXRpbywgcmVmZXJlbmNlLCBzdWJqZWN0KSB7XHJcbiAgdmFyIHRhcmdldEFzcGVjdCA9IHJlZmVyZW5jZS5jbGllbnRXaWR0aCAvIHJlZmVyZW5jZS5jbGllbnRIZWlnaHRcclxuICB2YXIgbmV3V2lkdGggICAgID0gcmF0aW8gPCB0YXJnZXRBc3BlY3RcclxuICAgID8gfn4ocmVmZXJlbmNlLmNsaWVudEhlaWdodCAqIHJhdGlvKVxyXG4gICAgOiByZWZlcmVuY2UuY2xpZW50V2lkdGhcclxuICB2YXIgbmV3SGVpZ2h0ICAgID0gfn4obmV3V2lkdGggLyByYXRpbylcclxuICB2YXIgb2xkV2lkdGggICAgID0gc3ViamVjdC5jbGllbnRXaWR0aFxyXG4gIHZhciBvbGRIZWlnaHQgICAgPSBzdWJqZWN0LmNsaWVudEhlaWdodFxyXG5cclxuICBpZiAob2xkV2lkdGggPT09IG5ld1dpZHRoICYmIG9sZEhlaWdodCA9PT0gbmV3SGVpZ2h0KSByZXR1cm5cclxuICBzdWJqZWN0LmNsaWVudFdpZHRoICA9IG5ld1dpZHRoXHJcbiAgc3ViamVjdC5jbGllbnRIZWlnaHQgPSBuZXdIZWlnaHRcclxuICBzdWJqZWN0LndpZHRoICAgICAgICA9IG5ld1dpZHRoXHJcbiAgc3ViamVjdC5oZWlnaHQgICAgICAgPSBuZXdIZWlnaHRcclxufVxyXG4iLCJ2YXIgR0xTaGVsbCAgICAgICAgICAgID0gcmVxdWlyZShcIi4vR0xTaGVsbFwiKVxyXG52YXIgR0xWaWRlb1RleHR1cmUgICAgID0gcmVxdWlyZShcIi4vR0xWaWRlb1RleHR1cmVcIilcclxudmFyIEdQVVBhcnRpY2xlU3lzdGVtICA9IHJlcXVpcmUoXCIuL0dQVVBhcnRpY2xlU3lzdGVtXCIpXHJcbnZhciBHUFVQYXJ0aWNsZUVtaXR0ZXIgPSByZXF1aXJlKFwiLi9hc3NlbWJsaWVzL0dQVVBhcnRpY2xlRW1pdHRlclwiKVxyXG5cclxudmFyIHNoZWxsICAgICAgICAgICAgID0gbmV3IEdMU2hlbGwoZG9jdW1lbnQuYm9keSwgMTkyMCAvIDEwODApXHJcbnZhciB2aWRUZXh0dXJlICAgICAgICA9IG5ldyBHTFZpZGVvVGV4dHVyZShzaGVsbC5nbClcclxudmFyIGdwdVBhcnRpY2xlU3lzdGVtID0gbmV3IEdQVVBhcnRpY2xlU3lzdGVtKHNoZWxsLmdsKVxyXG5cclxudmFyIGVtaXR0ZXIgICAgID0gbmV3IEdQVVBhcnRpY2xlRW1pdHRlcigwLCAwLCAwLCBzaGVsbC5nbCwgdmlkVGV4dHVyZSlcclxudmFyIGVudGl0aWVzICAgID0gW2VtaXR0ZXJdXHJcbnZhciBncHVFbWl0dGVycyA9IGVudGl0aWVzLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gISFlLmdwdUVtaXR0ZXIgfSlcclxuXHJcbnZhciB2aWRlb0VsICAgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9cIilcclxuXHJcbnZpZGVvRWwuc3JjICAgPSBcInNtYWxsLm1wNFwiXHJcbnZpZGVvRWwubXV0ZWQgPSB0cnVlXHJcblxyXG53aW5kb3cuZW1pdHRlciA9IGVtaXR0ZXJcclxuXHJcbnNoZWxsLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZ2wgPSB0aGlzLmdsXHJcblxyXG4gIC8vanVzdCBhIHF1aWNrIGhhY2sgdG8gZW5zdXJlIGNhbWVyYSBpcyByZWFkeVxyXG4gIGlmICh2aWRlb0VsLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAxMClcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIuZ3B1RW1pdHRlci5zb3VyY2VUZXh0dXJlKVxyXG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSlcclxuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSxcclxuICAgICAgICAgICAgICAgICAgZ2wuVU5TSUdORURfQllURSwgdmlkZW9FbClcclxuICAgIGdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihncHVFbWl0dGVycylcclxuICB9XHJcbn1cclxuXHJcbnNoZWxsLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCkge1xyXG4gIGdwdVBhcnRpY2xlU3lzdGVtLnVwZGF0ZShkVCwgZ3B1RW1pdHRlcnMpXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFJlbmRlclRhcmdldFxyXG5cclxuZnVuY3Rpb24gR0xSZW5kZXJUYXJnZXQgKGdsLCB3aWR0aCwgaGVpZ2h0LCBkYXRhKSB7XHJcbiAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKClcclxuICB2YXIgaGFuZGxlICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcclxuXHJcbiAgLy9jb25maWd1cmUgdGhlIHRleHR1cmUgYW5kIHVwbG9hZCB0aGUgZGF0YVxyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpXHJcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSlcclxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxyXG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgd2lkdGgsIGhlaWdodCwgMCwgZ2wuUkdCQSwgZ2wuRkxPQVQsIGRhdGEpXHJcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcclxuXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBoYW5kbGUpXHJcbiAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUsIDApXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG5cclxuICB0aGlzLmhhbmRsZSAgPSBoYW5kbGVcclxuICB0aGlzLndpZHRoICAgPSB3aWR0aFxyXG4gIHRoaXMuaGVpZ2h0ICA9IGhlaWdodFxyXG4gIHRoaXMudGV4dHVyZSA9IHRleHR1cmVcclxufVxyXG4iXX0=
