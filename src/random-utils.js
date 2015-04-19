module.exports.randomBound  = randomBound
module.exports.randomVector = randomVector

function randomBound (min, max) {
  return Math.random () * (max - min) + min
}

function randomVector (vectorSize, min, max) {
  for (var vec = [], i = 0; i < vectorSize; i++) vec.push(randomBound(min, max))

  return vec
}
