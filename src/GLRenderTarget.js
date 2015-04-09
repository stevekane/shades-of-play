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
