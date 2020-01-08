// Player constants
const CONSTANTS = {
  SPEED: 1.5,
  JUMP_HEIGHT: 20.0,
  FASTFALL_SPEED: 5.0,
  DASH_SPEED: 20.0,
  GRAVITY: 1.5,
  FRICTION: 0.9,
};

export default class Player {
  constructor(ctx, controller, spawnX, spawnY, playerNumber) {
    this.image = this.getImage();

    // These are hardcoded values based on average size of sprite
    this.width = 33;
    this.height = 42;

    // Set these to spawn values, hardcoded rn
    this.x = spawnX;
    this.y = spawnY;
    this.oldX = 70;
    this.oldY = -100;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.jumping = 0;
    // this.sliding = false;
    this.colliding = false;

    this.onCooldown = {
      doubleJump: false,
      dash: false
    };

    this.frameCount = {
      idle: 0,
      walk: 0,
      tag: 0,
    };

    this.playerNumber = playerNumber;
    this.ctx = ctx;
    this.controller = controller;
  }

  getImage() {
    const image = new Image();
    image.src = './assets/shrek.png';
    return image;
  }



  //***********************************************************************
  // 
  //  Movement options
  //
  //***********************************************************************

  getPlayerControls() {
    return this.playerNumber === 1 ?
      {
        left: this.controller.leftPlayerOne,
        right: this.controller.rightPlayerOne,
        up: this.controller.upPlayerOne,
        down: this.controller.downPlayerOne,
        dash: this.controller.dashPlayerOne,
      } : {
        left: this.controller.leftPlayerTwo,
        right: this.controller.rightPlayerTwo,
        up: this.controller.upPlayerTwo,
        down: this.controller.downPlayerTwo,
        dash: this.controller.dashPlayerTwo,
      };
  }

  move() {
    const playerControls = this.getPlayerControls();

    // Jumping and double jumping
    if (playerControls.up) this.jump();

    // Dashing
    if (playerControls.dash) this.dash(playerControls);

    // Fastfalling
    if (playerControls.down) this.fastfall();
 
    // Running
    if (playerControls.left) this.xVelocity -= CONSTANTS.SPEED;
    if (playerControls.right) this.xVelocity += CONSTANTS.SPEED;

    this.yVelocity += CONSTANTS.GRAVITY;
    this.xVelocity *= CONSTANTS.FRICTION;

    // Update old positions so collision checking can know previous location before collision
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // Handle wrapping
    if (this.x <= -this.width) this.x = this.ctx.canvas.width - 1;
    else if (this.x > this.ctx.canvas.width) this.x = -this.width;
  }

  jump() {
    if (!this.onCooldown.doubleJump) {
      if (this.jumping === 0) {
        this.yVelocity = 0;
        this.yVelocity -= CONSTANTS.JUMP_HEIGHT;
        this.jumping += 1;
  
        // Set cooldown on jump to stop from spamming
        this.onCooldown.doubleJump = true;
        setTimeout(() => this.onCooldown.doubleJump = false, 300);
      } else if (this.jumping === 1) {
        this.yVelocity = 0;
        this.yVelocity -= CONSTANTS.JUMP_HEIGHT;
        this.jumping += 1;
      }
    }
  }

  dash(playerControls) {
    if (!this.onCooldown.dash) {
      if (playerControls.right) {
        this.xVelocity = 0;
        this.xVelocity += CONSTANTS.DASH_SPEED;
      } else if (playerControls.left) {
        this.xVelocity = 0;
        this.xVelocity -= CONSTANTS.DASH_SPEED;
      }
      
      this.onCooldown.dash = true;
      setTimeout(() => this.onCooldown.dash = false, 1000);
    }
  }

  fastfall() {
    if (!this.colliding) this.yVelocity += CONSTANTS.FASTFALL_SPEED;
  }



  //***********************************************************************
  // 
  //  Frame redrawing
  //
  //***********************************************************************

  redraw(x1, y1, x2, y2) {
    // Faces direction of last movement
    if (this.xVelocity < 0) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.image, x1, y1, x2, y2, -this.x - this.width, this.y, x2, y2);
      this.ctx.scale(-1, 1);
    } else {
      this.ctx.drawImage(this.image, x1, y1, x2, y2, this.x, this.y, x2, y2);
    }
  }
}