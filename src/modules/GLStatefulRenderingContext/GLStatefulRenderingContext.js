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

function ShaderState (type) {
  this.type     = type
  this.src      = ""
  this.compiled = false
}

function ProgramState () {
  this.attachedShaders = {
    vertex:   null,
    fragment: null
  }
  this.linked     = false
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
    var numUniforms
    var numAttributes
    var uName
    var aName

    //TODO: Should cases like this throw an error?
    if (!pState) return

    ctx.linkProgram(program)

    numAttributes = ctx.getProgramParameter(program, ctx.ACTIVE_ATTRIBUTES)
    numUniforms   = ctx.getProgramParameter(program, ctx.ACTIVE_UNIFORMS)

    for (var i = 0; i < numAttributes; ++i) {
      aName                    = ctx.getActiveAttrib(program, i).name
      pState.attributes[aName] = ctx.getAttribLocation(program, aName)
    }

    for (var j = 0; j < numUniforms; ++j) {
      uName                  = ctx.getActiveUniform(program, j).name
      pState.uniforms[uName] = ctx.getUniformLocation(program, uName)
    }

    pState.linked = true
  }

  this.attachShader = function (program, shader) {
    var pState = this.programs.get(program)
    var sState = this.shaders.get(shader)  

    if      (sState.type === ctx.VERTEX_SHADER && 
             pState.attachedShaders.vertex !== shader) {
      ctx.attachShader(program, shader)
      pState.attachedShaders.vertex = shader
    }
    else if (sState.type === ctx.FRAGMENT_SHADER && 
             pState.attachedShaders.fragment !== shader) {
      ctx.attachShader(program, shader)
      pState.attachedShaders.fragment = shader
    }
  }
  
  proxyAll(this, ctx, [
    "bindAttribLocation",
  ])
  // PROGRAMS -- END
  
  // SHADERS
  this.createShader = function createShader (type) {
    var shader = ctx.createShader(type)

    this.shaders.set(shader, new ShaderState(type))
    return shader
  }

  this.deleteShader = function (shader) {
    if (this.shaders.delete(shader)) ctx.deleteShader(shader)
  }

  this.compileShader = function compileShader (shader) {
    var sState   = this.shaders.get(shader)

    if (!sState.compiled) {
      ctx.compileShader(shader) 
      sState.compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)
    }
  }

  this.shaderSource = function (shader, src) {
    var sState = this.shaders.get(shader)

    if (src !== sState.src) {
      ctx.shaderSource(shader, src) 
      sState.src = src
    }
  }

  proxyAll(this, ctx, [
    "getShaderSource"
  ])
  // SHADERS -- END

  this.ctx = ctx
};
