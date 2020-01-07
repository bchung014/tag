const CONSTANTS = {
  SPEED: 2.0,
  JUMP_HEIGHT: 20.0,
  FASTFALL_SPEED: 5.0,
  DASH_SPEED: 40.0,
  GRAVITY: 1.3,
  FRICTION: 0.9,
};


export default class Player {
  constructor(ctx, controller) {
    this.image = this.getImage();

    this.width = this.image.width;
    this.height = this.image.height;

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

    this.frameCount = 0;
  }

  getImage() {
    const image = new Image();
    image.src = './assets/shrek.png';
    return image;
  }

  move() {
    // Double jump mechanic
    if (this.controller.up && !this.onCooldown.doubleJump) {
      if (this.jumping === 0) {
        this.yVelocity -= CONSTANTS.JUMP_HEIGHT;
        this.jumping += 1;
        
        // Set CD on jumping
        this.onCooldown.doubleJump = true;
        setTimeout(() => this.onCooldown.doubleJump = false, 300);
      } else if (this.jumping === 1) {
        // Zero y velocity to allow for another full hop
        this.yVelocity = 0;
        this.yVelocity -= CONSTANTS.JUMP_HEIGHT;
        this.jumping += 1;
      }
    }

    // Dashing
    if (this.controller.dash && !this.onCooldown.dash) {
      if (this.xVelocity > 0) {
        this.xVelocity = 0;
        this.xVelocity += CONSTANTS.DASH_SPEED;
      } else {
        this.xVelocity = 0;
        this.xVelocity -= CONSTANTS.DASH_SPEED;
      }
      this.onCooldown.dash = true;
      setTimeout(() => this.onCooldown.dash = false, 2000);
    } 

    if (this.controller.left) this.xVelocity -= CONSTANTS.SPEED;
    if (this.controller.right) this.xVelocity += CONSTANTS.SPEED;
    if (this.controller.down) this.yVelocity += CONSTANTS.FASTFALL_SPEED;



    this.yVelocity += CONSTANTS.GRAVITY; // gravity
    this.xVelocity *= CONSTANTS.FRICTION; // friction
    // this.yVelocity *= 0.9; // friction
    this.x += this.xVelocity;
    this.y += this.yVelocity;



    // if this is falling below floor line
    if (this.y > this.ctx.canvas.height - this.height) {
      this.jumping = 0;
      this.y = this.ctx.canvas.height - this.height;
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

  animate(x1, y1, x2, y2) {
    this.ctx.drawImage(this.image, x1, y1, x2, y2, this.x, this.y, x2, y2);
  }

  step() {
    const walkCycle = [
      [0, 0, 30, 42],
      [35, 0, 30, 42],
      [70, 0, 33, 42],
      [108, 0, 30, 42],
      [143, 0, 29, 42],
      [177, 0, 29, 42]
    ];

    this.animate(...walkCycle[Math.floor(this.frameCount / 10)]);

    // if (this.frameCount < 10) this.animate(...walkCycle[0]);
    // else if (this.frameCount >= 11) this.animate(...walkCycle[1]);
    // else if (this.frameCount >= 22) this.animate(...walkCycle[2]);



    this.frameCount++;
    if (this.frameCount === 60) this.frameCount = 0;
  }

  draw() {
    // Change player position based on movement options
    this.move();

    this.step();

    // this.ctx.fillStyle = "pink";
    // this.ctx.beginPath();
    // this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.fill();

    // this.animate(0, 0, 30, 42);

    
    // this.animate(35, 0, 30, 42);

    // this.ctx.drawImage(this.image, 0, 0, 30, 42, this.x, this.y, 30 * 10, 42 * 10);
    // this.ctx.drawImage(this.image, 35, 0, 30, 42, this.x, this.y, 35 * 10, 42 * 10);
    // this.ctx.strokeStyle = "#202830";
    // this.ctx.stroke();
  }
}