import { imageLoader } from '../image_loader/image_loader';

const SHINE_CYCLE = [
  [0, 17, 16, 16],
  [17, 17, 16, 16],
  [34, 17, 16, 16],
  [51, 17, 16, 16],
  [34, 17, 16, 16],
  [17, 17, 16, 16]
];

const GROUND = [
  [85, 0, 16, 16]
];

const HILL = [
  [153, 102, 16, 16], // hill top center
  [136, 102, 16, 16], // hill top left
  [170, 102, 16, 16], // hill top right
  [153, 119, 16, 16], // hill body center
  [136, 119, 16, 16], // hill body left
  [170, 119, 16, 16], // hill body right
];

const CLOUD = [
  [2, 2, 16, 16], // top left corner
  [21, 2, 16, 16], // top center
  [40, 2, 16, 16], // top right corner
  [2, 21, 16, 16], // bottom left corner
  [21, 21, 16, 16], // bottom center
  [40, 21, 16, 16],
];

const TREE = [
  [2, 40, 16, 16], // left tree head
  [21, 40, 16, 16], // center tree head
  [40, 40, 16, 16], // right tree head
  [21, 59, 16, 16], // tree body
];

export default class Map {
  constructor(ctx) {
    this.ctx = ctx;

    this.tileMap = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]; 

    this.assetMap = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 3, 2, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 4, 0, 0, 0,
      0, 6, 5, 5, 5, 5, 7, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 6, 5, 5, 5, 7, 0, 0, 0,
      0, 6, 5, 5, 5, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 7, 0, 0, 0,
      0, 6, 5, 5, 5, 5, 7, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 4, 5, 5, 5, 8, 8, 8, 8,
      2, 2, 2, 4, 5, 5, 7, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 7, 0, 0, 0,
      5, 5, 5, 7, 5, 5, 7, 0, 3, 2, 2, 2, 2, 2, 2, 2, 4, 5, 5, 5, 7, 5, 5, 5, 7, 0, 0, 0,
      5, 5, 5, 7, 5, 5, 7, 0, 6, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 7, 5, 5, 5, 7, 0, 0, 0,
      2, 2, 2, 2, 2, 4, 7, 0, 6, 5, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 7, 5, 5, 5, 3, 2, 2, 2,
      5, 5, 5, 5, 5, 7, 7, 0, 6, 5, 3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 7, 5, 5, 5, 6, 5, 5, 5,
      5, 5, 5, 5, 5, 7, 7, 0, 6, 5, 6, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 5, 5, 5, 6, 5, 5, 5,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ];
    
    this.extrasMap = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8,
      10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    this.tileSize = 50;
    this.rows = 14;
    this.cols = 28;

    this.frameCount = {
      shine: 0,
      delay: 0
    };

    this.image = imageLoader('./assets/tile_map.png');
    this.extras = imageLoader('./assets/extras.png');
    this.sky = imageLoader('./assets/sky.jpg');
  }

  redraw(x1, y1, x2, y2, tile, img) {
    this.ctx.drawImage(img, x1, y1, x2, y2, (tile % this.cols) * this.tileSize, Math.floor(tile / this.cols) * this.tileSize,
    this.tileSize + 2, this.tileSize + 2);

    // Added +2 to tileSize to rectify the border issue
  }

  shine(tile) {
    this.redraw(...SHINE_CYCLE[Math.floor(this.frameCount.shine / 6)], tile, this.image);
    this.frameCount.delay++;

    if (this.frameCount.delay == 20) {
      this.frameCount.shine++;
      this.frameCount.delay = 0;
    }

    if (this.frameCount.shine === 36) this.frameCount.shine = 0;
  }

  draw() {
    this.ctx.drawImage(this.sky, 0, 0);

    for (let tile = 0; tile < this.assetMap.length; tile++) {
      let currTile = this.assetMap[tile];
        
      switch(currTile) {
        case 1:
          this.redraw(...GROUND[0], tile, this.image);
          break;
        case 2:
          this.redraw(...HILL[0], tile, this.image);
          break;
        case 3:
          this.redraw(...HILL[1], tile, this.image);
          break;
        case 4:
          this.redraw(...HILL[2], tile, this.image);
          break;
        case 5: 
          this.redraw(...HILL[3], tile, this.image);
          break;
        case 6:
          this.redraw(...HILL[4], tile, this.image);
          break;          
        case 7:
          this.redraw(...HILL[5], tile, this.image);
          break;
        case 8:
          this.shine(tile);
          break;
        default:
          // this.ctx.fillStyle = currTile === 0 ? "pink" : "black";
          // this.ctx.fillRect((tile % this.cols) * this.tileSize, Math.floor(tile / this.cols) * this.tileSize, this.tileSize, this.tileSize);
          break;
      }
    }

    for (let tile = 0; tile < this.extrasMap.length; tile++) {
      let currTile = this.extrasMap[tile];

      switch(currTile) {
        case 1:
          this.redraw(...CLOUD[0], tile, this.extras);
          break;
        case 2:
          this.redraw(...CLOUD[1], tile, this.extras);
          break;
        case 3:
          this.redraw(...CLOUD[2], tile, this.extras);
          break;
        case 4:
          this.redraw(...CLOUD[3], tile, this.extras);
          break;
        case 5:
          this.redraw(...CLOUD[4], tile, this.extras);
          break;
        case 6:
          this.redraw(...CLOUD[5], tile, this.extras);
          break;
        case 7:
          this.redraw(...TREE[0], tile, this.extras);
          break;
        case 8:
          this.redraw(...TREE[1], tile, this.extras);
          break;
        case 9:
          this.redraw(...TREE[2], tile, this.extras);
          break;
        case 10:
          this.redraw(...TREE[3], tile, this.extras);
          break;
      }

    }


  }
}