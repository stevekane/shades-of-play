var GLShell            = require("./GLShell")
var GLVideoTexture     = require("./GLVideoTexture")
var GPUParticleSystem  = require("./GPUParticleSystem")
var GPUParticleEmitter = require("./assemblies/GPUParticleEmitter")
var Attractor          = require("./assemblies/Attractor")
var Camera             = require("./Camera")

var shell             = new GLShell(document.body, 1920 / 1080)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)

var emitter     = new GPUParticleEmitter(0, 0, 0, shell.gl, [0, 0, 1, 0])
var emitter2    = new GPUParticleEmitter(-1, 1, 0,  shell.gl, [1, 0, 0, 0])
var emitter3    = new GPUParticleEmitter(1, -1, 0,  shell.gl, [0, 1, 0, 0])
var attractor   = new Attractor(0, 0, 0, 150)
var attractor2  = new Attractor(1, 1, 0, 140)
var attractor3  = new Attractor(-1, -1, 0, 100)
var entities    = [emitter, emitter2, emitter3, attractor, attractor2, attractor3]
var gpuEmitters = entities.filter(function (e) { return !!e.gpuEmitter })
var attractors  = entities.filter(function (e) { return !!e.attractive})
var camera      = new Camera(shell.gl, 0, 0, 3.5, 0, 0, 0)

shell.render = function () {
  gpuParticleSystem.render(gpuEmitters, camera)
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, gpuEmitters, attractors)
}
