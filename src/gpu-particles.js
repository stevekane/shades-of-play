var GLShell            = require("./GLShell")
var GPUParticleSystem  = require("./GPUParticleSystem")
var KeyboardManager    = require("./KeyboardManager")
var GamepadManager     = require("./GamepadManager")
var GPUParticleEmitter = require("./assemblies/GPUParticleEmitter")
var Attractor          = require("./assemblies/Attractor")
var PointLight         = require("./assemblies/PointLight")
var Camera             = require("./Camera")
var randUtils          = require("./random-utils")
var randomBound        = randUtils.randomBound
var randomVector       = randUtils.randomVector
var shell              = new GLShell(document.body, 1920 / 1080)
var gpuParticleSystem  = new GPUParticleSystem(shell.gl)
var keyboardManager    = new KeyboardManager(document.body)
var gamepadManager     = new GamepadManager(window, navigator)

var entities = [
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new Attractor(randomVector(3, -1, 1), randomBound(0, 200)),
  new Attractor(randomVector(3, -1, 1), randomBound(0, 200)),
  new Attractor(randomVector(3, -1, 1), randomBound(0, 200)),
  new PointLight(randomVector(3, -1, 1), randomVector(3, 0, 1), 1),
  new PointLight(randomVector(3, -1, 1), randomVector(3, 0, 1), 1),
  new PointLight(randomVector(3, -1, 1), randomVector(3, 0, 1), 1)
]
var gpuEmitters = entities.filter(function (e) { return !!e.gpuEmitter && !!e.physics})
var attractors  = entities.filter(function (e) { return !!e.attractive && !!e.physics})
var lights      = entities.filter(function (e) { return !!e.light && !!e.physics})
var camera      = new Camera(shell.gl, 0, 0, 2.5, 0, 0, 0)

window.gl = shell.gl

shell.render = function () {
  gpuParticleSystem.render(camera, lights, gpuEmitters)
}

shell.update = function (dT) {
  keyboardManager.tick(dT)
  gamepadManager.tick(dT)

  if (gamepadManager.padStates[0].justDowns[0]) console.log("a was pushed")
  if (gamepadManager.padStates[0].isDowns[0]) console.log("a is down")
  if (gamepadManager.padStates[0].justUps[0]) console.log("a was released")
  gpuParticleSystem.update(dT, gpuEmitters, attractors)
}
