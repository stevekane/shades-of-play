module.exports.remove    = remove
module.exports.fill      = fill
module.exports.construct = construct

function remove (list, obj) {
  var i = list.indexOf(obj) 

  if (i !== -1) list.splice(i, 1)
  return list
}

function construct (Ctor, args) {
  switch (args.length) {
    case 0: return new Ctor 
    case 1: return new Ctor(args[0])
    case 2: return new Ctor(args[0], args[1])
    case 3: return new Ctor(args[0], args[1], args[2])
    case 4: return new Ctor(args[0], args[1], args[2], args[3])
    case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4])
    case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5])
    default: throw new Error("Too many arguments for our crappy ass function")
  }
}

function fill (count, ctor, args) {
  var ar = []

  for (var i = 0; i < count; i++) {
    ar.push(construct(ctor, args))
  }
  return ar
}
