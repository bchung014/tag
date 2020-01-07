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
    this.ctx.fillStyle = "skyblue";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);// x, y, width, height

    this.map.draw();

    // Draws player one
    this.playerOne.draw();

    // Recursively re-render
    window.requestAnimationFrame(this.render);
  }
}