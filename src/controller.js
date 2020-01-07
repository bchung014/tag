import Player from './player';

export default class Controller {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;

    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        this.left = key_state;
        break;
      case 39: // right key
        this.right = key_state;
        break;
      case 38: // up key
        this.up = key_state;
        break;
      default:
        break;
    }
  }
}