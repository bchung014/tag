const GAME_TIME = 9999;

export default class Timer {
  constructor(ctx) {
    this.time = GAME_TIME;
    this.gameover = false;
    
    this.ctx = ctx;
  }

  runTimer() {
    setInterval(() => {
      if (this.time > 0) { 
        this.time -= 1;
      } else {
        this.time = 'GG';
        this.gameover = true;
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval();
    this.time = GAME_TIME;
  }

  draw() {
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(this.time, 700, 50);
  }

//   function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//       minutes = parseInt(timer / 60, 10)
//       seconds = parseInt(timer % 60, 10);

//       minutes = minutes < 10 ? "0" + minutes : minutes;
//       seconds = seconds < 10 ? "0" + seconds : seconds;

//       display.textContent = minutes + ":" + seconds;

//       if (--timer < 0) {
//         timer = duration;
//       }
//     }, 1000);
// }



}