export default class Player {
  constructor(ctx, controller) {    
    this.width = this.height = 32;

    // Center of canvas
    this.x = 144;
    // Spawn above the canvas
    this.y = -100;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.jumping = 0;

    this.onCooldown = {
      doubleJump: false,
      dash: false
    };

    this.ctx = ctx;
    this.controller = controller;
  }

  move() {
    // Double jump mechanic
    if (this.controller.up && !this.onCooldown.doubleJump) {
      if (this.jumping === 0) {
        this.yVelocity -= 11;
        this.jumping += 1;
        
        // Set CD on jumping
        this.onCooldown.doubleJump = true;
        setTimeout(() => this.onCooldown.doubleJump = false, 300);
      } else if (this.jumping === 1) {
        // Zero y velocity to allow for another full hop
        this.yVelocity = 0;
        this.yVelocity -= 11;
        this.jumping += 1;
      }
    }

    // Dashing
    if (this.controller.dash && !this.onCooldown.dash) {
      if (this.xVelocity > 0) {
        this.xVelocity = 0;
        this.xVelocity += 6;
      } else {
        this.xVelocity = 0;
        this.xVelocity -= 6;
      }
      this.onCooldown.dash = true;
      setTimeout(() => this.onCooldown.dash = false, 2000);
    } 

    if (this.controller.left) this.xVelocity -= 0.8;
    if (this.controller.right) this.xVelocity += 0.8;
    if (this.controller.down) this.yVelocity += 1.5;

    this.yVelocity += 0.8; // gravity
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.xVelocity *= 0.9; // friction
    // this.yVelocity *= 0.9; // friction

    // if this is falling below floor line
    if (this.y > this.ctx.canvas.height - 16 - this.width) {
      this.jumping = 0;
      this.y = this.ctx.canvas.height - 16 - this.width;
      this.yVelocity = 0;
    }

    // WRAPPING
    // if this is going off the left of the screen
    if (this.x < -this.width) {
      this.x = this.ctx.canvas.width;
    } else if (this.x > this.ctx.canvas.width) {// if this goes past right boundary
      this.x = -this.width;
    }
  }

  draw() {
    // Change player position based on movement options
    this.move();

    this.ctx.fillStyle = "pink";
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    // this.ctx.strokeStyle = "#202830";
    // this.ctx.stroke();
  }
}