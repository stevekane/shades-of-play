var glslify       = require("glslify")
var GLProgram     = require("./GLProgram")
var GLShell       = require("./GLShell")
var GPUEmitter    = require("./GPUEmitter")
var ScreenQuad    = require("./ScreenQuad")
var shell         = new GLShell(document.body, 1920 / 1080)

shell.render = function () {
  //console.log("render")
}

shell.update = function (dT) {
  //console.log(dT)
}
