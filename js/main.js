class ColorSquare extends DOMActor {
    constructor(element, properties) {
        super(element, properties);
        this.setStyles({ "background-color": "cornflowerblue", "transition": "background-color 0.3s ease" })
    }

    render() {
        let rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
        this.setStyles({ 'background-color': `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` });
    }
}


let stage = new ColorSquare(document.querySelector('#stage'), { width: '100%', height: '100%', updateTicksPerSecond: 1, renderTicksPerSecond: 1 });
stage.setStyles({ display: "flex", "flex-direction": 'row', "flex-wrap": 'wrap' });

let tiles = [];

for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
        let box = new ColorSquare(null, { width: '25%', height: '25%', updateTicksPerSecond: 1, renderTicksPerSecond: 5 });
        box.setStyles({ 'opacity': 0.2});
        tiles.push(box);
        stage.addChild(box);
    }
}


stage.start();
//box.start();