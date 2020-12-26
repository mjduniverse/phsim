/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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

/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} [dynSimOptions] - The simulation object
 * @mixes PhSim.PhSimEventTarget
 * 
 */

function PhSim(dynSimOptions = new PhSim.Static()) {

	PhSim.Static.call(this);

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

	if(!typeof Matter === "object") {
		throw "PhSim requires matter.js."
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

	this.simCanvas = canvas;

	/**
	 * Simulation context for the canvas
	 * @type {CanvasRenderingContext2D}
	 */

	this.simCtx = canvas.getContext("2d");

	
	this.simCanvas.width = this.box.w || this.box.width;
	this.simCanvas.height = this.box.h || this.box.height;
	this.registerCanvasEvents();
	this.configRender(this.simCtx);
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
	 * This is is supposed to be the wrapping element of the {@link PhSim#simCanvas|PhSim canvas}.
	 * @type {HTMLElement}
	 */

	this.simContainer = c;

	c.appendChild(this.simCanvas);
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

PhSim.version = "0.1.0-alpha"

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
	this.simCtx.fillStyle = this.loading.bgClr;
	this.simCtx.fillRect(0,0,this.camera.scale,this.simCanvas.height);
	this.simCtx.fillStyle = this.loading.txtClr;
	this.simCtx.textAlign = this.loading.txtAlign;
	this.simCtx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.simCtx.fillText(this.loading.txt,this.simCanvas.width / 2,this.simCanvas.height / 2)
}

if(typeof window === "object") {
	window.PhSim = PhSim;
}

if(true) {
    module.exports = PhSim;
}

PhSim.Static = __webpack_require__(2 );

__webpack_require__(11 );

PhSim.EventStack = __webpack_require__(3 );

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

PhSim.PhRender = __webpack_require__(12);
PhSim.Sprites = __webpack_require__(13);
PhSim.Audio = __webpack_require__(14);
PhSim.Vector = __webpack_require__(4);
PhSim.diagRect = __webpack_require__(15);
PhSim.Vertices = __webpack_require__(6);

PhSim.Centroid = __webpack_require__(5);

// Bounding box functions

PhSim.BoundingBox = __webpack_require__(16);
PhSim.DynObject = __webpack_require__(1);
PhSim.Events = __webpack_require__(17);

__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);

PhSim.PhSimEventTarget =  __webpack_require__(7);

Object.assign(PhSim.prototype,PhSim.PhSimEventTarget);

__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);

PhSim.prototype.gotoSimulationIndex = __webpack_require__(27);
PhSim.Motion = __webpack_require__(8);

__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);

PhSim.Camera = __webpack_require__(31);
PhSim.Game = __webpack_require__(9);
PhSim.Gradients = __webpack_require__(32);

__webpack_require__(33);

PhSim.calc_skinmesh = __webpack_require__(47);

__webpack_require__(48);
__webpack_require__(49);

PhSim.ObjLoops = __webpack_require__(50);


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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Static = __webpack_require__(2);
const PhSim = __webpack_require__(0);
const Vertices = __webpack_require__(6);
const PhSimEventTarget = __webpack_require__(7);
const EventStack = __webpack_require__(3);

/**
 * 
 * Create Dynamic Object from static object
 * @constructor
 * @memberof PhSim
 * @param {PhSimObject} staticObject - Static Object
 * @param {Matter.Body} [matterBody] - Matter Body
 * 
 * @mixes PhSim.PhSimEventTarget
 * @mixes StaticObject
 * 
 * @property {Number} x - x position
 * @property {Number} y - y position
 * 
 */

var DynObject = function(staticObject,matterBody) {

	Object.assign(this,PhSimEventTarget);

	var self = this;

	Object.assign(this,JSON.parse(JSON.stringify(staticObject)));

	this.matter = matterBody || PhSim.DynObject.createMatterObject(staticObject);

	if(staticObject.shape === "polygon") {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	this.firstCycle = staticObject.cycle;

	if(staticObject.shape === "composite") {
		this.flattenedParts = DynObject.flattenComposite();
	}

	/** 
	 * Reference to static object used to create the DynObject
	 * @type {StaticObject}
	 */

	this.static = staticObject;

	/** 
	 * Object ID 
	 * @type {String}
	 * */

	this.id = DynObject.nextId;
	DynObject.nextId++;
	
	/**
	 * Reference to parent simulation
	 * @type {null|PhSim}
	 */

	this.phSim;

	/**
 	 * Object containing array functions to be called.
 	 * @type {PhSim.EventStack}
 	 */

	this.eventStack = new EventStack();

	/** 
	 * Refernce of DynObj in matter object 
	 * @type {PhSim.DynObject}
	 * */

	this.matter.plugin.dynObject = this;

}


/**
 * Set color for dynObject.
 * This can be done alternatively by setting `dynObject.fillStyle` directly.
 * 
 * @param {PhSim.DynObject} dyn_object - Dynamic Object
 * @param {String} colorStr - Color String
 */

DynObject.setColor = function(dyn_object,colorStr) {
	dyn_object.fillStyle = colorStr;
}

/**
 * Set color for dynObject.
 * This can be done alternatively by setting `dynObject.fillStyle` directly.
 * 
 * @param {String} colorStr - Color String
 */

DynObject.prototype.setColor = function(colorStr) {
	return DynObject.setColor(this,colorStr)
}

/**
 * Set border color.
 * @param {PhSim.DynObject} dyn_object 
 * @param {String} colorStr 
 */

DynObject.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.strokeStyle = colorStr;
}

/**
 * Set border color.
 * @param {String} colorStr 
 */

DynObject.prototype.setBorderColor = function(colorStr) {
	return DynObject.setBorderColor(this,colorStr);
}

/**
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {Number} lineWidth 
 */

DynObject.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.lineWidth = lineWidth;
}

DynObject.setRegPolygonSideNumber = function(dyn_object,sides) {

}

/**
 * 
 * @function
 * @param {PhSimObject} composite - The composite to be flattened.
 * @returns {PhSimObject[]} - The array of objects found in the composites. 
 */

DynObject.flattenComposite = function(composite) {

	var a = [];

	/**
	 * 
	 * @param {*} composite
	 * @inner
	 */
	
	var __f = function(composite) {

		for(var i = 0; i < composite.parts.length; i++) {

			if(composite.parts[i].shape === "composite") {
				DynObject.flattenComposite(composite.parts[i].shape === "composite");
			}

			else {
				a.push(composite.parts[i]);
			}

		}

	}

	__f(composite);

	return a;

}

/**
 * 
 * Create path
 * 
 * @function
 * @param {Vector[]} vectorSet 
 * @param {Path} options 
 */

