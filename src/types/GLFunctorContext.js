'use strict'
var functions = require("./functions")
var remove    = functions.remove

module.exports = GLFunctorContext

function GLFunctorContext (gl) {
  this.gl = gl

  this.programs      = []
  this.activeProgram = null

  this.shaders = []

  this.buffers     = []
  this.boundBuffer = null

  this.framebuffers     = []
  this.boundFramebuffer = null

  this.viewportSize = [0, 0]

  this.textures          = []
  this.activeTextureUnit = 0
  this.textureUnits      = []

  //PROGRAMS
  this.createProgram = function (vs, fs) {
    var program = this.gl.createProgram(vs, fs) 

    this.programs.push(program)
    return program
  }

  this.deleteProgram = function (program) {
    remove(this.programs, program)
    this.gl.deletProgram(program) 
  }

  this.useProgram = function (program) {
    this.gl.useProgram(program) 
    this.activeProgram = program
  }

  //SHADERS
  this.createShader = function (type) {
    var shader = this.gl.createShader(type) 

    this.shaders.push(shader)
    return shader
  }

  this.deleteShader = function (shader) {
    remove(this.shaders, shader)
    this.gl.deleteShader(shader)
  }

  //BUFFERS
  this.createBuffer = function () {
    var buffer = this.gl.createBuffer() 

    this.buffers.push(buffer)
    return buffer
  }

  this.deleteBuffer = function (buffer) {
    remove(this.buffers, buffer)
    this.gl.deleteBuffer(buffer)
  }

  this.bindBuffer = function (target, buffer) {
    this.gl.bindBuffer(target, buffer) 
    this.boundBuffer = buffer
  }
}
