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

export default class Tagger extends Player {
  constructor(...args) {
    super(...args);

    this.image = this.getImage('./assets/handsprite.png');

    // Set original hitbox to idle frame 1
    this.width = 64;
    this.height = 50;

    this.frameCount = {
      idle: 0,
      walk: 0,
      tag: 0,
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
  
  //***********************************************************************
  // 
  //  Draw and animation controller
  //
  //***********************************************************************

  draw() {
    this.move();

    this.idle();
  }
}