DynObject.createPath = function(vectorSet,options) {
	var o = new Static.Polygon(vectorSet);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * Create circle
 * 
 * @function
 * @param {Number} x - x-coordinate of center
 * @param {Number} y - y-coordinate of center
 * @param {Number} r - radius
 * @param {Circle} options - options
 * @returns {PhSim.DynObject}
 */

DynObject.createCircle = function(x,y,r,options = {}) {
	var o = new Static.Circle(x,y,r);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * 
 * Create rectangle
 * 
 * @function
 * @param {Number} x - x-coordinate of upper left corner 
 * @param {Number} y - y-coordinate of upper left corner 
 * @param {Number} w - Width
 * @param {Number} h - Height
 * @param {Rectangle} options 
 * @returns {PhSim.DynObject} - The rectangle
 */

DynObject.createRectangle = function(x,y,w,h,options = {}) {
	var o = new Static.Rectangle(x,y,w,h);
	Object.assign(o,options);
}

/**
 * Create regular polgyon.
 * 
 * @function
 * @param {Number} x - x-coordinate of center
 * @param {Number} y - y-coordinate of center
 * @param {Number} r - radius
 * @param {Number} n - number of sides
 * @param {RegPolygon} options - options
 * @returns {PhSim.DynObject}
 */

DynObject.createRegPolygon = function(x,y,r,n,options = {}) {
	var o = new Static.RegPolygon(x,y,r,n);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * 
 * Create a matter.js object from a DynSim static object
 * 
 * @function
 * @param {StaticObject} staticObject
 * @returns {MatterBody} 
 */

DynObject.createMatterObject = function(staticObject) {

	var opts = staticObject.matter || {}

	opts.label = staticObject.name || "Untitled Object";

	opts.isStatic = staticObject.semiLocked;

	opts.isStatic = staticObject.locked;

	if(typeof staticObject.density === "number") {
		opts.density = staticObject.density;

	}

	else {
		opts.density = 0.001;
	}

	if(typeof staticObject.mass === "number") {
		opts.mass = staticObject.mass;
		opts.inverseMass = 1/staticObject.mass;
	}

	if(typeof staticObject.airFriction === "number") {
		opts.airFriction = staticObject.airFriction;
	}

	if(Number.isInteger(staticObject.collisionNum)) {
		opts.collisionFilter = staticObject.collisionNum;
	}


	if(staticObject.shape === "polygon") {
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(staticObject.shape === "circle") {
		return Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(staticObject.shape === "rectangle") {
		var set = Vertices.rectangle(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(staticObject.shape === "regPolygon") {
		var set = Vertices.regPolygon(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}


}

DynObject.nextId = 0;

/**
 * A PhSimObject is either a static object or a dynamic object.
 * 
 * @typedef {PhSim.DynObject|StaticObject} PhSimObject
 * 
 */

 /**
  * A PhSimObject array is an array of PhSimObject objects
  * @typedef {PhSimObject[]} PhSimObjectArr
  */

module.exports = DynObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * A static object is an object that is not simulated by the PhSim simulation.
 * The PhSim.Static namespace is used for storing Static Objects or constructors for 
 * parts of static objects.
 * 
 * A static simulation is an object that 
 * @namespace
 * @constructor
 * @memberof PhSim
 * 
 * 
 */


var Static = function() {

	/**
	 * PhSim version
	 * @type {Number}
	 */

	this.version = PhSim.version;

	/** 
	 * PhSim Static simulation Array 
	 * @type {PhSim.Static.Simulation[]}
	 */

	this.simulations = [];
	
	this.simulations.push(new PhSim.Static.Simulation());
	this.simulations[0].layers[0].name = "Untitled Layer"
	this.simulations[0].name = "Untitled simulation";

	/** PhSim Box Settings */

	this.box = new PhSim.Static.Rectangle(0,0,800,600);

}

/**
 * 
 * @typedef {PhSim.Vector|Circle|Rectangle|RegPolygon} Vector
 * 
 * In PhSim, a vector is any object with the properties `x` and `y` 
 * such that both are of the Number type.
 * 
 * In a {@link Circle}, the `x` and `y` coordinates refer to the center of the circle and the
 * same goes for the {@link RegPolygon|Regular Polygon}. In a {@link Rectangle}, it refers to the upper left
 * corner of the rectangle.
 * 
 */

/**
 * Gradient limits
 * @constructor
 * @param {Number} x0 - x coordinate of the first point
 * @param {Number} y0 - y coordinate of the first point
 * @param {Number} x1 - x coordinate of the second point
 * @param {Number} y1 - y coordinate of the second point
 */

Static.GradientLimits = function(x0,y0,x1,y1) {

	/**
	 * Start vector
	 * @type {Vector}
	 */

	this.start = new PhSim.Vector(x0,y0);
	
	/**
	 * End vector
	 * @type {Vector}
	 */

	this.end = new PhSim.Vector(x1,y1);
}

/**
 * @constructor
 * @param {Number} pos - Position of the gradient stop
 * @param {String} color - String denoting the color of the stop
 */

Static.GradientStop = function(pos,color) {
	
	/**
	 * Gradient Color
	 * @type {String}
	 */
	
	this.color = color;

	/**
	 * Gradient position
	 * @type {Number}
	 */

	this.pos = pos;
}

/**
 * Static gradient object constructor
 * @constructor
 */

Static.Gradient = function() {

	/**
	 * Gradient Stops
	 * @type {PhSim.Static.GradientStop[]}
	 */

	this.stops = [];

	/**
	 * Gradient name
	 * @type {String}
	 */
	
	this.name = "";

	/**
	 * Limits
	 * @type {Object}
	 */

	this.limits = {



		start: {
			x: null,
			y: null
		},

		end: {
			x: null,
			y: null
		}

	};
}

Static.lclGradient = function() {
	this.src = null;
	this.limits = new PhSim.Static.GradientLimits(x0,y0,x1,y1);
	this.type = "linear";
}

/**
 * Constuctor defining the minimal requirements for a {@link Path}.
 * @constructor
 * @param {PhSim.Vector[]} verts -  Vertcies
 */

Static.Polygon = function(verts) {

	/**
	 * Array of vectors defining a path or a polygon
	 * @type {PhSim.Vector[]}
	 */

	this.verts;

	if(Array.isArray(verts)) {
		this.verts = verts;
	}

	else {
		throw "Expecting array in argument 1"
	}

	/**
	 * Boolean indicating it is a path
	 * @type {Boolean}
	 */

	this.shape = "polygon";
}

/**
 * 
 * A path is defined by vertices. They can be used as a regular polygon.
 * Any object that contains an array of vectors and has the boolean property ``path`` set to ``true`` is reconized as a path.
 * Paths can be used to define any polygon in general.
 * 
 * In PhSim, a path is any object `obj` such that the following is true:
 * 
 * `Array.isArray(obj) === true`
 * `obj.shape === "polygon"`
 * 
 * If a path is used as a polygon, it must have at least three vectors in the `verts` property. 
 * 
 * @typedef {PhSim.Static.Polygon} Polygon
 * 
 */
 

/**
 * Constructor for the minimal requirements for a {@link Circle}.
 * @constructor
 */

Static.Circle = function(x = null,y = null,r = null) {

	/**
	 * Boolean indicating a circle
	 * @type {Boolean}
	 */

	this.shape = "circle";

	/**
	 * x-coordinate of the center
	 * @type {Number}
	 */

	this.x = null;

	/**
	 * y-coordinate of the center
	 * @type {Number}
	 */

	this.y = null;

	/**
	 * Radius of the circle
	 * @type {Number}
	 */

	this.radius = null

	/**
	 * Angle of the circle
	 * @type {Number}
	 */

	this.cycle = null;
}

/** 
 * A circle is a set all points equidistant from some point known as the center.
 * 
 * In PhSim, a circle is any object `obj` such that the following are all true:
 * `obj.shape === "circle"`;
 * `typeof obj.x === number`;
 * `typeof obj.y === number`;
 * `typeof obj.radius === number`;
 * `typeof obj.cycle === number || obj.cycle`;
 * 
 * @typedef {PhSim.Static.Circle} Circle
 */

/**
 * A regular polygon is a polygon that has all of its sides equal in length.
 * 
 * In PhSim, a regular polgon is any object `obj` such that the following are true:
 * 
 * `this.shape === "regPolygon"`
 * 
 * 
 * @constructor
 * @param {Number} x - x-coordinate of the center
 * @param {Number} y - y-coordinate of the center
 * @param {Number} r - radius of the regular polygon
 * @param {Number} n - sides of the regular polygon
 */

Static.RegPolygon = function(x,y,r,n) {

	/**
	 * Boolean for indicating a regular polygon
	 * @type {Boolean}
	 */

	this.shape = "regPolygon";

	/**
	 * x-coordinate of the center of the regular polygon
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate for the center of the regular polygon
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * The radius of the regular polygon
	 * @type {Number}
	 */

	this.radius = r;

	/**
	 * The angle of the regular polygon
	 * @type {Number}
	 */

	this.cycle = null;

	/**
	 * The number of sides the regular polygon has
	 * @type {Number}
	 */

	this.sides = n;
}

/**
 * 
 * Constructor for a static Rectangle
 * 
 * @constructor
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * 
 */

Static.Rectangle = function(x,y,w,h) {

	/**
	 * Boolean for indicating a rectangle
	 * @type {Boolean}
	 */

	this.shape = "rectangle";

	/**
	 * x-coordinate of the upper left corner of the rectangle
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate of the upper left corner of the rectangle
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Width of rectangle
	 * @type {Number}
	 */

	this.w = w;

	/**
	 * Height of rectangle
	 * @type {Number}
	 */

	this.h = h;

	/**
	 * Angle of rectangle
	 * @type {Number}
	 */

	this.cycle = 0;
}

/**
 * 
 * Static Object Type
 * 
 * @typedef {PhSim.Static.Rectangle | PhSim.Static.Circle | PhSim.Static.RegPolygon | PhSim.Static.Polygon} StaticObject
 * @property {Number} [mass] - The mass of the object.
 * @property {Number} [density] - The density of the object
 * @property {Boolean} [locked] - A boolean deterimining the lock status of the object
 * @property {Boolean} [semiLocked] - A boolean deteriming the semi-lock status of the object
 * @property {String} [name] - The name of the object
 * @property {String} [fillStyle] -  Fill Color 
 * @property {String} [strokeStyle] - Stroke Color
 * @property {String} [lineWidth] - Stroke Width
 * @property {PhSim.Sprites.Sprite} [sprite] - Sprite Object
 * @property {Array} [widgets] - {@link PhSim.Widgets|Static Widget Objects}.
 * 
 */

 /**
 * Composite Object 
 */

Static.Composite = function() {
	this.shape = "composite";
	this.name = "Untitled";
}

/**
 * Simulation Box Object 
 * 
 * @constructor
 * @param {Number} w
 * @param {Number} h
 * 
 */

Static.SimBox = function(w,h) {
	
	/**
	 * Simulation Width
	 * @type {Number}
	 */

	this.width = w;

	/**
	 * Simulation Height
	 * @type {Number}
	 */

	this.height = h;
}

/** 
 * Simulation Camera 
 * @constructor
 * 
 *
 */

Static.Camera = function(x,y,scale) {

	/**
	 * x-coordinate vector of camera
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate vector of camera
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Scaling factor of camera
	 */

	this.c = scale;
}

/**
 * Layer constructor
 * @constructor
 */

Static.Layer = function() {

	/**
	 * The array of objects
	 * @type {StaticObject[]}
	 */

	this.objUniverse = [];

	/**
	 * The name of the layer
	 * @type {String}
	 */

	this.name = null;
}

/**
 * @typedef {Object} Layer
 * @property {PhSimObjects[]} objUniverse - The array of objects.
 * @property {String} name - The name of the layer
 */

/** 
 * simulation Object 
 * @constructor
 */

Static.Simulation = function() {

	/**
	 * Array of layers
	 * @type {PhSim.Static.Layer[]}
	 */

	this.layers = [];

	this.layers.push(new PhSim.Static.Layer())
	this.world = {
		grav: 1,
		bg: "white",
		border: null,
		unit: 1
	}

	/**
	 * Property indicating a simulation
	 * @type {Boolean}
	 * 
	 */

	this.simulation = true;
	this.widgets = [];
}

/**
 * 
 * @typedef {Object} Simulation
 * @property {Layer[]} layers - An array of layers
 * @property {Object} world - World Object
 * @property {Boolean} simulation - Boolean indicating a simulation
 * @property {WidgetOptions} widgets - Array of array options
 */

/**
 * 
 * @param {Simulation} L 
 * @param {*} O 
 */

Static.LO = function(L,O) {
	L.layers[0].objUniverse
}

/**
 * 
 * Specify object location by layer and object indexes.
 * 
 * @typedef LOAddress
 * @property {Number} L - layer
 * @property {Number} O - object
 * 
 */

Static.SLO = function(S,L,O) {

}

 /**
  * Specify object location by superlayer, layer and object indexes.
  * 
  * @typedef SLOAddress
  * @property {Number} S - superlayer
  * @property {Number} L - layer
  * @property {Number} O - object
  */


/**
 * Matter.js body
 * @external MatterBody
 * @see {@link https://brm.io/matter-js/docs/classes/Body.html|MatterBody} 
 */

module.exports = Static;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * 
 * The event stack is an object that is used to store event listeners.
 * @constructor
 * @memberof PhSim
 * @enum {PhSimEventCall[]}
 * 
 */

const EventStack = function() {

	/** 
	 * 
	 * Array of functions to be executed whenever two or more objects contact each other
	 * This array represents {@link event:contact} 
	 * @type {PhSimEventCall[]}
	 * 
	*/

	this.contact = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation updates 
	 * This array represents {@link event:beforeupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeupdate = [];

	/** 
	 * 
	 * Array of functions to be exected when PhSim.updateDynObject is called 
	 * This array represents {@link event:objupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.objupdate = [];


	/** 
	 * 
	 * Array of functions to be executed after the simulation updates 
	 * This array represents {@link event:afterupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterupdate = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation is changed 
	 * This array represents {@link event:beforeslchange} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeslchange = [];

	/** 
	 * 
	 * Array of functions to be executed after the simulation is changed 
	 * This array represents {@link event:afterslchange} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterslchange = [];

	/** 
	 * 
	 * Array of functions to be executed before the Sprite Image Array loads 
	 * This array represents {@link event:beforespriteimgload} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforespriteimgload = [];

	/** Array of functions to be executed after the Sprite Image Array loads */

	this.afterspriteimgload = [];
	this.beforeforcekey = [];

	/** 
	 * Array of functions to be executed when mouse is let go while over simulation 
	 * canvas 
	 * 
	 * This array represents {@link event:mouseup} 
	 * 
	 */

	this.mouseup = [];

	/** 
	 * Array of functions to be executed when mouse leaves simulation canvas 
	 * 
	 * This array represents {@link event:mouseout} 
	 *
	 */

	this.mouseout = [];

	/** 
	 * Array of functions to be executed when the mouse moves
	 * This array represents {@link event:mousemove} 
	 * 
	 */

	this.mousemove = [];

	/** Array of functions to be executed when at least one key is pressed */

	this.keydown = [];

	/** Array of functions to be executed when a new collision is created */

	this.collisionstart = [];

	/** Array of functions to be executed during an active collision */

	this.collisionactive = [];

	/** Array of functions to be executed when a new collision is deleted */

	this.collisionend = [];

	this.beforecounterset = [];

	this.aftercounterset = [];

	this.collisionchange = [];

	this.load = [];

	this.matterJSLoad = [];

	/** Array of functions to be executed when an object is cloned */

	this.clone = [];

	/** Array of functions to be executed when the mouse is down on an object */

	this.objmousedown = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseover = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseout = [];

	/** Array of functions  */

	this.firstslupdate = [];

	/** Array of functions to be executed before the simulation exit */

	this.exit = []

	/** Array of functions to be executed when the canvas is clicked down on */

	this.mousedown = [];

	/** Array of functions to be executed when the canvas is clicked on */

	this.click = [];

	this.objclick = [];

	this.objmousemove = [];

	this.objmouseup = [];

	this.score = [];

	this.hazard = [];

	this.gamewin = [];

	this.levelwin = [];

	this.levelloss = [];


}

module.exports = EventStack;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/** 
 * Constructor for the minimal requirements for being a {@link Vector}.
 *  
 * @memberof PhSim
 * @constructor
 * @param {Number} x 
 * @param {Number} y
 * 
 */

var Vector = function(x,y) {
	
	/**
	 * x-coordinate of the vector
	 * @type {Number}
	 */
	
	this.x;

	/**
	 * y-coordinate of the vector
	 * @type {Number}
	 */
	
	this.y;

	if(typeof x === "number") {
		this.x = x;
	}

	else {
		console.trace();
		throw "Expecting a number in argument 1";
	}

	if(typeof y === "number") {
		this.y = y;
	}

	else {
		console.trace()
		throw "Expecting a number in argument 2"
	}

}

/**
 * 
 * Perform vector addition
 * 
 * @function
 * @param {Vector} vector1 - The first vector
 * @param {Vector} vector2 - The second vector
 * 
 * @param {Boolean} [newObj = true] - Boolean that determines the return value. 
 * If true, then it returns a new Vector object `vector` such that 
 * `vector.x === vector1.x + vector2.x` and `vector.x === vector1.y + vector2.y`
 * 
 * If false, then `vector2.x` is added to `vector1.x`, `vector2.y` is added to `vector1.y`
 * and then `vector1` is returned.
 * 
 * @returns {Vector} - The sum of the two vectors. New object if `newObj` is true. Returns
 * `vector1` otherwise. 
 */

Vector.add = function(vector1,vector2,newObj = true) {
	
	if(newObj) {
		return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
	}

	else {
		vector1.x = vector1.x + vector2.x;
		vector1.y = vector1.y + vector2.y;
		return vector1;
	}

}

/**
 * 
 * Perform vector subtraction
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * 
 * * @param {Boolean} [newObj = true] - Boolean that determines the return value. 
 * If true, then it returns a new Vector object `vector` such that 
 * `vector.x === vector1.x - vector2.x` and `vector.x === vector1.y - vector2.y`
 * 
 * If false, then `vector2.x` is subtracted from `vector1.x`, `vector2.y` is subtracted 
 * from `vector1.y` and then `vector1` is returned.
 * 
 * @returns {Vector} - The difference between the two vectors. New object if `newObj` is true. Returns
 * `vector1` otherwise. 
 */

Vector.subtract = function(vector1,vector2,newObj = true) {

	if(newObj) {
		return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);	}

	else {
		vector1.x = vector1.x - vector2.x;
		vector1.y = vector1.y - vector2.y;
		return vector1;
	}

}

/**
 * 
 * Multiply a vector by a scalar
 * 
 * @function
 * @param {Vector} vector 
 * @param {Number} scalar
 * @returns {Vector} 
 * 
 */

Vector.scale = function(vector,scalar) {
	return new Vector(vector.x * scalar,vector.y * scalar)
}

/**
 * 
 * Divide a vector by a scalar
 * 
 * @function
 * @param {Vector} vector 
 * @param {Number} scalar
 * @returns {Vector} 
 *  
 */

Vector.divide = function(vector,scalar) {
	return new Vector(vector.x * (1/scalar),vector.y * (1/scalar));
}

/**
 * 
 * Get distance between two vectors.
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2
 * @returns - The vector distance
 *  
 */

Vector.distance = function(vector1,vector2) {
	
	var l1 = Math.pow(vector1.x - vector2.x,2);
	var l2 = Math.pow(vector1.y - vector2.y,2);

	return Math.sqrt(l1+l2);

}

/**
 * 
 * Get length of the vector
 * 
 * @function
 * @param {Vector} vector 
 * @returns {Number} - The length of the vector
 */

Vector.getLength = function(vector) {
	return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2))
}

/**
 * 
 * Get normalized vector of some vector.
 * 
 * @function
 * @param {Vector} vector - Vector to normalize.
 * @returns {Vector} -  The Unit Vector
 */

Vector.unitVector = function(vector) {
	return Vector.scale(vector,1/Vector.getLength(vector));
}

/**
 * Apply a linear transformation defined by a 2x2 matrix to a vector.
 * 
 * @function
 * @param {Number} a11 - Element found in row 1, column 1
 * @param {Number} a12 - Element found in row 1, column 2
 * @param {Number} a21 - Element found in row 2, column 1
 * @param {Number} a22 - Element found in row 2, column 2
 * @param {Number} x - x-coordinate of vector to be transformed
 * @param {Number} y - y-coordinate of vector to be transformed
 * @returns - The transformed vector 
 */

Vector.applyTransformation = function(a11,a12,a21,a22,x,y) {
	return new Vector(a11 * x + a12 * y,a21 * x + a22 * y);
}

/**
 * 
 * Rotate a vector (x,y) by angle a
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} a - Angle in radians
 * @returns {Vector}
 */

Vector.rotate = function(x,y,a) {
	return Vector.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}

/**
 * Get SVG point
 * @param {Number} x 
 * @param {Number} y
 * @returns {String} - SVG Vector String 
 */

Vector.svgVector = function(x,y) {
	return x + "," + y;
}

module.exports = Vector;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Namespace for functions that get the centroid (the center) of a {@link PhSimObject}.
 * @memberof PhSim
 * @namespace
 */

const Centroid = {}

/**
 * Get centroid of any shape.
 * If it is a circle or a regPolygon, then `o` is returned because the properties `x` and
 * `y` already define the centroid of the object.
 * 
 * @param {PhSimObject} o 
 * @returns {Vector}
 */

Centroid.shape = function(o) {
	
	if(o.shape === "rectangle") {
		return Centroid.rectangle(o);
	}

	if(o.shape === "polygon") {
		return Centroid.polygon(o)
	}

	if(o.shape === "circle" || o.shape === "regPolygon") {
		return o;
	}

}

/**
 * 
 * Get centroid of a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Vector}
 *  
 */

Centroid.rectangle = function(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}


/** 
 * Find Centroid of a polygon
 * @function
 * @param {Polygon} a - Path
 * @returns {Vector}
 */

Centroid.polygon = function(a) {
		
	var v = new PhSim.Vector(0,0);
	
	for(var j = 0; j < a.verts.length; j++) { 
		v.x += a.verts[j].x;
		v.y += a.verts[j].y;
	}
	
	v.x = (1/a.verts.length) * v.x;
	v.y = (1/a.verts.length) * v.y;
	
	return v;

}

module.exports = Centroid;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

const Vertices = {}

/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function
 * @param {PhSim.Static.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Vector[]}
 * 
 */

Vertices.regPolygon = function(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new PhSim.Vector(x,y));
	}

	return a;

}


/**
 * 
 * Get vertices for a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Object[]} 
 */

Vertices.rectangle = function(rectangle) {

	var a = [

			{
				"x": rectangle.x,
				"y": rectangle.y,
				"topLeft": true
			},
	
			{
				"x": rectangle.x + rectangle.w,
				"y": rectangle.y,
				"topRight": true
			},

			{
				"x": rectangle.x + rectangle.w,
				"y": rectangle.y + rectangle.h,
				"bottomRight": true
			},
	
			{
				"x": rectangle.x,
				"y": rectangle.y + rectangle.h,
				"bottomLeft": true
			}
	
	];

	Matter.Vertices.rotate(a, rectangle.cycle, PhSim.Centroid.rectangle(rectangle));


	return a;

}

/**
 * 
 * Get rectangle corners
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle 
 * @returns {Object}
 */


Vertices.getRectangleCorners = function(rectangle) {


	var a = PhSim.Vertices.rectangle(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}

module.exports = Vertices;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @mixin
 * @memberof PhSim
 */

const EventStack = __webpack_require__(3);

const PhSimEventTarget = {}

/**
 * 
 * Used to add events to a PhSim simulation
 * 
 * @function
 * @param {string} eventStr - String representing the event.
 * @param {PhSimEventCall} call - Function to run when event is executed.
 * @param {object} [options = {}] - Event Listener Options.
 * @param {boolean} [options.once] - If true, the function is executed only once.
 * @param {boolean} [options.slEvent] - If true, the event will be removed when the simulation changes
 * 
 */

PhSimEventTarget.on = function(eventStr,call,options = {}) {
	
	if(options && options.slEvent === true) {
		if(this.simulationEventStack[eventStr]) {
			this.simulationEventStack[eventStr].push(call);
		}
	}

	else {
		if(this.eventStack[eventStr]) {
			this.eventStack[eventStr].push(call);
		}
	}


	if(options) {
		if(options === true) {
			if(options.once) {
	
				var f = function(e) {
					this.off(eventStr,call)
					this.off(eventStr,f)
				}
	
				this.on(eventStr,f);

			}
		}

	}


	else {
		throw new Error("Event Target Not Available")
	}

}

/**
 * @function 
 * @param {String} eventStr 
 * @param {PhSimEventCall} call 
 */


PhSimEventTarget.off = function(eventStr,call) {
	
	if(this.eventStack[eventStr] && this.eventStack[eventStr].includes(call)) {
		var callIndex = this.eventStack[eventStr].indexOf(call);
		this.eventStack[eventStr].splice(callIndex,1);
	}

	if(this.simulationEventStack[eventStr] && this.simulationEventStack[eventStr].includes(call)) {
		var callIndex = this.simulationEventStack[eventStr].indexOf(call);
		this.simulationEventStack[eventStr].splice(callIndex,1);
	}

}

/**
 * @function
 * @param {PhSim.Events.PhSimEvent} event - Event Object
 */

PhSimEventTarget.callEventClass = function(eventStr,thisArg,eventArg) {

	var self = this;

	if(this.eventStack[eventStr]) {
		for(var i = 0; i < this.eventStack[eventStr].length; i++) {
			var func = this.eventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}

	if(this instanceof PhSim) {

		if(this.simulationEventStack[eventStr]) {
			for(var i = 0; i < this.simulationEventStack[eventStr].length; i++) {
	
				var func = this.simulationEventStack[eventStr][i]
				eventArg.func = func;
				func.call(thisArg,eventArg);
	
			}
		}

		//this.forAllObjects(function(o){
			//if(typeof o.callEventClass === "function") {
				//o.callEventClass(eventStr,thisArg,eventArg);
			//}
		//})

	}
	
}

module.exports = PhSimEventTarget;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const DynObject = __webpack_require__(1);
const PhSim = __webpack_require__(0);
const Centroid = __webpack_require__(5);

/**
 * Namespace of functions used to move objects in various ways.
 * @memberof PhSim
 * @namespace
 * 
 */

var Motion = {}

/**
 * 
 * Apply force to a dynamic object.
 * Force is ineffective against locked, semi-locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} position 
 * @param {Vector} forceVector
 *   
 */

Motion.applyForce = function(dynObject,position,forceVector) {
	if(!dynObject.locked && !dynObject.noDyn) {
		return Matter.Body.applyForce(dynObject.matter,position,forceVector);
	}
}


/**
 * 
 * Apply velocity to a dynamic object.
 * Velocity does not effect locked, semi-locked objects or static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} velocityVector 
 */

Motion.setVelocity = function(dynObject,velocityVector) {
	if(!dynObject.locked) {
		return Matter.Body.setVelocity(dynObject.matter,velocityVector);
	}

}

/**
 * 
 * Apply a transformation to a dynamic object.
 * Transformation does not move locked objects.
 * However, it moves semi-locked objects and static objects.
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Vector} translationVector 
 */

Motion.translate = function(o,translationVector) {
	if(!o.locked) {

		if(o.shape === "polygon") {
			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = o.verts[i].x + translationVector.x;
				o.verts[i].y = o.verts[i].y + translationVector.y;
			}
		}

		if(o.shape === "circle" || o.shape === "rectangle" || o.shape === "regPolygon") {
				o.x = o.x + translationVector.x;
				o.y = o.y + translationVector.y;
		}

		if(o instanceof DynObject) {
			return Matter.Body.translate(o.matter,translationVector);
		}

	}
	
}

/**
 * Apply a transformation to a dynamic object.
 * Setting positions is ineffective against locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} o 
 * @param {Vector} position 
 */

Motion.setPosition = function(o,position) {

	if(!o.locked) {

		if(o.type === "circle" || o.type === "regPolygon") {
			o.x = position.x;
			o.y = position.y;
		}

		if(o.shape === "rectangle") {
			var c = Centroid.rectangle(o);
			o.x = (o.x - c.x) + position.x;
			o.y = (o.y - c.y) + position.y;
		}

		if(o.shape === "polygon") {

			var c = Centroid.polygon(dynObject)

			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = (o.verts[i].x - c.x) + position.x;
				o.verts[i].y = (o.verts[i].y - c.y) + position.y;
			}

		}

		if(o instanceof DynObject) {
			Matter.Body.setPosition(o.matter,position);
		}

	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 * @param {Vector} point 
 */

Motion.rotate = function(dynObject,angle,point) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
		}

		return Matter.Body.rotate(dynObject.matter, angle, point)

	}
}

/**
 * Rotate dynamic object towards point
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} point 
 */

Motion.rotateTowards = function(dynObject,point) {

	var a = Math.atan2(point.y - dynObject.matter.position.y ,point.x - dynObject.matter.position.x)

	Motion.rotate(dynObject,a,dynObject.matter.position);
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 */

Motion.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return Matter.Body.setAngle(dynObject.matter,angle);

	}
}

module.exports = Motion;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * 
 * PhSim game constructor.
 * 
 * @constructor
 * @memberof PhSim
 * @param {PhSim} phSim 
 * @param {PhSim.Game.Options} options 
 */

var Game = function(phSim,options) {

	/**
     * Inital Life
	 * @type {Number}
	 */

	this.intLife = options.life;

	/**
     * Game goal
	 * @type {Number}
	 */

	this.goal = options.goal;

	/**
     * Inital Score
	 * @type {Number}
	 */
	
	this.intScore = options.score;

	/**
     * 
     * Options passed into the constructor
	 * @type {Number}
	 */

	this.options = options;

	/**
     * Life
	 * @type {Number}
     * 
	 */

	this.life = options.life;

	/**
     * Score
	 * @type {Number}
	 */

	this.score = options.score;

	/**
     * Reference to the parent PhSim simulation
	 * @type {PhSim}
	 */

	this.phSim = phSim;

	// Adding arrays to phSim eventstack

}

/**
 * Game Options
 * @constructor
 * @param {Number} goal 
 * @param {Number} life 
 * @param {Number} score 
 */

Game.Options = function(goal,life,score) {

	/**
     * Game Goal
	 * @type {Number}
	 */

	this.goal = goal;

	/**
     * Game goal
	 * @type {Number}
	 */

	this.life = life;

	/**
     * Game score
	 * @type {Number}
     * 
	 */

	this.score = score;
}

/**
 * Enable default modal for game wins
 * @default true
 * @type {Boolean}
 */

Game.prototype.defaultGameWinModal = true;

/**
 * Enable default modal for level wins
 * @default true
 * @type {Boolean}
 */

Game.prototype.defaultLevelWinModal = true;

/**
 * Set score
 * @function
 * @param {Number} c - Score
 */

Game.prototype.setScore = function(c) {

    var self = this;

	this.score = c;

	if(this.score >= this.goal && Number.isInteger(this.score) && Number.isInteger(this.goal)) {
	
		this.phSim.pause();
		this.phSim.enableFilter();

		// Code to execute 

		if(this.phSim.simulationIndex + 1 === this.phSim.simulations.length) {

			if(this.defaultGameWinModal) {

                this.phSim.callEventClass("gamewin",this,{});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

				var a = self.phSim.alert({
					msg:"You Win!",
					closeButtonTxt:"Play again",
					bgColor:"#333",
					txtColor:"#fff",
					w:300,
					h:100,
					onok: function() {
						self.phSim.disableFilter();
						a.parentNode.removeChild(a);
						self.phSim.gotoSimulationIndex(0);
						self.phSim.play();
					}
				});

			}

		}

		// If not the final simulation

		else {

			this.phSim.callEventClass("levelwin",this,{}); 

			clearInterval(this.phSim.intervalLoop);
			this.phSim.disableFilter();
			this.phSim.gotoSimulationIndex(this.phSim.simulationIndex + 1);
			self.phSim.play();
		}


	}

	this.phSim.callEventClass("score",this,{}); 
},

/**
 * Set life
 * @function
 * @param {Number} c - Life value
 */

Game.prototype.setLife = function(c) {
	this.life = c;

	if(this.life === 0) {
		this.end();
	}
}

/**
 * Increment life (add 1 to the current life)
 * @function
 */

Game.prototype.incrementLife = function() {
	this.setLife(this.life + 1);
}

/**
 * Decrement life (subtract 1 from life)
 * @function
 */

Game.prototype.decrementLife = function() {
	this.setLife(this.life - 1);
}

/**
 * End game
 * @function
 */

Game.prototype.end = function() {

	this.phSim.pause();
	this.phSim.enableFilter();

	var self = this;


	var a = this.phSim.alert({
		msg:"Game Over",
		closeButtonTxt:"Try again",
		bgColor:"#333",
		txtColor:"#fff",
		w:300,
		h:100,
		onok: function() {
			self.phSim.gotoSimulationIndex(self.phSim.simulationIndex);
			self.phSim.play();
			self.phSim.disableFilter();
			a.parentNode.removeChild(a);	
		}
	});

	this.phSim.callEventClass("levelloss",this,{}); 

}

/**
 * Namespace for game widgets
 * 
 */

Game.Widgets = {

}

/**
 * Coin widget. Works if game widget is enabled. If not enabled, it throws an exception.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Widget options
 * @param {Number} widget.value - Value of coin. If undefined, the value of the coin is 1.
 * @this PhSim
 */

Game.Widgets.coin = function(dyn_object,widget) {

	var value = widget.value || 1;

	var self = this;

	var func = function() {

		var obj1 = dyn_object;

		var a = function() {

			if(self.inSensorCollision(obj1) && self.lclGame) {
				self.lclGame.setScore(self.lclGame.score + 1);
				self.off("collisionstart",a);	
			}

		}

		return a;

	}

	self.on("collisionstart",func());


}

Game.Widgets.hazard = function(dyn_object,widget) {

var self = this;

var func = function() {

	var obj1 = dyn_object;

	var a = function() {

		if(self.inSensorCollision(obj1) && self.lclGame) {
			self.lclGame.setLife(self.lclGame.life - 1);
			self.off("collisionstart",a);
		}

	}

	return a;

}

self.on("collisionstart",func());

}

Game.Widgets.health = function(dyn_object,widget) {

var self = this;

var func = function() {

	var obj1 = dyn_object;

	var a = function() {

		if(self.inSensorCollision(obj1) && self.lclGame) {
			self.lclGame.setLife(self.lclGame.life + 1);
			self.off("collisionstart",a);	
		}

	}

	return a;

}

self.on("collisionstart",func());

}

Game.Widgets.endGame = function(dyn_object,widget) {
	var f = this.createMotionFunction("position",dyn_object,widget.vector);
	this.createWFunction(dyn_object,f,widget);
}

module.exports = Game;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(51);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const DynObject = __webpack_require__(1);
const PhSim = __webpack_require__(0);

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
     * Matter namespace for matter.js bodies.
     * @namespace
     */

    Body: {

        /**
         *  
         * @param {Object} body 
         */

        init: function(options) {
            if(options.plugin && options.plugin.dynObject) {

            }
        }

    },

    Bodies: {

        circle: function(x, y, radius, options) {
            
        },

        rectangle: function() {

        },

        fromVertices: function() {

        },

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

                if(bodyA.parent === bodyA) {
                    if(bodyA.plugin.dynObject instanceof DynObject) {
                        var c_classesA = PhSim.Query.getCollisionClasses(bodyA.plugin.dynObject);
                    }
                }
                
                else {
                    var c_classesA = PhSim.Query.getCollisionClasses(bodyA.parent.plugin.dynObject);
                }

                if(bodyB.parent === bodyB) {
                    if(bodyB.plugin.dynObject instanceof DynObject) {
                        var c_classesB = PhSim.Query.getCollisionClasses(bodyB.plugin.dynObject);
                    }    
                }

                else {
                    var c_classesB = PhSim.Query.getCollisionClasses(bodyB.parent.plugin.dynObject);                    
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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/** 
 * 
 * PhRender constructor
 * PhRender is the rendering engine for PhSim.
 * 
 * @constructor
 * @memberof PhSim
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * 
 */

var PhRender = function(ctx) {

	/**
	 * PhRender Context
	 * @type {CanvasRenderingContext2D}
	 */

	this.ctx = ctx;
}

/**
 * Default Alpha
 * This the alpha of an object that has no alpha defined.
 * 
 * @type {Number}
 */

PhRender.prototype.defaultAlpha = 1;

/**
 * Default stroke style.
 * This is the stroke style of an object that has no stroke style defined.
 * 
 * @type {String}
 */

PhRender.prototype.defaultStrokeStyle = "transparent";

/**
 * Default fill style
 * This is the default fill style of an object.
 * 
 * @type {String}
 */

PhRender.prototype.defaultFillStyle = "transparent";

/**
 * Setting context
 * That is, this function sets the `globalAlpha`, `strokeStyle`, `fillStyle` and `lineWidth`
 * properties of the {@link PhRender#ctx} member of the {@link PhRender} object
 * using a {@link PhSimObject} object.
 * 
 * @function
 * @param {PhSimObject} object 
 */

PhRender.prototype.setCtx = function(object) {
	
	this.ctx.lineCap = "round";

	if(typeof this.ctx.globalAlpha === "number") {
		this.ctx.globalAlpha = object.globalAlpha
	}

	else {
		this.ctx.globalAlpha = this.defaultAlpha;
	}

	this.ctx.strokeStyle = object.strokeStyle || this.defaultStrokeStyle;
	this.ctx.fillStyle = object.fillStyle || this.defaultFillStyle;

	if(object.lineWidth) {

		if(object.lineWidth === 0) {
			this.ctx.strokeStyle = "transparent"
		}

		else {
			this.ctx.lineWidth = object.lineWidth;
		}

	}

	else {
		this.ctx.strokeStyle = "transparent"
	}
	
}

PhRender.prototype.unsetCtx = function() {
	this.ctx.globalAlpha = 1;
}

/**
 * 
 * Render a a {@link polygon}.
 * 
 * @function
 * @param {Path} path 
 */

PhRender.prototype.renderPolygon = function (path) {

	this.setCtx(path);

	this.ctx.beginPath();

	this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

	for(var j = 0; j < path.verts.length; j++) {
	  this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();
	this.ctx.fill();

	if(path.sprite) {

		var img = this.spriteImgObj[path.sprite.src];

		var centroid = findCentroidOfPath(path);

		this.ctx.imageSmoothingEnabled = path.sprite.smooth;

		if(path.sprite.repeat) {

			this.ctx.save();

			this.ctx.beginPath();

			this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

			for(var j = 0; j < path.verts.length; j++) {
				this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
			}
		

			this.ctx.translate(centroid.x,centroid.y);
			//this.ctx.rotate(circle.cycle);
			this.ctx.scale(path.sprite.scale,path.sprite.scale);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;

			this.ctx.closePath();

			this.ctx.fill();
			this.ctx.restore();	
		}

		if(path.sprite.fit) {

			this.ctx.save();

			this.ctx.beginPath();

			this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

			for(var j = 0; j < path.verts.length; j++) {
				this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
			}

			this.ctx.closePath();

			this.ctx.clip();

			var box = PhSim.BoundingBox.fromShape(path);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,box.w,h,0);

			this.ctx.restore();	

		}

		else {
			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,img.width,img.height,0);
		}

	}

	this.unsetCtx();
	
}

/**
 * 
 * Render sprite by center
 * 
 * @function
 * @param {String} url - URL of object loaded in PhRender.prototype.spriteImgObj
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} a - angle
 */

PhRender.prototype.renderSpriteByCenter = function(url,x,y,w,h,a) {

	var spriteImg = this.spriteImgObj[url];

	this.ctx.save();
	this.ctx.translate(x,y)
	this.ctx.rotate(a)
	
	if(h === null) {
		this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w);
	}

	else {
		this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w,h);
	}

	this.ctx.restore();
}

/**
 * @function
 * @param {Object} constraint 
 */

PhRender.prototype.renderConstraint = function (constraint) {

	var path = SLO(constraint.object.S, constraint.object.L, constraint.object.O);

	this.ctx.save();

	this.ctx.globalAlpha = 0.5
	this.ctx.strokeStyle = "black";

	this.ctx.arc(constraint.point.x, constraint.point.y, 10, 0, 2 * Math.PI);
	this.ctx.stroke();

	this.ctx.arc(constraint.relativeEndPoint.x + findCentroidOfPath(path).x , constraint.relativeEndPoint.y + findCentroidOfPath(path).y, 10, 0, 2 * Math.PI);
	this.ctx.stroke();

	this.ctx.setLineDash([10,10]);

	this.ctx.moveTo(constraint.point.x, constraint.point.y);
	this.ctx.lineTo(constraint.relativeEndPoint.x + findCentroidOfPath(path).x, constraint.relativeEndPoint.y + findCentroidOfPath(path).y);
	this.ctx.stroke();

	this.ctx.restore();

}



/**
 * 
 * Render circle
 * 
 * @function
 * @param {PhSim.Static.Circle} circle 
 */

PhRender.prototype.renderCircle = function (circle) {
	
	this.setCtx(circle);

	this.ctx.beginPath();
	this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI)
	this.ctx.closePath();

	this.ctx.fill();
	this.ctx.stroke();

	if(circle.gradient) {
		this.ctx.save();
		this.ctx.translate(circle.x,circle.y);
		this.ctx.rotate(circle.cycle);
		this.ctx.fillStyle = PhSim.Gradients.extractGradient(this.ctx,circle.gradient);
		this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.restore();	

	}

	if(circle.sprite) {

		var img = this.spriteImgObj[circle.sprite.src];

		this.ctx.imageSmoothingEnabled = circle.sprite.smooth;

		if(circle.sprite.repeat) {
			this.ctx.save();
			this.ctx.translate(circle.x,circle.y);
			this.ctx.rotate(circle.cycle);
			this.ctx.scale(circle.sprite.scale,circle.sprite.scale);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
			this.ctx.fill();
			this.ctx.restore();	
		}

		if(circle.sprite.fit) {
			this.ctx.save();
			this.ctx.translate(circle.x,circle.y);
			this.ctx.rotate(circle.cycle);
			this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
			this.ctx.clip();
			var box = PhSim.BoundingBox.fromShape(circle);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(circle.sprite.src,0,0,box.w,h);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(circle.sprite.src,circle.x,circle.y,circle.cycle);
		}

	}

	this.unsetCtx();

}


