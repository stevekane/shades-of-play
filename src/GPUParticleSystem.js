var glslify    = require("glslify")
var GLProgram  = require("./GLProgram")
var ScreenQuad = require("./ScreenQuad")

module.exports = GPUParticleSystem

var velocityVSrc = glslify(__dirname + "/shaders/physics.vertex")
var velocityFSrc = glslify(__dirname + "/shaders/velocity.fragment")
var positionVSrc = glslify(__dirname + "/shaders/physics.vertex")
var positionFSrc = glslify(__dirname + "/shaders/position.fragment")
var renderVSrc   = glslify(__dirname + "/shaders/render.vertex")
var renderFSrc   = glslify(__dirname + "/shaders/render.fragment")

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
