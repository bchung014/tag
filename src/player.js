export default class Player {
  constructor() {    
    this.width = 32;
    this.height = 32;
    this.x = 144; // center of the canvas
    this.y = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.jumping = true;
  }

  move(direction) {



    // switch(direction) {
    //   case 'up':
    //     this.model.y -= 5;
    //     break;
    //   case 'down' :
    //     this.model.y += 5;
    //     break;
    //   case 'left':
    //     this.model.x -= 5;
    //     break;
    //   case 'right':
    //     this.model.x += this.xVel;
    //     break;
    //   default:
    //     break;
    // }
  }
  
}