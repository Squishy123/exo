class MainStage extends DOMStage{
    constructor(element, properties) {
        super(element, properties);
    }

    update() {

    }
}

let stage = new MainStage(document.querySelector('#stage'), {width: 'inherit', height: 'inherit', updateTicksPerSecond: 60});

let box = new DOMActor(document.createElement('div'), {width: 500, height: 500, x: 0, y: 0});

stage.addChild(box);
stage.start();