import Player from './player';

const IDLE_CYCLE_HAND = [
  [1, 1, 64, 45],
];

export default class Tagger extends Player {

  constructor(...args) {
    super(...args);
    this.image = this.getImage('./assets/handsprite.png');
  }

  //***********************************************************************
  // 
  //  Sprite animations
  //
  //***********************************************************************

  idle() {
    this.ctx.drawImage(this.image, 1, 1, 64, 45, this.x, this.y, 64, 45);
    // this.redraw(...IDLE_CYCLE[Math.floor(this.frameCount.idle / 8)]);
    // this.frameCount.idle++;
    // if (this.frameCount.idle === 32) this.frameCount.idle = 0;
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