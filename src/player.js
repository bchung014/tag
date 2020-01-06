export default class Player {
  constructor() {
    this.model = new createjs.Bitmap("./assets/mario.png");
    this.model.x = this.model.y = 0;
  }

  move(direction) {
    switch(direction) {
      case 'up':
        this.model.y -= 5;
        break;
      case 'down' :
        this.model.y += 5;
        break;
      case 'left':
        this.model.x -= 5;
        break;
      case 'right':
        this.model.x += 5;
        break;
      default:
        break;
    }
  }
  
}