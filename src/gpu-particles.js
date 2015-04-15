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

var videoEl = document.getElementById("video")

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
