'use strict'

var http       = require("http")
var fs         = require("fs")
var nodeStatic = require("node-static")

var PORT = process.env.PORT || 4003

var fileServer = new nodeStatic.Server("./public")
var httpServer = http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res) 
  }).resume()
})
httpServer.listen(PORT)