/**
 * 
 * Render rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle - Rectangle object
 * @param rectangle.sprite - Sprite Object
 */

PhRender.prototype.renderRectangle = function(rectangle) {

	var c = PhSim.Centroid.rectangle(rectangle);

	var x = -rectangle.w * 0.5;
	var y = -rectangle.h * 0.5;
	
	this.setCtx(rectangle);
	this.ctx.translate(c.x,c.y);
	this.ctx.rotate(rectangle.cycle);
	this.ctx.beginPath();
	this.ctx.rect(x,y,rectangle.w,rectangle.h);
	this.ctx.closePath();
	this.ctx.stroke();
	this.ctx.fill();

	if(rectangle.widgets) {
		for(var i = 0; i < rectangle.widgets.length; i++) {
			if(rectangle.widgets[i].type === "rectText") {
				this.rectText(rectangle.widgets[i],x,y,rectangle.w,rectangle.h,0);
			}
		}
	}

	this.ctx.rotate(-rectangle.cycle);
	this.ctx.translate(-c.x,-c.y);


	if(rectangle.sprite) {

		var img = this.spriteImgObj[rectangle.sprite.src];

		this.ctx.imageSmoothingEnabled = rectangle.sprite.smooth;

		if(rectangle.sprite.repeat) {
			this.ctx.save();
			this.ctx.translate(c.x,c.y);
			this.ctx.rotate(rectangle.cycle);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.rect(-rectangle.w * 0.5,-rectangle.h * 0.5,rectangle.w,rectangle.h);
			this.ctx.fill();
			this.ctx.restore();	
		}

		if(rectangle.sprite.fit) {
			this.ctx.save();
			this.ctx.translate(c.x,c.y);
			this.ctx.rotate(rectangle.cycle);
			this.ctx.rect(-rectangle.w * 0.5,-rectangle.h * 0.5,rectangle.w,rectangle.h);
			this.ctx.clip();

			var h = img.height * (rectangle.w/img.width);

			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.w,h,0);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(rectangle.sprite.src,c.x,c.y,img.w,img.h,rectangle.cycle);
		}

	}

	this.unsetCtx();

}

// Draw text

/**
 * @function
 * @param {*} text
 * @param {String} text.fill - Text Fill Style
 * @param {Number} text.lineWidth - Text border line width
 * @param {String} text.borderColor - Text border color
 * @param {Number} text.size - Text size
 * @param {String} text.font - Text font
 * @param {}
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} a 
 */

