import Game from './game';

export default class Launcher {
  constructor() {
    this.currGame = new Game();
    this.ctx = document.getElementById('gameWindow').getContext('2d');
  }

  start() {
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(`Press r to begin`, 500, 350);

    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case 'r':
          this.currGame.timer.resetTimer();
          this.currGame = new Game();
          this.currGame.initialize();
          break;
        default:
          return;
      }
    });

  }




}