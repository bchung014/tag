import Player from './player';
import Controller from './controller';

export default class Game {
  constructor() {
    this.stage = document.getElementById('gameWindow').getContext("2d");

    // Player one
    this.playerOne = new Player();

    // Key controller
    this.controller = new Controller();

    this.render = this.render.bind(this);
  }
  
  initialize() {
    window.addEventListener("keydown", this.controller.keyPressed)
    window.addEventListener("keyup", this.controller.keyPressed);
    window.requestAnimationFrame(this.render);
  }

  render() {
    console.log(this.playerOne.jumping);
    

    if (this.controller.up && this.playerOne.jumping < 3) {
      this.playerOne.yVelocity -= 10;
      this.playerOne.jumping += 1;
    }

    if (this.controller.left) this.playerOne.xVelocity -= 0.5;
    if (this.controller.right) this.playerOne.xVelocity += 0.5;

    this.playerOne.yVelocity += 1.5; // gravity
    this.playerOne.x += this.playerOne.xVelocity;
    this.playerOne.y += this.playerOne.yVelocity;
    this.playerOne.xVelocity *= 0.9; // friction
    // this.playerOne.yVelocity *= 0.9; // friction

    // if this.playerOne is falling below floor line
    if (this.playerOne.y > 180 - 16 - 32) {
      this.playerOne.jumping = false;
      this.playerOne.y = 180 - 16 - 32;
      this.playerOne.yVelocity = 0;
    }

    // if this.playerOne is going off the left of the screen
    if (this.playerOne.x < -32) {
      this.playerOne.x = 320;
    } else if (this.playerOne.x > 320) {// if this.playerOne goes past right boundary
      this.playerOne.x = -32;
    }

    this.stage.fillStyle = "#202020";
    this.stage.fillRect(0, 0, 320, 180);// x, y, width, height
    this.stage.fillStyle = "#ff0000";// hex for red
    this.stage.beginPath();
    this.stage.rect(this.playerOne.x, this.playerOne.y, this.playerOne.width, this.playerOne.height);
    this.stage.fill();
    this.stage.strokeStyle = "#202830";
    this.stage.lineWidth = 4;
    this.stage.beginPath();
    this.stage.moveTo(0, 164);
    this.stage.lineTo(320, 164);
    this.stage.stroke();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(this.render);
  }
}