PhRender.prototype.rectText = function(text,x,y,w,h,a) {
	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.rotate(a);
	this.ctx.beginPath();
	this.ctx.rect(0,0,w,h);
	this.ctx.clip();
	this.ctx.textAlign = "left";
	this.ctx.fillStyle = text.fill;

	// Reset Line Width

	this.ctx.lineWidth = undefined;

	if(text.lineWidth) {
		this.ctx.lineWidth = text.lineWidth;
	}

	this.ctx.strokeStyle = text.borderColor
	this.ctx.font = text.size + "px " + text.font;
	this.ctx.textBaseline = "top";
	var content = text.content;

	if(this.dynSim) {
		content = this.dynSim.processVar(content);
	}

	this.ctx.fillText(content,0,0);

	if(text.lineWidth) {
		this.ctx.strokeText(content,0,0);
	}

	this.ctx.restore();
}

// Draw a regular polygon

/**
 * @function
 * @param {PhSim.Static.RegPolygon} regPolygon 
 */

PhRender.prototype.renderRegPolygon = function(regPolygon) {

	var vertSet = PhSim.Vertices.regPolygon(regPolygon);
	
	this.setCtx(regPolygon);

	this.ctx.beginPath();

	this.ctx.moveTo(vertSet[0].x, vertSet[0].y);

	for(var j = 0; j < vertSet.length; j++) {
	  this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();

	this.ctx.globalAlpha = regPolygon.fillAlpha;

	this.ctx.fill();

	if(regPolygon.sprite) {

		var img = this.spriteImgObj[regPolygon.sprite.src];

		this.ctx.imageSmoothingEnabled = regPolygon.sprite.smooth;

		if(regPolygon.sprite.repeat) {
			this.ctx.save();
			this.ctx.translate(regPolygon.x,regPolygon.y);
			this.ctx.rotate(regPolygon.cycle);
			this.ctx.scale(regPolygon.sprite.scale,regPolygon.sprite.scale);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;

			this.ctx.beginPath();

			this.ctx.moveTo(vertSet[0].x, vertSet[0].y);
		
			for(var j = 0; j < vertSet.length; j++) {
			  this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
			}
		
			this.ctx.closePath();

			this.ctx.fill();
			this.ctx.restore();	
		}

		if(regPolygon.sprite.fit) {

			this.ctx.save();

			this.ctx.beginPath();

			this.ctx.moveTo(vertSet[0].x, vertSet[0].y);
		
			for(var j = 0; j < vertSet.length; j++) {
			  this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
			}
		
			this.ctx.closePath();

			this.ctx.clip();

			this.ctx.translate(regPolygon.x,regPolygon.y);
			this.ctx.rotate(regPolygon.cycle);

			var box = PhSim.BoundingBox.fromShape(regPolygon);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,box.w,h,0);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(regPolygon.sprite.src,regPolygon.x,regPolygon.y,img.width,img.height,regPolygon.cycle);
		}

	}

	this.unsetCtx();

}

// Draw Static object

/**
 * @function
 * @param {PhSimObject} obj 
 */

PhRender.prototype.renderStatic = function(obj) {
				
	if (obj.shape === "polygon")  {
		this.renderPolygon(obj);
	}
	
	if( obj.shape === "circle") {
		this.renderCircle(obj); 
	}

	if( obj.shape === "rectangle") {
		this.renderRectangle(obj);
	}

	if( obj.shape === "regPolygon") {
		this.renderRegPolygon(obj);
	}

	if( obj.shape === "composite") {
		for(var i = 0; i < obj.parts.length; i++) {
			this.renderStatic(obj.parts[i]);
		}
	}

}

// Draws a layer

/**
 * @function
 * @param {*} layer 
 */

PhRender.prototype.renderStaticLayer = function(layer) {

	for(var i = 0; i < layer.objUniverse.length; i++) {

			this.renderStatic(layer.objUniverse[i])
			
	}	
}

/**
 * @function
 * @param {*} simulation 
 */

