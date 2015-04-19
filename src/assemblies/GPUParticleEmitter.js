var GPUEmitter = require("../components/GPUEmitter")
var Physics    = require("../components/Physics")

module.exports = GPUParticleEmitter

// GLContext -> [x,y,z] -> [r,g,b,a] -> GPUParticleEmitter
function GPUParticleEmitter (gl, position, color) {
  this.physics    = new Physics(position, [0, 0, 0])
  this.gpuEmitter = new GPUEmitter(gl, color)
}
