const GAME_TIME = 5;
const TIME_REDUCTION = 3;

export default class Timer {
  constructor(ctx) {
    this.time = GAME_TIME;
    this.gameover = false;
    
    this.ctx = ctx;
    this.numTags = 0;

    this.currTimer = 0;
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
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "green";
    this.ctx.fillText(this.time, 680, 50);
  }
}