import Player from './player';
import Controller from './controller';

export default class Game {
  constructor() {
    // Set context for canvas
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    // Key controller
    this.controller = new Controller();

    // Player one
    this.playerOne = new Player(this.controller);

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
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, 320, 180);// x, y, width, height

    // Draws player one
    this.playerOne.draw(this.ctx);

    // Recursively re-render
    window.requestAnimationFrame(this.render);
  }
}