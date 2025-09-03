"use strict";

/**
 * @author Mjduniverse
 * @copyright 2020 Mjduniverse 
 * @license
 *
 * Physics Simulator Class Library
 *
 * Copyright 2020 Mjduniverse.com
 * 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
  * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
  * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * 
 * The options that can be used to create a dynamic simulation could be a 
 * CompositeSimulation object, a simulation object or an array 
 * of static objects.
 * 
 * If an array is chosen, then it is used to create
 * 
 * @typedef {PhSim.Static|PhSim.Static.Simulation|StaticObject[]} DynSimOptions
 * @property {HTMLCanvas} canvas - Simulation canvas
 * @property {Number} initSimIndex - The inital simulation index. If undefined, the simulation index is 0.
 * @property {HTMLElement} container - The container 
 * 
 */

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} [dynSimOptions] - The simulation object
 * @mixes PhSim.PhSimEventTarget
 * 
 */

function PhSim(dynSimOptions) {

	PhSim.Static.call(this);

	if(typeof dynSimOptions === "object") {
		Object.assign(this,dynSimOptions);
	}

	if(Array.isArray(dynSimOptions.simulations)) {
		this.simulations = dynSimOptions.simulations;
	}

	else if(Array.isArray(dynSimOptions.layers)) {
		this.simulations[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions.objUniverse)) {
		this.simulations[0].layers[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions)) {
		this.simulations[0].layers[0].objUniverse = [];
	}

	if(typeof dynSimOptions.wFunctions === "object") {
		this.wFunctions = dynSimOptions.wFunctions
	}

	// Register Plugin
	
	if(!dynSimOptions.noUse) {
		Matter.use(PhSim.matterPlugin);
	}

	/**
	 * The static simulation object
	 * @typedef {DynSimOptions}
	 */

	this.options = dynSimOptions;

	/**
	 * Debugging Configuration
	 * @type {Object}
	 */

	this.debugging = this.debugging || {
		logMouseMovePerformance: true
	}

	/**
	 * Debugging data
	 * @type {Object}
	 */
	
	this.debuggingData = {}

	// Configure canvas

	if(dynSimOptions.canvas) {
		this.connectCanvas(dynSimOptions.canvas)
	}

	else {
		var newCanvas = document.createElement("canvas");
		this.connectCanvas(newCanvas);
	}

	// Configure container

	if(dynSimOptions.container) {
		this.connectContainer(dynSimOptions.container);
	}

	else {
		var newContainer = document.createElement("div");
		this.connectContainer(newContainer);
	}

	// Register event keys

	this.registerKeyEvents();

	// Inital Simulation

	if(dynSimOptions.initSimIndex) {
		this.gotoSimulationIndex(dynSimOptions.initSimIndex);
	}

	else {
		this.gotoSimulationIndex(0);
	}

}

/**
 * Connect an HTML canvas to the PhSim simulation object.
 * 
 * @function
 * @param {HTMLCanvasElement} canvas 
 */

PhSim.prototype.connectCanvas = function(canvas) {

	/**
	 * Simulation canvas
	 * @type {HTMLCanvasElement}
	 */

	this.canvas = canvas;

	/**
	 * Simulation context for the canvas
	 * @type {CanvasRenderingContext2D}
	 */

	this.ctx = canvas.getContext("2d");

	
	this.canvas.width = this.box.w || this.box.width;
	this.canvas.height = this.box.h || this.box.height;
	this.registerCanvasEvents();
	this.configRender(this.ctx);
}

/**
 * Connect a container for the PhSim simulation object. The PhSim canvas is supposed to be 
 * the only child element of the container.
 * 
 * When set, the container has the simulation canvas appened as a child.
 * 
 * @function
 * @param {HTMLElement} c - Container
 */

PhSim.prototype.connectContainer = function(c) {
	
	/**
	 * The simulation container.
	 * This is is supposed to be the wrapping element of the {@link PhSim#canvas|PhSim canvas}.
	 * @type {HTMLElement}
	 */

	this.container = c;

	c.appendChild(this.canvas);
	c.classList.add("phsim-container");

	this.configFilter(c);

}

