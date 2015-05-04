var Clock            = require("./Clock")
var resizeWithRatio = require("./dom-utils").resizeWithRatio

module.exports = GLShell

function GLShell (gl, parentNode, aspectRatio) {
  var clock = new Clock

  var render = function () {
    resizeWithRatio(this.aspectRatio, this.parentNode, this.gl.canvas)
    this.render() 
    requestAnimationFrame(render)
  }.bind(this)

  var update = function () {
    this.clock.tick()
    this.update(this.clock.dT) 
  }.bind(this)

  this.parentNode  = parentNode
  this.gl          = gl
  this.aspectRatio = aspectRatio
  this.clock       = clock

  parentNode.appendChild(gl.canvas)
  requestAnimationFrame(render)
  setInterval(update, 25)
}

GLShell.prototype.render = function () {
  //over write this with your own render function
}

//for convenience, the time since last update is passed as a paramater
GLShell.prototype.update = function (dT) {
  //overwrite this with your own update function
}
