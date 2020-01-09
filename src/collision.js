export default class Collision {
  constructor(map, players, timer) {
    this.map = map;
    this.players = players;

    this.timer = timer;
  }

  playersCollided() {
    if (this.players[0].x < this.players[1].x + this.players[1].width &&
      this.players[0].x + this.players[0].width > this.players[1].x &&
      this.players[0].y < this.players[1].y + this.players[1].height &&
      this.players[0].y + this.players[0].height > this.players[1].y) {
      
      this.players.forEach(player => {
        if (!player.cooldown.tag) {
          player.tagged();
          this.timer.time = 10;
        }
      });
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