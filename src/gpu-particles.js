var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var emitter           = new GPUEmitter(shell, 10e5, 1, 1, 1)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

window.emitter = emitter
window.shell   = shell

shell.render = function () {
  //gpuParticleSystem.render()
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, emitters)
}