PhRender.prototype.simulation = function(simulation) {

	for(var i = 0; i < simulation.layers.length; i++) {
		if(!simulation.layers[i].hidden) {
			this.layer(simulation.layers[i])
		}
	}
}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton = function(object) {

	if(object.static.shape === "polygon") {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x, object.skinmesh[0].y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x, object.skinmesh[j].y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x, object.matter.vertices.y);

		for(var j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x, object.matter.vertices[j].y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton_center = function(object) {

	if(object.static.shape === "polygon") {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x - object.matter.position.x, object.skinmesh[0].y - object.matter.position.y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x - object.matter.position.x, object.skinmesh[j].y - object.matter.position.y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x - object.matter.position.x, object.matter.vertices.y - object.matter.position.y);

		for(var j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x - object.matter.position.x, object.matter.vertices[j].y - object.matter.position.y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.drawDynamicSkeleton = function (object) {

	this.dynamicSkeleton(object);
	this.ctx.closePath();
	this.ctx.stroke();

}

/**
 * @function
 * @param {*} dynObject 
 */

PhRender.prototype.dynamicRenderDraw = function (dynObject) {

	this.ctx.lineWidth = dynObject.lineWidth;
	this.ctx.fillStyle = dynObject.fillStyle;
	this.ctx.strokeStyle = dynObject.strokeStyle;

	
	if(dynObject.shape === "polygon") {
		
		this.drawDynamicSkeleton(dynObject);
		
		this.ctx.fill();

		if(dynObject.sprite) {

			var img = this.spriteImgObj[dynObject.sprite.src];

			this.ctx.imageSmoothingEnabled = dynObject.sprite.smooth;

			if(dynObject.sprite.repeat) {

				this.ctx.save();

				this.dynamicSkeleton(dynObject);
				this.ctx.translate(dynObject.matter.position.x,dynObject.matter.position.y);
				this.ctx.rotate(dynObject.matter.angle);
				this.ctx.scale(dynObject.sprite.scale,dynObject.sprite.scale);
		

				var pattern = this.ctx.createPattern(img,"repeat");
				this.ctx.fillStyle = pattern;
				this.ctx.fill();

				this.ctx.restore();
			}

			if(dynObject.sprite.fit) {

				this.ctx.save();
	
				this.ctx.beginPath();
	
				this.ctx.moveTo(dynObject.verts[0].x, dynObject.verts[0].y);
	
				for(var j = 0; j < dynObject.verts.length; j++) {
					this.ctx.lineTo(dynObject.verts[j].x, dynObject.verts[j].y);
				}
	
				this.ctx.closePath();
	
				this.ctx.clip();
	
				var box = PhSim.BoundingBox.fromShape(dynObject);
	
				var h = img.height * (box.w/img.width);
	
				this.renderSpriteByCenter(dynObject.sprite.src,dynObject.matter.position.x,dynObject.matter.position.y,box.w,h,dynObject.matter.angle);
	
				this.ctx.restore();	

				//

			}
	
			else {
				this.renderSpriteByCenter(dynObject.sprite.src,dynObject.matter.position.x,dynObject.matter.position.y,img.width,img.height,dynObject.matter.angle);
			}

			//this.ctx.restore();	
	
		}
		
	}

	if(dynObject.shape === "circle") {
		this.renderCircle(dynObject);	
	}
	
	if(dynObject.shape === "regPolygon") {
		this.renderRegPolygon(dynObject);		
	}

	if(dynObject.shape === "rectangle") {
		this.renderRectangle(dynObject);		
	}

	if(dynObject.shape === "composite") {
		for(var i = 1; i < dynObject.parts.length; i++) {
			this.dynamicRenderDraw(dynObject.parts[i]);
		}
	}

}

/**
 * @function
 * @param {*} L 
 */

PhRender.prototype.dynamicDrawLayer = function(L) {
	
	for(var i = 0; i < sim.simulations[simulationI].layers[L].length; i++) {
		this.dynamicRenderDraw(L,i);
	}

}

module.exports = PhRender;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

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

	for(i = 0; i < simulation.sprites.length; i++) {
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
 * The sprite image array is an interface that is used for 
 * 
 * @constructor
 * @param {Sprites.Sprite[]} sprites 
 * @param {Function} onload 
 */

Sprites.spriteImgObj = function(sprites,onload = function() {}) {
	
	// Force load if sprites list is empty

	/**
	 * 
	 * STAIC
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
	})

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

			self.loaded_n++;

			if(self.loaded_n = self.length) {
				onload();
			}
		})
	}

	if(sprites.length === 0) {
		self.onload();
		self.loaded = true;
	}

}

Sprites.spriteImgObj.prototype.getBlobs = function() {



}

/**
 * 
 * Add sprite to the Sprite Image Array.
 * 
 * @function
 * @this Sprites.spriteImgObj
 * @param {Sprites.Sprite|PhSim.Sprite.Sprite[]} staticObj - This could be a sprite or an array of sprites
 * @param {Function} [onload] - a function that is executed when the image loads.
 */

Sprites.spriteImgObj.prototype.addSprite = function(staticObj,onload = function() {} ) {
	
	var self = this;
	
	if(Array.isArray(staticObj)) {
		for(var i = 0; i < staticObj.length; i++) {
			this.addSprite(staticObj[i]);
		}
	}

	else {

		if(staticObj.src) {

			var img = document.createElement("img");

			var f = function() {
				onload();
				img.removeEventListener("load",f)
			}

			img.addEventListener("load",f);
		
			img.src = staticObj.src;
		
			this.static[staticObj.src] = staticObj;
			this[staticObj.src] = img;
			this.urls.push(staticObj.src);
		
			this.length++;

		}

	}

}

module.exports = Sprites;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * @namespace
 * @memberof PhSim
 */

var Audio = {}

/**
 * @constructor
 * @param {Object} p_audio - Static Audio Object
 * @param {Function} onload 
 */

Audio.AudioArray = function(p_audio,onload) {

	// force load function if audio list is empty
	
	this.array = [];
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;

	var self = this;

	
	if(p_audio.length === 0) {
		self.loaded = true;
		self.onload();
	}

	for(var i = 0; i < p_audio.length; i++) {

		var audio = document.createElement("audio");

		var f = function() {
			self.loaded_n++;

			if(self.array.length === self.loaded_n) {
				self.loaded = true;
				self.onload();
				audio.removeEventListener("canplaythrough",f);
			}

		}

		audio.addEventListener("canplaythrough",f)

		audio.src = p_audio[i].src;
		audio.loop = p_audio[i].loop

		this.array.push(audio);

	}

}

module.exports = Audio;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2);
 * 
 * @function
 * @memberof PhSim
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2 
 * @returns {PhSim.Static.Rectangle} - Rectangle Object
 * 
 */

var diagRect = function(x1,y1,x2,y2) {

	var w = x2 - x1;
	var h = y2 - y1;

    return new PhSim.Static.Rectangle(x1,y1,w,h);
    
 }

module.exports = diagRect;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const Static = __webpack_require__(2);

/**
 * Get bounding box from an array of vectors.
 * 
 * @constructor
 * @memberof PhSim
 * @extends PhSim.Options.Rectangle
 * @param {Vector[]} verts 
 */

const BoundingBox = function(verts) {

	var verts = Object.assign([],verts);

	verts.sort(function(a,b){
		return a.x - b.x;
	});

	/**
	 * The x coordinate of the left most vertex of `verts`.
	 * @type {Number}
	 */

	this.smallX = verts[0].x;

	/**
	 * The x coordinate of the right most vertex of `verts`.
	 * @type {Number}
	 */

	this.largeX = verts[verts.length - 1].x;

	verts.sort(function(a,b){
		return a.y - b.y;
	});

	this.smallY = verts[0].y;
	this.largeY = verts[verts.length - 1].y;

	var w = this.largeX - this.smallX;
	var h = this.largeY - this.smallY;
	var x = this.smallX;
	var y = this.smallY;

	Static.Rectangle.call(this,w,h,x,y);

}

/**
 * Get bounding box of PhSim shape.
 * @param {PhSimObject} object - The Static Object
 * @returns {PhSim.BoundingBox} 
 */

BoundingBox.fromShape = function(object) {
	
	if(object.shape === "polygon") {
		return new BoundingBox(object.verts);
	}

	if(object.shape === "regPolygon") {
		return new BoundingBox(PhSim.Vertices.regPolygon(object));
	}

	if(object.shape === "rectangle") {
		return new BoundingBox(PhSim.Vertices.rectangle(object,true));
	}

	if(object.shape === "circle") {

		var ax = object.x - object.radius;
		var ay = object.y - object.radius;
		var bx = object.x + object.radius;
		var by = object.y + object.radius;

		return PhSim.diagRect(ax,ay,bx,by,0);
	}

	if(object.composite) {
		
		var a = [];

		for(var i = 0; i < object.objUniverse.length; i++) {
			a.push( PhSim.Vertices.rectangle( this.getStaticBoundingBox(object.objUniverse[i]) ) );
		}

		a = a.flat(Infinity);

		return new BoundingBox(a);

	}
}

module.exports = BoundingBox;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Namespace for event objects
 * @memberof PhSim
 * @namespace
 */

const Events = {}

/**
 * @constructor
 * 
 * 
 */

Events.PhSimEvent = function(type) {
	this.target = null; 
	this.timestamp = null;
	this.type = type;
}

/**
 * @constructor
 */

Events.PhSimDynEvent = function() {
	Events.PhSimEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

Events.PhSimDynEvent.prototype = Object.create(Events.PhSimEvent.prototype);

/**
 * @constructor
 * @extends PhSim.Events.PhSimEvent
 */


Events.PhSimEventKey = function() {
	Events.PhSimDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

Events.PhSimEventKey.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * Event object for mouse events.
 * 
 * @constructor
 * @extends PhSim.Events.PhSimDynEvent
 */


Events.PhSimMouseEvent = function() {
	Events.PhSimDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

Events.PhSimMouseEvent.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * 
 * Event fired whenever the mouse is pressed down on an object.
 * 
 * @event PhSim.Events#objmousedown
 * @type {PhSim.Events.PhSimMouseEvent}
 */

/**
 * Event fired whenever the mouse is let go of while over an object
 * 
 * @event PhSim.Events#objmouseup
 * @type {PhSim.Events.PhSimMouseEvent}
 */

/**
 * @constructor
 */


Events.PhSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

module.exports = Events;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

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
	
	this.assignPhRender(new PhSim.PhRender(this.simCtx));
	
	if(!this.noCamera) {
		this.camera = new PhSim.Camera(this);
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

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
	var elmBox = this.simCanvas.getBoundingClientRect();
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

	var rect = alertBox.getBoundingClientRect();

	var elmBox = this.simCanvas.getBoundingClientRect();

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

	this.simContainer.appendChild(alertBox);

	alertBox.style.position = "absolute";
	alertBox.style.left = (elmBox.width * 0.5 - alertBox.offsetWidth * 0.5) + "px";
	alertBox.style.top = (elmBox.height * 0.5 - alertBox.offsetHeight * 0.5) + "px";

	return alertBox;

}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Set Angle to mouse.

const DynObject = __webpack_require__(1);
const PhSim = __webpack_require__(0);

// Object Connection

PhSim.prototype.connectDynObjects = function(parent,child) {

	Matter.Body.setStatic(child,true);

	var self = this;
	
	var f = function() {

		var v = {
			"x": parent.matter.position.x - parent.matter.positionPrev.x,
			"y": parent.matter.position.y - parent.matter.positionPrev.y,
		}

		PhSim.Motion.translate(child,v);

		PhSim.Motion.rotate(child,parent.matter.angle - parent.matter.anglePrev,parent.matter.position);

	}

	this.on("afterupdate",f)

	return f;

}

/**
 * 
 * Run function on all objects.
 * 
 * @function
 * @param {Function} call 
 */

PhSim.prototype.forAllObjects = function(call) {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
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
 * Check if the object is a dynamic object.
 * 
 * @function
 * @param {PhSimObject} o 
 */

PhSim.prototype.isNonDyn = function(o) {
	return o.noDyn;
}

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

/**
 * Set Object Lifespan
 * 
 * @function
 * @param {*} dynObject - Dynamic Object
 * @param {Number} lifespan - Milliseconds 
 * 
 */

PhSim.prototype.setDynObjectLifespan = function(dynObject,lifespan) {

	var self = this;

	setTimeout(lifespan,function(){
		self.removeDynObj(dynObject);
	});

}

PhSim.prototype.renderAllCounters = function() {
	for(var i = 0; i < this.counterArray.length; i++) {
		this.renderCounterByIndex(i);
	}
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * Play audio in
 * @function 
 * @param {Number} i - Index in audio array. 
 */

PhSim.prototype.playAudioByIndex = function(i) {
	return this.audioArray.array[i].play();
}

/**
 * @function
 * @param {Number} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return this.audioArray.array[i].pause();
}

/**
 * @function
 * @param {Number} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return this.audioArray.array[i].pause();
}

/**
 * @function
 * @param {Number} i 
 * @param {Number} v 
 */

PhSim.prototype.setAudioVolByIndex = function(i,v) {
	this.audioArray.array[i].volume = v;
	return this.audioArray.array[i].volume; 
}

/**
 * @function
 * @param {Number} i 
 */

PhSim.prototype.setAudioMuteByIndex = function(i) {
	this.audioArray.array[i].muted = v;
	return this.audioArray.array[i].muted;
}

/**
 * @function
 * @param {Number} i 
 */

PhSim.prototype.toggleAudioByIndex = function(i) {
	
	if(	this.audioArray.array[i].muted === true) {
		this.audioArray.array[i].muted = false;
		return false;
	}

	if(	this.audioArray.array[i].muted === false) {
		this.audioArray.array[i].muted = true;
		return true;
	}

}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens objmousedown
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

/**
 * The standard object for mouse related DOM events
 * @external MouseEvent
 * @type {MouseEvent} 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 */


/**
 * Listens click event
 * @function
 * @listens MouseEvent
 * @param {MouseEvent} e 
 */

/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens MouseEvent
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

/**
 * @function
 * @param {MouseEvent} e 
 */

/**
 * @function
 * @param {MouseEvent} e 
 */



/**
 * 
 * Create a wrapping function that is used for events.
 * 
 * @param {Function} f - Function
 * 
 */

PhSim.prototype.getEventBridge = function(f) {

	var self = this;

	return function(e) {
		f.call(self,e);
	}
}

/**
 * 
 * Used to set event listeners for a canvas.
 * This function works if {@link PhSim.prototype#simCtx} 
 * and {@link PhSim.prototype#simCanvas} are set.
 * 
 * @function
 * @this PhSim
 *  
 */

PhSim.prototype.registerCanvasEvents = function() {

	var self = this;

	/**
	 * @function 
	 * @this HTMLCanvasElement
	 * @param {external:MouseEvent} e - MouseEvent object
	 * 
	 * @fires Events#mousedown
	 * @fires Events#objmousedown
	 * 
	 */


	this.dispatchMouseDown = function(e) {

		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "mousedown";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(!self.paused) {
			if(self.objMouseArr && self.objMouseArr.length > 0) {
				
				eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

				self.callEventClass("objmousedown",canvas,eventObj);

				for(var i = 0; i < eventObj.dynArr.length; i++) {
					eventObj.dynArr[i].callEventClass("objmousedown",eventObj.dynArr[i],eventObj);
				}

			}
		}

		/**
		 * PhSim `mousedown` event.
		 * @event mousedown
		 * @type {PhSim.Events.PhSimMouseEvent}
		 */
	
		self.callEventClass("mousedown",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mousedown",this.dispatchMouseDown);

	/**
	 * @function
	 * @param {external:MouseEvent} e 
	 * 
	 * @fires Events#click
	 * @fires Events#objclick
	 * 
	 */

	this.dispatchClick = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "click";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);

		if(self.objMouseArr.length > 0) {

			eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

			self.callEventClass("objclick",canvas,eventObj);

			for(var i = 0; i < eventObj.dynArr.length; i++) {
				eventObj.dynArr[i].callEventClass("objclick",eventObj.dynArr[i],eventObj);
			}

		}
	
		self.callEventClass("click",canvas,eventObj);
	}

	this.simCanvas.addEventListener("click",this.dispatchClick);

	/**
	 * 
	 * Dispatch `mousemove` event.
	 * 
	 * @function
	 * @param {external:MouseEvent} e - Standard MouseEvent Javascript object 
	 * 
	 * @fires PhSim.Events#objmousemove
	 * @fires PhSim.Events#objmouseover
	 * @fires PhSim.Events#objmouseout
	 * @fires PhSim.Events#mousemove
	 */

	this.dispatchMouseMove = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
	
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;

		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(self.mouseX && self.mouseY) {
			self.prevMouseX = self.mouseX;
			self.prevMouseY = self.mouseY;
		}
	
		self.prevObjMouseArr = [];
	
		if(self.objMouseArr) {
			self.prevObjMouseArr = [...self.objMouseArr];
		}
	
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
	
		self.dynArr = self.objMouseArr;
	
		self.objMouseArr = [];
		self.formerMouseObjs = [];
		self.newMouseObjs = [];
	
		if(self.init) {
	
			for(i = 0; i < self.objUniverse.length; i++) {
	
				if(self.pointInObject(self.objUniverse[i],self.mouseX,self.mouseY)) {
					self.objMouseArr.push(self.objUniverse[i])
				}
	
				if(!self.objMouseArr.includes(self.objUniverse[i]) && self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.formerMouseObjs.push(self.objUniverse[i])
				}
	
				if(self.objMouseArr.includes(self.objUniverse[i]) && !self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.newMouseObjs.push(self.objUniverse[i])
				}
	
			}
	
			if(self.objMouseArr && self.objMouseArr.length > 0) {

				eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

				self.callEventClass("objmousemove",canvas,eventObj);

				for(var i = 0; i < eventObj.dynArr.length; i++) {
					eventObj.dynArr[i].callEventClass("objmousemove",eventObj.dynArr[i],eventObj);
				}

			}
	
			if(self.newMouseObjs && self.newMouseObjs.length > 0) {

				eventObj.newMouseObjs = self.newMouseObjs;

				eventObj.target = eventObj.newMouseObjs[eventObj.dynArr.length - 1];

				self.callEventClass("objmouseover",canvas,eventObj);

				for(var i = 0; i < eventObj.newMouseObjs.length; i++) {
					eventObj.newMouseObjs[i].callEventClass("objmouseover",eventObj.newMouseObjs[i],eventObj);
				}

			}
	
			if(self.formerMouseObjs && self.formerMouseObjs.length > 0) {

				eventObj.formerMouseObjs = self.formerMouseObjs;

				eventObj.target = eventObj.formerMouseObjs[eventObj.dynArr.length - 1];

				self.callEventClass("objmouseout",canvas,eventObj);

				for(var i = 0; i < eventObj.formerMouseObjs.length; i++) {
					eventObj.formerMouseObjs[i].callEventClass("objmouseout",eventObj.formerMouseObjs[i],eventObj);
				}

			}
		}
	
		/**
		 * @event mousemove
		 */
	
		self.callEventClass("mousemove",canvas,eventObj);
	
		//console.log(eventObj);
	}

	this.simCanvas.addEventListener("mousemove",this.dispatchMouseMove);

	this.dispatchMouseUp = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;

		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(self.objMouseArr.length > 0) {

			eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

			self.callEventClass("objmouseup",canvas,eventObj);

			for(var i = 0; i < eventObj.dynArr.length; i++) {
				eventObj.dynArr[i].callEventClass("objmouseup",eventObj.dynArr[i],eventObj);
			}

		}
	
		self.callEventClass("mouseup",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseup",this.getEventBridge(self.dispatchMouseUp));

	self.dispatchMouseOut = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseout",this.dispatchMouseOut);

}

PhSim.prototype.deregisterCanvasEvents = function() {
	//self.simCanvas.removeEventListener("mousedown",self.getEventBridge(self.mousedownListener));
	//self.simCanvas.removeEventListener("click",self.getEventBridge(self.clickListener));
	//self.simCanvas.removeEventListener("mousemove",self.getEventBridge(self.mousemoveListener));
	//self.simCanvas.removeEventListener("mouseup",self.getEventBridge(self.mouseupListener));
	//self.simCanvas.removeEventListener("mouseout",self.getEventBridge(self.mouseoutListener));

}

PhSim.prototype.registerKeyEvents = function() {

	var self = this;

	self.windowObj = self.windowObj || window;

	self.keydownBridge = function(e) {
		var eventObj = new PhSim.Events.PhSimEventKey();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",this,eventObj);
	}

	self.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	self.windowObj.addEventListener("keydown",self.keydownBridgeWrapper);
}

PhSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",self.keydownBridgeWrapper);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const DynObject = __webpack_require__(1);
const Vector = __webpack_require__(4);

/**
 * @namespace
 * @memberof PhSim
 */

PhSim.Query = {}

/**
 * 
 * Get the special points of a rectangle
 * 
 * @function
 * @param {Object} rectangle 
 */

PhSim.Query.getSpecialRectanglePoints = function(rectangle) {
	
	var o = {

		"center": {
			"rel": {
				"x": 0.5 * rectangle.w,
				"y": 0.5 * rectangle.h
			},
	
			"abs": {
				"x": rectangle.x + o.center.rel.x,
				"y": rectangle.h + o.center.rel.y
			},
		},

		"sidepoint": {

			"rel": {
				"x": rectangle.w,
				"y": 0.5 * rectangle.h
			},

			"abs": {
				"x": o.sidepoint.rel.x + rectangle.x,
				"y": o.sidepoint.rel.y + rectangle.y 
			}

		},

	}

	return o;

}

/**
 * Get the status string of the the dynamic simulation
 * @function
 */

PhSim.prototype.getStatusStr = function() {
	return PhSim.statusStruct[this.status];
}

/**
 * 
 * Get collision classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {String[]}
 * 
 */

PhSim.Query.getCollisionClasses = function(dynObject) {

	if(dynObject.collisionClass) {
		var a = dynObject.collisionClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * @function
 */

PhSim.prototype.getUniversalObjArray = function() {
	
	var array = []
	
	for(var i = 0; i < this.matterJSWorld.composites.length; i++) {
		
		var a = this.matterJSWorld.composites[i].bodies;

		for(var j = 0; j < a.length; j++) {
			array.push(a[j]);
		}

	}

	for(var i = 0; i < this.matterJSWorld.bodies.length; i++) {
		array.push(this.matterJSWorld.bodies[i]);
	}

	return array;

}

/**
 * Check widget type and return the widget type
 * @param {WidgetOptions} widget 
 */

PhSim.Query.chkWidgetType = function(widget) {
	
	for(var i = 0; i < PhSim.boolKey_lc.length; i++) {
		if(widget[PhSim.boolKey_lc[i]]) {
			return PhSim.boolKey_lc[i];
		}
	}

	return "unknown_widget";

}

/**
 * Get static object of a dynamic object
 * @param {PhSim.DynObject} dynObject - The dynamic object
 */

PhSim.prototype.getStatic = function(dynObject) {
	
	if(dynObject.static || dynObject.static) {
		return null;
	}

	else {
		return dynObject.static;
	}
}

/**
 * Get object by name
 * 
 * @function
 * @param {String} str - String for the name
 * @returns {PhSimObject|null} -  Returns the object if found, but returns "null" object if not.
 */

PhSim.prototype.getObjectByName = function(str) {

	for(var i = 0; i < this.objUniverse.length; i++) {
		if(this.objUniverse[i].name === str) {
			return this.objUniverse[i];
		}
	}

	return null;

}

/**
 * Check if two objects are colliding
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB
 * @returns {Boolean} 
 */

PhSim.prototype.collided = function(dynObjectA,dynObjectB) {
	return Matter.SAT.collides(dynObjectA.matter,dynObjectB.matter).collided;
}

/**
 * Check if an object is in a collision
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.prototype.isInCollision = function(dynObject) {

	var self = this;

	var returnValue = false;

	this.forAllObjects(function(object) {
		var a = self.collided(dynObject,object);
		if(a === true) {
			returnValue = a;
			return false;
		}	
	});

	return returnValue;
}

/**
 * See if point is contained in shape defined by vertices set.
 * @function
 * @param {Vector[]} a - Set of vertices
 * @param {Vector} v - The vertex to be checked.
 * @return {Boolean} - Returns true if `v` is contained in the shape defined by `a` and false if otherwise.
 */

PhSim.Query.pointInVerts = function(a,v) {

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.moveTo(a[0].x,a[0].y);

	for(var i = 0; i < a.length; i++) {
		ctx.lineTo(a[i].x,a[i].y);
	}

	ctx.closePath();
	var p = ctx.isPointInPath(v.x,v.y);
	ctx.stroke();


	return p;


}

/**
 * 
 * See if point is in vertices border
 * 
 * @function
 * @param {Vector[]} a - Vertices to check
 * @param {Vector} v - Point to check.
 * @param {Number} width - Width of vertices border
 * @returns {Boolean} - Returns `true` if `v` is in the border of the 
 * polygon defined by `a` and false otherwise.
 */

PhSim.Query.pointInVertsBorder = function(a,v,width) {

	if(width) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.lineTo(a[0].x,a[0].y);

		for(var i = 0; i < a.length; i++) {
			ctx.moveTo(a[i].x,a[i].y);
		}

		ctx.closePath();
		var p = ctx.isPointInPath(v.x,v.y);
		ctx.stroke();


		return p;		
	}

	else {
		return false;
	}

}

/**
 * Deep clone a JavaScript object.
 * @param {Object} o 
 */

PhSim.Query.deepClone = function(o) {
	return JSON.parse(JSON.stringify(o));
}

/**
 * @function
 * @param {*} o 
 * @param {*} x 
 * @param {*} y 
 */

PhSim.Query.pointInRectangle = function(o,x,y) {
	var a = PhSim.Vertices.rectangle(o);
	return PhSim.Query.pointInVerts(a,new Vector(x,y));
}

/**
 * 
 * Check if a point (x,y) is in a dynamic object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {Boolean}
 */

PhSim.Query.pointInObject = function(o,x,y) {

	if(o.shape === "rectangle") {
		return PhSim.Query.pointInRectangle(o,x,y);
	}

	else if(o.shape === "circle") {

		var d = Vector.distance(o,new Vector(x,y));
		
		if(d < o.radius) {
			return true;
		}

		else {
			return false;
		}

	}  
	
	else if(o.shape === "regPolygon") {
		var a = PhSim.Vertices.regPolygon(o);
		return PhSim.Query.pointInVerts(a,new Vector(x,y));
	}

	else if(o.shape === "polygon") {
		return PhSim.Query.pointInVerts(o.verts,new Vector(x,y));
	}
}

PhSim.prototype.pointInObject = function(o,x,y) {
	return PhSim.Query.pointInObject(o,x,y)
}

/**
 * Get object by ID
 * 
 * @function
 * @param {String} idNum
 * @returns {PhSim.DynObject} 
 * 
 */

PhSim.prototype.getDynObjectByID = function(idNum) {

	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		if(a[i].id === idNum) {
			return a[i];
		}
	}

}

/**
 * 
 * Get array of objects that contain a certain point 
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.prototype.pointObjArray = function(x,y) {

	var b = [];

	var a = this.objUniverse || [];

	for(var i = 0; i < a.length; i++) {
		if(this.pointInObject(a[i],x,y)) {
			b.push(a[i]);
		}
	}

	return b;

}

/** 
 * Get the collison pairs that contain a certain object 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject
 * @returns {PhSim.phSimCollision[]}
 * 
 */

PhSim.prototype.getCollisionList = function(dynObject) {

	var z = [];

	for(var i = 0; i < this.matterJSEngine.pairs.list.length; i++) {

		var a = this.matterJSEngine.pairs.list[i];

		if(a.bodyA.plugin.dynObject.id === dynObject.id || a.bodyB.plugin.dynObject.id === dynObject.id) {
			
			var o = new PhSim.Events.PhSimCollision;
			o.bodyA = a.bodyA.plugin.dynObject;
			o.bodyB = a.bodyB.plugin.dynObject;
			o.matter = a;
			z.push(o);

			console.dir(o);

		}

	}

	return z;
}

/**
 * 
 * Get array of Dynamic Object colliding some specified colliding object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.prototype.getCollidingObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		if(a[i].matter.bodyA.plugin.id === dynObject.id) {
			b.push(a[i].bodyB);
		}

		if(a[i].matter.bodyB.plugin.id === dynObject.id) {
			b.push(a[i].bodyA);		
		}

	}

	return b;

}

/**
 * Get senor classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {String[]}
 */

PhSim.Query.getSensorClasses = function(dynObject) {

	if(dynObject.sensorClass) {
		var a = dynObject.sensorClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * 
 * Check if two objects share at least one sensor class
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB 
 * @returns {Boolean}
 */

PhSim.Query.sameSensorClasses = function(dynObjectA,dynObjectB) {
	return PhSim.Query.intersectionExists(PhSim.Query.getSensorClasses(dynObjectA),PhSim.Query.getSensorClasses(dynObjectB));
}

PhSim.Query.intersectionExists = function(array1,array2) {

	for(var i = 0; i < array1.length; i++) {
		var a = array2.indexOf(array1[i]);
		if(a !== -1) {
			return true;
		}
	}

	return false;
}

/**
 * 
 * Get objects colliding some object that share the same 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Object to check for colliding sensor objects
 * @returns {PhSim.DynObject[]} 
 */

PhSim.prototype.getCollidingSensorObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		var dynCol = a[i]
		var matterCol = dynCol.matter;

		if(matterCol.bodyA.plugin.dynObject.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.plugin.dynObject.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyA)) {
			b.push(dynCol.bodyA);		
		}

	}

	return b;

}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.prototype.inSensorCollision = function(dynObject) {
	
	var a = this.getCollidingSensorObjects(dynObject); 
	
	if(a.length > 0) {
		return true;	
	}

	else {
		return false;
	}
}

/**
 * @function
 * @param {Number} cx - x-coordinate of upper left corner.
 * @param {Number} cy - y-coordinate of upper left corner.
 * @param {Number} cw - width of rectangle
 * @param {Number} ch - height of rectangle
 * @param {Number} px - x-coordinate of point to be checked.
 * @param {Number} py - y-coordinate of point to be checked.
 * @returns {Boolean}
 */

PhSim.Query.isPointInRawRectangle = function(cx,cy,cw,ch,px,py) {
	
	var cond = (cx < px) && (px < cx + cw) && (cy < py) && (py < cy + ch) 

	if(cond) {
		return true;
	}

	else {
		return false;
	}
}

/**
 * 
 * Get object that checks the collision relations between two objects
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA - The first object
 * @param {PhSim.DynObject} dynObjectB - The second object
 * @returns {PhSim.CollisionReport} - A collision report that updates itself after each update
 */

PhSim.prototype.getCollisionChecker = function(dynObjectA,dynObjectB) {

	var self = this;
	var report = new PhSim.CollisionReport();
	report.before = null;
	report.current = null;
	report.difference = null;
	report.objectA = dynObjectA;
	report.objectB = dynObjectB;

	this.on("beforeupdate",function() {
		report.before = self.collided(dynObjectA,dynObjectB);
	});

	this.on("afterupdate",function() {
		report.current = self.collided(dynObjectA,dynObjectB);
		report.difference = report.current - report.before;
		if(report.difference) {
			var eventObj = new PhSim.Events.PhSimDynEvent();
			eventObj.report = report;
			eventObj.difference = report.difference;
			self.callEventClass("collisionchange",self,eventObj);
		}

	})

	return report;
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * Apply Newtonian gravity field.
 * @function
 */

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


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

PhSim.prototype.play = function() {
	this.paused = false;
	this.intervalLoop = setInterval(this.loopFunction.bind(this),this.delta);
}

PhSim.prototype.pause = function() {
	clearInterval(this.intervalLoop);
	this.paused = true;
}

PhSim.prototype.toggle = function() {
	
	if(this.paused) {
		this.play();
	}

	else {
		this.pause();
	}

}

PhSim.prototype.exitSl = function() {
	this.callEventClass("beforeslchange",this,new PhSim.Events.PhSimEvent("beforeslchange"));
	this.paused = false;
	clearInterval(this.intervalLoop);
}

/**
 * @function
 * Completely reset PhSim object. That is, make it as if it is a new one.
 * 
 */

PhSim.prototype.exit = function() {

	// Remove references to avoid memory leak

	delete this.camera.dynSim
	delete this.phRender.dynSim

	for(var i = 0; i < this.objUniverse.length; i++) {
		delete this.objUniverse[i].phSim;
	}

	this.callEventClass("exit",this,new PhSim.Events.PhSimEvent("exit"));
	this.deregisterCanvasEvents();
	this.deregisterKeyEvents();
	this.exitSl();

	// Erase all things

	Object.assign(this,new PhSim());
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Go to simulation in the composite simulation
 * 
 * In a PhSim object, there is a property known as PhSim.prototype.sim. 
 * This property is used to define a simulation.
 * 
 * When PhSim.prototype.gotoSimulationIndex is used, it resets 
 * @param {Number} i
 * @this PhSim
 * @memberof PhSim
 * @returns {Promise} - A promise that is fulfiled if the loading is successful.
 * @function
 * 
 *  
 */

const Centroid = __webpack_require__(5);
const Vector = __webpack_require__(4);

var gotoSimulationIndex = function (i) {

	this.status = PhSim.statusCodes.INT;

	var optionMap = new Map();  

	var self = this;

	this.firstSlUpdate = false;

	var event = new PhSim.Events.PhSimEvent("slchange");

	event.type = "slchange";

	this.callEventClass("beforeslchange",this,event);

	if(!this.noCamera) {
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

	if(this.simCtx) {
	    this.drawLoadingScreen();
	}

	this.simulation = this.simulations[i];
	this.simOptions = this.simulations[i];

	this.simulationIndex = i;

	if(this.simCtx) {
		this.width = this.simCtx.canvas.width;
		this.height = this.simCtx.canvas.height;
	}
	
	this.paused = false;

	var this_a = this;

	this.matterJSWorld = Matter.World.create();

	this.matterJSEngine = Matter.Engine.create({
		world: this_a.matterJSWorld
	});

	this.dynTree = [];
	this.objUniverse = [];
	this.staticSprites = [];
	this.staticAudio = [];
	this.audioPlayers = 0;
	this.simulationEventStack = new PhSim.EventStack();

	if(this.simOptions && this.simOptions.world && this.simOptions.world.bg) {
		this.bgFillStyle = this.simOptions.world.bg;
	}

	if(this.simulations) {
	
		for(var L = 0; L < this.simOptions.layers.length; L++) {

			this.dynTree.push([]);

			for(var O = 0; O < this.simOptions.layers[L].objUniverse.length; O++) {

				var o = this.simOptions.layers[L].objUniverse[O];

				if(o.sprite) {
					this.staticSprites.push(o.sprite);	
				}
				
				if(o.noDyn) {

					this.addObject(o,{
						layer: L
					});
			
				}

				else {
					
					if(o instanceof PhSim.DynObject) {
						this.addObject(o,{
							layer: L
						});
					}

					else {
						var dynObject = new PhSim.DynObject(o);

						this.addObject(dynObject,{
							layer: L
						});

						optionMap.set(o,dynObject);
					}

				}
			}

			var a = new PhSim.Events.PhSimDynEvent();
			this_a.callEventClass("matterJSLoad",this_a,a);

		}

	}

	Matter.Events.on(this.matterJSEngine,"collisionStart",function(event) {
		
		var a = new PhSim.Events.PhSimDynEvent();
		a.matterEvent = event;
		this_a.callEventClass("collisionstart",this_a,a);

	});

	if(this.simOptions.game) {
		this.lclGame = new PhSim.Game(this,this.simOptions.game);
	}

	if(this_a.simulation.widgets) {

		for(var C = 0; C < this_a.simulation.widgets.length; C++) {
				
			var a = this_a.simulation.widgets[C];

			if(a.type === "constraint") {

				var b = {}

				if(a.objectA) {

					if(a.objectA instanceof PhSim) {
						b.bodyA = a.objectA.matter;
					}

					else {

						if(typeof a.objectA.L === "number" && typeof a.objectA.O === "number") {
							b.bodyA = this_a.LO(a.objectA.L,a.objectA.O).matter;
						}

						else {
							b.bodyA = optionMap.get(a.objectA).matter;
						}

					}

				}

				if(a.objectB) {
					b.bodyB = this_a.LO(a.objectB.L,a.objectB.O).matter;

					if(a.objectB instanceof PhSim) {
						b.bodyB = a.objectB.matter;
					}

					else {

						if(typeof a.objectB.L === "number" && typeof a.objectB.O === "number") {
							b.bodyB = this_a.LO(a.objectB.L,a.objectB.O).matter;
						}

						else {
							b.bodyB = optionMap.get(a.objectB).matter;
						}

					}

				}

				if(a.pointA) {

					if(a.objectA) {
						b.pointA = Vector.subtract(a.pointA,b.bodyA.position);
					}

					else {
						b.pointA = a.pointA;
					}

				}

				if(a.pointB) {
					
					if(a.objectB) {
						b.pointB = Vector.subtract(a.pointB,b.bodyB.position);
					}

					else {
						b.pointB = a.pointB;
					}
				}

				var c = Matter.Constraint.create(b);

				Matter.World.add(this.matterJSWorld,c)

			}

			if(a.type === "connection") {

				this_a.connectDynObjects(this_a.dynTree[a.objectA.L][a.objectA.O],this_a.dynTree[a.objectB.L][a.objectB.O]);

			}

			if(a.type === "wFunction") {
				self.createWFunction(self,a.function,a);
			}



		}

	}

	this.status = PhSim.statusCodes.LOADED_DYN_OBJECTS;

	var p = new Promise(function(resolve,reject){

		if(self.phRender && self.staticSprites.length) {
			self.phRender.spriteImgObj = new PhSim.Sprites.spriteImgObj(self.staticSprites,function() {
				resolve();
				self.status = PhSim.statusCodes.LOADED_SPRITES;
			});
		}

		else {
			resolve();
			self.status = PhSim.statusCodes.LOADED_SPRITES;
		}

	}).then(function() {
		return new Promise(function(resolve,reject){

			if(self.staticAudio.length) {
				self.audioArray = new PhSim.Audio.AudioArray(self.staticAudio,function(){
					self.status = PhSim.statusCodes.LOADED_AUDIO;
					resolve();
				});
			}

			else {
				self.status = PhSim.statusCodes.LOADED_AUDIO;
				resolve();
			}

		});
	}).then(function(){
		this_a.init = true;

		self.status = PhSim.statusCodes.LOADED_SIMULATION;

		var e = new PhSim.Events.PhSimDynEvent();
	
		self.callEventClass("load",self,e);

	});

	return p;

}

module.exports = gotoSimulationIndex;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

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

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * 
 * Update a dynamic object.
 * 
 * @function
 * @param {PhSimObject} currentObj - Object to be updated
 * @fires PhSim.Events.PhSimEvent
 * 
 */

PhSim.prototype.updateDynObj = function(currentObj) {


	// Loop must start at index 1 because the first element in the array is a reference to the parent object itself.

	if(currentObj.noDyn) {
		this.phRender.renderStatic(currentObj);	
	}
	
	else {

		if(currentObj.shape === "circle" || currentObj.shape === "regPolygon" || currentObj.shape === "rectangle") {
			currentObj.cycle = currentObj.firstCycle + currentObj.matter.angle;
		}
	
		if(currentObj.shape === "rectangle") {
			
			var v = {
				"x": currentObj.matter.position.x - currentObj.matter.positionPrev.x,
				"y": currentObj.matter.position.y - currentObj.matter.positionPrev.y 
			}
	
			currentObj.x = currentObj.matter.position.x - currentObj.w * 0.5
			currentObj.y = currentObj.matter.position.y - currentObj.h * 0.5
	
		}
	
		if(currentObj.shape === "circle" || currentObj.shape === "regPolygon") {
			currentObj.x = currentObj.matter.position.x;
			currentObj.y = currentObj.matter.position.y;
		}
	
		if(currentObj.shape === "polygon") {
			PhSim.calc_skinmesh(currentObj);
		}

		if(this.phRender) {	
			this.phRender.dynamicRenderDraw(currentObj);
		}

	}

	var event = new PhSim.Events.PhSimEvent("objupdate");
	event.target = currentObj;

	this.callEventClass("objupdate",this,event);

}

PhSim.prototype.loopFunction = function() {

	if(this.paused === false) {

		var beforeUpdateEvent = new PhSim.Events.PhSimDynEvent()

		beforeUpdateEvent.simulation = this.simulation;

		this.prevDate = this.prevDate && this.updateDate;
	
		this.callEventClass("beforeupdate",this,beforeUpdateEvent);

		if(!this.firstSlUpdate) {
			this.callEventClass("beforefirstslupdate",this,afterUpdateEvent);
		}

		this.updateDate = new Date();

		if(this.prevDate) {
			this.updateTimeInterval = this.updateDate - this.prevDate;
		}


		Matter.Engine.update(this.matterJSEngine,this.delta);

		if(this.simCtx) {

			this.simCtx.fillStyle = this.bgFillStyle;

			if(this.noCamera) {
				this.simCtx.fillRect(0,0,this.width,this.height);
			}
	
			else {
				this.simCtx.fillRect(0 - this.camera.x,0 - this.camera.y,this.width / this.camera.scale,this.height / this.camera.scale);
			}
		}

		for(i = 0; i < this.objUniverse.length; i++) {
			this.updateDynObj(this.objUniverse[i]);
		}
	
		this.applyGravitationalField()

		var afterUpdateEvent = new PhSim.Events.PhSimDynEvent()

		afterUpdateEvent.simulation = this.simulation;

		this.sl_time = this.sl_time + this.delta;

		if(this.filter) {
			this.simCtx.fillStyle = "rgba(3,3,3,0.7)";
			this.simCtx.fillRect(0,0,this.width / this.camera.scale,this.height / this.camera.scale);
		}

		if(!this.firstSlUpdate) {
			this.callEventClass("firstslupdate",this,afterUpdateEvent);
			this.firstSlUpdate = true;
		}

		this.callEventClass("afterupdate",this,afterUpdateEvent);

		//this.renderAllCounters();


	}

}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/** 
 * 
 * Extract Widgets from Dynamic Object.
 * To extract a widget in PhSim is to read all of the objects in the "widgets" array found in each
 * well-formed PhSim object and then translate it into JavaScript.
 * 
 * @function
 * @param {WidgetOptions} widget - The Widget
 * @param {PhSim.DynObject} dyn_object The individual Dynamic Object
 * @returns undefined
 * 
*/

PhSim.prototype.extractWidget = function(dyn_object,widget) {

    if(PhSim.Widgets[widget.type]) {
        PhSim.Widgets[widget.type].call(this,dyn_object,widget);
    }

    if(widget.name) {
        this.widgets[widget.name] = widget;
    }

    var self = this;
    
        if(widget.changeSl) {
    
            var closure = function() {
    
                var i = widget.slIndex;
    
                var f = function() {
                    self.gotoSimulationIndex(i)
                }
    
                return f;
            }
    
            this.createWFunction(widget.trigger,closure(),{
                ...widget,
                wFunctionObj: dyn_object
            });
        }

        if(widget.transformWithCamera) {
            this.camera.transformingObjects.push(dyn_object)
        }

    }

    /**
     * Extract all widgets from a dynamic object.
     * @param {PhSim.DynObject} dyn_object 
     */
    
    
    PhSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.widgets.length; i++) {
            this.extractWidget(dyn_object,dyn_object.widgets[i]);
        }
    }



/***/ }),
/* 31 */
/***/ (function(module, exports) {

/**
 * @constructor
 * @memberof PhSim
 * @param {*} dynSim 
 */

var Camera = function(dynSim) {

	/**
	 * Dynamic Simulation
	 * @type {PhSim}
	 */

	this.dynSim = dynSim;

}

/**
 * Camera scale
 * @type {Number}
 */

Camera.prototype.scale = 1;

/**
 * Camera offset x 
 * @type {Number}
 */

Camera.prototype.x = 0;

/**
 * Camera offset y
 * @type {Number}
 */

Camera.prototype.y = 0;

/**
 * Target object
 * @type {StaticObject}
 */

Camera.prototype.targetObj = null;

/**
 * Objects that will transform with the camera
 * @type {StaticObject[]}
 */

Camera.prototype.transformingObjects = []

Camera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

Camera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		PhSim.Motion.translate(this.transformingObjects[i],dx,dy);
	}
}

Camera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}

module.exports = Camera;

/***/ }),
/* 32 */
/***/ (function(module, exports) {


/**
 * Gradient Namespace
 * @memberof PhSim
 * @namespace
 */

var Gradients = {}

/**
 * @function
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PhSim.Static.Gradient} jsObject 
 */

Gradients.extractGradient = function(ctx,jsObject) {

	var gradient = ctx.createLinearGradient(jsObject.limits.start.x,jsObject.limits.start.y,jsObject.limits.end.x,jsObject.limits.end.y);

	for(var i = 0; i < jsObject.stops.length; i++) {
		gradient.addColorStop(jsObject.stops[i].pos,jsObject.stops[i].color);
	}
	
	return gradient;

}

module.exports = Gradients;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/*

Constraint types

*/

PhSim.Constraints = {
    Static: {}
}

PhSim.Constraints.Static.Constraint = function() {
	this.objectA = null;
	this.objectB = null;
	this.pointA = null;
	this.pointB = null;
	this.type = "constraint";
}

PhSim.prototype.getWidgetByName = function(nameStr) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		this.objUniverse[i].getWidgetByName(nameStr);
	}
}

PhSim.prototype.widgets = {};


PhSim.Widget = {}

/**
 * 
 * @param {PhSimObject} o 
 */

PhSim.Widget.defineByBoolean = function(o) {

	Object.keys(PhSim.Widgets).forEach(function(p){
		if(o[p]) {
			o.type = p;
		}
	})

	
}

PhSim.Widget.WidgetOptions = function(type) {
	this.type = type;
}

/**
 * @typedef {WFunctionOptions|Object} WidgetOptions
 * @property {String} type - Name of widget. 
 */

/**
 * Widget Namespace.
 * @namespace
 * @memberof PhSim
 */

PhSim.Widgets = {};

PhSim.Query.chkWidgetType = function() {
	
}


__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);


const Game = __webpack_require__(9);

/**
 * @borrows PhSim.Game.Widgets.coin as PhSim.Widgets.coin
 */

PhSim.Widgets.coin = Game.Widgets.coin;

/**
 * @borrows PhSim.Game.Widgets.hazard as PhSim.Widgets.hazard
 */

PhSim.Widgets.hazard = Game.Widgets.hazard;

/**
 * @borrows PhSim.Game.Widgets.health as PhSim.Widgets.health
 */


PhSim.Widgets.health = Game.Widgets.health;

/**
 * @borrows PhSim.Game.Widgets.endGame as PhSim.Widgets.endGame
 */

PhSim.Widgets.endGame = Game.Widgets.endGame;

__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);

/**
 * PlayAudio Widget
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget
 * @this PhSim
 */

PhSim.Widgets.playAudio = function(dyn_object,widget) {

    var self = this;

    var i = this.audioPlayers;
    
    this.staticAudio.push(widget);

    var f = function() {
        self.playAudioByIndex(i);
    }

    var r = this.createWFunction(dyn_object,f,widget);

    this.audioPlayers++;
}

/**
 * Make object not rotate
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {*} widget 
 */
    
PhSim.Widgets.noRotation = function(dyn_object) {
    Matter.Body.setInertia(dyn_object.matter, Infinity)
}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * Create circular constraint
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} x 
 * @param {Number} y 
 */

PhSim.prototype.createCircularConstraint = function(dynObject,x,y) {
	
	var c = Matter.Constraint.create({
		
		"bodyA": dynObject.matter,
		
		"pointB": {
			"x": x,
			"y": y
		}

	});

	Matter.World.add(this.matterJSWorld,c)

	var relAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x);

	this.on("afterupdate",function(){
		var newAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x) - relAngle;
		PhSim.Motion.setAngle(dynObject,newAngle);
	});


	dynObject.circularConstraintVector = {
		"x": x,
		"y": y
	}

}

