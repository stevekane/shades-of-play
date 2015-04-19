var Light   = require("../components/Light")
var Physics = require("../components/Physics")

module.exports = PointLight

function PointLight (position, color, intensity) {
  this.physics = new Physics(position, [0, 0, 0]) 
  this.light   = new Light(color, intensity)
}
