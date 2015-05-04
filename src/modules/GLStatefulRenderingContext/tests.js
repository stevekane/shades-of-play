'use strict';

var test                       = require("tape")
var GLStatefulRenderingContext = require("./GLStatefulRenderingContext")
var canvas                     = document.createElement("canvas")

var vSrc = "attribute vec4 point;\n" + 
           "void main () { gl_Position = point; }"
var fSrc = "precision highp float;" +
           "uniform mat4 transform;\n" + 
           "void main () { gl_FragColor = transform * vec4(1.0, 1.0, 1.0, 1.0); }"

test("All state is tracked correctly for shader and program operations", function (t) {
  var ctx = canvas.getContext("webgl")
  var gl  = new GLStatefulRenderingContext(ctx)
  var p   = gl.createProgram()
  var vs  = gl.createShader(gl.ctx.VERTEX_SHADER)
  var fs  = gl.createShader(gl.ctx.FRAGMENT_SHADER)

  window.gl = gl
  gl.shaderSource(vs, vSrc)
  gl.shaderSource(fs, fSrc)
  gl.compileShader(vs)
  gl.compileShader(fs)
  gl.attachShader(p, vs)
  t.same(gl.programs.get(p).attachedShaderCount, 
         gl.ctx.getProgramParameter(p, gl.ctx.ATTACHED_SHADERS),
         "attached shader count is 1")
  gl.attachShader(p, fs)
  t.same(gl.programs.get(p).attachedShaderCount, 
         gl.ctx.getProgramParameter(p, gl.ctx.ATTACHED_SHADERS),
         "attached shader count is 2")
  gl.linkProgram(p)
  gl.validateProgram(p)
  gl.useProgram(p)

  t.true(gl.programs.has(p), "program created and added to context")
  t.true(gl.ctx.isProgram(p), "program recognized by gl context")
  t.same(gl.activeProgram, p, "activeProgram is correctly set")

  t.same(gl.programs.get(p).linked, 
         gl.ctx.getProgramParameter(p, gl.ctx.LINK_STATUS),
         "program link status the same")
  t.same(gl.programs.get(p).validated, 
         gl.ctx.getProgramParameter(p, gl.ctx.VALIDATE_STATUS), 
         "program is validated")

  t.true(gl.shaders.has(vs), "vertex shader added to context")
  t.true(gl.ctx.isShader(vs), "vertex shader recognized by gl context")
  t.true(gl.shaders.get(vs).compiled, "vertex shader recorded as compiled")
  t.true(gl.ctx.getShaderParameter(vs, gl.ctx.SHADER_TYPE), "vs type stored correctly")
  t.true(gl.ctx.getShaderParameter(vs, gl.ctx.COMPILE_STATUS), "vs compile correct")
  t.same(gl.shaders.get(vs).src, gl.ctx.getShaderSource(vs), "vs shader src correct")

  t.true(gl.shaders.has(fs), "fragment shader added to context")
  t.true(gl.ctx.isShader(fs), "fragment shader recognized by gl context")
  t.true(gl.shaders.get(fs).compiled, "fragment shader recorded as compiled")
  t.true(gl.ctx.getShaderParameter(fs, gl.ctx.SHADER_TYPE), "fs type stored correctly")
  t.true(gl.ctx.getShaderParameter(fs, gl.ctx.COMPILE_STATUS), "fs compile correct")
  t.same(gl.shaders.get(fs).src, gl.ctx.getShaderSource(fs), "fs shader src correct")

  t.same(gl.shaders.get(vs).type, ctx.VERTEX_SHADER, "vertex shader type correct")
  t.same(gl.shaders.get(fs).type, ctx.FRAGMENT_SHADER, "fragment shader type correct")
  t.true(gl.shaders.get(vs).compiled, "vertex shader compiled")
  t.true(gl.shaders.get(fs).compiled, "fragment shader compiled")
  t.same(gl.programs.get(p).attachedShaders.vertex, vs, "vertex shader attached")
  t.same(gl.programs.get(p).attachedShaders.fragment, fs, "fragment shader attached")
  t.same(gl.programs.get(p).attachedShaderCount, 
         gl.ctx.getProgramParameter(p, gl.ctx.ATTACHED_SHADERS),
         "attached shader count is correct")

  t.same(gl.programs.get(p).activeUniformsCount, 
         gl.ctx.getProgramParameter(p, gl.ctx.ACTIVE_UNIFORMS),
         "num active uniforms stored correctly") 
  t.same(gl.programs.get(p).activeAttributesCount, 
         gl.ctx.getProgramParameter(p, gl.ctx.ACTIVE_ATTRIBUTES),
         "num active attributes stored correctly") 

  gl.deleteShader(vs)
  t.false(gl.shaders.has(vs), "vertex shader removed from context")

  gl.deleteShader(fs)
  t.false(gl.shaders.has(vs), "fragment shader removed from context")

  gl.deleteProgram(p)
  t.false(gl.programs.has(p), "program deleted from context")

  t.end()
})
