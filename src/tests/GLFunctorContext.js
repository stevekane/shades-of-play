'use strict'

var test             = require("tape")
var GLFunctorContext = require("../GLFunctorContext")

test("it works at all", function (t) {  
  var gl  = {}
  var ctx = new GLFunctorContext(gl)

  t.plan(1)
  t.true(true)

  console.log(ctx)
})
