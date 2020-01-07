export default class Player {
  constructor() {    
    this.width = 32;
    this.height = 32;
    this.x = 144; // center of the canvas
    this.y = 0;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.jumping = 0;
  }
}