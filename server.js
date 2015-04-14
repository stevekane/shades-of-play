'use strict'

let http       = require("http")
let fs         = require("fs")
let nodeStatic = require("node-static")

const PORT = 4003

let fileServer = new nodeStatic.Server("./public")
let httpServer = http.createServer(function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res) 
  }).resume()
})
httpServer.listen(PORT)
