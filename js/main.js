class MainStage extends DOMActor{
    constructor(element, properties) {
        super(element, properties);
    }

    update() {
        console.log("Hello World!");
    }

    render() {
        console.log("not rendering")
    }
}

class GUIElement extends DOMActor {
    constructor(element, properties) {
        super(element, properties);
    }


}

let stage = new MainStage(document.querySelector('#stage'), {width: 'inherit', height: 'inherit', updateTicksPerSecond: 1, renderTicksPerSecond: 2});

let box = new DOMActor(document.createElement('div'), {width: 500, height: 500, x: 0, y: 0});

stage.addChild(box);
stage.start();