const P1_KEYS = {
  LEFT: 65,
  RIGHT: 68,
  UP: 87,
  DOWN: 83,
  DASH: 86
};

const P2_KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  DASH: 191,
  TAG: 190
};

export default class Controller {
  constructor() {
    // this.leftPlayerOne = false;
    // this.rightPlayerOne = false;
    // this.upPlayerOne = false;
    // this.downPlayerOne = false;
    // this.dashPlayerOne = false;
    // this.tagPlayerOne = false;

    // this.leftPlayerTwo = false;
    // this.rightPlayerTwo = false;
    // this.upPlayerTwo = false;
    // this.downPlayerTwo = false;
    // this.dashPlayerTwo = false;

    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {
      case P1_KEYS.LEFT:
        this.leftP1 = key_state;
        break;
      case P1_KEYS.RIGHT:
        this.rightP1 = key_state;
        break;
      case P1_KEYS.UP:
        this.upP1 = key_state;
        break;
      case P1_KEYS.DOWN:
        this.downP1 = key_state;
        break;
      case P1_KEYS.DASH:
        this.dashP1 = key_state;
        break;
      case P1_KEYS.TAG:
        this.tagP1 = key_state;
        break;

      case P2_KEYS.LEFT:
        this.leftP2 = key_state;
        break;
      case P2_KEYS.RIGHT:
        this.rightP2 = key_state;
        break;
      case P2_KEYS.UP:
        this.upP2 = key_state;
        break;
      case P2_KEYS.DOWN:
        this.downP2 = key_state;
        break;
      case P2_KEYS.DASH:
        this.dashP2 = key_state;
        break;

      case 82:
        this.restart = key_state;
        break;

      default:
        break;
    }
  }
}