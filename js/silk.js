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
            renderTicksPerSecond: (this.properties.renderTicksPerSecond) ? this.properties.renderTicksPerSecond : 0
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
        this.init = this.init.bind(this);
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);
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

    //Add or set style properties to the element
    //styles object
    addStyles(styles) {
        Object.assign(this.element.style, styles);
    }

    //Remove styles from the element
    //array of style names
    removeStyles(...styles) {
        styles.forEach((attr) => {
            this.element.removeAttribute(attr);
        })
    }

    //Add classes to the element
    //string or array of classnames
    addClasses(...classes) {
        this.element.classList.add(classes);
    }

    //Remove classes from the element
    //string or array of classnames
    removeClasses(...classes) {
        this.element.classList.remove(classes);
    }

    //called once on update tick
    async init() { }

    //called every render tick
    async render() { }

    //called every update tick
    async update() { }

    //called when object is destroyed
    async destroy() { }

    //completely wipe out all memory references
    async fixedDestroy() {
        //run custom destroy
        this.destroy();

        //delete DOM elements and recursive objects
        this.children.map(async (c) => {
            c.fixedDestroy();
        });

        //remove element
        this.element.remove();

        //default gc element
        let properties = Object.getOwnPropertyNames(this);
        properties.forEach((prop) => {
            this.prop = null;
        });
    }

    //run every tick
    async fixedUpdate() {
        let updateTask = new Promise(((resolve, reject) => {
            if (this.properties.updateTicksPerSecond != 0 && this.properties.running && window.performance.now() - this.updateDate > 1000 / this.properties.updateTicksPerSecond) {
                //run update
                this.update();

                //reset updateTimer
                this.updateDate = window.performance.now();
            }
            resolve();
        }).bind(this));

        let renderTask = new Promise(((resolve, reject) => {
            if (this.properties.renderTicksPerSecond != 0 && this.properties.running && window.performance.now() - this.renderDate > 1000 / this.properties.renderTicksPerSecond) {
                //run update
                this.render();

                //reset updateTimer
                this.renderDate = window.performance.now();
            }
            resolve();
        }).bind(this));

        await Promise.all([updateTask, renderTask]);
        requestAnimationFrame(this.fixedUpdate);
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