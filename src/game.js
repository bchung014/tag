import Controller from './controller/controller';
import Map from './map/map';
import Collision from './collision/collision';
import Timer from './timer/timer';
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

  gameoverScreen(winner) {
    if (this.timer.gameover) {
      this.ctx.clearRect(0, 0, 1400, 700);
      this.ctx.font = "50px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`gameover congrats Player ${winner.playerNumber} everyone is bad but u`, 100, 200);
      this.render();
    }
  }

  render() {



    window.requestAnimationFrame(() => {
      // This line to break  the animation recursion when a game is restarted
      if(this.controller.restart) return;

      if (this.isGameover()) {
        this.players.forEach(player => {
          if (!player.isTagger) this.gameoverScreen(player)
        });

        return;
      } else {
        this.map.draw();
        this.timer.draw();
        this.players.forEach(player => player.draw());

        this.collision.checkMapCollisions();
        this.collision.tagOccurred();

        this.render();
      }
    });
  }

}