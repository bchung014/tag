import Runner from './players/runner';
import Tagger from './players/tagger';

export default class Collision {
  constructor(map, players, timer) {
    this.map = map;
    this.players = players;
    this.timer = timer;

    this.tagCooldown = false;
  }

  tagOccurred() {
    if (this.players[0].x < this.players[1].x + this.players[1].width &&
      this.players[0].x + this.players[0].width > this.players[1].x &&
      this.players[0].y < this.players[1].y + this.players[1].height &&
      this.players[0].y + this.players[0].height > this.players[1].y) {

      if (!this.tagCooldown) {
        this.players.forEach(player => player.isTagger = !player.isTagger);
        this.changeTagger();
        this.timer.time = 3;
        this.tagCooldown = true;
        setTimeout(() => this.tagCooldown = false, 2000);
      }
    }
  }

  changeTagger() {
    for (let i = 0; i < this.players.length; i++) {

      
    }

    // if (!this.players[0].isTagger) {
    //   this.players[0] = new Runner(this.players[0].ctx, this.players[0].controller, 1, [70,70], false);
    // } else {
    //   this.players[0] = new Tagger(this.players[0].ctx, this.players[0].controller, 1, [70,70], true);
    // }
  }

  // Get all four potential collision sides of an object
  getCollisionAngles(object, side) {
    switch(side) {
      case 'left':
        return object.x;
      case 'right':
        return object.x + object.width;
      case 'top':
        return object.y;
      case 'bottom':
        return object.y + object.height;
      default:
        break;
    }
  }

  checkMapCollisions() {
    this.players.forEach(player => {
      const left = Math.floor(this.getCollisionAngles(player, 'left') / this.map.tileSize);
      const right = Math.floor(this.getCollisionAngles(player, 'right') / this.map.tileSize);
      const top = Math.floor(this.getCollisionAngles(player, 'top') / this.map.tileSize);
      const bottom = Math.floor(this.getCollisionAngles(player, 'bottom') / this.map.tileSize);
      const bottomLeft = this.map.tileMap[bottom * this.map.cols + left];
      const bottomRight = this.map.tileMap[bottom * this.map.cols + right];

      // Check bottom platform collision
      if (bottomLeft || bottomRight) {
        if (player.yVelocity > 0) {
          const top = bottom * this.map.tileSize;

          if (player.y + player.height > top && player.oldY + player.height <= top) {
            player.jumping = 0;
            player.yVelocity = 0;
            player.y = player.oldY = top - player.height - 0.01;
            player.colliding = true;
          }
        }
      } else {
        player.colliding = false;
      }
    });
  }
}