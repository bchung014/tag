import Platform from './platform';

export default class Map {
  constructor(ctx) {
    this.ctx = ctx;

    this.platforms = this.generatePlatforms();
  }

  generatePlatforms() {
    const platform = new Platform(400, 600, 500, 80, 'pink');

    return [platform];
  }

  draw() {
    this.platforms.forEach(platform => {
      this.ctx.fillStyle = platform.color;
      this.ctx.beginPath();
      this.ctx.rect(platform.x, platform.y, platform.width, platform.height);
      this.ctx.fill();
    });

  }


}

// this.ctx.lineWidth = 4;
// this.ctx.beginPath();
// this.ctx.moveTo(0, 164);
// this.ctx.lineTo(320, 164);
// this.ctx.stroke();