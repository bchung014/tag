export default class Player {
  constructor(controller) {    
    this.width = this.height = 32;

    // Center of canvas
    this.x = 144;
    // Spawn above the canvas
    this.y = -100;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.jumping = 0;

    this.onCooldown = false;

    this.controller = controller;
  }

  move() {
    // Double jump mechanic
    if (this.controller.up && !this.onCooldown) {
      if (this.jumping === 0) {
        this.yVelocity -= 10;
        this.jumping += 1;
        
        this.onCooldown = true;
        setTimeout(() => this.onCooldown = false, 300);
      } else if (this.jumping === 1) {
        this.yVelocity = 0;
        this.yVelocity -= 10;
        this.jumping += 1;
      }

    }

    if (this.controller.left) this.xVelocity -= 0.5;
    if (this.controller.right) this.xVelocity += 0.5;

    this.yVelocity += 0.5; // gravity
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.xVelocity *= 0.9; // friction
    // this.yVelocity *= 0.9; // friction

    // if this is falling below floor line
    if (this.y > 180 - 16 - 32) {
      this.jumping = 0;
      this.y = 180 - 16 - 32;
      this.yVelocity = 0;
    }

    // if this is going off the left of the screen
    if (this.x < -32) {
      this.x = 320;
    } else if (this.x > 320) {// if this goes past right boundary
      this.x = -32;
    }
  }

  draw(ctx) {
    // Change player position based on movement options
    this.move();

    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    // ctx.strokeStyle = "#202830";
    // ctx.stroke();
  }
}