/**
 * Number of frames per second
 */

PhSim.prototype.delta = 50/3; // 16 frames per second, or 16 frames per 1000ms

/**
 * Boolean property for telling if the simulation has loaded a simulation at least one time.
 * @type {Boolean}
 */

PhSim.prototype.init = false;

/**
 * Time for inside the world
 * @type {Number}
 */

PhSim.prototype.sl_time = 0;

/**
 * Index of the current simulation.
 * @default 0
 * @type {Number}
 */

PhSim.prototype.simulationIndex = 0;

/**
 * PhSim status codes for loading simulations.
 * @readonly
 * @namespace
 */

PhSim.statusCodes = {

	/**
	 * Inital loading status
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	INT: 0,

	/**
	 * This status means that the DynObjects have been loaded.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_DYN_OBJECTS: 1,

	/**
	 * This status means that the sprites have been loaded, if there are any. 
	 * If there are no sprites, then this status is set anyway.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_SPRITES: 2,

	/**
	 * This status means that the audio has loaded.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_AUDIO: 3,

	/**
	 * This status means that the simulation is done configuring.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_SIMULATION: 4
}

/**
 * Loading status of the dynamic simulation
 * @type {Number}
 */

PhSim.prototype.status = 0;

/**
 * x-coordinate of the mouse
 * @type {Number}
 */

PhSim.prototype.mouseX = null;

/**
 * y-coordinate of the mouse
 * @type {Number}
 */

PhSim.prototype.mouseY = null;

/**
 * Simulation options
 * @deprecated Due to confusing name.
 */

PhSim.prototype.sim = null;

/**
 * Current simulation options
 * @deprecated Due to confusing name.
 */

PhSim.prototype.simulation = null;

/**
 * Boolean property to tell if the simulation is paused or not.
 * @type {Boolean}
 */

PhSim.prototype.paused = true;

/**
  * 
  * @callback PhSimEventCall
  * @param {PhSim.Events.PhSimEvent} phEvent
  * 
  */


/**
 * The matter.js world
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Object}
 */

PhSim.prototype.matterJSWorld = null;

/**
 * The matter.js engine 
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Object}
 */

PhSim.prototype.matterJSEngine = null;

/**
 * An tree that is used to preserve layer distinctions.
 * It is an array of arrays. The arrays in this array have {@link PhSimObject} objects.
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {PhSimObjectArr[]} 
 */

PhSim.prototype.dynTree = [];

/**
 * Array of objects in the PhSim simulation
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {PhSimObjectArr} 
 */

PhSim.prototype.objUniverse = [];

/**
 * Array of static sprite objects that are to be extracted by 
 */

PhSim.prototype.staticSprites = [];

PhSim.prototype.staticAudio = [];

/**
 * Number of audio players.
 * This is reset to 0 whenever {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Number}
 */

PhSim.prototype.audioPlayers = 0;


/**
 * Classes
 * When {@link PhSim#gotoSimulationIndex} is run, this is blanked and repopulated.
 * @type {Object}
 */

PhSim.prototype.classes = {};

/**
 * Background fill style for rendering.
 * When {@link PhSim#gotoSimulationIndex} is run, the function sets this value to the
 * value of {@link PhSim.simOptions.box.bgColor} if it is not a {@link Falsey} value;
 * 
 * @type {String}
 */

PhSim.prototype.bgFillStyle = "white";

/**
 * PhSim version
 * @type {String}
 */

PhSim.version = require("./version-name.js");

/**
 * Loading screen properties
 * @type {Object}
 * @property {String} [bgColor = "black"] - Background Color
 * @property {String} [txtColor = "white"] - Text Color
 * @property {String} [txtFace = "arial"] - Text Face
 * @property {String} [txtAlign = "center"] - Text align
 * @property {String} [txt = "Loading..."] - Loading text
 * @property {String} [yPos = "center"] - y-position
 * @property {Number} [txtSize = 20] -  Text size
 */

PhSim.prototype.loading = {
	bgClr: "black",
	txtClr: "white",
	txtFace: "arial",
	txtAlign: "center",
	txt: "Loading...",
	yPos: "center",
	txtSize: 20
}

/**
 * The `drawLoadingScreen` function draws the loading screen for a simulation change.
 * The behaviour of the loading screen can be customized by modifing the properties of
 * {@link PhSim#loading}.
 * 
 * @function
 */

PhSim.prototype.drawLoadingScreen = function() {
	this.ctx.fillStyle = this.loading.bgClr;
	this.ctx.fillRect(0,0,this.camera.scale,this.canvas.height);
	this.ctx.fillStyle = this.loading.txtClr;
	this.ctx.textAlign = this.loading.txtAlign;
	this.ctx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.ctx.fillText(this.loading.txt,this.canvas.width / 2,this.canvas.height / 2)
}

if(typeof window === "object") {
	window.PhSim = PhSim;
}

if(typeof module === "object") {
    module.exports = PhSim;
}

PhSim.Static = require("./objects" );


/**
 * Object that registers PhSim as a Matter.js plugin.
 * The modified matter.js object is stored in {@link Matter}
 * @namespace
 * 
 */

const matterPlugin = {

    name: "phsim",

    version: "0.1.0",

    /**
     * Installation function for plugin
     * @param {Matter} matter 
     */

    install: function(matter) {

        matter.after('Detector.collisions',function(){
            matterPlugin.Detector.collisions.call(this,arguments);
        });

        //matter.after('Body.create',function(options){
          //  matterPlugin.Body.init(options)
        //});

    },

    /**
     * Detector patch for Matter.js.
     * 
     * 
     */

    Detector: {

        /**
         * Matter.Detector.collisions patch for Matter.js.
         * This modifies the function for checking collisions in Matter.js.
         * @function 
         */

        collisions: function() {

            for(var i = 0; i < this.length; i++) {

                var bodyA = this[i].bodyA;
                var bodyB = this[i].bodyB;
                var c_classesA;
                var c_classesB;

                if( (bodyA.parent === bodyA && bodyA.plugin.dynObject.noCollision) || (bodyB.parent === bodyB && bodyB.plugin.dynObject.noCollision) ) {
                    this.splice(this.indexOf(this[i]),1);
                }

                if(bodyA.parent === bodyA) {
                    if(bodyA.plugin.dynObject instanceof DynObject) {
                        c_classesA = PhSim.Query.getCollisionClasses(bodyA.plugin.dynObject);
                    }
                }
                
                else {
                    c_classesA = PhSim.Query.getCollisionClasses(bodyA.parent.plugin.dynObject);
                }

                if(bodyB.parent === bodyB) {
                    if(bodyB.plugin.dynObject instanceof DynObject) {
                        c_classesB = PhSim.Query.getCollisionClasses(bodyB.plugin.dynObject);
                    }    
                }

                else {
                    c_classesB = PhSim.Query.getCollisionClasses(bodyB.parent.plugin.dynObject);                    
                }

                if(c_classesA.length > 0 && c_classesB.length > 0) {
                    if(!PhSim.Query.intersectionExists(c_classesA,c_classesB)) {

                        this.splice(this.indexOf(this[i]),1);

                        // Reset index to zero to make sure all collisions
                        // that have no collision classes in common get removed

                        i = 0;
                    }
                }


            }

        }
    }

}

PhSim.matterPlugin = matterPlugin;

Matter.Plugin.register(PhSim.matterPlugin); 

PhSim.EventStack = require("./events/eventStack" );

/**
 * Object containing array functions to be called.
 * @type {PhSim.EventStack}
 */

PhSim.prototype.eventStack = new PhSim.EventStack();

/**
 * An array stack that is cleared each time the main simulation is changed.
 * @type {PhSim.EventStack}
 */

PhSim.prototype.simulationEventStack = new PhSim.EventStack();

PhSim.prototype.getWidgetByName = require("./getWidgetByName.js");

PhSim.PhRender = require("./phRender");

(function() {

	/**
	 * Sprites namespace
	 * @namespace
	 * @memberof PhSim
	 */

	var Sprites = {
		Calc: {}
	}

	Sprites.Sprite = function() {
		this.src = null;
		this.w = null;
		this.h = null;
		this.x = null;
		this.y = null;
		this.fit = null;
		this.repeat = null;
		this.object = null;
	}

	Sprites.renderSprite = function(ctx,sprite) {
		var localElm = document.createElement("img");
		localElm.src = sprite.src;
		if(sprite.spec === true) {
			ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
		}

		if(sprite.auto === true) {
			ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
		}
	}

	Sprites.renderGlobalSprites = function(ctx,simulation) {

		for(let i = 0; i < simulation.sprites.length; i++) {
			Sprites.renderSprite(ctx,simulation.sprites[i]);
		}

	}


	Sprites.circularSpriteRenderCanvas = function(ctx,canvas,angle) {

		var localElm = document.createElement("canvas");
		var localCtx = localElm.getContext("2d");

		var localImg = document.createElement("img");
		localImg.src = canvas.src;

		localCtx.rotate(angle);

		localCtx.drawImage()


	}

	/**
	 * 
	 * The `spriteImgObj` class is used to store catche for sprites.
	 * 
	 * @constructor
	 * @param {String[]} sprites - An array of strings representing sources
	 * @param {Function} onload - A function that is executed when all of the images are loaded.
	 */

	Sprites.spriteImgObj = function(sprites,onload = function() {}) {
		
		// Force load if sprites list is empty

		/**
		 * Array of catched sprites
		 */

		Object.defineProperty(this,"array",{
			enumerable: false,
			value: [],
			writable: true,
		})

		/**
		 * 
		 * Object of static sprite objects
		 * 
		 * @type {Object}
		 * @name PhSim.Sprites.spriteImgObj#static
		 */

		Object.defineProperty(this,"static",{
			enumerable: false,
			value: {},
			writable: true,
		});

		/**
		 * 
		 * Number of loaded sprites
		 * 
		 * @type {Number}
		 * @name PhSim.Sprites.spriteImgObj#loaded_n
		 */

		Object.defineProperty(this,"loaded_n",{
			enumerable: false,
			value: 0,
			writable: true
		});

		/**
		 * 
		 * Boolean telling us if it is loaded or not.
		 * 
		 * @type {Boolean}
		 * @name PhSim.Sprites.spriteImgObj#length
		 */

		Object.defineProperty(this,"loaded",{
			enumerable: false,
			value: false,
			writable: true,
		});

		/**
		 * 
		 * Function to call if loaded.
		 * 
		 * @type {Function}
		 * @name PhSim.Sprites.spriteImgObj#onload
		 */

		Object.defineProperty(this,"onload",{
			enumerable: false,
			value: onload,
			writable: true
		});

		/**
		 * 
		 * URL List
		 * 
		 * @type {Object}
		 * @name PhSim.Sprites.spriteImgObj#urls
		 */

		Object.defineProperty(this,"urls",{
			enumerable: false,
			value: [],
			writable: true
		});

		/**
		 * 
		 * Image List
		 * 
		 * @type {Array}
		 * @name PhSim.Sprites.spriteImgObj#urls
		 */

		Object.defineProperty(this,"img",{
			enumerable: false,
			value: [],
			writable: true
		});

		/**
		 * 
		 * Image List
		 * 
		 * @type {Array}
		 * @name PhSim.Sprites.spriteImgObj#urls
		 */

		Object.defineProperty(this,"loadedImg",{
			enumerable: false,
			value: [],
			writable: true
		});

		/**
		 * 
		 * Length
		 * 
		 * @type {Number}
		 * @name PhSim.Sprites.spriteImgObj#length
		 */

		Object.defineProperty(this,"length",{
			enumerable: false,
			value: 0,
			writable: true,
		})

		var self = this;

		for(var i = 0; i < sprites.length; i++) {
			self.addSprite(sprites[i],function(){
				if(self.loadedImg.length === self.img.length) {
					onload();
				}
			})
		}

		if(sprites.length === 0) {
			self.onload();
			self.loaded = true;
		}

	}

	/**
	 * 
	 * Add sprite to the Sprite Image Array.
	 * 
	 * @function
	 * @this Sprites.spriteImgObj
	 * 
	 * @param {string|Object} src - Source of sprite. If ```src``` is a string representing 
	 * a url, then the image added has its source as ```src```. If ```src``` is an object, 
	 * then the source is ```src.src```. This means that any object with an ```src``` property
	 * can be added.
	 * 
	 * @param {Function} [onload] - a function that is executed when the image loads.
	 * 
	 * @returns {Image}
	 */

	Sprites.spriteImgObj.prototype.addSprite = function(src,onload = function() {} ) {

		// Insuring that the sprite src stays a string.

		if(typeof src === "object" && typeof src.src === "string") {
			src = src.src;
		}

		var self = this;

		let img = document.createElement("img");

		let f = function() {

			self[src] = img;
			self.urls.push(src);
			self.loadedImg.push(this);
			self.length++;

			onload();

			img.removeEventListener("load",f);

		}

		img.addEventListener("load",f);

		this.img.push(img);

		img.src = src;

		return img;

	}

	PhSim.Sprites = Sprites;

})();

PhSim.Audio = require("./audio");
PhSim.Vector = require("./tools/vector");
PhSim.diagRect = require("./tools/diagRect");
PhSim.Vertices = require("./tools/vertex");

PhSim.Centroid = require("./tools/centroid");

// Bounding box functions

PhSim.BoundingBox = require("./tools/boundingBox");
PhSim.DynObject = require("./dynObject");
PhSim.Events = require("./events/eventObjects");


/**
 * @function
 * @param {Number} L 
 */

PhSim.prototype.L = function(L) {
	return this.dynTree[L];
}

/**
 * @function
 * @param {Number} L 
 * @param {Number} O 
 */

PhSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

/**
 * A Layer-Object string (LOStr) is a string specifying the layer and object indexes
 * of an object in the DynTree.'
 * 
 * The form of the LOStr is:
 * `<layer_index>,<object_index>`
 * 
 * @typedef {String} LOStr
 */

/**
 * @function
 * @param {LOStr} str
 * @returns {PhSimObject} 
 */

PhSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLCanvasElement} canvas
 * @memberof PhSim 
 */

