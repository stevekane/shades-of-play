var GPUEmitter = require("../components/GPUEmitter")
var Physics    = require("../components/Physics")

module.exports = GPUParticleEmitter

function GPUParticleEmitter (x, y, z, gl, sourceTexture) {
  this.physics    = new Physics(x, y, z, 0, 0, 0)
  this.gpuEmitter = new GPUEmitter(gl, sourceTexture)
}
