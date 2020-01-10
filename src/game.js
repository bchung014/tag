import Controller from './controller';
import Map from './map';
import Collision from './collision';
import Timer from './timer';

import Player from './players/player';

// eventually split these into two for sprites?
import Runner from './players/runner';
import Tagger from './players/tagger';

const SPAWN_LOCATION = {
  P1: [70, 500],
  P2: [1260, 500]
};

const PLAYER_NUMBER = {
  P1: 1,
  P2: 2,
};

export default class Game {
  constructor() {
    this.ctx = document.getElementById('gameWindow').getContext('2d');
    this.map = new Map(this.ctx);
    this.controller = new Controller();
    this.timer = new Timer(this.ctx);

    this.P1 = new Tagger(this.ctx, this.controller, PLAYER_NUMBER.P1, SPAWN_LOCATION.P1, true);
    this.P2 = new Runner(this.ctx, this.controller, PLAYER_NUMBER.P2, SPAWN_LOCATION.P2, false);
    this.players = [this.P1, this.P2];

    this.collision = new Collision(this.map, this.players, this.timer);
  }
  
  initialize() {
    window.addEventListener("keydown", this.controller.keyPressed);
    window.addEventListener("keyup", this.controller.keyPressed);
    
    this.timer.runTimer();

    // Calls primary render for animation
    this.render();
  }

  isGameover() {
    return this.timer.gameover;
  }

  render() {
    this.map.draw();
    this.timer.draw();
    this.players.forEach(player => player.draw());

    this.collision.checkMapCollisions();
    this.collision.tagOccurred();

    // if (this.isGameover()) {
    //   this.ctx.font = "50px Arial";
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fillText('gameover, press R to play again', 400, 200);
    // }

    window.requestAnimationFrame(() => {
      this.render();
    });
  }

}