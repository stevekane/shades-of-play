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
