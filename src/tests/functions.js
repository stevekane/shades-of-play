var test = require("tape")
var fns  = require("../functions")
var construct = fns.construct
var fill      = fns.fill

function Person (name, age) {
  this.name = name
  this.age  = age 
}


test("construct works", function (t) {
  var res = construct(Person, ["steve", 5])

  t.plan(3)
  t.same(res.name, "steve")
  t.same(res.age, 5)
  t.true(res instanceof Person)
})


test("fill returns array full of ctor", function (t) {
  var people = fill(10, Person, ["generic", 10])

  t.plan(4)
  t.same(people.length, 10)
  t.true(people.every(function (p) { return p instanceof Person }))
  t.true(people.every(function (p) { return p.age === 10}))
  t.true(people.every(function (p) { return p.name === "generic"}))
})
