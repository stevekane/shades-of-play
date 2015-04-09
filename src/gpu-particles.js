var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var emitter           = new GPUEmitter(shell.gl, 0, 0, 0)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

//shell.render = function () {
//  gpuParticleSystem.render(emitters)
//}
//
//shell.update = function (dT) {
//  gpuParticleSystem.update(dT, emitters)
//}

gpuParticleSystem.update(1, emitters)
gpuParticleSystem.render(emitters)
gpuParticleSystem.update(1, emitters)
gpuParticleSystem.render(emitters)
gpuParticleSystem.update(1, emitters)
gpuParticleSystem.render(emitters)
debugger
//gpuParticleSystem.render(emitters)
//gpuParticleSystem.update(dT, emitters)
//gpuParticleSystem.render(emitters)
