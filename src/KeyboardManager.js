module.exports = KeyboardManager

var KEY_COUNT = 256

function KeyboardManager (element) {
  var isDowns       = new Array(KEY_COUNT)
  var justDowns     = new Array(KEY_COUNT)
  var justUps       = new Array(KEY_COUNT)
  var downDurations = new Array(KEY_COUNT)
  
  var handleKeyDown = function (e) {
    var keyCode = e.keyCode

    justDowns[keyCode] = !isDowns[keyCode]
    isDowns[keyCode]   = true
  }

  var handleKeyUp = function (e) {
    var keyCode = e.keyCode

    justUps[keyCode]   = true
    isDowns[keyCode]   = false
  }

  var handleBlur = function () {
    var i = -1

    while (++i < KEY_COUNT) {
      isDowns[i]   = 0
      justDowns[i] = 0
      justUps[i]   = 0
    }
  }

  this.isDowns         = isDowns
  this.justUps         = justUps
  this.justDowns       = justDowns
  this.downDurations   = downDurations
  this.keydownListener = element.addEventListener("keydown", handleKeyDown)
  this.keyupListener   = element.addEventListener("keyup", handleKeyUp)
  this.blurListener    = element.addEventListener("blur", handleBlur)

  //assign tabIndex if there isn't one to allow element to be focused
  element.tabIndex = element.tabIndex === -1 ? 0 : element.tabIndex

  this.tick = function (dT) {
    var i = -1

    while (++i < KEY_COUNT) {
      justDowns[i] = false 
      justUps[i]   = false
      if (isDowns[i]) downDurations[i] += dT
      else            downDurations[i] = 0
    }
  }

  this.detach = function () {
    element.removeEventListener("keydown", this.keydownListener)
    element.removeEventListener("keyup", this.keyupListener)
    element.removeEventListener("blur", this.blurListener)
  }
}
