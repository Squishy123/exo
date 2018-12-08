class MainStage extends DOMStage{
    constructor(element, properties) {
        super(element, properties);
    }

    update() {
        //console.log("Hello World!");
    }
}

let stage = new MainStage(document.querySelector('#stage'), {width: 'inherit', height: 'inherit', updateTicksPerSecond: 60});


stage.start();