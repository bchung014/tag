import Runner from '../players/runner';
import Tagger from '../players/tagger';

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
        this.timer.decrementTimer();

        this.tagCooldown = true;
        setTimeout(() => this.tagCooldown = false, 2000);
      }
    }
  }

  changeTagger() {
    if (!this.players[0].isTagger) {
      this.players[0] = new Runner(this.players[0].ctx, this.players[0].controller, 
                                   this.players[0].playerNumber, [this.players[0].x, this.players[0].y], false);
      this.players[1] = new Tagger(this.players[1].ctx, this.players[1].controller,
                                   this.players[1].playerNumber, [this.players[1].x, this.players[1].y - 8], true);
      this.players[1].cooldown.hitstun = true;
      setTimeout(() => this.players[1].cooldown.hitstun = false, 2000);
    } else {
      this.players[0] = new Tagger(this.players[0].ctx, this.players[0].controller,
                                   this.players[0].playerNumber, [this.players[0].x, this.players[0].y - 8], true);
      this.players[1] = new Runner(this.players[1].ctx, this.players[1].controller,
                                   this.players[1].playerNumber, [this.players[1].x, this.players[1].y], false);
      this.players[0].cooldown.hitstun = true;
      setTimeout(() => this.players[0].cooldown.hitstun = false, 2000);
    }
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
      case 'center':
        return object.y + (object.height / 2);
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
      const center = Math.floor(this.getCollisionAngles(player, 'center') / this.map.tileSize);
  
      const bottomLeft = this.map.tileMap[bottom * this.map.cols + left];
      const bottomRight = this.map.tileMap[bottom * this.map.cols + right];
      const topLeft = this.map.tileMap[top * this.map.cols + left];
      const topRight = this.map.tileMap[top * this.map.cols + right];
      
      const centerRight = this.map.tileMap[center * this.map.cols + right];
      const centerLeft = this.map.tileMap[center * this.map.cols + left];

      player.colliding = false;

      if (bottomLeft || bottomRight) this.bottomCollision(player, bottom);
      // if (topLeft || topRight) this.topCollision(player, top);
      // if (centerRight) this.rightCollision(player, right);
      // if (centerLeft) this.leftCollision(player, left);
    });
  }

  topCollision(player, top) {
    if (player.yVelocity < 0) {
      const topPlatform = (top + 1) * this.map.tileSize;

      if (player.y < topPlatform && player.oldY >= topPlatform) {
        player.jumping = 0;
        player.yVelocity = 0;
        player.y = player.oldY = topPlatform - 0.01;
        player.colliding = true;
      }
    }
  }

  bottomCollision(player, bottom) {
    if (player.yVelocity > 0) {
      const bottomPlatform = bottom * this.map.tileSize;

      if (player.y + player.height > bottomPlatform && player.oldY + player.height <= bottomPlatform) {
        player.jumping = 0;
        player.yVelocity = 0;
        player.y = player.oldY = bottomPlatform - player.height - 0.01;
        player.colliding = true;
      }
    }
  }

  rightCollision(player, right) {
    if (player.xVelocity > 0) {
      const rightPlatform = right * this.map.tileSize;

      if (player.x + player.width > rightPlatform) {
        player.xVelocity = 0;
        player.x = player.oldX = rightPlatform - player.width;
      }
    }
  }

  leftCollision(player, left) {
    if (player.xVelocity < 0) {
      const leftPlatform = (left + 1)  * this.map.tileSize;

      if (player.x < leftPlatform) {
        player.xVelocity = -0.1;
        player.x = player.oldX = leftPlatform;
      }
    }
  }
}