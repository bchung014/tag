import Player from './player';

const IDLE_CYCLE = [
  [1, 1, 64, 50],
  [72, 1, 64, 50],
  [149, 1, 64, 50],
  [224, 1, 64, 50],
  [295, 1, 64, 50],
  [367, 1, 64, 50],
  [439, 1, 64, 50],
  [515, 1, 64, 50],
];

const IT_CYCLE = [
  [2, 2, 33, 44],
  [38, 2, 33, 44],
  [74, 2, 33, 44],
  [110, 2, 33, 44],
  [2, 49, 33, 44],
  [38, 49, 33, 44],
  [74, 49, 33, 44],
  [110, 49, 33, 44],
  [2, 96, 33, 44],
  [38, 96, 33, 44],
  [74, 96, 33, 44],
  [110, 96, 33, 44]
];

export default class Tagger extends Player {
  constructor(...args) {
    super(...args);

    this.image = this.getImage('./assets/handsprite.png');
    this.itSprite = this.getImage('./assets/letter.png');

    // Set original hitbox to idle frame 1
    this.width = 54;
    this.height = 50;

    this.frameCount = {
      idle: 0,
      walk: 0,
      tag: 0,
      it: 0,
      delay: 0,
    };
  }

  //***********************************************************************
  // 
  //  Sprite animations
  //
  //***********************************************************************

  idle() {
    // this.ctx.drawImage(this.image, 1, 1, 64, 45, this.x, this.y, 64, 45);
    this.redraw(...IDLE_CYCLE[Math.floor(this.frameCount.idle / 6)]);
    this.frameCount.idle++;
    if (this.frameCount.idle === 48) this.frameCount.idle = 0;
  }

  it() {
    this.itDrawer(...IT_CYCLE[Math.floor(this.frameCount.it / 1)]);
    this.frameCount.delay++;

    if (this.frameCount.delay == 8) {
      this.frameCount.it++;
      this.frameCount.delay = 0;
    }

    if (this.frameCount.it === 12) this.frameCount.it = 0;
  }

  itDrawer(x1, y1, x2, y2) {
    this.ctx.drawImage(this.itSprite, x1, y1, x2, y2, this.x + 10, this.y - 50, x2, y2);
  }
  
  //***********************************************************************
  // 
  //  Draw and animation controller
  //
  //***********************************************************************

  draw() {
    // this.ctx.font = "40px Arial";
    // this.ctx.fillStyle = "red";
    // this.ctx.fillText("IT", this.x + 20, this.y);

    this.it();

    this.move();

    this.idle();
  }
}