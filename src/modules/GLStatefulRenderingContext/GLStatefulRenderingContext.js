'use strict';

module.exports = GLStatefulRenderingContext

function proxyValue (outer, inner, propName) {
  Object.defineProperty(outer, propName, {
    get: function () { return inner[propName] } 
  })
}

function proxyFn (outer, inner, propName) {
  outer[propName] = function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    return inner[propName](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
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
  this.linked                = false
  this.validated             = false
  this.activeUniformsCount   = 0
  this.activeAttributesCount = 0
  this.uniforms              = {}
  this.attributes            = {}

  Object.defineProperty(this, "attachedShaderCount", {
    get: function () {
      return (this.attachedShaders.vertex ? 1: 0) + 
             (this.attachedShaders.fragment ? 1 : 0)
    }
  })
}

// TODO: implement when ready
function RenderBufferState () {}

function GLStatefulRenderingContext (ctx) {
  this.shaders       = new WeakMap
  this.programs      = new WeakMap
  this.activeProgram = null
  this.ctx           = ctx

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

    ctx.linkProgram(program)

    numAttributes                = ctx.getProgramParameter(program, ctx.ACTIVE_ATTRIBUTES)
    numUniforms                  = ctx.getProgramParameter(program, ctx.ACTIVE_UNIFORMS)
    pState.activeAttributesCount = numAttributes
    pState.activeUniformsCount   = numUniforms

    for (var i = 0; i < numAttributes; ++i) {
      aName                    = ctx.getActiveAttrib(program, i).name
      pState.attributes[aName] = ctx.getAttribLocation(program, aName)
    }

    for (var j = 0; j < numUniforms; ++j) {
      uName                  = ctx.getActiveUniform(program, j).name
      pState.uniforms[uName] = ctx.getUniformLocation(program, uName)
    }

    pState.linked = ctx.getProgramParameter(program, ctx.LINK_STATUS)
  }

  this.validateProgram = function (program) {
    var pState = this.programs.get(program) 

    if (!pState.validated) {
      ctx.validateProgram(program)  
      pState.validated = ctx.getProgramParameter(program, ctx.VALIDATE_STATUS)
    }
  }

  this.useProgram = function (program) {
    if (this.activeProgram !== program) {
      ctx.useProgram(program)
      this.activeProgram = program
    }
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

  this.detachShader = function (program, shader) {
    var pState     = this.programs.get(program)
    var sState     = this.shaders.get(shader)
    var shaderType = sState.type === ctx.VERTEX_SHADER ? vertex : fragment

    if (pState.attachedShaders[shaderType] === shader) {
      ctx.detachShader(program, shader)
      pState.attachedShaders[shaderType] = null
    }
  }
  
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

  //proxy anything NOT defined above through to the underlying context.
  for (var prop in ctx) {
    if (!this[prop]) {
      if (ctx[prop] instanceof Function) proxyFn(this, ctx, prop) 
      else                               proxyValue(this, ctx, prop)
    }
  }
  // SHADERS -- END
}
