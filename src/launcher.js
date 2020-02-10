import Game from './game';
import { imageLoader } from './image_loader/image_loader';

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

export default class Launcher {
  constructor() {
    this.currGame = new Game();
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    this.itSprite = imageLoader('./assets/letter.png');

    this.frameCount = {
      it: 0,
      delay: 0,
    };
  }

  start() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case 'r':
          this.currGame.timer.resetTimer();
          this.currGame = new Game();
          this.currGame.commenced = true;
          this.currGame.initialize();
          break;
        default:
          return;
      }
    });
    // window.requestAnimationFrame(() => {
    //   this.ctx.fillStyle = "yellow";
    //   this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    //   // this.ctx.font = "50px Arial";
    //   // this.ctx.fillStyle = "red";
    //   // this.ctx.fillText(`Press r to begin`, 500, 350);

    //   this.it();

    //   this.start();
    // });
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
    this.ctx.drawImage(this.itSprite, x1, y1, x2, y2, 600, 200, x2 * 4, y2 * 4);
  }



}