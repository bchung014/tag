import Player from './player';
import Controller from './controller';
import Map from './map';
import Collision from './collision';

export default class Game {
  constructor() {
    // Set context for canvas
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    // Key controller
    this.controller = new Controller();

    this.map = new Map(this.ctx);

    // Player one
    this.playerOne = new Player(this.ctx, this.controller, this.map);

    this.collision = new Collision(this.map, [this.playerOne]);

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
    this.map.draw();
    this.collision.checkMapCollisions();

    // Draws player one
    this.playerOne.draw();

    // Recursively re-render
    window.requestAnimationFrame(this.render);
  }
}