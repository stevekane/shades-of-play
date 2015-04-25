'use strict';

var test                       = require("tape")
var GLStatefulRenderingContext = require("./GLStatefulRenderingContext")
var canvas                     = document.createElement("canvas")

var vSrc = "void main () { gl_Position = vec4(1.0, 1.0, 1.0, 1.0); }"
var fSrc = "void main () { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }"

test("Program and shader related functions store state correctly", function (t) {
  var ctx = canvas.getContext("webgl")
  var gl  = new GLStatefulRenderingContext(ctx)
  var p   = gl.createProgram()
  var vs  = gl.createShader(gl.ctx.VERTEX_SHADER)
  var fs  = gl.createShader(gl.ctx.FRAGMENT_SHADER)

  t.true(gl.programs.has(p), "program created and added to context")

  gl.deleteProgram(p)
  t.false(gl.programs.has(p), "program deleted from context")

  t.true(gl.shaders.has(vs), "vertex shader added to context")
  t.true(gl.shaders.has(fs), "fragment shader added to context")

  gl.deleteShader(vs)
  t.false(gl.shaders.has(vs), "vertex shader removed from context")

  gl.deleteShader(fs)
  t.false(gl.shaders.has(vs), "fragment shader removed from context")

  t.end()
})


test("proxying through to underlying gl context works", function (t) {
  var ctx = canvas.getContext("webgl")
  var gl  = new GLStatefulRenderingContext(ctx)
  var p   = gl.createProgram()
  var vs  = gl.createShader(gl.ctx.VERTEX_SHADER)
  var fs  = gl.createShader(gl.ctx.FRAGMENT_SHADER)

  gl.shaderSource(vs, vSrc)
  gl.shaderSource(fs, fSrc)
  gl.compileShader(vs)
  gl.compileShader(fs)
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)

  t.same(gl.shaders.get(vs).src, vSrc, "vertex shader src correct")
  t.same(gl.shaders.get(fs).src, fSrc, "fragment shader src correct")
  t.same(gl.shaders.get(vs).type, ctx.VERTEX_SHADER, "vertex shader type correct")
  t.same(gl.shaders.get(fs).type, ctx.FRAGMENT_SHADER, "fragment shader type correct")
  t.true(gl.shaders.get(vs).compiled, "vertex shader compiled")
  t.true(gl.shaders.get(fs).compiled, "fragment shader compiled")
  t.same(gl.programs.get(p).attachedShaders.vertex, vs, "vertex shader attached")
  t.same(gl.programs.get(p).attachedShaders.fragment, fs, "fragment shader attached")
  t.end()
})
