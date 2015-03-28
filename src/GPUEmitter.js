module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

var renderVSrc   = glslify(__dirname + "/shaders/test.vertex")
var renderFSrc   = glslify(__dirname + "/shaders/test.fragment")
var velocityVSrc = glslify(__dirname + "/shaders/test.vertex")
var velocityFSrc = glslify(__dirname + "/shaders/test.fragment")
var positionVSrc = glslify(__dirname + "/shaders/test.vertex")
var positionFSrc = glslify(__dirname + "/shaders/test.fragment")

function GPUEmitter (gl, MAX_COUNT, x, y, z) {
  var ROW_SIZE        = calculateRowSize(MAX_COUNT)
  var COUNT           = ROW_SIZE * ROW_SIZE
  var position        = new Float32Array([.5, .5, .5])
  var velocity        = new Float32Array([0, 0, 0])
  var positions       = initializeParticleXYZ(x, y, z, new Float32Array(4 * COUNT))
  var posTexture      = configureTexture(gl, positions, gl.createTexture())
  var velTexture      = configureTexture(gl, velocities, gl.createTexture())
  var posBuffer       = configureFrameBuffer(gl, texture, gl.createFramebuffer())
  var velBuffer       = configureFrameBuffer(gl, texture, gl.createFramebuffer())
  var renderProgram   = new GLProgram.fromSource(gl, renderVSrc, renderFSrc)
  var velocityProgram = new GLProgram.fromSource(gl, velocityVSrc, velocityFSrc)
  var positionProgram = new GLProgram.fromSource(gl, positionVSrc, positionFSrc)

  this.livingIndex     = 0
  this.gl              = gl
  this.renderProgram   = renderProgram
  this.velocityProgram = velocityProgram
  this.positionProgram = positionProgram
}

function calculateRowSize (val) {
  var exponent = 1

  while (val > Math.pow(2, exponent)) exponent++

  return Math.pow(2, exponent - 1)
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

function configureTexture (gl, data, texture) {
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