PhSim.createFromCanvas = function(sim,canvas) {
	var o = Object.create(sim);
	o.canvas = canvas;
	return new PhSim(o);
}

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLElement} container 
 * @memberof PhSim 
 */

PhSim.createFromContainer = function(sim,container) {
	var o = Object.create(sim);
	o.container = container;
	return new PhSim(o);
}

/**
 * @function
 * @param {*} sim 
 * @memberof PhSim.DymSim 
 */

PhSim.createContainer = function(sim) {
	var container = document.createElement("div");
	return this.createFromContainer(sim,container);
}

/**
 * @function
 * @param {String} jsonURL - URL For JSON File
 * @param {function} onload - Onload function
 * @memberof PhSim 
 */

PhSim.loadFromJSON = function(jsonURL,onload) {

	var x = new XMLHttpRequest();
	x.open("GET",jsonURL);

	var f = function(){
		var o = PhSim.createContainer(JSON.parse(x.responseText));
		onload(o);
		x.removeEventListener("load",f);
	}

	x.addEventListener("load",f)

	x.send();

}

/**
 * @function
 * @memberof PhSim 
 */

PhSim.prototype.configRender = function() {
	
	this.assignPhRender(new PhSim.PhRender(this.ctx));
	
	if(!this.noCamera) {
		this.camera = new PhSim.Camera(this);
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

}

/**
 * Config filter
 * @function
 * @param {HTMLElement} container 
 */

PhSim.prototype.configFilter = function(container) {
	this.htmlFilter = document.createElement("div");
	this.htmlFilter.style.background = "rgba(3,3,3,0.7)";
	this.htmlFilter.style.position = "absolute";
	this.htmlFilter.style.display = "none";
	this.htmlFilter.classList.add("dynsim-filter");
	container.appendChild(this.htmlFilter);
}

/**
 * Enable filter
 * @function
 */

PhSim.prototype.enableFilter = function() {
	var elmBox = this.canvas.getBoundingClientRect();
	this.htmlFilter.style.display = "inline-block";
	this.htmlFilter.style.left = "0px";
	this.htmlFilter.style.position = "absolute";
	//this.htmlFilter.style.top = elmBox.top + "px";
	this.htmlFilter.style.width = Math.floor(elmBox.width) + "px";
	this.htmlFilter.style.height = Math.floor(elmBox.height) + "px";
}

/**
 * Disable filter
 * @function
 */

PhSim.prototype.disableFilter = function() {
	this.htmlFilter.style.display = "none";
}

/**
 * Toggle filter
 * @function
 */

PhSim.prototype.toggleFilter = function() {

	if(this.htmlFilter.style.display === "none") {
		this.enableFilter();
	}

	else {
		this.disableFilter();
	}
}

/**
 * @function
 * @param {Object} options - Options
 * @param {String} options.msg - The message
 * @param {String} options.closeButtonTxt - Inner text for closing button
 * @param {String} options.bgColor - Background Color
 * @param {String} options.txtColor - Text Color
 * @param {Number} options.w - Width
 * @param {Number} options.h - Height
 * @param {Function} options.onok - Function to call when alert is closed
 *  
 */

PhSim.prototype.alert = function(options) {
	
	var alertBox = document.createElement("div");
	alertBox.style.backgroundColor = options.bgColor;
	alertBox.style.color = options.txtColor;
	alertBox.style.textAlign = "center";
	alertBox.style.width = options.w + "px";
	alertBox.style.height = options.h + "px";
	alertBox.style.fontSize = "20px";

	var elmBox = this.canvas.getBoundingClientRect();

	var alertBoxMsg = document.createElement("div");
	alertBoxMsg.className = "phsim-alertbox-msg"
	alertBoxMsg.innerText = options.msg;
	alertBoxMsg.style.textAlign = "left";
	alertBoxMsg.style.padding = "20px";

	alertBox.appendChild(alertBoxMsg);

	var closeButton = document.createElement("div");

	var f = function() {
		options.onok();
		closeButton.removeEventListener("click",f);
	}

	closeButton.addEventListener("click",f);

	closeButton.innerText = options.closeButtonTxt;
	alertBox.appendChild(closeButton);

	this.container.appendChild(alertBox);

	alertBox.style.position = "absolute";
	alertBox.style.left = (elmBox.width * 0.5 - alertBox.offsetWidth * 0.5) + "px";
	alertBox.style.top = (elmBox.height * 0.5 - alertBox.offsetHeight * 0.5) + "px";

	return alertBox;

}

require("./widgets/dynWidget");
/**
 * 
 * Add Object to PhSim simulation
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Object} options
 * @param {Number} options.layer 
 * @returns {PhSim.DynObject} - The added dynObject. 
 */

PhSim.prototype.addObject = function(o,options = {}) {

	if(typeof options.layer === "number") {
		this.dynTree[options.layer].push(o);

		if(o instanceof DynObject) {
			o.layerBranch = this.dynTree[options.layer];
		}

	}

	this.objUniverse.push(o);

	if(o instanceof DynObject) {

		o.phSim = this;

		Matter.World.add(this.matterJSWorld,o.matter);

		if(o.static.widgets) {
			this.extractWidgets(o);
		}

	}

	return o;
}


/**
 * Add object to over layer.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.addToOverlayer = function(o) {
	
	if(o instanceof DynObject) {
		Matter.World.add(this.matterJSWorld, o.matter);
	}

	this.objUniverse.push(o);

}

/**
 * Remove dynamic object
 * 
 * @function
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 * @returns {PhSim.DynObject} - The removed Dynamic Object
 */

PhSim.prototype.removeDynObj = function(dynObject) {

	Matter.Composite.remove(this.matterJSWorld,dynObject.matter);

	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);

	if(dynObject.layerBranch) {
		var i = dynObject.layerBranch.indexOf(dynObject);
		dynObject.layerBranch.splice(i,1);
		dynObject.layerBranch = undefined;
	}

	return dynObject;

}