/**
 * 
 * The `circularConstraint` widget creates circular constraints.
 * 
 * A circular constraint is a special kind of constraint that is made up of an 
 * object `dyn_object` and a point `(x,y)` in space.
 * 
 * The object rotates around the centroid of `dyn_object` as it rotates around the
 * point `(x,y)`.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Circular Constraint options
 * @param {Number} widget.x - x-coordinate of the other end of the constraint
 * @param {Number} widget.y - y-coordinate of the other end of the constraint 
 */

PhSim.Widgets.circularConstraint = function(dyn_object,widget) {
	this.createCircularConstraint(dyn_object,widget.x,widget.y);
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * 
 * Clone object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options - The options used for creating a spawned object
 * @param {Vector} options.velocity -  The velocity to add to an object when it got spawned.
 * @param 
 */

PhSim.prototype.cloneObject = function(dynObject,options = {}) {
    
    var obj = new PhSim.DynObject(dynObject.static);
    
    /**
     * Property telling if object is cloned.
     * 
     * @type {Boolean|undefined}
     * @memberof PhSim.DynObject
     */

    obj.cloned = true;
    
    /**
     * 
     */


    obj.cloneParent = dynObject;
    
    PhSim.Motion.setVelocity(obj,options.velocity);

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.Events.PhSimEvent("clone");
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/**
 * 
 * The `clone` widget is a widget that makes copies of an object and inserts them into
 * the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Options.
 */

PhSim.Widgets.clone = function(dyn_object,widget) {

    var self = this;

    var o = {
        velocity: widget.vector
    }
    
    // Clone By Time

    if(widget.trigger === "time") {
    
        var getFunction = function() {

            var time = widget.time;
            var maxN = widget.maxN;

            var func = null;

            if(Number.isInteger(maxN)) {

                func = function(e) {

                    if(func.__n === maxN) {
                        clearInterval(func.__interN);
                    }

                    else {
                        if(!self.paused) {
                            self.cloneObject(dyn_object,o);
                            func.__n++;
                        }
                    }

                }

                func.__n = 0;

            }

            else {

                func = function(e) {
                    if(!self.paused) {
                        self.cloneObject(dyn_object,o);
                    }
                }

            }


            func.__phtime = time;
            func.__interN = null;

            return func;

        }

        var refFunc = getFunction();

        refFunc.__interN = setInterval(refFunc,refFunc.__phtime);

    }

    // Clone By Key

    if(widget.trigger === "key") {

        var getFunction = function() {

            var kc = widget.key;
            var vc = widget.vector;

            var cloneByKeyFunc = function(e) {
                if(e.key === kc) {
                    self.cloneObject(dyn_object,o);
                }
            }

            return cloneByKeyFunc;

        }

        this.on("keydown",getFunction());

    }

}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * The `draggable` widget makes {@link PhSim.DynObject} objects draggable.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @this PhSim
 * @param {*} widget 
 */

PhSim.Widgets.draggable = function(dyn_object,widget) {

    var self = this;
    
    var func = function(e) {

        var change = false;
        var __ismoving = true;
        var constraint = null;

        // Displacement vector between mouse and centroid of object when the mouse is pushed downwards.

        var delta = {}

        // Mouse Position

        var mV = {
            x: null,
            y: null
        }

        var __onmousemove = function(e) {
            mV.x = e.x - delta.x;
            mV.y = e.y - delta.y;
        }

        var __onmouseup = function() {
            self.off("mousemove",__onmousemove);
            self.off("mouseup",__onmouseup);
            self.off("beforeupdate",__onbeforeupdate);
        }

        var __onbeforeupdate = function() {
            Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
            PhSim.Motion.setPosition(dyn_object,mV);
        }

        var __onmousedown = function(e) {
            if(self.pointInObject(dyn_object,e.x,e.y)) {

                delta.x = e.x - dyn_object.matter.position.x;
                delta.y = e.y - dyn_object.matter.position.y;

                self.on("mousemove",__onmousemove);
                self.on("mouseup",__onmouseup);
                self.on("beforeupdate",__onbeforeupdate);

                __onmousemove(e);
            }
        }
        
        self.on("mouseout",__onmouseup);

        return __onmousedown;

    }

    this.on("mousedown",func());
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * Set lock of the Dynamic Object
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Boolean} value - If  `true`, lock. Otherwise, unlock.
 */


PhSim.prototype.setLock = function(dynObject,value) {
    dynObject.locked = value;
	Matter.Body.setStatic(dynObject.matter,value);
}

/**
 * Toggle Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleLock = function(dynObject) {
    this.setLock(dynObject,!dynObject.locked);
}

/**
 * Toggle Semi-Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleSemiLock = function(dynObject) {
	dynObject.locked = !dynObject.locked;
	Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

/**
 * The `toggleLock` widget toggles the lock status of the Dynamic Object.
 * If locked, the object is unlocked.
 * If unlocked, the object is locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleLock = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var o = dyn_object;

        var f = function() {
            self.toggleLock(o);
        }

        return f;
    }

    this.createWFunction(dyn_object,closure(),widget);
}

/**
 * The `toggleSemiLock` widget toggles the semi-lock status of the Dynamic Object.
 * If semi-locked, the object is semi-unlocked.
 * If semi-unlocked, the object is semi-locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleSemiLock = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var o = dyn_object;

        var f = function() {
            self.toggleSemiLock(o);
        }

        return f;
    }

    this.createWFunction(dyn_object,closure(),widget);
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const Motion = __webpack_require__(8);

/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {"setAngle"|"force"|"velocity"|"translate"|"position"|"rotation"|"circular_constraint_rotation"} mode - The possible modes are "force","velocity","translate"
 * @param {dyn_object} dyn_object - The dynamic object to put in motion.
 * @param {Vector|Number} motion - The vector or scalar that defines the motion.
 * @returns {Function} - A function that makes an object undergo some motion.
 * 
 * 
*/

PhSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

	var self = this;
	
	if(mode === "force") {
		return function() {
			return Motion.applyForce(dyn_object,dyn_object.matter.position,motion);
		}
	}

	if(mode === "velocity") {
		return function() {
			return Motion.setVelocity(dyn_object,motion);
		}
	}

	if(mode === "translate") {
		return function() {
			return Motion.translate(dyn_object,motion);
		}
	}

	if(mode === "position") {
		return function() {
			return Motion.setPosition(dyn_object,motion)
		}
	}

	if(mode === "rotation") {
		return function() {
			return Motion.rotate(dyn_object,motion,dyn_object.matter.position);
		}
	}

	if(mode === "circular_constraint_rotation") {
		return function() {
			return Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	if(mode === "setAngle") {
		return function() {
			return Motion.setAngle(dyn_object,motion);
		}
	}

	if(mode === "circular_constraint_setAngle") {
		return function() {
			var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
			Motion.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
			Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	return console.error("Parameter 'mode' must either be equal to the one of the following strings: 'force','velocity' or 'position'.");

}

/**
 * 
 * The `velocity` widget makes dynamic objects go at a certain velocity.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {WFunctionOptions} widget
 * @param {Vector} widget.vector - Velocity vector
 * @this {PhSim} 
 */

PhSim.Widgets.velocity = function(dynObject,widget) {
    var f = this.createMotionFunction("velocity",dynObject,widget.vector);
    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `translate` widget moves objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object to be translated.
 * @param {WFunctionOptions} widget - Widget options.
 * @param {Vector} widget.vector - Translation vector
 * @this {PhSim} 
 */

PhSim.Widgets.translate = function(dynObject,widget) {
    var f = this.createMotionFunction("translate",dynObject,widget.vector);
    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `position` widget sets the position of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic object that will have its position changed.
 * @param {WFunctionOptions} widget - Widget options.
 * @this {PhSim} 
 */

PhSim.Widgets.position = function(dynObject,widget) {
    var f = this.createMotionFunction("position",dynObject,widget.vector);
    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `rotation` widget rotates an object. 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {WFunctionOptions} widget
 * @this {PhSim} 
 */

PhSim.Widgets.rotation = function(dynObject,widget) {

    if(widget.circularConstraintRotation) {
        var f = this.createMotionFunction("circular_constraint_rotation",dynObject,widget.cycle);
    }

    else {
        var f = this.createMotionFunction("rotation",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);
}

/**
 * The `setAngle` widget makes a widget change angle.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.setAngle = function(dynObject,widget) {

    if(widget.circularConstraintRotation) {
        var f = this.createMotionFunction("circular_constraint_setAngle",dynObject,widget.cycle);
    }

    else {
        var f = this.createMotionFunction("setAngle",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);

}

/**
 * The `force` widget exerts a force on an object
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.force = function(dyn_object,widget) {

    var f = this.createMotionFunction("force",dyn_object,widget.vector);

    this.createWFunction(dynObject,f,widget);
    
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 
 * Call ObjLink functions
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

const DynObject = __webpack_require__(1);

PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * The `objLink_a` widget executes all functions in the {@link PhSim.DynObject#objLinkFunctions}
 * array of `widget.target`. 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Reciever Object
 * @param {WFunctionOptions} widget - Widget options
 * @param {LOAddress|PhSim.DynObject} widget.target -  Target object
 */

PhSim.Widgets.objLink_a = function(dyn_object,widget) {

    var self = this;
    
    var widgetO = widget;

    this.on("load",function(){

        if(typeof widget.target.L === "number" && typeof widget.target.O === "number") {
            var targetObj = self.LO(widgetO.target.L,widgetO.target.O);
        }

        else if(widget.target instanceof DynObject) {
            var targetObj = widget.target;     
        }
    
        var eventFunc = function(){
            self.callObjLinkFunctions(targetObj);
        } 
    
        var f = self.createWFunction(dyn_object,eventFunc,widget);

    });

}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * @file File for dealing with wFunctions.
 * @module widgets/wFunction.js
 * @author Mjduniverse
 * 
 */

/**
 * A widget function is a function that used for the `WidgetFunction` widget.
 * The "this" keyword in the body of function usually refers to the current instance of
 * PhSim simulation or references an instance of {@link PhSim.DynObject}.
 * 
 * To learn more, see the {@tutorial Widget Functions}
 * 
 * @module wFunction
 * @typedef {Function} WFunction
 * @property {Function} _options - Options used to create WFunction
 * @property {Function|Number} _ref
 * @property {String} [_name] - WFunction name
 * @property {Function} _bodyFunction - Body Function
 * @property {String} _eventclass - Event class
 * 
 */

/**
 * Array of widget functions
 * @memberof PhSim
 * @type {WFunctions[]}
 */

PhSim.prototype.wFunctions = [];

/**
 * Create a widget function and push it to the wFunctions array.
 * @function
 * @memberof PhSim
 * @param {String|Function} arg - content of function if string, function if function
 * @param {Object} thisRef - 
 * @returns {WFunction}
 */

// Simple Event Reference Array

PhSim.prototype.wFunctionRefs = [];

/** 
 * 
 * @typedef {"key"} keyTriggerString
 * 
 * The "key" trigger means that the simple event will execute if a key is pressed.
 */

/** 
* 
* @typedef {"sensor"|"sensor_global"} sensorTriggerString
* 
* The "sensor" trigger means that the simple event will execute if the trigger object 
* collides with an object that shares at least one of the sensor classes. However, 
* the "sensor_global" trigger means that the function will execute if any two 
* objects that share at least one sensor class collides.
*/

/** 
 * 
 * @typedef {"objclick"|"objclick_global"} objclickTriggerString
 * 
 * The "objclick" trigger means that the simple event will execute if the mouse clicks on the trigger object. 
 * However, the "objclick_global" trigger means that the simple event will execute if the mouse clicks on any
 * object in general.
 */

/**  
 * @typedef {"objMouseDown"|"objmousedown_global"} objMouseDownTriggerString
 * 
 * The "objmousedown" trigger means that the simple event call is executed if the mouse
 * is being pushed down on the object. The "objmousedown_global" trigger means that
 * the simple event will execute if the mouse clicks on any object in general.
 */

/** 
 * @typedef {"firstslupdate"} firstslupdateTriggerString
 * 
 * The "firstslupdate" trigger means that the simple event will execute during the first
 * update of the simulation.
 */

/** 
 * @typedef {"objmouseup"|"objmouseup_global"} objmouseupTriggerString
 * 
 * The "objmouseup" trigger means that the simple event will execute when the
 * mouse is let go of while the mouse is over an object. The "objmouseup_global" trigger
 * means that the simple event will execute if the mouse is let go of while it is 
 * over an object.
 */ 

 /** 
 * @typedef {"objlink"} objlinkTriggerString
 * 
 * The "objlink" trigger means that the simple event will execute if the trigger object
 * is linked to another object by the objlink widget.
 */

/**
 *  @typedef {"afterslchange"} afterslchangeTriggerString
 * 
 * The "afterslchange" trigger means that the simple event will execute after the 
 * superlayer changes.
 * 
 */

/** 
 * @typedef {"time"} timeTriggerString
 * 
 * The "time" trigger means that the simple event will execute by some interval of time.
 */ 

/** 
 * @typedef {keyTriggerString|sensorTriggerString|objclickTriggerString|
 * objMouseDownTriggerString|firstslupdateTriggerString|objmouseupTriggerString|
 * objlinkTriggerString|afterslchangeTriggerString|timeTriggerString} wFunctionTrigger
 *
 * 
 * The simple event trigger string is a string defining {@link WFunctionOptions.trigger}
 */

/** 
 * Properties for a simple event.
 * The simple event options is an Object that is used for the {@link PhSim#createWFunction} function.
 * They are also used to configure various types of widgets. Especially widgets that utilize
 * wFunctions.
 * 
 * @typedef {Object} WFunctionOptions
 * @property {KeyBoard} [key] - The event.key value for triggering a simple event.
 * @property {Number} [time] - The time interval between a repeated event or a delay time for timeouts.
 * @property {Number} [maxN] - The maximum number of times a repeated SimpleEvent can be executed.
 * @property {PhSim.DynObject} [wFunctionObj] - An object being affected by the wFunction.
 * @property {String} [name] - The name of the wFunction
 * 
 */

 /**
  * @callback WFunctionBody
  * @this {PhSim.DynObject}
  * @param {Event} e - event object
  */

/**
 * Function used to generate {@link WFunction|WFunctions.}
 * To learn more, see the {@tutorial Widget Functions} tutorial.
 * 
 * @function
 * @memberof PhSim
 * 
 * @param {wFunctionTrigger} trigger - The type of SimpleEvent.
 * 
 * @param {WFunctionBody|Number} wFunctionBody - The JavaScript function to be wrapped. 
 * If `wFunctionBody` is an integer `i`, the function body is deterimined by the 
 * `{@link PhSim#options.wFunctions}[i]`
 * 
 * @param {WFunctionOptions} options -  [The Simple Event Options Object]{@link WFunctionOptions}.
 * @returns {WFunction} - The wFunction.
 * @this {PhSim}
 * 
 */
 
PhSim.prototype.createWFunction = function(thisRef,wFunctionBody,options) {

	var self = this;

	if(typeof wFunctionBody === "number") {
		wFunctionBody = this.wFunctions[wFunctionBody];
	}

	if(typeof wFunctionBody === "string") {
		wFunctionBody = new Function("e",options.function)
	}

	/**
	 * 
	 * New WFunction
	 * 
	 * @inner
	 * @type {WFunction}
	 */

    var call = function(e) {
        return wFunctionBody.apply(thisRef,e);
	}

	call._options = options;
	call._bodyFunction = wFunctionBody;
	call._thisRef = thisRef;
	
	if(options._name) {
		self.wFunctionNames[options._name] = call;
	}
	
	if(options.trigger === "key") {

		if(options.key) {
		
			var f = function(e) {
				if( e.key.match( new RegExp("^" + options.key + "$","i") ) ) {
					call(e);
				}
			};

		}

		else {

			var f = function(e) {
				call(e);
			}

		}

		call._ref = f;
		call._eventclass = "keydown";
		
	}

	else if(options.trigger === "sensor" || options.trigger === "sensor_global") {

		var self = this;
		var f;

		if(options.trigger === "sensor") {
			
			f = function(e) {

				var m = self.inSensorCollision(thisRef)
	
				if(m) {
					call(e);
				}
	
			}
		}

		else {
			f = function(e) {
				call(e);
			}
		}

		call._ref = f;
		call._eventclass = "collisionstart";

	}

	else if(options.trigger === "update") {
		
		var f = function() {
			call();
		}

		call._ref = f;
		call._eventclass = "beforeupdate";

	}

	else if(options.trigger === "objclick" || options.trigger === "objclick_global") {

		var f;

		if(options.trigger === "objclick") {
			f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					call(e);
				}
			};
		}

		else {
			f = function(e) {
				call(e);
			}
		}

		call._eventclass = "objclick";
		call._ref = f;

	}

	else if(options.trigger === "objmousedown" || options.trigger === "objmousedown_global") {

		if(options.trigger === "objmousedown") {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					call(e);
				}
			}
		}


		else {
			var f = function(e) {
				call(e);
			}
		}

		call._eventclass = "objmousedown";
		call._ref = f;

	}

	else if(options.trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		call._ref = f;
		call._eventclass = "firstslupdate";


	}
	
	else if(options.trigger === "objmouseup" || options.trigger === "objmouseup_global") {

		if(options.trigger === "objmouseup") {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					call(e);
				}
			};
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		call._eventclass = "objmouseup";
		call._ref = f;

	}

	else if(options.trigger === "objlink") {

		thisRef.objLinkFunctions = thisRef.objLinkFunctions || [];
		thisRef.objLinkFunctions.push(call);

		call._ref = f;

		return call;

	}

	else if(options.trigger === "afterslchange") {

		var f = function(e) {
			call(e);
		}

		call._eventclass = "afterslchange";
		call._ref = f;

	}

	else if(options.trigger === "time") {

		var getFunction = function() {

			if(Number.isInteger(options.maxN)) {

				func = function(e) {

					if(func.__n === options.maxN) {
						clearInterval(func.__interN);
					}

					else {
						if(!self.paused) {
							call();
							func.__n++;
						}
					}

				}

				func.__n = 0;

			}

			else {

				func = function(e) {
					if(!self.paused) {
						call();
					}
				}

			}


			func.__phtime = options.time;
			func.__interN = null;

			return func;

		}

		var refFunc = getFunction();

		refFunc.__interN = setInterval(refFunc,refFunc.__phtime);


		call._ref = refFunc.__interN;

		return call;
	}

	else {
		call._ref = call;	
		call._eventclass = options.trigger;
	}

	if(typeof call._eventclass === "string") {
		
		self.on(call._eventclass,call._ref,{
			"slEvent": true
		});
	}

	// Return wFunction

	return call

}



/** 
 * 
 * Disable wFunction
 * 
 * @memberof PhSim
 * @function
 * @param {WFunction} o - Reference created by {@link PhSim#createWFunction}.
 * 
*/

PhSim.prototype.disableWFunction = function(o) {

	if(typeof o._eventclass === "string") {
		this.off(o._eventclass,o._ref);
	}

	else if(o._options.trigger === "time") {
		clearInterval(o._ref)
	}

	else if(o._options.trigger === "time") {
		clearInterval(o._ref)
	}

	else if(o._options.trigger === "objlink") {
		var i = o._thisRef.objLinkFunctions.indexOf(o)
		o._thisRef.objLinkFunctions.splice(i,1);
	}

	if(o._name) {
		delete this.wFunctionNames[o._name];
	}

}

/**
 * 
 * The `wFunction` widget is used to create wFunctions.
 * 
 * @memberof PhSim
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.wFunction = function(dyn_object,widget) {
	this.createWFunction(dyn_object,widget.function,widget);
}

PhSim.prototype.wFunctionNames = {}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * 
 * The `elevator` widget makes objects go back and forth within some range.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Options
 * @param {Vector} widget.pointA - First point of the elevator
 * @param {Vector} widget.pointB - Second point of the elevator
 * @param {"x"|"y"} widget.bounding - Rules for deteriming the range of the elevator. 
 * 
 * If `widget.bounding` is equal to `"x"`, then the elevator switches direction if the
 * `x` value of the position of `dyn_object` is equal to `widget.pointA.x` or `widget.pointB.x`.
 * 
 * If `widget.bounding` is equal to `"y"`, then the elevator switches direction if the
 * `y` value of the position of `dyn_object` is equal to `widget.pointA.y` or `widget.pointB.y`.
 * 
 */

PhSim.Widgets.elevator = function(dyn_object,widget) {
            
    var self = this;
    
    var func = function() {
    
        var bounding = widget.bounding;

        var obj = dyn_object;
        var relVec = PhSim.Vector.subtract(widget.pointB,widget.pointA);
        
        var u = PhSim.Vector.unitVector(relVec);
        
        var ax;
        var ay;
        var bx;
        var by;
        
        // Corrections
        
        var reversable = true;
        
        // Condition function for checking if object is in bounds
        
        var cond_f = function() {}
        
        if(bounding === "x") {

            if(widget.pointA.x < widget.pointB.x) {
                ax = widget.pointA.x;
                bx = widget.pointB.x;
            }
            
            if(widget.pointB.x < widget.pointA.x) {
               ax = widget.pointB.x;
               bx = widget.pointA.x;
            }
        
            cond_f = function() {
                return (ax <= obj.matter.position.x) && (obj.matter.position.x <= bx);
            }
        
        }
        
        if(bounding === "y") {

            if(widget.pointA.y < widget.pointB.y) {
                ay = widget.pointA.y;
                by = widget.pointB.y;
            }
            
            if(widget.pointB.y < widget.pointA.y) {
               ay = widget.pointB.y;
               by = widget.pointA.y;
            }
        
            cond_f = function() {
                return (ay <= obj.matter.position.y) && (obj.matter.position.y <= by);
            }
        
        }
        
        // Set body static
        
        Matter.Body.setStatic(dyn_object.matter,true);
        
        // Event function

        var inRange = function() {

        if( cond_f() ) {
        PhSim.Motion.translate(obj,PhSim.Vector.scale(u,1));
                reversable = true;
        }
          
            else {
            
                if(reversable) {

                    u = {
                        "x": -u.x,
                        "y": -u.y
                    }

                    reversable = false;
                }

                else {
                    PhSim.Motion.translate(obj,PhSim.Vector.scale(u,1));
                }
            
            }
            

        }

        return inRange


    }

    this.on("afterupdate",func());

}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * 
 * The `keyboardControls` widget is a widget that makes an object go at a certain velocity
 * if the arrow keys are pressed.
 * 
 * @function
 * @param {PhSim.DynObject} dynObj 
 * @param {Object} keyboardControls - Keyboard Controls options
 * 
 * @param {Number} keyboardControls.right - Velocity in the right direction if the right key is pressed.
 * @param {NUmber} keyboardControls.up - Velocity in the up direction if the up key is pressed.
 * @param {Number} keyboardControls.left - Velocity in the left direction if the left key is pressed.
 * @param {Number} keyboardControls.down - Velocity in the down direction if the down key is pressed.
 */

PhSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			Matter.Body.setVelocity(dynObj.matter, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			Matter.Body.setVelocity(dynObj.matter, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.on("keydown",f,{
		"slEvent": true
	}); 
4
}

PhSim.Widgets.keyboardControls = function(dyn_object,widget) {
    this.addKeyboardControls(dyn_object,widget);
}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * 
 * The `transformCameraByObj` widget transforms the camera by an object.
 * 
 * @function
 * @this PhSim
 * @param {PhSim.DynObject} dyn_object - Object that will transform object.
 */


PhSim.Widgets.transformCameraByObj = function(dyn_object) {
    
    var self = this;

    this.on("afterupdate",function(){
        var dx = dyn_object.matter.position.x - dyn_object.matter.positionPrev.x;
        var dy = dyn_object.matter.position.y - dyn_object.matter.positionPrev.y;
        self.camera.translate(-dx,-dy);
    },{
        "slEvent": true
    });

}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * 
 * The `setColor` widget changes the color of an object.
 * It utlizies the {@link PhSim.DynObject.setColor} function.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Dynamic Object that will have it's color changed.
 * @param {WFunctionOptions} widget - Widget Options
 * @param {String} widget.color - The new color of the object.
 */

PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {
        
        var color = widget.color;
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(dyn_object,closure(),widget);
}

/**
 * 
 * The `setBorderColor` widget sets the border color of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Widget properties.
 * @param {String} widget.color - The new color of the object border
 */
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setBorderColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(dyn_object,closure(),widget);
}

/**
 * 
 * The `setLineWidth` widget sets the line width of an object.
 * 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The object to be affected.
 * @param {WFunctionOptions} widget - Widget options
 * @param {Number} widget.width - New line width
 * 
 */
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var self = this;

    var f = function(){
        PhSim.DynObject.setLineWidth(dyn_object,widget.width);
    }

    var f = this.createWFunction(dyn_object,f,widget);
}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/**
 * 
 * The deleteSelf widget makes an object delete itself from the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The Dynamic Object to be configured.
 * @param {WFunctionOptions} widget - Configuration options
 */

PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var self = this;
    
    var ref;

    var f = function(){
        self.removeDynObj(dyn_object);
        self.disableWFunction(ref);
    }

    ref = this.createWFunction(dyn_object,f,widget);

}

/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * 
 * @param {DynSimObject} o 
 * 
 * @param {Object} w -  Widget Options
 * 
 * @param {Number} w.rows -  Widget Rows
 * @param {Number} w.rowDist - Distance between two adjacent objects in a row 
 * 
 * @param {Number} w.columns - Columns
 * @param {Number} w.colDist - Distance between two adjecent objects in the column
 * 
 * @this {PhSim}
 *  
 */

PhSim.Widgets.stack = function(o,w) {

    var a = [];

    for(var i = 1; i <= w.rows; i++) {

        var new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: w.rowDist * i,
            y: 0
        });

        a.push(new_o);

    }


    for(var i = 1; i <= w.columns; i++) {

        var new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: 0,
            y: w.colDist * i
        });

        a.push(new_o);

    }
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

