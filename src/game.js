import Player from './player';
import Controller from './controller';
import Map from './map';

export default class Game {
  constructor() {
    // Set context for canvas
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    // Key controller
    this.controller = new Controller();

    this.map = new Map(this.ctx);

    // Player one
    this.playerOne = new Player(this.ctx, this.controller, this.map);

    // Renders components
    this.render = this.render.bind(this);
  }
  
  initialize() {
    // Add event listeners for controller input
    window.addEventListener("keydown", this.controller.keyPressed);
    window.addEventListener("keyup", this.controller.keyPressed);

    // Calls primary render for animation
    this.render();
  }

  render() {
    // Drawing canvas BG, move this eventually
    // this.ctx.fillStyle = "skyblue";
    // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);// x, y, width, height

    // this.map.draw();

    

    const map = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    const size = 70;
    const rows = 10;
    const cols = 20;

    for (let i = 0; i < map.length; i++) {
      this.ctx.fillStyle = map[i] === 0 ? "white" : "black";
      this.ctx.fillRect((i % 20) * size, Math.floor(i / 20) * size, size, size);
    }

    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(560, 0, size, size);
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(560, 70, size, size);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(560, 140, size, size);
    this.ctx.fillStyle = 'pink';
    this.ctx.fillRect(560, 210, size, size);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(560, 280, size, size);
    this.ctx.fillStyle = 'cyan';
    this.ctx.fillRect(560, 350, size, size);

    // Determines the player's current tile X (column) position
    // Add player's starting X draw coordinate 
    const tileX = Math.floor((this.playerOne.x + this.playerOne.width * 0.5) / size);

    console.log((this.playerOne.x + this.playerOne.width) * 0.5);
    // Y is rows 
    const tileY = Math.floor((this.playerOne.y + this.playerOne.height) / size);

    // console.log(this.playerOne.width);
    // console.log(`${tileX}, ${tileY}`);
    const tileAt = map[tileY * cols + tileX];
    // console.log(tileAt);
    

    if (tileAt === 1) {
      if (this.playerOne.yVelocity > 0) {
        const top = tileY * size;

        if (this.playerOne.y + this.playerOne.height > top) {
          // console.log(this.playerOne.y + this.playerOne.height);
          // console.log('platform');
          this.playerOne.jumping = 0;
          this.playerOne.yVelocity = 0;
          this.playerOne.y = top - this.playerOne.height - 0.01;
        }

      }
    }



    // Draws player one
    this.playerOne.draw();

    // Recursively re-render
    window.requestAnimationFrame(this.render);
  }
}