export default class Controller {
  constructor(player) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.dash = false;

    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {
      case KEYS.LEFT:
        this.left = key_state;
        break;
      case KEYS.RIGHT:
        this.right = key_state;
        break;
      case KEYS.UP:
        this.up = key_state;
        break;
      case KEYS.DOWN:
        this.down = key_state;
        break;
      case KEYS.DASH:
        this.dash = key_state;
        break;
      default:
        break;
    }
  }
}

const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  DASH: 191
};