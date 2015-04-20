module.exports = GamepadManager 

var GAMEPAD_COUNT = 4
var BUTTON_COUNT  = 16

function GamepadState () {
  this.connected = false
  this.axes      = new Array(GAMEPAD_COUNT)
  this.isDowns   = new Array(BUTTON_COUNT) 
  this.justDowns = new Array(BUTTON_COUNT) 
  this.justUps   = new Array(BUTTON_COUNT) 
}

function GamepadManager (win, nav) {
  var getGamePads = (nav.getGamepads || nav.webkitGetGamepads).bind(nav)

  this.handles   = new Array(GAMEPAD_COUNT)
  this.padStates = [
    new GamepadState,
    new GamepadState,
    new GamepadState,
    new GamepadState
  ]

  this.tick = function (dT) {
    var gps = getGamePads()
    var i   = -1 
    var j   = -1
    var ps

    while (++i < GAMEPAD_COUNT) {
      if (gps[i]) {
        ps = this.padStates[i]
        ps.connected = true
        ps.axes      = gps[i].axes 
        while (++j < BUTTON_COUNT) {
          ps.justDowns[j] = gps[i].buttons[j].pressed && !ps.isDowns[j]
          ps.justUps[j]   = ps.isDowns[j] && !gps[i].buttons[j].pressed
          ps.isDowns[j]   = gps[i].buttons[j].pressed
        }
      }
    }
  } 
}
