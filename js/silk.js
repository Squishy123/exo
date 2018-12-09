class DOMActor {
    constructor(element, properties) {
        //Attach a DOM object to stage
        this.element = (element) ? element : document.createElement('div');

        //default properties if null
        this.properties = (properties) ? properties : {
            width: (this.properties.width) ? this.properties.width : 0, 
            height: (this.properties.height) ? this.properties.height : 0, 
            running: (this.properties.running) ? this.properties.running : false, 
            updateTicksPerSecond: (this.properties.updateTicksPerSecond) ? this.properties.updateTicksPerSecond : 0, 
            renderTicksPerSecond: (this.properties.renderTicksPerSecond) ? this.properties.renderTicksPerSecond: 0
        };

        //child objects in stage
        this.children = [];

        //start updating
        this.updateDate = window.performance.now();
        this.renderDate = window.performance.now();

        /**
         *@todo add automatic binding
         **/
        //bind super
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.update = this.update.bind(this);
        this.fixedUpdate = this.fixedUpdate.bind(this);
        this.addChild = this.addChild.bind(this);
        this.removeChild = this.removeChild.bind(this);
    }

    //start running
    start() {
        this.properties.running = true;
        this.fixedUpdate();
    }

    //stop running
    stop() {
        this.properties.running = false;
    }

    //called once on update tick
    async init() {

    }

    //called every render tick
    async render() {

    }

    //called every update tick
    async update() {

    }

    //called when object is destroyed
    async destroy() {

    }

    //run every tick
    fixedUpdate() {
        if (this.properties.updateTicksPerSecond != 0 && this.properties.running && window.performance.now() - this.updateDate > 1000 / this.properties.updateTicksPerSecond) {
            //run update
            this.update();

            //reset updateTimer
            this.updateDate = window.performance.now();
        }

        if (this.properties.renderTicksPerSecond != 0 && this.properties.running && window.performance.now() - this.renderDate > 1000 / this.properties.renderTicksPerSecond) {
            //run update
            this.render();

            //reset updateTimer
            this.renderDate = window.performance.now();
        }



        requestAnimationFrame(this.fixedUpdate);
    }

    //add a child element to the stage
    addChild(child) {
        this.children.push(child);
        this.element.appendChild(child.element);
    }

    //removes an item from the world
    removeChild(child) {
        this.children = this.children.filter((v) => {
            return !Object.is(v, child);
        });
    }
}

class CanvasActor {
    constructor(properties) {
        this.properties = (properties) ? properties : null;
    }

    //called once on update tick
    async init() {

    }

    //called every render tick
    async render() {

    }

    //called every update tick
    async update() {

    }

    //called when object is destroyed
    async destroy() {

    }
}