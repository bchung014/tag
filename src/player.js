const CONSTANTS = {
  SPEED: 1.5,
  JUMP_HEIGHT: 20.0,
  FASTFALL_SPEED: 5.0,
  DASH_SPEED: 20.0,
  GRAVITY: 1.5,
  FRICTION: 0.9,
};

const WALK_CYCLE = [
  [9, 67, 30, 42],
  [44, 67, 30, 42],
  [79, 67, 33, 42],
  [117, 67, 30, 42],
  [152, 67, 29, 42],
  [186, 67, 29, 42]
];

const IDLE_CYCLE = [
  [9, 17, 31, 41],
  [45, 17, 31, 41],
  [81, 17, 31, 41],
  [117, 17, 31, 41]
];

export default class Player {
  constructor(ctx, controller, map) {
    this.image = this.getImage();

    // These are hardcoded values based on average size of sprite
    this.width = 33;
    this.height = 42;

    // Center of canvas
    this.x = 70;
    // Spawn above the canvas
    this.y = -100;

    this.oldX = 144;
    this.oldY = -100;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.jumping = 0;
    this.sliding = false;

    this.onCooldown = {
      doubleJump: false,
      dash: false
    };

    this.frameCount = {
      idle: 0,
      walk: 0
    };

    this.ctx = ctx;
    this.controller = controller;
    this.map = map;
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

    // Fastfalling
    if (this.controller.down) {
      this.yVelocity += CONSTANTS.FASTFALL_SPEED;
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
      setTimeout(() => this.onCooldown.dash = false, 1000);
    } 

    this.oldX = this.x;// store the last position of the player
    this.oldY = this.y;// before we move it on this cycle
    // console.log(`oldX: ${this.oldX}, oldY: ${this.oldY}`);

 

    if (this.controller.left) this.xVelocity -= CONSTANTS.SPEED;
    if (this.controller.right) this.xVelocity += CONSTANTS.SPEED;

    this.yVelocity += CONSTANTS.GRAVITY; // gravity
    this.xVelocity *= CONSTANTS.FRICTION; // friction
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // console.log(`newX: ${this.x}, newY: ${this.y}`)

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

    this.collisionDetector();
  
  }

  animate(x1, y1, x2, y2) {
    // Faces direction of last movement
    if (this.xVelocity < 0) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.image, x1, y1, x2, y2, -this.x - this.width, this.y, x2, y2);
      this.ctx.scale(-1, 1);
    } else {
      this.ctx.drawImage(this.image, x1, y1, x2, y2, this.x, this.y, x2, y2);
    }
  }

  idle() {
    this.animate(...IDLE_CYCLE[Math.floor(this.frameCount.idle / 15)]);
    this.frameCount.idle++;
    if (this.frameCount.idle === 60) this.frameCount.idle = 0;
  }

  walk() {
    this.animate(...WALK_CYCLE[Math.floor(this.frameCount.walk / 10)]);
    this.frameCount.walk++;
    if (this.frameCount.walk === 60) this.frameCount.walk = 0;
  }

  collisionDetector() {
    this.map.platforms.forEach(platform => {
      if (this.y === platform.y) {
        console.log('hit');
      }
    });

    // if (this.y > this.ctx.canvas.height - this.height) {
    //   this.jumping = 0;
    //   this.y = this.ctx.canvas.height - this.height;
    //   this.yVelocity = 0;
    // }

  }

  draw() {
    // Change player position based on movement options
    this.move();
    
    if (this.controller.left || this.controller.right) {
      this.walk();
    } else {
      this.idle();
    }


    // this.ctx.fillStyle = "pink";
    // this.ctx.beginPath();
    // this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.fill();
  }
}