class ColorSquare extends DOMActor {
    constructor(element, properties) {
        super(element, properties);
        this.setStyles({ "background-color": "cornflowerblue" })
    }

    render() {
        let rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
        this.setStyles({ 'background-color': `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` });
    }
}


let stage = new ColorSquare(document.querySelector('#stage'), { width: '100%', height: '100%', updateTicksPerSecond: 1, renderTicksPerSecond: 1 });

let box = new ColorSquare(null, { width: '50%', height: '50%', updateTicksPerSecond: 1, renderTicksPerSecond: 1 });
box.setStyles({ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });


stage.addChild(box);
stage.start();
box.start();