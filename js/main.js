class TileStage extends CanvasActor {
    constructor(canvas, properties) {
        super(canvas, properties);

        let bounds = { x: properties.x, y: properties.y, width: properties.width, height: properties.height };
        this.quadTree = new QuadTree(0, bounds);
    }

    draw() {
        let rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
        this.ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        this.ctx.fillRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
    }

    update() {

    }

    render() {
        //this.draw();
    }

    addChild(child) {
        super.addChild(child);
        this.quadTree.insert(child);
        console.log(this.quadTree.getIndex(child.properties));
    }

    checkCollision(object1, object2) {
        if (object1.properties.x < object2.properties.x + object2.properties.width && object1.properties.x + object1.properties.width > object2.properties.x &&
          object1.properties.y < object2.properties.y + object2.properties.height && object1.properties.y + object1.properties.height > object2.properties.y) {
          return true;
        }
        return false;
      }
}

class Tile extends BoundingCanvasActor {
    constructor(canvas, properties) {
        super(canvas, properties);
        this.properties.sprite = properties.sprite;
    }

    init() {
        this.draw();
    }

    draw() {
        this.ctx.drawImage(this.properties.sprite, this.properties.x, this.properties.y);
    }
}

class Player extends BoundingCanvasActor {
    constructor(canvas, properties) {
        super(canvas, Object.assign(properties, { width: 10, height: 64 }));
    }


}

//array of assets with format {name: "", path: ""}
async function loadAssets(assets) {
    let loader = assets.map((path) => {
        let p = new Promise((resolve, reject) => {
            let img = new Image();
            img.src = path;
            img.onload = () => {
                resolve(img);
            }
        });
        return p;
    });

    let loaded = await Promise.all(loader);
    return loaded
}


async function main() {
    let canvasElement = document.querySelector('#stage');
    [canvasElement.width, canvasElement.height] = [800, 500];

    //load assets
    const GRASS_TILES = await loadAssets(['res/grass-0.png', 'res/grass-1.png', 'res/grass-edge.png'])

    //set canvas width and height
    let canvas = new DOMActor(document.querySelector('#stage'), { width: '800px', height: '500px' });
    canvas.setStyles({ "background-color": "cornflowerblue" });

    //setup world
    let world = new TileStage(document.querySelector('#stage'), { updateTicksPerSecond: 60, renderTicksPerSecond: 1 });
    world.start();

    
    for (let i = 0; i<100; i++) {
        let tile = new Tile(document.querySelector('#stage'), { x: i*33, y: 300, width: 33, height: 33 , sprite: GRASS_TILES[0]});
        world.addChild(tile);
    }

    for (let i = 0; i<100; i++) {
        let tile = new Tile(document.querySelector('#stage'), { x: 800-(i*33), y: 100, width: 33, height: 33 , sprite: GRASS_TILES[0]});
        world.addChild(tile);
    }
    
    let tile1 = new Tile(document.querySelector('#stage'), { x: 100, y: 100, width: 33, height: 33, sprite: GRASS_TILES[0] });
    world.addChild(tile1);

    let tile2 = new Tile(document.querySelector('#stage'), { x: 80, y: 80, width: 33, height: 33, sprite: GRASS_TILES[0] });
    world.addChild(tile2);

    let collides = [];
    world.quadTree.retrieve(tile1).forEach(e => {
        if(e != tile1 && world.checkCollision(tile1, e))
            collides.push(e);
    });

    console.log(collides);
}


main();