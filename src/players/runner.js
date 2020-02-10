import Player from './player';
import { imageLoader } from '../image_loader/image_loader';

// Idle Sprites
const IDLE_CYCLE = [
  [9, 16, 31, 42],
  [45, 16, 31, 42],
  [81, 16, 31, 42],
  [117, 16, 31, 42]
];

// Walk sprites
const WALK_CYCLE = [
  [9, 66, 30, 42],
  [44, 66, 30, 42],
  [79, 66, 33, 42],
  [117, 66, 30, 42],
  [152, 66, 29, 42],
  [186, 66, 29, 42]
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
  constructor(...args) {
    super(...args);

    this.image = imageLoader('./assets/shrek.png');

    // Set original hitbox to idle frame 1
    this.width = 32;
    this.height = 42;

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
    if (this.controller[this.playerControls.tag]) {
      this.tag();
    } else if (this.controller[this.playerControls.left] || this.controller[this.playerControls.right]) {
      this.walk();
    } else {
      this.idle();
    }
    
    this.move();
  } 
}