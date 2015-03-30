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

