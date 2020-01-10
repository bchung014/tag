// Player constants
const CONSTANTS = {
  SPEED: 1.5,
  JUMP_HEIGHT: 20.0,
  FASTFALL_SPEED: 5.0,
  DASH_SPEED: 20.0,
  GRAVITY: 1.5,
  FRICTION: 0.9,
};

const PLAYER_CONTROLS = {
  1: {
    left: 'leftP1',
    right: 'rightP1',
    up: 'upP1',
    down: 'downP1',
    dash: 'dashP1',
    tag: 'tagP1'
  },
  2: {
    left: 'leftP2',
    right: 'rightP2',
    up: 'upP2',
    down: 'downP2',
    dash: 'dashP2',
  }
};

export default class Player {
  constructor(ctx, controller, playerNumber, spawnLocation, isTagger) {
    this.playerNumber = playerNumber;
    this.isTagger = isTagger;

    // Set these to spawn values, hardcoded rn
    this.x = spawnLocation[0];
    this.y = spawnLocation[1];
    this.oldX = 70;
    this.oldY = -100;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.jumping = 0;
    this.colliding = false;

    this.cooldown = {
      doubleJump: false,
      dash: false,
      tag: false,
      hitstun: false
    };

    this.playerControls = PLAYER_CONTROLS[this.playerNumber];
    this.ctx = ctx;
    this.controller = controller;
  }

  getImage(imagePath) {
    const image = new Image();
    image.src = imagePath;
    return image;
  }



  //***********************************************************************
  // 
  //  Movement options
  //
  //***********************************************************************

  move() {
    // If hitstunned, reduce speed drastically
    if (this.cooldown.hitstun) this.xVelocity = this.yVelocity = 0;

    // Jumping and double jumping
    if (this.controller[this.playerControls.up]) this.jump();

    // Dashing
    if (this.controller[this.playerControls.dash]) this.dash();

    // Fastfalling
    if (this.controller[this.playerControls.down]) this.fastfall();
 
    // Running
    if (this.controller[this.playerControls.left]) this.xVelocity -= CONSTANTS.SPEED;
    if (this.controller[this.playerControls.right]) this.xVelocity += CONSTANTS.SPEED;

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
    if (!this.cooldown.doubleJump) {
      if (this.jumping === 0) {
        this.yVelocity = 0;
        this.yVelocity -= CONSTANTS.JUMP_HEIGHT;
        this.jumping += 1;
  
        // Set cooldown on jump to stop from spamming
        this.cooldown.doubleJump = true;
        setTimeout(() => this.cooldown.doubleJump = false, 300);
      } else if (this.jumping === 1) {
        this.yVelocity = 0;
        this.yVelocity -= CONSTANTS.JUMP_HEIGHT;
        this.jumping += 1;
      }
    }
  }

  dash() {
    if (!this.cooldown.dash) {
      if (this.controller[this.playerControls.right]) {
        this.xVelocity = 0;
        this.xVelocity += CONSTANTS.DASH_SPEED;
      } else if (this.controller[this.playerControls.left]) {
        this.xVelocity = 0;
        this.xVelocity -= CONSTANTS.DASH_SPEED;
      }
      
      this.cooldown.dash = true;
      setTimeout(() => this.cooldown.dash = false, 1000);
    }
  }

  fastfall() {
    if (!this.colliding) this.yVelocity += CONSTANTS.FASTFALL_SPEED;
  }



  //***********************************************************************
  // 
  //  Handle tagging
  //
  //***********************************************************************

  tagged() {
    // Handle hitstunning the newly tagged player
    if (!this.isTagger) {
      this.cooldown.hitstun = true;
      setTimeout(() => this.cooldown.hitstun = false, 2000);
    }

    this.isTagger = !this.isTagger;
    this.cooldown.tag = true;
    setTimeout(() => this.cooldown.tag = false, 2000);
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


  draw() {
    // console.log(this.width);

    // this.move();

    // if (this.isTagger) {
    //   this.ctx.font = "30px Arial";
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fillText("IT", this.x + 5, this.y);
    // }

    // if (this.controller[this.playerControls.tag]) {
    //   this.tag();
    // } else if (this.controller[this.playerControls.left] || this.controller[this.playerControls.right]) {
    //   this.walk();
    // } else {
    //   this.idle();
    // }
  }
}