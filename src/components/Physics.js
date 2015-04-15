module.exports = Physics

function Physics (x, y, z, dx, dy, dz) {
  this.mass         = 1
  this.acceleration = [0, 0, 0]
  this.position     = [x, y, z]
  this.velocity     = [dx, dy, dz]
  this.scale        = [1, 1, 1]
  this.rotation     = [0, 0, 0]
}
