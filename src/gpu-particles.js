var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var emitter           = new GPUEmitter(shell, 10, 0, 0, 0)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]

window.emitter = emitter
window.shell   = shell
window.system = gpuParticleSystem

shell.render = function () {
  gpuParticleSystem.render(emitters)
}

shell.update = function (dT) {
  //gpuParticleSystem.update(dT, emitters)
}
