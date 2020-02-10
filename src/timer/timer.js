const GAME_TIME = 9999;
const TIME_REDUCTION = 3;

import { imageLoader } from '../image_loader/image_loader';

const NUMBERS = [
  [2, 2, 14, 16], // 0
];

export default class Timer {
  constructor(ctx) {
    this.time = GAME_TIME;
    this.gameover = false;
    
    this.ctx = ctx;
    this.numTags = 0;

    this.currTimer = 0;

    this.numbersSprite = imageLoader('./assets/numbers.png');
  }

  runTimer() {
    this.currTimer = setInterval(() => {
      if (this.time > 0) { 
        this.time -= 1;
      } else {
        this.gameover = true;
      }
    }, 1000);
  }

  // To reset the interval and not keep any open intervals
  resetTimer() {
    clearInterval(this.currTimer);
  }

  decrementTimer() {
    this.resetTimer();
    this.numTags++;
    this.time = GAME_TIME - (this.numTags * TIME_REDUCTION);
    this.runTimer();
  }

  draw() {
    // this.ctx.drawImage(this.numbersSprite, 2, 2, 14, 16, 500, 50, 14 * 3, 16 * 3);


    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "green";
    this.ctx.fillText(this.time, 680, 50);
  }
}