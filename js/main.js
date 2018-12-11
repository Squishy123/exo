class MainStage extends DOMActor {
    constructor(element, properties) {
        super(element, properties);
        this.setStyles({ "width": "500px", height: "500px", "background-color": "cornflowerblue" })
    }

    init() {

    }

    update() {
    }

    render() {
        let rgb = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
        this.setStyles({ 'background-color': `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` });
    }
}

class GUIElement extends DOMActor {
    constructor(element, properties) {
        super(element, properties);
    }


}

let stage = new MainStage(document.querySelector('#stage'), { width: 'inherit', height: 'inherit', updateTicksPerSecond: 1, renderTicksPerSecond: 1 });

let box = new DOMActor(document.createElement('div'), { width: 500, height: 500, x: 0, y: 0 });

stage.addChild(box);
stage.start();