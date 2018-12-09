class DOMStage {
    constructor(element, properties) {
        //Attach a DOM object to stage
        this.element = (element) ? element : document.createElement('div');

        //default properties if null
        this.properties = (properties) ? properties : {width: 0, height: 0, running: false, updateTicksPerSecond: 0};

        //child objects in stage
        this.children = [];    

        //start updating
        this.updateDate = window.performance.now();
    
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
    
    //update called every updatetick
    update() {
    }

    //run every tick
    fixedUpdate() {
        if(this.properties.running && window.performance.now() - this.updateDate > 1000/this.properties.updateTicksPerSecond) {
            //run update
            this.update();
            
            //reset updateTimer
            this.updateDate = window.performance.now();
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

class DOMActor {
    constructor(element, properties) {
        this.element = (element) ? element : document.createElement('div');
        //bounds(width, height, x, y)
        this.properties = (properties) ? properties : null;
    }   

    //called every render tick
    render() {

    }

    //called every update tick
    update() {

    }
}

class CanvasActor {
    constructor(properties) {
        this.properties = (properties) ? properties: null;
    }

    render() {

    }

    update() {

    }
}