/**
 * 
 * Calculate DynObject skinmesh
 * 
 * @function
 * @memberof PhSim
 * @param {PhSim.DynObject} dynObject 
 */

var calc_skinmesh = function(dynObject) {

	/** Vector defining transformation */
	
	dynObject.transformVector = {
		x: (dynObject.matter.position.x - dynObject.matter.positionPrev.x),
		y: (dynObject.matter.position.y - dynObject.matter.positionPrev.y),
	}

	/** Number defining rotation */

	var transformAngle = dynObject.matter.angle - dynObject.matter.anglePrev 

	Matter.Vertices.translate(dynObject.skinmesh,Matter.Vertices.centre(dynObject.skinmesh),-1);
	Matter.Vertices.rotate(dynObject.skinmesh,transformAngle,{x: 0, y: 0});
	Matter.Vertices.translate(dynObject.skinmesh,dynObject.matter.position,1);

	dynObject.verts = dynObject.skinmesh;
	dynObject.verts = dynObject.skinmesh;

}

module.exports = calc_skinmesh;

/***/ }),
/* 48 */
/***/ (function(module, exports) {



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

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

	var str = str;

	var magicWordKeys = Object.keys(PhSim.MagicWords);

	for(var i = 0; i < magicWordKeys.length; i++) {

		var magicWord = magicWordKeys[i];
		var mgkWordRegex = new RegExp("{" + magicWord + "}","g");

		if(str.search(mgkWordRegex) !== -1) {

			str = str.replace(mgkWordRegex,PhSim.MagicWords[magicWord].call(this));
		}

	}

	var a = Object.keys(this.vars);

	for(var i = 0; i < a.length; i++) {

		var v = "\\$\\{" + a[i] + "\\}";
		var regex = new RegExp(v,"g");
		var s = str.search(regex);

		if(s !== -1) {
			str = str.replace(regex,this.vars[ a[i] ]);
		}
	}

	return str;

}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

const PhSim = __webpack_require__(0);

/**
 * @namespace
 * @memberof PhSim
 */

const ObjLoops = {}

/**
 * Execute function on all members of a PhSim simulation or PhSim options.
 * @function
 * @param {PhSim|PhSimOptions} sim 
 * @param {Function} method 
 */

ObjLoops.global = function(sim,method) {

    if(sim instanceof PhSim) {
        for(var i = 0; i < sim.objUniverse.length; i++) {
            method(sim.objUniverse[i]);
        }
    }

    else {

        for(var i = 0; i < sim.simulations.length; i++) {
            for(var j = 0; j < sim.simulations[i].layers.length; j++) {
                for(var k = 0; k < sim.simulations[i].layers[j].objUniverse.length; k++) {
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
    for(var j = 0; j < simulation.layers.length; j++) {
        for(k = 0; k < simulation.layers[j].objUniverse.length; k++) {
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
    for(k = 0; k < layer.objUniverse.length; k++) {
        method(layer.objUniverse[k]);
    }
}

module.exports = ObjLoops;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// Generated by TypeDefGen module 
// Built on Wed Oct 28 2020 13:14:50 GMT-0500 (Central Daylight Time)
PhSim.boolKey = ["Velocity","Force","Position","Translate","DeleteSelf","Draggable","Coin","Hazard","Health","Elevator","TransformCameraByObject","TransformWithCamera","KeyboardControls","Alert","Connection","SetAngle","Rotation","NoRotation","RectText","NumVar","SetNumVar","SetColor","SetBorderColor","SetLineWidth","PlayAudio","ObjLink_a","Game","DeleteSelf","ToggleLock","CircularConstraint","DeleteSelf","ToggleSemiLock","WFunction"];
PhSim.boolKey_lc = ["velocity","force","position","translate","deleteSelf","draggable","coin","hazard","health","elevator","transformCameraByObject","transformWithCamera","keyboardControls","alert","connection","setAngle","rotation","noRotation","rectText","numVar","setNumVar","setColor","setBorderColor","setLineWidth","playAudio","objLink_a","game","deleteSelf","toggleLock","circularConstraint","deleteSelf","toggleSemiLock","wFunction"];

 
 

/**
* @typedef {WFunctionOptions|DeleteSelf}
* @property {Boolean} deleteSelf - Boolean for enabling the force widget
*/
 
/**
* @typedef {Object|Elevator}
* @property {Vector} pointA - First point
* @property {Vector} pointB - Second point
*/

 
/**
* @typedef {Object|TransformWithCamera}
* @property {Boolean} transformWithCamera - Boolean for determining the object moves with the camera
*/
 
/**
* @typedef {Object|KeyboardControls}
* @property {Number} up - Up velocity
* @property {Number} down - Down velocity
* @property {Number} left - Left velocity
* @property {Number} right - Right velocity
* @property {Boolean} keyboardControls - Boolean for enabling keyboard controls widget
*/
 
/**
* @typedef {Object|Alert}
* @property {String} buttonTxt - Button Text
* @property {String} name - Alert Name
* @property {String} text - Text Message
* @property {Boolean} alert - Boolean for enabling alert
*/
 
/**
* @typedef {Object|Connection}
* @property {LOAddress} objectA - First Object
* @property {LOAddress} objectB - Second Object
* @property {Boolean} connection - Right velocity
*/
 
/**
* @typedef {WFunctionOptions|SetAngle}
* @property {Number} cycle - Angle
* @property {Boolean} circularConstraintRotation - Down velocity
* @property {Boolean} rotation - Right velocity
*/
 
/**
* @typedef {WFunctionOptions|Rotation}
* @property {Number} cycle - Angle
* @property {Boolean} circularConstraintRotation - Down velocity
* @property {Boolean} rotation - Right velocity
*/
 
/**
* @typedef {Object|NoRotation}
* @property {Boolean} deleteSelf - Boolean for enabling the no rotation widget
*/
 
/**
* @typedef {Object|RectText}
* @property {String} content - Rectangular Text Content
* @property {String} font - Rectangular Text Font
* @property {Number} margin - Text Margin
* @property {Number} size - Text Margin
* @property {Number} bordersize - Text Margin
* @property {String} fill - Text Fill
* @property {Boolean} rectText - Content
* @property {String} lineWidth - Text Line Width
*/
 
/**
* @typedef {Object|NumVar}
* @property {String} name - undefined
* @property {Number} value - undefined
* @property {Boolean} numVar - undefined
*/
 

/**
* @typedef {wFunctionObjects|SetColor}
* @property {String} color - undefined
* @property {Boolean} setColor - undefined
*/
 
/**
* @typedef {wFunctionObjects|SetBorderColor}
* @property {String} color - undefined
* @property {Boolean} setBorderColor - undefined
*/
 
/**
* @typedef {wFunctionObjects|SetLineWidth}
* @property {Number} lineWidth - undefined
* @property {Boolean} setLineWidth - undefined
*/
 
/**
* @typedef {wFunctionObjects|PlayAudio}
* @property {String} src - undefined
* @property {Boolean} playAudio - undefined
*/
 
/**
* @typedef {wFunctionObjects|ObjLink_a}
* @property {LOAddress} target - undefined
* @property {Boolean} objLink_a - undefined
*/
 
/**
* @typedef {Object|Game}
* @property {Number} life - undefined
* @property {Number} goal - undefined
* @property {Number} score - undefined
* @property {Boolean} game - undefined
*/
 
/**
* @typedef {Object|CircularConstraint}
* @property {Boolean} circularConstraint - Boolean for enabling the circular constraint widget
* @property {Number} x - Boolean for enabling the circular constraint widget
* @property {Number} y - Boolean for enabling the circular constraint widget
*/
 
 
/**
* @typedef {WFunctionOptions|WFunction}
* @property {Function|String} function - WFunction widget
* @property {Boolean} wFunction - Boolean for enabling wFunction widget.
*/
 
/** 
 * @typedef {Velocity|Force|Position|Translate|DeleteSelf|Draggable|Coin|Hazard|Health|Elevator|TransformCameraByObject|TransformWithCamera|KeyboardControls|Alert|Connection|SetAngle|Rotation|NoRotation|RectText|NumVar|SetNumVar|SetColor|SetBorderColor|SetLineWidth|PlayAudio|ObjLink_a|Game|DeleteSelf|ToggleLock|CircularConstraint|DeleteSelf|ToggleSemiLock|WFunction} Widget 
*/


/***/ })
/******/ ]);