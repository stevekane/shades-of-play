var GLShell            = require("./GLShell")
var GLVideoTexture     = require("./GLVideoTexture")
var GPUParticleSystem  = require("./GPUParticleSystem")
var GPUParticleEmitter = require("./assemblies/GPUParticleEmitter")
var Attractor          = require("./assemblies/Attractor")
var Camera             = require("./Camera")

var shell             = new GLShell(document.body, 1920 / 1080)
var vidTexture        = new GLVideoTexture(shell.gl)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)

var emitter     = new GPUParticleEmitter(0, 0, 0, shell.gl, vidTexture)
var emitter2    = new GPUParticleEmitter(-1, 1, 0,  shell.gl, vidTexture)
var emitter3    = new GPUParticleEmitter(1, -1, 0,  shell.gl, vidTexture)
var attractor   = new Attractor(0, 0, 0, 100)
var attractor2  = new Attractor(1, 1, 0, 100)
var attractor3  = new Attractor(-1, -1, 0, 100)
var entities    = [emitter, emitter2, emitter3, attractor, attractor2, attractor3]
var gpuEmitters = entities.filter(function (e) { return !!e.gpuEmitter })
var attractors  = entities.filter(function (e) { return !!e.attractive})
var camera      = new Camera(shell.gl, 0, 0, 3.5, 0, 0, 0)

var videoEl = document.getElementById("video")

videoEl.src   = "bunny.mp4"
videoEl.loop  = true
videoEl.muted = true
videoEl.play()

shell.render = function () {
  gpuParticleSystem.render(gpuEmitters, camera)
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, gpuEmitters, attractors)
}
