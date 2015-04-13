var GLShell           = require("./GLShell")
var GPUEmitter        = require("./GPUEmitter")
var GLVideoTexture    = require("./GLVideoTexture")
var GPUParticleSystem = require("./GPUParticleSystem")

var shell             = new GLShell(document.body, 1920 / 1080)
var vidTexture        = new GLVideoTexture(shell.gl)
var emitter           = new GPUEmitter(shell.gl, 0, 0, 0, vidTexture)
var gpuParticleSystem = new GPUParticleSystem(shell.gl)
var emitters          = [emitter]
var videoEl           = document.getElementById("video")
var getUserMedia      = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

videoEl.addEventListener("canplaythrough", function () {
  videoEl.play()
}, true)

videoEl.addEventListener("ended", function () {
  console.log("done")
}, true)

function withCam (stream) {
  videoEl.src = window.URL.createObjectURL(stream)
  videoEl.onloadedmetadata = function () {
    videoEl.play() 
  }
}

function withoutCam () {
  console.log("we couldn't get access to your webcam")
}

getUserMedia.call(navigator, {audio: true, video: true}, withCam, withoutCam)


shell.render = function () {
  var gl = this.gl

  //just a quick hack to ensure camera is ready
  if (videoEl.readyState === 4) {
    gl.activeTexture(gl.TEXTURE0 + 10)
    gl.bindTexture(gl.TEXTURE_2D, emitter.sourceTexture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                  gl.UNSIGNED_BYTE, videoEl)
    gpuParticleSystem.render(emitters)
  }
}

shell.update = function (dT) {
  gpuParticleSystem.update(dT, emitters)
}