require("./events/registerEvents");

PhSim.PhSimEventTarget =  require("./events/eventListener");

Object.assign(PhSim.prototype,PhSim.PhSimEventTarget);

require("./query");

PhSim.prototype.applyGravitationalField = function() {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		for(var j = 0; j < a.length; j++) {
			if(i !== j && !this.isNonDyn(a[i]) && !this.isNonDyn(a[j]) && !a[i].matter.isStatic && !a[j].matter.isStatic) {
				var a1 = PhSim.Vector.scale(PhSim.Vector.subtract(a[j].matter.position,a[i].matter.position),6.67 * Math.pow(10,-11) * a[i].matter.mass * a[j].matter.mass * -1)
				var b1 = Math.pow(PhSim.Vector.distance(a[j].matter.position,a[i].matter.position),3);
				var c = PhSim.Vector.divide(a1,b1);
				PhSim.Motion.applyForce(a[j],a[i].matter.position,c);
			}
		}	
	}

}

require("./loop/toggle");

PhSim.prototype.gotoSimulationIndex = require("./loop/gotoSuperlayer");
PhSim.Motion = require("./motion");

/**
 * Assign PhRender to PhSim simulation
 * @param {PhSim.PhRender} phRender 
 */

PhSim.prototype.assignPhRender = function(phRender) {

	/** PhRender object */

	this.phRender = phRender;

	/** Refence to simulation in PhRender */

	this.phRender.sim = this.sim;

	/** Refence to dynamic simulation in PhRender */

	this.phRender.dynSim = this;
	return phRender;
}

