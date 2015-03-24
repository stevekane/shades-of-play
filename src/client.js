var GLProgram       = require("./GLProgram")
var GLFrameBuffer   = require("./GLFrameBuffer")
var domUtils        = require("./dom-utils")
var resizeWithRatio = domUtils.resizeWithRatio
var socket          = io.connect("http://localhost:4003")
var vertexSource    = document.getElementById("vertexSource").text
var fragmentSource  = document.getElementById("fragmentSource").text

var POLL_RATE = 250 //ms

var STATE = {
  activeSource:    "",
  candidateSource: "",
  activeGLProgram: null,
  errors:          ""
}

var DOMNODES = {
  status: document.getElementById("status"),
  source: document.getElementById("source"),
  errors: document.getElementById("errors"),
  canvas: document.getElementById("canvas")
}

var gl = DOMNODES.canvas.getContext("webgl")

window.gl = gl

//TODO: DISABLED for GPU particle dev
//socket.on("sourceChange", function (data) {
//  STATE.candidateSource = data.source
//})

function drawUI () {
  DOMNODES.status.innerHTML = socket.connected ? "connected" : "disconnected"
  DOMNODES.source.innerHTML = STATE.activeSource
  DOMNODES.errors.innerHTML = STATE.errors
}

function updateSource (gl, vSrc, fSrc) {
  if (!STATE.candidateSource) return

  var program = new GLProgram.fromSource(gl, vSrc, fSrc)

  if (program instanceof Error) {
    STATE.errors          = program.message
    STATE.activeSource    = STATE.activeSource
    STATE.activeGLProgram = STATE.activeGLProgram
  } else {
    STATE.errors          = ""
    STATE.activeSource    = STATE.candidateSource
    STATE.activeGLProgram = program
    gl.useProgram(program.program)
  }
  STATE.candidateSource = ""
}

var squareVerts = new Float32Array([
  1, 1, -1, 1, -1, -1,
  1, 1, -1, -1, 1, -1
])

function makeRender (gl) {
  var squareBuffer = gl.createBuffer()
  var fbo          = new GLFrameBuffer(gl, 100, 100)

  gl.enable(gl.BLEND)
  gl.enable(gl.CULL_FACE)
  gl.viewport(0, 0, DOMNODES.canvas.clientWidth, DOMNODES.canvas.clientHeight)
  gl.clearColor(1.0, 1.0, 1.0, 0.0)
  gl.colorMask(true, true, true, true)
  gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, squareVerts, gl.STATIC_DRAW)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(0) //TODO: this seems bullshitty
  return function render () {
    if (STATE.activeGLProgram) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.clearColor(1.0, 0.4, 0.8, 0.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    drawUI()  
    requestAnimationFrame(render)
  }
}

function makeUpdate () {
  STATE.activeSource    = ""
  STATE.candidateSource = fragmentSource

  return function update () {
    updateSource(gl, vertexSource, STATE.candidateSource) 
  }
}

requestAnimationFrame(makeRender(gl))
setInterval(makeUpdate(), POLL_RATE)
window.addEventListener("DOMContentLoaded", function () {
  resizeWithRatio(1, document.body, DOMNODES.canvas)
  gl.viewport(0, 0, DOMNODES.canvas.clientWidth, DOMNODES.canvas.clientHeight)
})
window.addEventListener("resize", function () {
  resizeWithRatio(1, document.body, DOMNODES.canvas)
  gl.viewport(0, 0, DOMNODES.canvas.clientWidth, DOMNODES.canvas.clientHeight)
})
