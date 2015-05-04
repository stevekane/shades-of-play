var GLRenderTarget = require("../types/GLRenderTarget")

module.exports = GPUEmitter

function ArrayOf (Ctor, count, vector) {
  var vLen     = vector.length
  var totalLen = count * vLen
  var ar       = new Ctor(totalLen)

  for (var i = 0; i < count; i++) {
    for (var j = 0; j < vLen; j++) {
      ar[i * vLen + j] = vector[j]
    }
  }
  return ar
}

function ParticleCoords (width, height) {
  var array = new Float32Array(width * 2 * height)

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      array[j * 2 * width + i * 2]     = [i / width]
      array[j * 2 * width + i * 2 + 1] = [j / height]
    } 
  }
  return array
}

function GPUEmitter (gl, color) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var ROW_SIZE       = 128
  var COUNT          = ROW_SIZE * ROW_SIZE
  var LIFETIME       = 1

  /*
  struct prop {
    timeAlive,
    FREE,
    FREE,
    FREE
  }
  */
  var props          = new ArrayOf(Float32Array, COUNT, [0, 0, 0, 0])
  var positions      = new ArrayOf(Float32Array, COUNT, [0, 0, 0, 1])
  var velocities     = new ArrayOf(Float32Array, COUNT, [1, 1, 0, 1])

  //here we are staggering the timeAlive to get a fountain
  for (var i = 0; i < COUNT; i++) {
    props[i * 4] = (LIFETIME / COUNT) * i
  }

  var propTarget1    = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, props)
  var propTarget2    = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, props)
  var posTarget1     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, positions)
  var posTarget2     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, positions)
  var velTarget1     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, velocities)
  var velTarget2     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, velocities)

  var particleCoords = new ParticleCoords(ROW_SIZE, ROW_SIZE)
  var coordBuffer    = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, coordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, particleCoords, gl.STATIC_DRAW)

  this.propTargets = [propTarget1, propTarget2]
  this.posTargets  = [posTarget1, posTarget2]
  this.velTargets  = [velTarget1, velTarget2]
  this.coordBuffer = coordBuffer
  this.count       = COUNT
  this.lifeTime    = LIFETIME
  this.color       = color
}