PhSim.prototype.setRadius = function(dynObject,radius) {

	var ratio = radius / dynObject.radius;

	if(dynObject.shape === "regPolygon" || dynObject.shape === "circle") {
		Matter.Body.scale(dynObject.object, ratio, ratio);
	}

}

require("./loop/update");
require("./widgets/extractWidgets");

PhSim.Camera = require("./dynSimCamera");
PhSim.Game = require("./game");
PhSim.Gradients = require("./gradient");

PhSim.Widget = require("./widget.js");

require("./widgets");

PhSim.calc_skinmesh = require("./calc_skinmesh");


/**
 * Object containing variables that can be read by widgets such as
 * the {@link|RectText} widget. 
 */

PhSim.prototype.vars = {}

/**
 * Object containing magic words
 */

PhSim.prototype.magicWords = {}

PhSim.MagicWords = {

	__test1: function() {
		return "4";
	},

	/**
	 * The `__game__score` magical word returns the game score if the game widget is enabled.
	 * @function
	 * @returns {Number} - Game score.
	 */

	__game__score: function() {
		return this.lclGame && this.lclGame.score;
	},

	/**
	 * The `__game__life` magical word returns the live count of the player if the 
	 * game widget is enabled.
	 * 
	 * @function
	 * @returns {Number} - Life count
	 */

	__game__life: function() {
		return this.lclGame && this.lclGame.life; 
	},

	/**
	 * The `__game__goal` magical word returns the goal of the game if the game widget
	 * is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__goal: function() {
		return this.lclGame && this.lclGame.goal;
	},

	/**
	 * The `__game__int_life` magical word returns the intial life count of the game,
	 * given the game widget is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__int_life: function() {
		return this.lclGame && this.lclGame.intLife;
	},

	/**
	 * The `__game__int_score` magical word returns the inital game score given the 
	 * game widget is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__int_score: function() {
		return this.lclGame && this.lclGame.intScore;
	}

}

/**
 * 
 * Adds a global magical word function.
 * 
 * @function
 * @param {String} name - Name of magical word
 * @param {Function} call 
 */

PhSim.addGlobalMagicalWord = function(name,call) {
	
	if(PhSim.MagicWords[name]) {
		throw "Magical word " + name + " already exists."
	}

	else {
		PhSim.MagicWords[name] = call;
	}

}

/**
 * 
 * Adds a local magical word function.
 * 
 * @function
 * @param {String} name - Name of magical word
 * @param {Function} call 
 */

PhSim.prototype.addLocalMagicalWord = function(name,call) {

	if(this.magicWords[name]) {
		throw "Magical word " + name + " already exists."
	}

	else {
		this.magicWords[name] = call;
	}

}

/**
 * 
 * Process string by replacing magical words and the values of elements in
 * {@link PhSim#vars|PhSim.prototype.vars}.
 * 
 * Some of the magic words are the following:
 * 
 * `{__game__score}` - The game score
 * `{__game__life}` -  The game life
 * `{__game__goal}` - The game goal
 * `{__game__int_life}` - The inital life value for the game
 * 
 * The expression `${key}` is replaced by the value of `{@link PhSim#vars |PhSim.prototype.vars[key]}`.
 * 
 * @function
 * @param {String} str 
 * @returns {String}
 * 
 */

PhSim.prototype.processVar = function(str) {

	var magicWordKeys = Object.keys(PhSim.MagicWords);

	for(let i = 0; i < magicWordKeys.length; i++) {

		let magicWord = magicWordKeys[i];
		let mgkWordRegex = new RegExp("{" + magicWord + "}","g");

		if(str.search(mgkWordRegex) !== -1) {

			str = str.replace(mgkWordRegex,PhSim.MagicWords[magicWord].call(this));
		}

	}

	let a = Object.keys(this.vars);

	for(let i = 0; i < a.length; i++) {

		let v = "\\$\\{" + a[i] + "\\}";
		let regex = new RegExp(v,"g");
		let s = str.search(regex);

		if(s !== -1) {
			str = str.replace(regex,this.vars[ a[i] ]);
		}
	}

	return str;

}

(function () {

	const ObjLoops = {}

	/**
	 * Execute function on all members of a PhSim simulation or PhSim options.
	 * @function
	 * @param {PhSim|PhSimOptions} sim 
	 * @param {Function} method 
	 */

	ObjLoops.global = function(sim,method) {

		if(sim instanceof PhSim) {
			for(let i = 0; i < sim.objUniverse.length; i++) {
				method(sim.objUniverse[i]);
			}
		}

		else {

			for(let i = 0; i < sim.simulations.length; i++) {
				for(let j = 0; j < sim.simulations[i].layers.length; j++) {
					for(let k = 0; k < sim.simulations[i].layers[j].objUniverse.length; k++) {
						method(sim.simulations[i].layers[j].objUniverse[k]);
					}
				}
			}

		}

	}

	/**
	 * Execute function on all members of a simulation object.
	 * @function
	 * @param {Object} simulation 
	 * @param {Function} method 
	 */

	ObjLoops.simulation = function(simulation,method) {
		for(let j = 0; j < simulation.layers.length; j++) {
			for(let k = 0; k < simulation.layers[j].objUniverse.length; k++) {
				method(simulation.layers[j].objUniverse[k]);
			}
		}
	}

	/**
	 * Execute function on all members of an layer
	 * @function
	 * @param {Object} layer
	 * @param {Function} method
	 */

	ObjLoops.layer = function(layer,method) {
		for(let k = 0; k < layer.objUniverse.length; k++) {
			method(layer.objUniverse[k]);
		}
	}

	PhSim.ObjLoops = ObjLoops;

})();


/**
 * Global event stack
 * @type {PhSim.EventStack}
 */

PhSim.prototype.eventStack = new PhSim.EventStack();


/**
 * Event stack for simulation specfic events
 * @type {PhSim.EventStack}
 */

PhSim.prototype.simulationEventStack = new PhSim.EventStack();

 

/**
 * Structure giving more human-readable meaning to PhSim status.
 * @type {String[]}
 */

PhSim.statusStruct = {
	0: "Unloaded",
	1: "Initalized",
	2: "Loaded Images",
	3: "Loaded Audio",
	4: "Loaded Simulation"
}