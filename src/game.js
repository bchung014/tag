import Runner from './players/runner';
import Controller from './controller';
import Map from './map';
import Collision from './collision';

export default class Game {
  constructor() {
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    this.controller = new Controller();
    this.map = new Map(this.ctx);


    this.playerOne = new Runner(this.ctx, this.controller, [70, 0], 1);
    this.playerTwo = new Runner(this.ctx, this.controller, [1260, 0], 2);

    // Send collision object an array of players to check all players
    this.collision = new Collision(this.map, [this.playerOne, this.playerTwo], this.controller);

    // Renders components, bound because callback
    this.render = this.render.bind(this);
  }
  
  initialize() {
    window.addEventListener("keydown", this.controller.keyPressed);
    window.addEventListener("keyup", this.controller.keyPressed);

    // Calls primary render for animation
    this.render();
  }

  render() {
    this.map.draw();
    this.collision.checkMapCollisions();
    this.collision.playersCollided();
    this.playerOne.draw();
    this.playerTwo.draw();

    window.requestAnimationFrame(this.render);
  }
}