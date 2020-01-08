import Controller from './controller';
import Map from './map';
import Collision from './collision';
import Runner from './players/runner';
import Tagger from './players/tagger';

export default class Game {
  constructor() {
    this.ctx = document.getElementById('gameWindow').getContext('2d');

    this.controller = new Controller();
    this.map = new Map(this.ctx);
  }
  
  initialize() {
    window.addEventListener("keydown", this.controller.keyPressed);
    window.addEventListener("keyup", this.controller.keyPressed);

    const playerOne = new Runner(this.ctx, this.controller, [70, 0], 1);
    const playerTwo = new Tagger(this.ctx, this.controller, [1260, 0], 2);

    // Send collision object an array of players to check all players
    const collision = new Collision(this.map, [playerOne, playerTwo], this.controller);


    // Calls primary render for animation
    this.render(playerOne, playerTwo, collision);
  }

  render(playerOne, playerTwo, collision) {
    this.map.draw();
    collision.checkMapCollisions();
    collision.playersCollided();
    playerOne.draw();
    playerTwo.draw();

    window.requestAnimationFrame(() => {
      this.render(playerOne, playerTwo, collision);
    });
  }
}