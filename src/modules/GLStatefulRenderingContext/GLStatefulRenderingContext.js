'use strict';

module.exports = GLStatefulRenderingContext

function proxy (outer, inner, fnName) {
  var fn = function (a1, a2, a3, a4, a5, a6, a7) {
    return inner[fnName](a1, a2, a3, a4, a5, a6, a7)
  }

  outer[fnName] = fn
}

function proxyAll (outer, inner, fnNames) {
  for (var i = 0; i < fnNames.length; i++) {
    proxy(outer, inner, fnNames[i])
  }
}

function ShaderState () {
  this.src      = ""
  this.compiled = false
}

function ProgramState () {
  this.attachedShaders = {
    vertex:   null,
    fragment: null
  }
  this.linked     = false
  this.compiled   = false
  this.uniforms   = {}
  this.attributes = {}
}

// TODO: implement when ready
function RenderBufferState () {}

function GLStatefulRenderingContext (ctx) {
  this.shaders  = new WeakMap
  this.programs = new WeakMap

  // PROGRAMS
  this.createProgram = function () {
    var program = ctx.createProgram()

    this.programs.set(program, new ProgramState)
    return program
  }

  this.deleteProgram = function (program) {
    if (this.programs.delete(program)) ctx.deleteProgram(program)
  }

  this.linkProgram = function (program) {
    var pState = this.programs.get(program)

    //TODO: Should cases like this throw an error?
    if (!pState) return

    ctx.linkProgram(program)
    pState.linked = true
    //TODO: Should we now also create hashes of attrib and uniform locations?
  }
  
  proxyAll(this, ctx, [
    "bindAttribLocation",
  ])
  // PROGRAMS -- END
  
  // SHADERS
  this.createShader = function (type) {
    var shader = ctx.createShader(type)

    this.shaders.set(shader, new ShaderState)
    return shader
  }

  this.deleteShader = function (shader) {
    if (this.shaders.delete(shader)) ctx.deleteShader(shader)
  }

  proxyAll(this, ctx, [
    "shaderSource",
    "attachShader",
    "getShaderSource"
  ])
  // SHADERS -- END

  this.ctx = ctx
};
