import Player from './player';

// Idle Sprites
const IDLE_CYCLE = [
  [9, 17, 31, 42],
  [45, 17, 31, 42],
  [81, 17, 31, 42],
  [117, 17, 31, 42]
];

// Walk sprites
const WALK_CYCLE = [
  [9, 67, 30, 42],
  [44, 67, 30, 42],
  [79, 67, 33, 42],
  [117, 67, 30, 42],
  [152, 67, 29, 42],
  [186, 67, 29, 42]
];

const TAG_CYCLE = [
  [9, 168, 31, 42],
  [45, 168, 28, 42],
  [78, 168, 38, 42],
  [121, 168, 44, 42],
  [78, 168, 38, 42],
  [45, 168, 28, 42],
  [9, 168, 31, 42]
];

export default class Runner extends Player {


  //***********************************************************************
  // 
  //  Sprite animations
  //
  //***********************************************************************

  idle() {
    this.redraw(...IDLE_CYCLE[Math.floor(this.frameCount.idle / 8)]);
    this.frameCount.idle++;
    if (this.frameCount.idle === 32) this.frameCount.idle = 0;
  }

  walk() {
    this.redraw(...WALK_CYCLE[Math.floor(this.frameCount.walk / 10)]);
    this.frameCount.walk++;
    if (this.frameCount.walk === 60) this.frameCount.walk = 0;
  }

  tag() {
    this.redraw(...TAG_CYCLE[Math.floor(this.frameCount.tag / 2)]);
    this.frameCount.tag++;
    if (this.frameCount.tag === 14) this.frameCount.tag = 0;
  }

  
  //***********************************************************************
  // 
  //  Draw and animation controller
  //
  //***********************************************************************

  draw() {
    this.move();

    console.log(this.controller.tagPlayerOne);
    if (this.controller[this.playerControls.tag]) {
      this.tag();
    } else if (this.controller[this.playerControls.left] || this.controller[this.playerControls.right]) {
      this.walk();
    } else {
      this.idle();
    }
  }
}