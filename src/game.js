import Player from './player';
import Controller from './controller';

export default class Game {
  constructor() {
    this.stage = new createjs.Stage('gameWindow');
  }
  
  initialize() {
    // const circle = new createjs.Shape();
    // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    // circle.x = 100;
    // circle.y = 100;
    const p1 = new Player();
    this.stage.addChild(p1.model);
    
    // this.controller = new Controller();
    const controller = new Controller(p1);

    window.addEventListener("keydown", controller.keyPressed);
    
    this.play();
  }

  play() {
    createjs.Ticker.on("tick", event => {
      this.stage.update(event);
    });
  }
}

// createjs.Ticker.on("tick", tick);
// function tick(event) {
//   stage.update(event);
// }

// window.addEventListener("keydown", keyPressed);

// function keyPressed(event) {
//   if (event.keyCode === 39) {
//     mario.x += 5;
//   }
//   stage.update();
// }