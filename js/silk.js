class DOMActor {
    constructor(element, properties) {
        //Attach a DOM object to stage
        this.element = (element) ? element : document.createElement('div');

        //default properties if null
        this.properties = (properties) ? properties : {
            width: (properties.width) ? properties.width : null,
            height: (properties.height) ? properties.height : null,
            running: (properties.running) ? properties.running : false,
            updateTicksPerSecond: (properties.updateTicksPerSecond) ? properties.updateTicksPerSecond : 0,
            renderTicksPerSecond: (properties.renderTicksPerSecond) ? properties.renderTicksPerSecond : 0,
            hasInit: (properties.hasInit) ? properties.hasInit : false
        };

        //set width and height
        this.setStyles({ width: this.properties.width, height: this.properties.height });

        //child objects in stage
        this.children = [];

        //parent node
        this.parent = null;

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
        child.parent = this;
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
    setStyles(styles) {
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
        //check for first init
        if (!this.properties.hasInit) {
            this.properties.hasInit = !this.properties.hasInit;
            this.properties.running = true;
            this.init();
        }

        //call fixedupdate on children
        this.children.map(async (c) => {
            c.fixedUpdate();
        });

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

        if (this.parent == null)
            requestAnimationFrame(this.fixedUpdate);
    }
}

class CanvasActor {
    constructor(canvas, properties) {
        //Attach canvas and context to actor
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        //default properties if null
        this.properties = (properties) ? properties : {
            width: (properties.width) ? properties.width : null,
            height: (properties.height) ? properties.height : null,
            running: (properties.running) ? properties.running : false,
            updateTicksPerSecond: (properties.updateTicksPerSecond) ? properties.updateTicksPerSecond : 0,
            renderTicksPerSecond: (properties.renderTicksPerSecond) ? properties.renderTicksPerSecond : 0,
            hasInit: (properties.hasInit) ? properties.hasInit : false
        };

        //child objects in stage
        this.children = [];

        //parent node
        this.parent = null;

        //start updating
        this.updateDate = window.performance.now();
        this.renderDate = window.performance.now();

        /**
         *@todo add automatic binding
         **/
        //bind super
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.draw = this.draw.bind(this);
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
        child.parent = this;
        this.children.push(child);
    }

    //removes an item from the world
    removeChild(child) {
        this.children = this.children.filter((v) => {
            return !Object.is(v, child);
        });
    }

    //individual draw function for each actor
    async draw() { }

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
            delete this[prop];
        });
    }

    //run every tick
    async fixedUpdate() {
        //check for first init
        if (!this.properties.hasInit) {
            this.properties.hasInit = !this.properties.hasInit;
            this.properties.running = true;
            this.init();
        }

        //call fixedupdate on children
        this.children.map(async (c) => {
            c.fixedUpdate();
        });

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

        if (this.parent == null)
            requestAnimationFrame(this.fixedUpdate);
    }
}

class BoundingCanvasActor extends CanvasActor {
    constructor(canvas, properties) {
        super(canvas, properties);

        //location
        this.properties.x = (properties.x) ? properties.x : 0;
        this.properties.y = (properties.y) ? properties.y : 0;
    }
}

class QuadTree {
    //Create a new quadtree given a current level and bounds object({x, y, width, height})
    constructor(currentLevel, bounds) {
        //properties
        this.level = currentLevel;
        this.objects = [];
        this.bounds = bounds;
        this.nodes = [];

        //default consts
        const MAX_OBJECTS = 10;
        const MAX_LEVELS = 5;
    }

    //clears the quadtree
    clear() {
        //empty objects
        objects = [];

        //recursively clear all nodes
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].clear();
        }

        //empty nodes
        nodes = [];
    }

    //split this node into 4 subnodes
    split() {
        subWidth = this.bounds.width / 2;
        subHeight = this.bounds.height / 2;

        //node 0
        this.nodes.push(new QuadTree(this.level + 1, { x: this.bounds.x + subWidth, y: this.bounds.y, width: subWidth, height: subHeight }));

        //node 1
        this.nodes.push(new QuadTree(this.level + 1, { x: this.bounds.x, y: this.bounds.y, width: subWidth, height: subHeight }));

        //node 2
        this.nodes.push(new QuadTree(this.level + 1, { x: this.bounds.x, y: this.bounds.y + subHeight, width: subWidth, height: subHeight }));

        //node 3
        this.nodes.push(new QuadTree(this.level + 1, { x: this.bounds.x + subWidth, y: this.bounds.y + subHeight, width: subWidth, height: subHeight }));
    }

    //find which node a given object belongs to
    getIndex(nodeBounds) {
        let index = -1;
        let verticalMidpoint = this.bounds.x + (this.bounds.width / 2);
        let horizontalMidpoint = this.bounds.y + (this.bounds.height / 2);

        //Object fits within the top quadrants
        let topQuad = (nodeBounds.y < horizontalMidpoint && nodeBounds.y + nodeBounds.height < horizontalMidpoint);
        //Object fits within the bottom quadrants
        let botQuad = (nodeBounds.y > horizontalMidpoint);

        //Object fits within the left quadrants
        if (nodeBounds.x < verticalMidpoint && nodeBounds.x + nodeBounds.width < verticalMidpoint) {
            if (topQuad)
                index = 1;
            else if (botQuad)
                index = 2;
        }
        //Object fits within the right quadrants
        else if (nodeBounds.x > verticalMidpoint) {
            if (topQuad)
                index = 0;
            else if (botQuad)
                index = 3;
        }

        return index;
    }

    //insert an object into the quadtree, if the node exceeds the capacity
    // split and add objects to their corresponding nodes
    insert(actor) {
        if (this.nodes[0] != null) {
            let index = getIndex(actor.properties.bounds);

            if (index != -1) {
                nodes[index].insert(actor);

                return;
            }
        }

        this.actorects.push(actor);

        //overflow
        if (this.objects.length > this.MAX_OBJECTS && this.level < this.MAX_LEVELS) {
            if (!nodes[0]) {
                this.split();
            }
            //add to the corresponding nodes
            for (let i = 0; i < this.objects.length; i++) {
                let index = getIndex(this.objects[i]);
                if (index != -1) {
                    nodes[index].insert(this.objects[i]);
                    this.objects = this.objects.splice(i, i + 1);
                }
            }
        }
    }

    //return all objects that could collide with a given object
    retrieve(actor, retrievedObjs) {
        //check if retrievedObjs is null
        if(!retrievedObjs)
            retrievedObjs = [];
            
        let index = getIndex(actor.properties.bounds);
        if(index != -1 && this.nodes[0] != null) {
            nodes[index].retrieve(actor, retrievedObjs);
        }

        retrievedObjs.push(...this.objects);

        return retrievedObjs;
    }
}