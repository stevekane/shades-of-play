module.exports.resizeWithRatio = resizeWithRatio

function resizeWithRatio (ratio, reference, subject) {
  var targetAspect = reference.clientWidth / reference.clientHeight
  var newWidth     = ratio < targetAspect
    ? reference.clientHeight * ratio
    : reference.clientWidth
  var newHeight    = newWidth / ratio

  subject.clientWidth  = newWidth
  subject.clientHeight = newHeight
  subject.width        = newWidth
  subject.height       = newHeight
}
