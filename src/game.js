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
    // this.map.draw();

    const map = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    const size = 70;
    const rows = 10;
    const cols = 20;

    for (let i = 0; i < map.length; i++) {
      this.ctx.fillStyle = map[i] === 0 ? "#E0FFFF" : "black";
      this.ctx.fillRect((i % 20) * size, Math.floor(i / 20) * size, size, size);
    }

    // Determines the player's current tile X (column) position
    // Add player's starting X draw coordinate and 1/2 of player's width 
    const tileX = Math.floor((this.playerOne.x + this.playerOne.width * 0.5) / size);
    // Y is rows 
    const tileY = Math.floor((this.playerOne.y + this.playerOne.height) / size);

    const left = Math.floor(this.playerOne.x / size);
    const right = Math.floor((this.playerOne.x + this.playerOne.width) / size);
    const top = Math.floor(this.playerOne.y / size);
    const bottom = Math.floor((this.playerOne.y + this.playerOne.height) / size);

    const bottomLeft = map[bottom * cols + left];
    const bottomRight = map[bottom * cols + right];


    if (bottomLeft || bottomRight) {
      if (this.playerOne.yVelocity > 0) {
        const top = tileY * size;

        if (this.playerOne.y + this.playerOne.height > top && this.playerOne.oldY + this.playerOne.height <= top ) {
          this.playerOne.jumping = 0;
          this.playerOne.yVelocity = 0;
          this.playerOne.y = this.playerOne.oldY = top - this.playerOne.height - 0.01;
        }
      }
    }

    // Draws player one
    this.playerOne.draw();

    // Recursively re-render
    window.requestAnimationFrame(this.render);
  }
}