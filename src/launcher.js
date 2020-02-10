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

export const GRAB_CYCLE = [
  [2, 2, 72, 67],
  [77, 2, 72, 67],
  [152, 2, 72, 67],
  [227, 2, 72, 67],
  [302, 2, 72, 67],
  [377, 2, 72, 67],
  [152, 2, 72, 67],
];

export const START_MESSAGE_CYCLE = [
  [2, 2, 143, 18],
  [2, 23, 143, 18],
  [2, 44, 143, 18],
  [2, 65, 143, 18],
  [2, 86, 143, 18],
  [2, 107, 143, 18],
];


export default class Launcher {
  constructor() {
    this.currGame = new Game();
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    this.itSprite = imageLoader('./assets/letter.png');
    this.grabSprite = imageLoader('./assets/grab.png');
    this.startMessageSprite = imageLoader('./assets/start_message.png');
    this.sky = imageLoader('./assets/sky.jpg');

    this.gameCommenced = false;

    this.frameCount = {
      it: 0,
      grab: 0,
      startMessage: 0,

      itDelay: 0,
      grabDelay: 0,
      startMessageDelay: 0
    };

    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case 'r':
          this.currGame.timer.resetTimer();
          this.currGame = new Game();
          this.gameCommenced = true;
          this.currGame.initialize();
          break;
        default:
          return;
      }
    });
  }

  start() {
    window.requestAnimationFrame(() => {
      if (this.gameCommenced) {
        return;
      }

      this.ctx.fillStyle = "pink";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      // this.ctx.font = "50px Arial";
      // this.ctx.fillStyle = "red";
      // this.ctx.fillText(`Press r to begin`, 550, 630);

      this.ctx.drawImage(this.sky, 0, 0);

      this.it();
      this.grab();
      this.startMessage();
      this.start();
    });
  }

  it() {
    this.drawer(...IT_CYCLE[Math.floor(this.frameCount.it / 1)], 635, 60, 4, this.itSprite);
    this.frameCount.itDelay++;

    if (this.frameCount.itDelay == 8) {
      this.frameCount.it++;
      this.frameCount.itDelay = 0;
    }

    if (this.frameCount.it === 12) this.frameCount.it = 0;
  }

  grab() {
    this.drawer(...GRAB_CYCLE[Math.floor(this.frameCount.grab / 1)], 535, 225, 4, this.grabSprite);
    this.frameCount.grabDelay++;

    if (this.frameCount.grabDelay == 10) {
      this.frameCount.grab++;
      this.frameCount.grabDelay = 0;
    }

    if (this.frameCount.grab === 7) this.frameCount.grab = 0;
  }

  startMessage() {
    this.drawer(...START_MESSAGE_CYCLE[Math.floor(this.frameCount.startMessage / 1)], 340, 540, 5, this.startMessageSprite);

    this.frameCount.startMessageDelay++;

    if (this.frameCount.startMessageDelay == 8) {
      this.frameCount.startMessage++;
      this.frameCount.startMessageDelay = 0;
    }

    if (this.frameCount.startMessage === 6) this.frameCount.startMessage = 0;

  }


  drawer(x1, y1, x2, y2, locX, locY, scale, img) {
    this.ctx.drawImage(img, x1, y1, x2, y2, locX, locY, x2 * scale, y2 * scale);
  }
}