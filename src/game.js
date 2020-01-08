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
                  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    const size = 70;
    const cols = 20;
    const rows = 10;

    for (let i = 0; i < map.length; i++) {
      this.ctx.fillStyle = map[i] === 0 ? "white" : "black";
      this.ctx.fillRect((i % 20) * size, Math.floor(i / 20) * size, size, size);
    }

    // Draws player one
    this.playerOne.draw();

    // columns Y
    const tileX = Math.floor((this.playerOne.x + this.playerOne.width * 0.5) / size);
    const tileY = Math.floor((this.playerOne.y) / size);

    const tileAt = map[tileY * cols + tileX];
    console.log(tileAt);
    
    if (tileAt === 1) {
      if (this.playerOne.yVelocity > 0) {
        const top = tileY * size;
        // console.log(this.playerOne.y + this.playerOne.height);

        if (this.playerOne.y + this.playerOne.height > top) {
          this.playerOne.jumping = false;
          this.playerOne.yVelocity = 0;
        }

      }
    }


    // Recursively re-render
    window.requestAnimationFrame(this.render);
  }
}