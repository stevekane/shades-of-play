var Physics    = require("../components/Physics")
var Attractive = require("../components/Attractive")

module.exports = Attractor

function Attractor (x, y, z, mass) {
  this.physics      = new Physics(x, y, z, 0, 0, 0)
  this.physics.mass = mass
  this.attractive   = new Attractive(true)
}
