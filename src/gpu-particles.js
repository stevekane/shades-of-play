var GLShell            = require("./GLShell")
var GLVideoTexture     = require("./GLVideoTexture")
var GPUParticleSystem  = require("./GPUParticleSystem")
var GPUParticleEmitter = require("./assemblies/GPUParticleEmitter")
var Camera             = require("./Camera")

var shell             = new GLShell(document.body, 1920 / 1080)
var vidTexture        = new GLVideoTexture(shell.gl)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)

var emitter     = new GPUParticleEmitter(0, 0, 0, shell.gl, vidTexture)
var emitter2    = new GPUParticleEmitter(1, 1, 1, shell.gl, vidTexture)
var entities    = [emitter, emitter2]
var gpuEmitters = entities.filter(function (e) { return !!e.gpuEmitter })
var camera      = new Camera(shell.gl, 0, 0, 3.5, 0, 0, 0)

var videoEl = document.getElementById("video")

videoEl.src   = "small.mp4"
videoEl.muted = true

shell.render = function () {
  var gl = this.gl

  //just a quick hack to ensure camera is ready
  if (videoEl.readyState === 4) {
    gl.activeTexture(gl.TEXTURE0 + 10)
    gl.bindTexture(gl.TEXTURE_2D, emitter.gpuEmitter.sourceTexture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                  gl.UNSIGNED_BYTE, videoEl)
    gpuParticleSystem.render(gpuEmitters, camera)
  }
}

shell.update = function (dT) {
  //TODO: Temporary hack thing
  for (var i = 0; i < gpuEmitters.length; i++) {
    gpuEmitters[i].physics.rotation[1] += .01
  }
  
  gpuParticleSystem.update(dT, gpuEmitters)
}
