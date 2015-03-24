var http        = require("http")
var path        = require("path")
var fs          = require("fs")
var static      = require("node-static")
var SIO         = require("socket.io")
var optionalDir = process.argv[2]
var targetDir   = optionalDir || path.join(__dirname, "shaders")

var PORT          = 4003
var ENCODING      = "utf8"
var IGNORED_CHARS = [
  "~",
  ".swp",
  ".swo",
  ".orig"
]

var VALID_EXTENSIONS = [
  "glsl",
  "shader",
  "fragment",
  "frag",
]

var fileServer = new static.Server("./public")
var httpServer = http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res) 
  }).resume()
})
var socketServer = SIO(httpServer)

function shouldIgnore (strList, str) {
  for (var i = 0; i < strList.length; i++) {
    if (str.indexOf(strList[i]) >= 0) return true
  }
  return false
}

fs.watch(targetDir, function (_, name) {
  if (!name)                                 return console.log("watch error")
  if (shouldIgnore(IGNORED_CHARS, name))     return console.log("ignored " + name)
  if (!shouldIgnore(VALID_EXTENSIONS, name)) return console.log("ignored " + name)

  var filePath = path.join(targetDir, name)

  fs.readFile(filePath, {encoding: ENCODING}, function (err, data) {
    if (err) return console.log(err)
      else     return socketServer.emit("sourceChange", {
        fileName: name,
        source:   data
      })
  })
})

httpServer.listen(PORT)
