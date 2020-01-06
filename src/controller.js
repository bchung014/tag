import Player from './player';

export default class Controller {
  constructor(player) {
    this.player = player;

    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    switch(event.keyCode) {
      case 38:
        this.player.move('up');
        break;
      case 40:
        this.player.move('down');
        break;
      case 37:
        this.player.move('left');
        break;
      case 39:
        this.player.move('right');
        break;
      default:
        break;
    }

    // if (event.keyCode === 39) {
    //   this.player.move('right');
    // } else if (event.keyCode === 37) {
    //   this.player.move('left');
    // }
  }

}