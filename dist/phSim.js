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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(37);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***

Physics Simulator Class Library

Copyright 2020 Mjduniverse.com

@author Mjduniverse.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

***/

/**
 * 
 * @typedef {PhSim.Static.CompositeSimulation|PhSim.Static.Simulation|StaticObject[]} DynSimOptions
 * 
 * The options that can be used to create a dynamic simulation could be a 
 * CompositeSimulation object, a simulation object or an array 
 * of static objects.
 * 
 * If an array is chosen, then it is used to create
 * 
 */

/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} sim - The simulation object
 * 
 */

var PhSim = function(dynSimOptions) {

	/**
	 * The static simulation object
	 */

	if(Array.isArray(dynSimOptions.simulations)) {
		this.options = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions.layers)) {
		this.options = new PhSim.Static.CompositeSimulation();
		this.options.simulations[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions)) {
		this.options = new PhSim.Static.CompositeSimulation();
		this.options.simulations[0].layers[0] = dynSimOptions;
	}

	this.registerKeyEvents();

}

PhSim.prototype.connectCanvas = function(canvas) {
	this.simCanvas = canvas;
	this.simCtx = canvas.getContext("2d");
	this.simCanvas.width = this.options.box.width;
	this.simCanvas.height = this.options.box.height;
	this.registerCanvasEvents();
	this.configRender(this.simCtx);
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
 * Index of the current simulation
 * @type {Number}
 */

PhSim.prototype.simulationIndex = null;

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
 * Boolean property to tell if the simulation is paused or not.
 * @type {Boolean}
 */

PhSim.prototype.paused = true;

/**
  * 
  * @callback PhSimEventCall
  * @param {PhSim.PhEvent} phEvent
  * 
  */

 PhSim.nextId = "0";


/**
 * The matter.js world for the __main collision filter
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Object}
 */

PhSim.prototype.matterJSWorld = null;

/**
 * The matter.js engine for the __main collision filter
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
 * Array of collision classes
 * @type {PhSim.CollisionClass}
 */

PhSim.prototype.collisionClasses = {};

/**
 * PhSim version
 * 
 */

PhSim.version = "0.1.0-alpha"

if(typeof window === "object") {
	window.PhSim = PhSim;
}

__webpack_require__(2 );
__webpack_require__(3 );
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);

// Bounding box functions

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);

__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);


/**
 * Global event stack
 * @type {PhSim.EventStack}
 */

PhSim.prototype.eventStack = new PhSim.EventStack();


/**
 * Event stack for simulation specfic events
 * @type {PhSim.EventStack}
 */

PhSim.prototype.slEventStack = new PhSim.EventStack();

 

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



PhSim.prototype.forAllObjects = function(call) {
	
	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}


PhSim.prototype.addToOverlayer = function(dynObject) {
	
	if(!dynObject.permStatic) {
		Matter.World.add(this.matterJSWorld, dynObject.matter);
	}

	this.objUniverse.push(dynObject);

}

/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * Objects module
 * @namespace
 */

PhSim.Static = {}

/*** 
 * Constructor for the minimal requirements for being a {@link Vector}. 
 * @constructor
 * @param {Number} x 
 * @param {Number} y
 * 
 */

PhSim.Vector = function(x,y) {
	
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
 * @typedef {PhSim.Vector|Circle|Rectangle|RegPolygon} Vector
 * 
 * In PhSim, a vector is any object with the properties "x" and "y" 
 * such that both are of the Number type.
 * 
 * In a {@link Circle}, the x and y coordinates refer to the center of the circle and the
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

PhSim.Static.GradientLimits = function(x0,y0,x1,y1) {

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

PhSim.Static.GradientStop = function(pos,color) {
	
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


PhSim.Static.Gradient = function() {

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

PhSim.Static.lclGradient = function() {
	this.src = null;
	this.limits = new PhSim.Static.GradientLimits(x0,y0,x1,y1);
	this.type = "linear";
}

/**
 * Constuctor defining the minimal requirements for a {@link Path}.
 * @constructor
 * @param {PhSim.Vector[]} verts -  Vertcies
 */

PhSim.Static.Path = function(verts) {

	/**
	 * Array of vectors defining a path or a polygon
	 * @type {PhSim.Vector[]}
	 */

	this.verts;

	if(Array.isArray(verts)) {

		this.verts = verts;

		for(var i = 0; i < verts.length; i++) {
			var old = verts[i];
			verts[i] = new PhSim.Vector(verts[i].x,verts[i].y);
			Object.assign(verts[i],old);
		}
	}

	else {
		throw "Expecting array in argument 1"
	}

	/**
	 * Boolean indicating it is a path
	 * @type {Boolean}
	 */

	this.path = true;
}

/**
 * 
 * A path is defined by vertices. They can be used as a regular polygon.
 * Any object that contains an array of vectors and has the boolean property "path" set to true is reconized as a path.
 * Paths can be used to define any polygon in general.
 * 
 * In PhSim, a path is any object obj such that the following is true:
 * 
 * Array.isArray(obj) === true
 * obj.path === true
 * 
 * If a path is used as a polygon, it must have at least three vectors in the verts property. 
 * 
 * @typedef {PhSim.Static.Path} Path
 * 
 */
 

/**
 * Constructor for the minimal requirements for a {@link Circle}.
 * @constructor
 */

PhSim.Static.Circle = function() {

	/**
	 * Boolean indicating a circle
	 * @type {Boolean}
	 */

	this.circle = true,

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
 * In PhSim, a circle is any object obj such that the following are all true:
 * obj.circle === true;
 * typeof obj.x === number;
 * typeof obj.y === number;
 * typeof obj.radius === number;
 * typeof obj.cycle === number || obj.cycle;
 * 
 * @typedef {PhSim.Static.Circle} Circle
 */

/**
 * A regular polygon is a polygon that has all of its sides equal in length.
 * 
 * In PhSim, a regular polgon is any object obj such that the following are true:
 * 
 * this.regPolygon === true
 * 
 * 
 * @constructor
 * @param {Number} x - x-coordinate of the center
 * @param {Number} y - y-coordinate of the center
 * @param {Number} r - radius of the regular polygon
 * @param {Number} n - sides of the regular polygon
 */

PhSim.Static.RegPolygon = function(x,y,r,n) {

	/**
	 * Boolean for indicating a regular polygon
	 * @type {Boolean}
	 */

	this.regPolygon =  true;

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

PhSim.Static.Rectangle = function(x,y,w,h) {

	/**
	 * Boolean for indicating a rectangle
	 * @type {Boolean}
	 */

	this.rectangle = true;

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
 * @typedef {PhSim.Static.Rectangle | PhSim.Static.Circle | PhSim.Static.RegPolygon | PhSim.Static.Path} StaticObject
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

PhSim.Static.Composite = function() {
	this.composite = true;
	this.name = "Untitled";
}

/***
 * Simulation Box Object 
 * 
 * @constructor
 * @param {Number} w
 * @param {Number} h
 * 
 */

PhSim.Static.SimBox = function(w,h) {
	
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

PhSim.Static.Camera = function(x,y,scale) {

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

PhSim.Static.Layer = function() {

	/**
	 * The array of objects
	 * @type {StaticObject[]}
	 */

	this.objUniverse = [];

	this.objUniverse[0]

	/**
	 * The name of the layer
	 * @type {String}
	 */

	this.name = null;
}

/** 
 * simulation Object 
 * @constructor
 */

PhSim.Static.Simulation = function() {

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
 * Simulation Object
 * @constructor
 * 
 */

PhSim.Static.CompositeSimulation = function() {

	/**
	 * PhSim version
	 * @type {Number}
	 */

	this.version = 1;

	/** 
	 * PhSim Static simulation Array 
	 * @type {PhSim.Static.Simulation[]}
	 */

	this.simulations = [];
	
	this.simulations.push(new PhSim.Static.Simulation());
	this.simulations[0].layers[0].name = "Untitled Layer"
	this.simulations[0].name = "Untitled simulation";

	/** PhSim Box Settings */

	this.box = new PhSim.Static.SimBox(800,600);

	/** PhSim Camera */

	this.camera = new PhSim.Static.Camera(0,0,1);

}

PhSim.Static.LO = function(L,O) {

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

PhSim.Static.SLO = function(S,L,O) {

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
 * @external {MatterBody}
 * @see {@link https://brm.io/matter-js/docs/classes/Body.html|MatterBody} 
 */


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * 
 * The event stack is an object that is used to store event listeners.
 * @constructor
 * 
 */

PhSim.EventStack = function() {

	/** 
	 * 
	 * Array of functions to be executed whenever two or more objects contact each other 
	 * @type {PhSimEventCall[]}
	 * 
	*/

	this.contact = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation updates 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeupdate = [];

	/** 
	 * 
	 * Array of functions to be exected when PhSim.updateDynObject is called 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.objupdate = [];


	/** 
	 * 
	 * Array of functions to be executed after the simulation updates 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterupdate = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation is changed 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeslchange = [];

	/** 
	 * 
	 * Array of functions to be executed after the simulation is changed 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterslchange = [];

	/** 
	 * 
	 * Array of functions to be executed before the Sprite Image Array loads 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforespriteimgload = [];

	/** Array of functions to be executed after the Sprite Image Array loads */

	this.afterspriteimgload = [];
	this.beforeforcekey = [];

	/** Array of functions to be executed when mouse is let go while over simulation canvas */

	this.mouseup = [];

	/** Array of functions to be executed when mouse leaves simulation canvas */

	this.mouseout = [];

	/** Array of functions to be executed when the mouse moves */

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
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/** 
 * 
 * PhRender constructor
 * 
 * @constructor
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * 
 */

PhSim.PhRender = function(ctx) {

	/**
	 * PhRender Context
	 */

	this.ctx = ctx;
}

/**
 * Default Alpha
 * @type {Number}
 */

PhSim.PhRender.prototype.defaultAlpha = 1;

/**
 * Default stroke style
 * @type {String}
 */

PhSim.PhRender.prototype.defaultStrokeStyle = "transparent";

/**
 * Default fill style
 * @type {String}
 */

PhSim.PhRender.prototype.defaultFillStyle = "transparent";

/**
 * Setting context
 * 
 * @function
 * @param {Object} object 
 */

PhSim.PhRender.prototype.setCtx = function(object) {
	
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

/**
 * 
 * Render a {@link Path} as a polygon.
 * 
 * @function
 * @param {Path}} path 
 */

PhSim.PhRender.prototype.static_path = function (path) {

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

		var img = this.spriteImgArray[path.sprite.src];

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

			var box = PhSim.getStaticBoundingBox(path);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,box.w,h,0);

			this.ctx.restore();	

		}

		else {
			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,img.width,img.height,0);
		}

	}

	
}

/**
 * @function
 * @param {String} url - URL of object loaded in PhSim.PhRender.prototype.spriteImgArray
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} a - angle
 */

PhSim.PhRender.prototype.renderSpriteByCenter = function(url,x,y,w,h,a) {

	var spriteImg = this.spriteImgArray[url];

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

PhSim.PhRender.prototype.renderConstraint = function (constraint) {

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

PhSim.PhRender.prototype.static_circle = function (circle) {
	
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

		var img = this.spriteImgArray[circle.sprite.src];

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
			var box = PhSim.getStaticBoundingBox(circle);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(circle.sprite.src,0,0,box.w,h);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(circle.sprite.src,circle.x,circle.y,circle.cycle);
		}

	}

}


/**
 * 
 * Render rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle - Rectangle object
 * @param rectangle.sprite - Sprite Object
 */

PhSim.PhRender.prototype.static_rectangle = function(rectangle) {

	var c = PhSim.getRectangleCentroid(rectangle);

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
			if(rectangle.widgets[i].rectText) {
				this.rectText(rectangle.widgets[i],x,y,rectangle.w,rectangle.h,0);
			}
		}
	}

	this.ctx.rotate(-rectangle.cycle);
	this.ctx.translate(-c.x,-c.y);


	if(rectangle.sprite) {

		var img = this.spriteImgArray[rectangle.sprite.src];

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

}

// Draw text

/**
 * @function
 * @param {*} text 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} a 
 */

PhSim.PhRender.prototype.rectText = function(text,x,y,w,h,a) {
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

PhSim.PhRender.prototype.static_regPolygon = function(regPolygon) {

	var vertSet = PhSim.getRegPolygonVerts(regPolygon);
	
	this.setCtx(regPolygon);

	this.ctx.beginPath();

	this.ctx.moveTo(vertSet[0].x, vertSet[0].y);

	for(var j = 0; j < vertSet.length; j++) {
	  this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();

	this.ctx.fill();

	if(regPolygon.sprite) {

		var img = this.spriteImgArray[regPolygon.sprite.src];

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

			var box = PhSim.getStaticBoundingBox(regPolygon);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,box.w,h,0);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(regPolygon.sprite.src,regPolygon.x,regPolygon.y,img.width,img.height,regPolygon.cycle);
		}

	}


}

// Draw Static object

/**
 * @function
 * @param {*} obj 
 */

PhSim.PhRender.prototype.renderStatic = function(obj) {
				
	if ( obj.path === true )  {
		this.static_path(obj);
	}
	
	if( obj.circle === true) {
		this.static_circle(obj); 
	}

	if( obj.rectangle === true) {
		this.static_rectangle(obj);
	}

	if( obj.regPolygon === true ) {
		this.static_regPolygon(obj);
	}

	if( obj.composite === true) {
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

PhSim.PhRender.prototype.renderStaticLayer = function(layer) {

	for(var i = 0; i < layer.objUniverse.length; i++) {

			this.renderStatic(layer.objUniverse[i])
			
			/*** Drawing Path ***/

			/*
			
			if ( layer.objUniverse[i].path === true )  {
				this.static_path(layer.objUniverse[i]);
			}
			
			if( layer.objUniverse[i].circle === true) {
				this.static_circle(layer.objUniverse[i]); 
			}

			if( layer.objUniverse[i].rectangle === true) {
				this.static_rectangle(layer.objUniverse[i]);
			}

			if( layer.objUniverse[i].regPolygon === true ) {
				this.static_regPolygon(layer.objUniverse[i]);
			}

			*/


			//PhSim.PhRender.prototype.renderStaticObject(layer.objUniverse[i]);
			
	}	
}

/**
 * @function
 * @param {*} simulation 
 */

PhSim.PhRender.prototype.simulation = function(simulation) {

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

PhSim.PhRender.prototype.dynamicSkeleton = function(object) {

	if(object.static.path) {
		
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

PhSim.PhRender.prototype.dynamicSkeleton_center = function(object) {

	if(object.static.path) {
		
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

PhSim.PhRender.prototype.drawDynamicSkeleton = function (object) {

	this.dynamicSkeleton(object);
	this.ctx.closePath();
	this.ctx.stroke();

}

/**
 * @function
 * @param {*} dynObject 
 */

PhSim.PhRender.prototype.dynamicRenderDraw = function (dynObject) {

	this.ctx.lineWidth = dynObject.lineWidth;
	this.ctx.fillStyle = dynObject.fillStyle;
	this.ctx.strokeStyle = dynObject.strokeStyle;

	
	if(dynObject.path) {
		
		this.drawDynamicSkeleton(dynObject);
		
		this.ctx.fill();

		if(dynObject.sprite) {

			var img = this.spriteImgArray[dynObject.sprite.src];

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
	
				var box = PhSim.getStaticBoundingBox(dynObject);
	
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

	if(dynObject.circle) {
		this.static_circle(dynObject);	
	}
	
	if(dynObject.regPolygon) {
		this.static_regPolygon(dynObject);		
	}

	if(dynObject.rectangle) {
		this.static_rectangle(dynObject);		
	}

	if(dynObject.composite) {
		for(var i = 1; i < dynObject.parts.length; i++) {
			this.dynamicRenderDraw(dynObject.parts[i]);
		}
	}

}

/**
 * @function
 * @param {*} L 
 */

PhSim.PhRender.prototype.dynamicDrawLayer = function(L) {
	
	for(var i = 0; i < sim.simulations[simulationI].layers[L].length; i++) {
		this.dynamicRenderDraw(L,i);
	}

}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*** Sprites ***/

PhSim.Sprites = {
    Calc: {}
}

PhSim.Sprites.Sprite = function() {
	this.src = null;
	this.w = null;
	this.h = null;
	this.x = null;
	this.y = null;
	this.fit = null;
	this.repeat = null;
	this.object = null;
}

PhSim.Sprites.renderSprite = function(ctx,sprite) {
	var localElm = document.createElement("img");
	localElm.src = sprite.src;
	if(sprite.spec === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}

	if(sprite.auto === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}
}

PhSim.Sprites.renderGlobalSprites = function(ctx,simulation) {

	for(i = 0; i < simulation.sprites.length; i++) {
		PhSim.Sprites.renderSprite(ctx,simulation.sprites[i]);
	}

}


PhSim.Sprites.circularSpriteRenderCanvas = function(ctx,canvas,angle) {

	var localElm = document.createElement("canvas");
	var localCtx = localElm.getContext("2d");

	var localImg = document.createElement("img");
	localImg.src = canvas.src;

	localCtx.rotate(angle);

	localCtx.drawImage()


}

/**
 * 
 * @constructor
 * @param {PhSim.Sprites.Sprite[]} sprites 
 * @param {Function} onload 
 */

PhSim.Sprites.SpriteImgArray = function(sprites,onload = function() {}) {
	
	// Force load if sprites list is empty

	this.static = {};
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;
	this.length = 0;

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

/**
 * 
 * Add sprite to the Sprite Image Array.
 * 
 * @param {PhSim.Sprites.Sprite|PhSim.Sprite.Sprite[]} staticObj - This could be a sprite or an array of sprites
 * @param {Function} [onload] - a function that is executed when the image loads.
 */

PhSim.Sprites.SpriteImgArray.prototype.addSprite = function(staticObj,onload = function() {} ) {
	
	var self = this;
	
	if(Array.isArray(staticObj)) {
		for(var i = 0; i < staticObj.length; i++) {
			this.addSprite(staticObj[i]);
		}
	}

	else {

		if(staticObj.src) {

			var img = document.createElement("img");

			img.addEventListener("load",function() {
				onload();
			});
		
			img.src = staticObj.src;
		
			this.static[staticObj.src] = staticObj;
			this[staticObj.src] = img;
		
			this.length++;

		}

	}

}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

PhSim.Audio = {}

PhSim.Audio.AudioArray = function(p_audio,onload) {

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

		audio.addEventListener("canplaythrough",function() {
			self.loaded_n++;

			if(self.array.length === self.loaded_n) {
				self.loaded = true;
				self.onload();
			}

		})

		audio.src = p_audio[i].src;
		audio.loop = p_audio[i].loop

		this.array.push(audio);

	}

}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

PhSim.CollisionClass = function(name) {

	var this_a = this;

	this.name = name;

	this.world = Matter.World.create();

	this.engine = Matter.Engine.create({
		world: this_a.world
	});

}

PhSim.CollisionClass.prototype.addDynObject = function(dynObject) {
	return Matter.World.add(this.world,dynObject.matter);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * 
 * Perform vector addition
 * 
 * @function
 * @param {Vector} vector1 - The first vector
 * @param {Vector} vector2 - The second vector
 * @returns {Vector} - The sum of the two vectors
 */

PhSim.addVectors = function(vector1,vector2) {
	return new PhSim.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
}

/**
 * 
 * Perform vector subtraction
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * @returns {Vector} - The difference between the two vectors
 */

PhSim.subtractVectors = function(vector1,vector2) {
	return new PhSim.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
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

PhSim.scaleVector = function(vector,scalar) {
	return new PhSim.Vector(vector.x * scalar,vector.y * scalar)
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

PhSim.divideVector = function(vector,scalar) {
	return new PhSim.Vector(vector.x * (1/scalar),vector.y * (1/scalar));
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

PhSim.calcVertDistance = function(vector1,vector2) {
	
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

PhSim.getVectorLength = function(vector) {
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

PhSim.getUnitVector = function(vector) {
	return PhSim.scaleVector(vector,1/PhSim.getVectorLength(vector));
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

PhSim.applyTransformation = function(a11,a12,a21,a22,x,y) {
	return new PhSim.Vector(a11 * x + a12 * y,a21 * x + a22 * y);
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

PhSim.rotatedVector = function(x,y,a) {
	return PhSim.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}

/**
 * Get SVG point
 * @param {Number} x 
 * @param {Number} y
 * @returns {String} - SVG Vector String 
 */

PhSim.svgVector = function(x,y) {
	return x + "," + y;
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Possible Object Structure
 */

PhSim.objectTypes = {
	path: true,
	circle: true,
	regularPolygon: true,
	rectangle: true
}

/*** Structure defining possible object types ***/

/**
 * Check object type
 * 
 * @function
 * @param {String} objectTypeStr
 * @returns {Boolean} 
 * 
 */

PhSim.checkObjectType = function (objectTypeStr) {
	if(objectTypes[objectTypeStr])
		return false;
	else {
		return true;
	}
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2);
 * 
 * @function
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2 
 * @returns {PhSim.Static.Rectangle} - Rectangle Object
 * 
 */

PhSim.diagRect = function(x1,y1,x2,y2) {

	var w = x2 - x1;
	var h = y2 - y1;

    return new PhSim.Static.Rectangle(x1,y1,w,h);
    
 }


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function
 * @param {PhSim.Static.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Vector[]}
 * 
 */

PhSim.getRegPolygonVerts = function(regularPolygon) {

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

PhSim.getRectangleVertArray = function(rectangle) {

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

	Matter.Vertices.rotate(a, rectangle.cycle, PhSim.getRectangleCentroid(rectangle));


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


PhSim.getRectangleCorners = function(rectangle) {


	var a = PhSim.getRectangleVertArray(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * 
 * Get centroid of a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Vector}
 *  
 */

PhSim.getRectangleCentroid = function(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}


/** 
 * Find Centroid of a path polygon
 * @function
 * @param {Path} a - Path
 * @returns {Vector}
 */

PhSim.findCentroidOfPath = function(a) {
		
	var v = new PhSim.Vector(0,0);
	
	for(var j = 0; j < a.verts.length; j++) { 
		v.x += a.verts[j].x;
		v.y += a.verts[j].y;
	}
	
	v.x = (1/a.verts.length) * v.x;
	v.y = (1/a.verts.length) * v.y;
	
	return v;

}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * 
 * Get bounding box from an array of vertices.
 * 
 * 
 * @function
 * @param {Array} verts 
 */

PhSim.getVertBoundingBox = function(verts) {

	var verts = JSON.parse(JSON.stringify(verts));

	var o = {
		"smallX": null,
		"largeX": null,
		"smallY": null,
		"largeY": null,
		"w": null,
		"h": null,
		"x": null,
		"y": null,
		"upperLeftCorner": null,
		"upperRightCorner": null,
		"lowerLeftCorner": null,
		"lowerRightCorner": null,
		"rectangle": true,
	};

	verts.sort(function(a,b){
		return a.x - b.x;
	});

	o.smallX = verts[0].x;
	o.largeX = verts[verts.length - 1].x;

	verts.sort(function(a,b){
		return a.y - b.y;
	});

	o.smallY = verts[0].y;
	o.largeY = verts[verts.length - 1].y;

	o.w = o.largeX - o.smallX;
	o.h = o.largeY - o.smallY;
	o.x = o.smallX;
	o.y = o.smallY;

	return o;
}

/**
 * 
 * @param {Object} object - The Static Object
 * @returns {Object} 
 */

PhSim.getStaticBoundingBox = function(object) {
	
	if(object.path) {
		return PhSim.getVertBoundingBox(object.verts);
	}

	if(object.regPolygon) {
		return PhSim.getVertBoundingBox(PhSim.getRegPolygonVerts(object));
	}

	if(object.rectangle) {
		return PhSim.getVertBoundingBox(PhSim.getRectangleVertArray(object,true));
	}

	if(object.circle) {

		var ax = object.x - object.radius;
		var ay = object.y - object.radius;
		var bx = object.x + object.radius;
		var by = object.y + object.radius;

		return PhSim.diagRect(ax,ay,bx,by,0);
	}

	if(object.composite) {
		
		var a = [];

		for(var i = 0; i < object.objUniverse.length; i++) {
			a.push( PhSim.getRectangleVertArray( this.getStaticBoundingBox(object.objUniverse[i]) ) );
		}

		a = a.flat(Infinity);

		return PhSim.getVertBoundingBox(a);

	}
}

/**
 * 
 * Get bounding box of a static object
 * 
 * @function
 * @param {PhSim.DynObject} dynObj 
 */

PhSim.getDynBoundingBox = function(dynObj) {
	return {
		"x": dynObj.matter.bounds.min.x,
		"y": dynObj.matter.bounds.min.y,
		"w": dynObj.matter.bounds.max.x - dynObj.bounds.min.x,
		"h": dynObj.matter.bounds.max.y - dynObj.bounds.min.y,
	}
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * 
 * @function
 * @param {PhSimObject} composite - The composite to be flattened.
 * @returns {PhSimObject[]} - The array of objects found in the composites. 
 */

PhSim.flattenComposite = function(composite) {

	var a = [];

	/**
	 * 
	 * @param {*} composite
	 * @inner
	 */
	
	var __f = function(composite) {

		for(var i = 0; i < composite.parts.length; i++) {

			if(composite.parts[i].composite) {
				PhSim.flattenComposite(composite.parts[i].composite);
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
 * Create Dynamic Object from static object
 * @constructor
 * @param {PhSimObject} staticObject - Static Object
 * @augments StaticObject
 * 
 */

PhSim.DynObject = function(staticObject) {

	Object.assign(this,staticObject);

	this.matter = PhSim.createMatterObject(staticObject);

	if(staticObject.path === true) {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	this.firstCycle = staticObject.cycle;

	if(staticObject.composite === true) {
		this.flattenedParts = PhSim.flattenComposite();
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

	this.id = PhSim.nextId;

	PhSim.nextId = (Number.parseInt(PhSim.nextId,36) + 1).toString(36);
	
	/** 
	 * Refernce of DynObj in matter object 
	 * @type {Object}
	 * */

	this.matter.plugin.ph = this;

}

/**
 * 
 * Create a matter.js object from a DynSim static object
 * 
 * @function
 * @param {StaticObject} staticObject
 * @returns {MatterBody} 
 */

PhSim.createMatterObject = function(staticObject) {

	var opts = staticObject;

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

	if(Number.isInteger(staticObject.collisionNum)) {
		opts.collisionFilter = staticObject.collisionNum;
	}


	if(staticObject.path === true) {
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(staticObject.circle === true) {
		return Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(staticObject.rectangle === true) {
		var set = PhSim.getRectangleVertArray(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(staticObject.regPolygon === true) {
		var set = PhSim.getRegPolygonVerts(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}


}

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

/***/ }),
/* 15 */
/***/ (function(module, exports) {

PhSim.removeClickRectRegion = function(reference) {
	this.removeEventListener("mousedown",reference);
}

/**
 * @constructor
 */

PhSim.PhEvent = function () {
	this.target = null;
	this.timestamp = null;
	this.type = null;
}

/**
 * @constructor
 */

PhSim.PhDynEvent = function() {
	PhSim.PhEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

PhSim.PhDynEvent.prototype = Object.create(PhSim.PhEvent.prototype);

/**
 * @constructor
 */


PhSim.PhKeyEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

PhSim.PhKeyEvent.prototype = Object.create(PhSim.PhDynEvent.prototype);

/**
 * @constructor
 */


PhSim.PhMouseEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

PhSim.PhMouseEvent.prototype = Object.create(PhSim.PhDynEvent.prototype);

/**
 * @constructor
 */


PhSim.phSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

/**
 * @constructor
 */

PhSim.CollisionReport = function() {
	this.before = null;
	this.current = null;
	this.difference = null;
	this.objectA = null;
	this.objectB = null;
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

PhSim.prototype.L = function(L) {
	return this.dynTree[L][O];
}

PhSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

PhSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {


/**
 * @function
 * @param {Object} sim 
 * @param {HTMLCanvasElement} canvas
 * @memberof PhSim 
 */

PhSim.createFromCanvas = function(sim,canvas) {
	var p = new PhSim(sim);
	p.connectCanvas(canvas);
	return p;
}

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLElement} simContainer 
 * @memberof PhSim 
 */

PhSim.createFromContainer = function(sim,simContainer) {
	
	// Canvas

	var canvas = document.createElement("canvas");

	// Simulation object

	var p = PhSim.createFromCanvas(sim,canvas);

	p.simContainer = simContainer;

	simContainer.appendChild(p.simCanvas);
	simContainer.classList.add("phsim-container");

	p.configFilter(simContainer);
	
	return p;
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

	x.addEventListener("load",function(){
		var o = PhSim.createContainer(JSON.parse(x.responseText));
		onload(o);
	})

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
/* 18 */
/***/ (function(module, exports) {

PhSim.prototype.configFilter = function(container) {
	this.htmlFilter = document.createElement("div");
	this.htmlFilter.style.background = "rgba(3,3,3,0.7)";
	this.htmlFilter.style.position = "absolute";
	this.htmlFilter.style.display = "none";
	this.htmlFilter.classList.add("dynsim-filter");
	container.appendChild(this.htmlFilter);
}

PhSim.prototype.enableFilter = function() {
	var elmBox = this.simCanvas.getBoundingClientRect();
	this.htmlFilter.style.display = "inline-block";
	this.htmlFilter.style.left = "0px";
	this.htmlFilter.style.position = "absolute";
	//this.htmlFilter.style.top = elmBox.top + "px";
	this.htmlFilter.style.width = Math.floor(elmBox.width) + "px";
	this.htmlFilter.style.height = Math.floor(elmBox.height) + "px";
}

PhSim.prototype.disableFilter = function() {
	this.htmlFilter.style.display = "none";
}

PhSim.prototype.toggleFilter = function() {

	if(this.htmlFilter.style.display === "none") {
		this.enableFilter();
	}

	else {
		this.disableFilter();
	}
}

/**
 * 
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
	closeButton.addEventListener("click",options.onok);
	closeButton.innerText = options.closeButtonTxt;
	alertBox.appendChild(closeButton);

	this.simContainer.appendChild(alertBox);

	alertBox.style.position = "absolute";
	alertBox.style.left = (elmBox.width * 0.5 - alertBox.offsetWidth * 0.5) + "px";
	alertBox.style.top = (elmBox.height * 0.5 - alertBox.offsetHeight * 0.5) + "px";

	return alertBox;

}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {string} mode - The possible modes are "force","velocity","translate"
 * @param {dyn_object} dyn_object - The dynamic object to put in motion.
 * @param {*} motion - The vector or scalar that defines the motion.
 * @returns {Function} - The method to 
 * 
 * 
*/

PhSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

	var self = this;
	
	if(mode === "force") {
		return function() {
			return self.applyForce(dyn_object,dyn_object.matter.position,motion);
		}
	}

	if(mode === "velocity") {
		return function() {
			return self.setVelocity(dyn_object,motion);
		}
	}

	if(mode === "translate") {
		return function() {
			return self.translate(dyn_object,motion);
		}
	}

	if(mode === "position") {
		return function() {
			return self.setPosition(dyn_object,motion)
		}
	}

	if(mode === "rotation") {
		return function() {
			return self.rotate(dyn_object,motion,dyn_object.matter.position);
		}
	}

	if(mode === "circular_constraint_rotation") {
		return function() {
			return self.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	if(mode === "setAngle") {
		return function() {
			return self.setAngle(dyn_object,motion);
		}
	}

	if(mode === "circular_constraint_setAngle") {
		return function() {
			var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
			self.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
			self.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	return console.error("Parameter 'mode' must either be equal to the one of the following strings: 'force','velocity' or 'position'.");

}

// Set Angle to mouse.

// Object Connection

PhSim.prototype.connectDynObjects = function(parent,child) {

	Matter.Body.setStatic(child,true);

	var self = this;
	
	var f = function() {

		var v = {
			"x": parent.matter.position.x - parent.matter.positionPrev.x,
			"y": parent.matter.position.y - parent.matter.positionPrev.y,
		}

		self.translate(child,v);

		self.rotate(child,parent.matter.angle - parent.matter.anglePrev,parent.matter.position);

	}

	this.addEventListener("afterupdate",f)

	return f;

}

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

	this.addEventListener("afterupdate",function(){
		var newAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x) - relAngle;
		this.setAngle(dynObject,newAngle);
	});


	dynObject.circularConstraintVector = {
		"x": x,
		"y": y
	}

}

/**
 * 
 * @param {*} dynObject 
 */

PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options - The options used for creating a spawned object
 * @param {Vector} options.vector -  The velocity to add to an object when it got spawned.
 * @param 
 */

PhSim.prototype.spawnObject = function(dynObject,options = {}) {
	var obj = new PhSim.DynObject(dynObject.static);
	obj.cloned = true;
	obj.loneParent = dynObject;

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.PhEvent;
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/*** 

Keyboard Controls

***/

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

	this.addEventListener("keydown",f,{
		"slEvent": true
	}); 

}

/**
 * Remove dynamic object
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 */

PhSim.prototype.removeDynObj = function(dynObject) {
	Matter.Composite.remove(this.matterJSWorld,dynObject.matter,true);
	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);
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

/**
 * Toggle Lock Status of Dynamic Object.
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleLock = function(dynObject) {
	dynObject
}

/**
 * Toggle Semi-Lock Status of Dynamic Object.
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleSemiLock = function(dynObject) {

}

/***/ }),
/* 20 */
/***/ (function(module, exports) {


/**
 * Play audio in 
 * @param {Number} i - Index in audio array. 
 */

PhSim.prototype.playAudioByIndex = function(i) {
	return this.audioArray.array[i].play();
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return this.audioArray.array[i].pause();
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return this.audioArray.array[i].pause();
}

/**
 * 
 * @param {*} i 
 * @param {*} v 
 */

PhSim.prototype.setAudioVolByIndex = function(i,v) {
	this.audioArray.array[i].volume = v;
	return this.audioArray.array[i].volume; 
}

/**
 * 
 * @param {*} i 
 */

PhSim.prototype.setAudioMuteByIndex = function(i) {
	this.audioArray.array[i].muted = v;
	return this.audioArray.array[i].muted;
}

/**
 * 
 * @param {*} i 
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
/* 21 */
/***/ (function(module, exports) {

/**
 * 
 * Used to set event listeners for a canvas.
 * This function works if {@link PhSim.prototype#simCtx} 
 * and {@link PhSim.prototype#simCanvas} are set.
 * 
 * @function
 *  
 */

PhSim.prototype.registerCanvasEvents = function() {

	var self = this;

	// onmousedown

	this.eventStack.mousedown = []

	this.mousedownBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "mousedown";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);

		if(!self.paused) {
			if(self.objMouseArr.length > 0) {
				self.callEventClass("objmousedown",canvas,eventObj);
			}
		}

		self.callEventClass("mousedown",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mousedown",function(e) {
		if(!self.filter) {
			self.mousedownBridge(e);
		}
	});

	// click

	this.eventStack.click = []
	this.eventStack.objclick = []

	this.clickBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "click";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);


		if(self.objMouseArr.length > 0) {
			self.callEventClass("objclick",canvas,eventObj);
		}

		self.callEventClass("click",canvas,eventObj);
	}

	this.simCanvas.addEventListener("click",function(e) {
		if(!self.filter) {
			self.clickBridge(e);
		}
	});

	//mousemove

	this.eventStack.mousemove = this.eventStack.mousemove || []
	this.eventStack.objmousemove = this.eventStack.objmousemove || []

	this.mousemoveBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;

		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;

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

			if(self.objMouseArr.length > 0) {
				self.callEventClass("objmousemove",canvas,eventObj);
			}

			if(self.newMouseObjs.length > 0) {
				eventObj.newMouseObjs = self.newMouseObjs;
				self.callEventClass("objmouseover",canvas,eventObj);
			}

			if(self.formerMouseObjs.length > 0) {
				eventObj.formerMouseObjs = self.formerMouseObjs;
				self.callEventClass("objmouseout",canvas,eventObj);
			}
		}

		//console.log(self.objMouseArr)

		self.callEventClass("mousemove",canvas,eventObj);

		//console.log(eventObj);
	}

	this.simCanvas.addEventListener("mousemove",function(e) {
		if(!self.filter) {
			self.mousemoveBridge(e);
		}
	});

	/*** Mouseup bridge ***/

	this.eventStack.objmouseup = [];

	this.mouseupBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;

		if(self.objMouseArr.length > 0) {
			self.callEventClass("objmouseup",canvas,eventObj);
		}

		self.callEventClass("mouseup",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseup",function(e) {
		if(!self.filter) {
			self.mouseupBridge(e);
		}
	});

	/*** Mouseout bridge ***/

	this.mouseoutBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseout",function(e) {
		if(!self.filter) {
			self.mouseoutBridge(e);
		}
	});

}

PhSim.prototype.registerKeyEvents = function() {

	this.windowObj = this.windowObj || window;

	var self = this;

	this.keyElm = document.createElement("div");

	this.keydownBridge = function(e) {
		var eventObj = new PhSim.PhKeyEvent();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",self,eventObj);
	}

	this.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	this.windowObj.addEventListener("keydown",this.keydownBridgeWrapper);
}

PhSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",this.keydownBridgeWrapper);
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * 
 * @typedef {""}
 * 
 */

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

PhSim.prototype.addEventListener = function(eventStr,call,options = {}) {
	
	

	if(options && options.slEvent === true) {
		if(this.slEventStack[eventStr]) {
			this.slEventStack[eventStr].push(call);
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
					this.removeEventListener(eventStr,call)
					this.removeEventListener(eventStr,f)
				}
	
				this.addEventListener(eventStr,f);

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


PhSim.prototype.removeEventListener = function(eventStr,call) {
	
	if(this.eventStack[eventStr] && this.eventStack[eventStr].includes(call)) {
		var callIndex = this.eventStack[eventStr].indexOf(call);
		this.eventStack[eventStr].splice(callIndex,1);
	}

	if(this.slEventStack[eventStr] && this.slEventStack[eventStr].includes(call)) {
		var callIndex = this.slEventStack[eventStr].indexOf(call);
		this.slEventStack[eventStr].splice(callIndex,1);
	}

}

/**
 * @function
 * @param {String} eventStr 
 * @param {Object} thisArg 
 * @param {Object} eventArg 
 */

PhSim.prototype.callEventClass = function(eventStr,thisArg,eventArg) {
	
	if(this.eventStack[eventStr]) {
		for(var i = 0; i < this.eventStack[eventStr].length; i++) {
			var func = this.eventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}

	if(this.slEventStack[eventStr]) {
		for(var i = 0; i < this.slEventStack[eventStr].length; i++) {

			var func = this.slEventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * 
 * Get the special points of a rectangle
 * 
 * @function
 * @param {Object} rectangle 
 */

PhSim.getSpecialRectanglePoints = function(rectangle) {
	
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

PhSim.prototype.getCollisionClasses = function(dynObject) {

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
 * @param {Widget} widget 
 */

PhSim.chkWidgetType = function(widget) {
	
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
	
	if(dynObject.permStatic || dynObject.permStatic) {
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
 * @returns {PhSim.DynObject}
 */

PhSim.prototype.getObjectByName = function(str) {

	var returnObj;
	var self = this;
	
	this.forAllObjects(function(dynObject) {
		if(self.getStatic(dynObject).name === str) {
			returnObj = dynObject;
			return false;
		}
	});

	return returnObj;

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
 * 
 * Check if a point (x,y) is in a dynamic object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {Boolean}
 */

PhSim.prototype.pointInObject = function(dynObject,x,y) {
	var c = document.createElement("canvas");
	
	var l = c.getContext("2d");
	var m = new PhSim.PhRender(l);
	m.dynamicSkeleton(dynObject);
	var t = l.isPointInPath(x,y);
	return t;
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

		if(a.bodyA.plugin.ph.id === dynObject.id || a.bodyB.plugin.ph.id === dynObject.id) {
			
			var o = new PhSim.phSimCollision();
			o.bodyA = a.bodyA.plugin.ph;
			o.bodyB = a.bodyB.plugin.ph;
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

PhSim.prototype.getSensorClasses = function(dynObject) {

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

PhSim.prototype.sameSensorClasses = function(dynObjectA,dynObjectB) {
	return intersectionExists(this.getSensorClasses(dynObjectA),this.getSensorClasses(dynObjectB));
}

function intersectionExists(array1,array2) {

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

		if(matterCol.bodyA.plugin.ph.id === dynObject.id && this.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.plugin.ph.id === dynObject.id && this.sameSensorClasses(dynObject,dynCol.bodyA)) {
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

PhSim.isPointInRawRectangle = function(cx,cy,cw,ch,px,py) {
	
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

	this.addEventListener("beforeupdate",function() {
		report.before = self.collided(dynObjectA,dynObjectB);
	});

	this.addEventListener("afterupdate",function() {
		report.current = self.collided(dynObjectA,dynObjectB);
		report.difference = report.current - report.before;
		if(report.difference) {
			var eventObj = new PhSim.PhDynEvent();
			eventObj.report = report;
			eventObj.difference = report.difference;
			self.callEventClass("collisionchange",self,eventObj);
		}

	})

	return report;
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// Newtonian Gravity

PhSim.prototype.applyGravitationalField = function() {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		for(var j = 0; j < a.length; j++) {
			if(i !== j && !a[i].matter.isStatic && !a[j].matter.isStatic) {
				var a1 = PhSim.scaleVector(PhSim.subtractVectors(a[j].matter.position,a[i].matter.position),6.67 * Math.pow(10,-11) * a[i].matter.mass * a[j].matter.mass * -1)
				var b1 = Math.pow(PhSim.calcVertDistance(a[j].matter.position,a[i].matter.position),3);
				var c = PhSim.divideVector(a1,b1);
				this.applyForce(a[j],a[i].matter.position,c);
			}
		}	
	}

}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

PhSim.prototype.play = function() {

	if(this.init === false) {
		this.initSim(0);
	}

	else {
		this.paused = false;
	}

}

PhSim.prototype.toggle = function() {
	
	if(this.paused === false) {
		this.paused = true;
		return true;
	}

	if(this.paused === true) {
		this.paused = false;
		return false;
	}; 

}

PhSim.prototype.pause = function() {
	this.paused = true;
}

PhSim.prototype.exitSl = function() {
	this.callEventClass("beforeslchange",this,new PhSim.PhEvent());
	this.paused = false;
	clearInterval(this.intervalLoop);
}

PhSim.prototype.exit = function() {
	this.callEventClass("exit",this,new PhSim.PhEvent());
	this.deregisterKeyEvents();
	this.exitSl();
}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Go to simulation in the composite simulation
 * 
 * In a PhSim object, there is a property known as PhSim.prototype.sim. 
 * This property is used to define a simulation.
 * 
 * When PhSim.prototype.gotoSimulationIndex is used, it resets 
 * @param {Number} i
 * @function
 *  
 */

PhSim.prototype.gotoSimulationIndex = function (i) {

	var self = this;

	this.firstSlUpdate = false;

	var event = new PhSim.PhEvent();

	event.type = "slchange";

	this.callEventClass("beforeslchange",this,event);

	if(!this.noCamera) {
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

	if(this.simCtx) {
	    this.drawLoadingScreen();
	}
	
	this.simulation = this.options.simulations[i];

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
	this.collisionClasses = {};
	this.slEventStack = new PhSim.EventStack();

	var ncc = new PhSim.CollisionClass("__main");
	ncc.engine = this.matterJSEngine;
	ncc.world = this.matterJSWorld;

	this.collisionClasses["__main"] = ncc;

	if(this.options.simulations) {
	
		for(var L = 0; L < this.simulation.layers.length; L++) {

			var layerComposite = Matter.Composite.create();
			var layerBranch = [];

			for(var O = 0; O < this.simulation.layers[L].objUniverse.length; O++) {
				
				if(this.simulation.layers[L].objUniverse[O].noDyn || this.simulation.layers[L].objUniverse[O].permStatic) {
					layerBranch.push(this.simulation.layers[L].objUniverse[O]);
					this.objUniverse.push(this.simulation.layers[L].objUniverse[O]);
					this.staticSprites.push(this.simulation.layers[L].objUniverse[O].sprite)				
				}

				else {
					var dynObject = new PhSim.DynObject(this.simulation.layers[L].objUniverse[O])
					
					// If the collision class object exists

					if(dynObject.static.collisionClass && dynObject.static.collisionClass.trim() !== "__main") {

						var a = this.getCollisionClasses(dynObject);

						for(var i = 0; i < a.length; i++) {
							
							if(this.collisionClasses[a[i]]) {
								this.collisionClasses[a[i]].addDynObject(dynObject)
							}

							else {
								var ncc = new PhSim.CollisionClass(a[i]);
								ncc.addDynObject(dynObject);
								this.collisionClasses[a[i]] = ncc;
							}
						}

					}

					else {
						Matter.World.add(layerComposite,dynObject.matter);
					}
					
					if(dynObject.static.widgets) {
						this.extractWidgets(dynObject);
					}

					layerBranch.push(dynObject);
					this.objUniverse.push(dynObject);
					dynObject.layerBranch = layerBranch;
					
					if(dynObject.static.sprite) {
						this.staticSprites.push(dynObject.static.sprite)
					}

				}
			}

			Matter.World.add(this.matterJSWorld,layerComposite);
			this.dynTree.push(layerBranch);

			var a = new PhSim.PhDynEvent();
			this_a.callEventClass("matterJSLoad",this_a,a);

		}

	}

	Matter.Events.on(this.matterJSEngine,"collisionStart",function(event) {
		
		var a = new PhSim.PhDynEvent();
		a.matterEvent = event;
		this_a.callEventClass("collisionstart",this_a,a);

	});

	if(this.simulation.game) {
		this.lclGame = this.extractLclGame(this.simulation.game);
	}

	for(var C = 0; C < this_a.simulation.widgets.length; C++) {
			
		var a = this_a.simulation.widgets[C];

		if(a.constraint) {

			var b = {}

			if(a.objectA) {
				b.bodyA = this_a.LO(a.objectA.L,a.objectA.O);;
			}

			if(a.objectB) {
				b.bodyB = this_a.LO(a.objectB.L,a.objectB.O);
			}

			if(a.pointA) {
				b.pointA = a.pointA;
			}

			if(a.pointB) {
				b.pointB = a.pointB;
			}

			var c = Matter.Constraint.create(b);

			Matter.World.add(this.matterJSWorld,c)

		}

		if(a.connection) {

			this_a.connectDynObjects(this_a.dynTree[a.objectA.L][a.objectA.O],this_a.dynTree[a.objectB.L][a.objectB.O]);

		}



	}

	var promise = new Promise(function(resolve,reject){

		if(self.phRender) {
			self.phRender.spriteImgArray = new PhSim.Sprites.SpriteImgArray(self.staticSprites,function() {
				resolve();
			});
		}

		else {
			resolve();
		}

	}).then(function() {
		return new Promise(function(resolve,reject){
			self.audioArray = new PhSim.Audio.AudioArray(self.staticAudio,function(){
				resolve();
			});
		})
	}).then(function(){
		this_a.intervalLoop = setInterval(this_a.loopFunction.bind(this_a),this_a.delta);
		this_a.init = true;
	});

}

PhSim.prototype.initSim = function(simulationI) {

	this.status = 1;
	var self = this;
	this.status = 2;

	this.status = 3;
	var e = new PhSim.PhEvent();
	self.gotoSimulationIndex(0);
	self.callEventClass("load",self,e);
	self.addEventListener("collisionstart",function() {
		//self.playAudioByIndex(self.simulation.collisionSound);
	});
	self.status = 4;

}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

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

PhSim.prototype.applyForce = function(dynObject,position,forceVector) {
	if(!dynObject.locked && !dynObject.permStatic) {
		return Matter.Body.applyForce(dynObject.matter,position,forceVector);
	}
}


/**
 * 
 * Apply velocity to a dynamic object.
 * Velocity is ineffective against locked, semi-locked objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} velocityVector 
 */

PhSim.prototype.setVelocity = function(dynObject,velocityVector) {
	if(!dynObject.locked) {
		return Matter.Body.setVelocity(dynObject.matter,velocityVector);
	}

	if(dynObject.noDyn) {

	}
}

/**
 * 
 * Apply a transformation to a dynamic object.
 * Transformation is ineffective against locked objects.
 * However, it moves semi-locked objects and permanetly static objects.
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Vector} translationVector 
 */

PhSim.prototype.translate = function(o,translationVector) {
	if(!o.locked) {

		if(o.path) {
			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = o.verts[i].x + translationVector.x;
				o.verts[i].y = o.verts[i].y + translationVector.y;
			}
		}

		if(o.circle || o.rectangle || o.regPolygon) {
				o.x = o.x + translationVector.x;
				o.y = o.y + translationVector.y;
		}

		if(!o.noDyn) {
			return Matter.Body.translate(o.matter,translationVector);
		}

	}
	
}

/**
 * Apply a transformation to a dynamic object.
 * Setting positions is ineffective against locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} positionVector 
 */

PhSim.prototype.setPosition = function(dynObject,positionVector) {
	if(!dynObject.locked) {

		if(o.circle || o.regPolygon) {
				o.x = positionVector.x;
				o.y = positionVector.y;
		}

		if(o.rectangle) {

		}

		Matter.Body.setPosition(dynObject.matter,positionVector);
	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 * @param {Vector} point 
 */

PhSim.prototype.rotate = function(dynObject,angle,point) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
		}

		return Matter.Body.rotate(dynObject.matter, angle, point)

	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 */

PhSim.prototype.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return Matter.Body.setAngle(dynObject.matter,angle);

	}
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

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

	if(dynObject.regPolygon || dynObject.circle) {
		Matter.Body.scale(dynObject.object, ratio, ratio);
	}

}

PhSim.prototype.setRectWidthAndHeight = function(dynObject,w,h) {

}

/**
 * 
 * @param {*} dyn_object - Dynamic Object
 * @param {*} colorStr - Color
 */

PhSim.prototype.setColor = function(dyn_object,colorStr) {
	dyn_object.fillStyle = colorStr;
}

/**
 * 
 * @param {*} dyn_object 
 * @param {*} colorStr 
 */

PhSim.prototype.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.strokeStyle = colorStr;
}

/**
 * 
 * @param {*} dyn_object 
 * @param {*} lineWidth 
 */

PhSim.prototype.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.lineWidth = lineWidth;
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

PhSim.prototype.updateDynObj = function(currentObj) {


	// Loop must start at index 1 because the first element in the array is a reference to the parent object itself.

	if(currentObj.noDyn || currentObj.permStatic) {
		this.phRender.renderStatic(currentObj);	
	}
	
	else {

		if(currentObj.circle || currentObj.regPolygon || currentObj.rectangle) {
			currentObj.cycle = currentObj.firstCycle + currentObj.matter.angle;
		}
	
		if(currentObj.rectangle) {
			
			var v = {
				"x": currentObj.matter.position.x - currentObj.matter.positionPrev.x,
				"y": currentObj.matter.position.y - currentObj.matter.positionPrev.y 
			}
	
			currentObj.x = currentObj.matter.position.x - currentObj.w * 0.5
			currentObj.y = currentObj.matter.position.y - currentObj.h * 0.5
	
		}
	
		if(currentObj.circle || currentObj.regPolygon) {
			currentObj.x = currentObj.matter.position.x;
			currentObj.y = currentObj.matter.position.y;
		}
	
		if(currentObj.path) {
			PhSim.calc_skinmesh(currentObj);
		}

		if(this.phRender) {	
			this.phRender.dynamicRenderDraw(currentObj);
		}

	}

	var event = new PhSim.PhEvent();
	event.type = "objupdate";
	event.target = currentObj;

	this.callEventClass("objupdate",this,event);

}

PhSim.prototype.loopFunction = function() {

	if(this.paused === false) {

		var beforeUpdateEvent = new PhSim.PhDynEvent()

		beforeUpdateEvent.simulation = this.simulation;

		this.prevDate = this.prevDate && this.updateDate;
	
		this.callEventClass("beforeupdate",this,beforeUpdateEvent);

		this.updateDate = new Date();

		if(this.prevDate) {
			this.updateTimeInterval = this.updateDate - this.prevDate;
		}

		for(var c in this.collisionClasses) {
			Matter.Engine.update(this.collisionClasses[c].engine,this.delta);
		}

		if(this.simCtx) {

			this.simCtx.fillStyle = this.simulation.world.bg;

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

		var afterUpdateEvent = new PhSim.PhDynEvent()

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
/***/ (function(module, exports) {

/** 
 * 
 * Extract Widgets from Dynamic Object.
 * To extract a widget in PhSim is to read all of the objects in the "widgets" array found in each
 * well-formed PhSim object and then translate it into JavaScript.
 * 
 * @param {Widget} widget - The Widget
 * @param {PhSim.DynObject} dyn_object The individual Dynamic Object
 * @returns undefined
 * 
*/

PhSim.prototype.extractWidget = function(widget,dyn_object) {
	
    var self = this;
    
        if(widget.changeSl) {
    
            var closure = function() {
    
                var i = widget.slIndex;
    
                var f = function() {
                    self.gotoSimulationIndex(i)
                }
    
                return f;
            }
    
            this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.numVar) {
            self.numVar[widget.name] === widget.value;
        }
        
        if(widget.keyboardControls) {
            this.addKeyboardControls(dyn_object,widget)
        }
    
        if(widget.circularConstraint) {
            this.createCircularConstraint(dyn_object,widget.x,widget.y);
        }
    
        if(widget.setNumVar) {
    
            var closure = function() {
    
                var c = widget.value;
                var a = widget.name;
    
                var f = function() {
                    self.numVar[a] === c;
                }
    
                return f;
            }
    
            this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
    
        }
    
        if(widget.force) {
            var f = this.createMotionFunction("force",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.velocity) {
            var f = this.createMotionFunction("velocity",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.translate) {
            var f = this.createMotionFunction("translate",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.position) {
            var f = this.createMotionFunction("position",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.rotation) {
    
            if(widget.circularConstraintRotation) {
                var f = this.createMotionFunction("circular_constraint_rotation",dyn_object,widget.cycle);
            }
    
            else {
                var f = this.createMotionFunction("rotation",dyn_object,widget.cycle);
            }
            
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.setAngle) {
            
            if(widget.circularConstraintRotation) {
                var f = this.createMotionFunction("circular_constraint_setAngle",dyn_object,widget.cycle);
            }
    
            else {
                var f = this.createMotionFunction("setAngle",dyn_object,widget.cycle);
            }
            
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });		
        }

        if(widget.setAngleByMouse) {
            this.addEventListener("mousemove")
        }
    
        if(widget.deleteSelf) {
    
            var ref = null;
    
            var closure = function() {
    
                var o = dyn_object;
    
                var f = function(){
                    self.removeDynObj(o);
                    self.removeSimpleEvent(ref);
                }
    
                return f;
            }
    
            var ref = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.toggleLock) {
            
        }
    
        if(widget.clone) {
    
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
                                    self.spawnObject(dyn_object);
                                    func.__n++;
                                }
                            }
    
                        }
    
                        func.__n = 0;
    
                    }
    
                    else {
    
                        func = function(e) {
                            if(!self.paused) {
                                self.spawnObject(dyn_object);
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
                            self.spawnObject(dyn_object,vc);
                        }
                    }
    
                    return cloneByKeyFunc;
    
                }
    
                this.addEventListener("keydown",getFunction());
    
            }
    
        }
    
        if(widget.draggable) {
    
    
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
                    self.removeEventListener("mousemove",__onmousemove);
                    self.removeEventListener("mouseup",__onmouseup);
                    self.removeEventListener("beforeupdate",__onbeforeupdate);
                }
    
                var __onbeforeupdate = function() {
                    Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
                    self.setPosition(dyn_object,mV);
                }
    
                var __onmousedown = function(e) {
                    if(self.pointInObject(dyn_object,e.x,e.y)) {
    
                        delta.x = e.x - dyn_object.matter.position.x;
                        delta.y = e.y - dyn_object.matter.position.y;
    
                        self.addEventListener("mousemove",__onmousemove);
                        self.addEventListener("mouseup",__onmouseup);
                        self.addEventListener("beforeupdate",__onbeforeupdate);
    
                        __onmousemove(e);
                    }
                }
                
                self.addEventListener("mouseout",__onmouseup);
    
                return __onmousedown;
    
            }
    
            this.addEventListener("mousedown",func());
        }
    
        if(widget.rectText) {
            dyn_object.rectTextWidget === true;
        }
    
        if(widget.coin) {
    
            var func = function() {
    
                var obj1 = dyn_object;
    
                var a = function() {
    
                    if(self.inSensorCollision(obj1) && self.lclGame) {
                        self.lclGame.setScore(self.lclGame.score + 1);
                        self.removeEventListener("collisionstart",a);	
                    }
    
                }
    
                return a;
    
            }
    
            self.addEventListener("collisionstart",func());
        
        }
        
        if(widget.hazard) {
    
            var func = function() {
    
                var obj1 = dyn_object;
    
                var a = function() {
    
                    if(self.inSensorCollision(obj1) && self.lclGame) {
                        self.lclGame.decrementLife(self.lclGame.score + 1);
                        self.removeEventListener("collisionstart",a);	
                    }
    
                }
    
                return a;
    
            }
    
            self.addEventListener("collisionstart",func());
    
        }
    
        if(widget.health) {
    
            var func = function() {
    
                var obj1 = dyn_object;
    
                var a = function() {
    
                    if(self.inSensorCollision(obj1) && self.lclGame) {
                        self.lclGame.incrementLife(self.lclGame.score + 1);
                        self.removeEventListener("collisionstart",a);	
                    }
    
                }
    
                return a;
    
            }
    
            self.addEventListener("collisionstart",func());
    
        }
    
        if(widget.noRotation) {
            Matter.Body.setInertia(dyn_object.matter, Infinity)
        }
    
        if(widget.elevator) {
            
    
            var func = function() {
            
                var type = widget.type;
    
                var obj = dyn_object;
                var relVec = PhSim.subtractVectors(widget.pointB,widget.pointA);
                
                var u = PhSim.getUnitVector(relVec);
                
                var ax;
                var ay;
                var bx;
                var by;
                
                // Corrections
                
                var reversable = true;
                
                // Condition function for checking if object is in bounds
                
                var cond_f = function() {}
                
                if(type === "x-bounded") {
    
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
                
                if(type === "y-bounded") {
    
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
                self.translate(obj,PhSim.scaleVector(u,1));
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
                            self.translate(obj,PhSim.scaleVector(u,1));
                        }
                    
                    }
                    
    
                }
    
                return inRange
    
    
            }
    
            this.addEventListener("afterupdate",func());
    
        }
    
        if(widget.setColor) {
    
    
            var closure = function() {
                
                var color = widget.color;
                var obj = dyn_object;
    
                var f = function() {
                    self.setColor(obj,color);
                }
    
                return f;
    
            }
    
            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.setBorderColor) {
    
            var closure = function() {
    
                var color = widget.color
                var obj = dyn_object;
    
                var f = function() {
                    self.setBorderColor(obj,color);
                }
    
                return f;
    
            }
    
            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.setLineWidth) {
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.setLineWidth(dyn_object,widget.color);
            },{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.endGame) {
            var f = this.createMotionFunction("position",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.playAudio) {
    
            var i = this.audioPlayers;
    
            this.staticAudio.push(widget);
    
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.playAudioByIndex(i);
            },{
                ...widget,
                triggerObj: dyn_object
            });
    
            this.audioPlayers++;
        }
    
        if(widget.transformCameraByObj) {
    
            var self = this;
    
            this.addEventListener("afterupdate",function(){
                var dx = dyn_object.matter.position.x - dyn_object.matter.positionPrev.x;
                var dy = dyn_object.matter.position.y - dyn_object.matter.positionPrev.y;
                self.camera.translate(-dx,-dy);
            },{
                "slEvent": true
            });
    
        }
    
        if(widget.transformWithCamera) {
            this.camera.transformingObjects.push(dyn_object)
        }
    
        if(widget.cameraWindow) {
            self.camera.translate(dyn_object.x,dyn_object.y);
            self.camera.scale()
        }
    
        if(widget.objLink_a) {
    
            var widgetO = widget;
    
            this.addEventListener("matterJSLoad",function(){
                var eventFuncClosure = function() {
    
                    var targetObj = self.LO(widgetO.target.L,widgetO.target.O);
    
                    var eventFunc = function(){
                        self.callObjLinkFunctions(targetObj);
                    } 
    
                    return eventFunc;
                
                }
    
    
                var options = {
                    ...widgetO,
                    triggerObj: dyn_object
                }
    
                var f = self.addSimpleEvent(widgetO.trigger,eventFuncClosure(),options);
            });
    
        }
    
        
    
    }
    
    
    PhSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.widgets.length; i++) {
            this.extractWidget(dyn_object.widgets[i],dyn_object);
        }
    }
    
    

/***/ }),
/* 31 */
/***/ (function(module, exports) {

/**
 * @constructor
 * @param {*} dynSim 
 */

PhSim.Camera = function(dynSim) {

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

PhSim.Camera.prototype.scale = 1;

/**
 * Camera offset x 
 * @type {Number}
 */

PhSim.Camera.prototype.x = 0;

/**
 * Camera offset y
 * @type {Number}
 */

PhSim.Camera.prototype.y = 0;

/**
 * Target object
 * @type {StaticObject}
 */

PhSim.Camera.prototype.targetObj = null;

/**
 * Objects that will transform with the camera
 * @type {StaticObject[]}
 */

PhSim.Camera.prototype.transformingObjects = []

PhSim.Camera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

PhSim.Camera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		this.dynSim.translate(this.transformingObjects[i],dx,dy);
	}
}

PhSim.Camera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}


PhSim.prototype.loading = {
	"bgClr": "black",
	"txtClr": "White",
	"txtFace": "arial",
	"txtAlign": "center",
	"txt": "Loading...",
	"yPos": "center",
	"txtSize": 20
}

PhSim.prototype.drawLoadingScreen = function() {
	this.simCtx.fillStyle = this.loading.bgClr;
	this.simCtx.fillRect(0,0,this.camera.scale,this.simCanvas.height);
	this.simCtx.fillStyle = this.loading.txtClr;
	this.simCtx.textAlign = this.loading.txtAlign;
	this.simCtx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.simCtx.fillText(this.loading.txt,this.simCanvas.width / 2,this.simCanvas.height / 2)
}

PhSim.prototype.extractLclGame = function(localSettings) {

	var self = this;

	var o = {
		intLife: localSettings.life,
		goal: localSettings.goal,
		intScore: localSettings.score,
		static: localSettings,
		life: localSettings.life,
		score: localSettings.score,

		setScore: function(c) {

			o.score = c;

			if(o.score >= o.goal && Number.isInteger(o.score) && Number.isInteger(o.goal)) {
			
				self.pause();
				self.enableFilter();

				if(self.simulationIndex + 1 === self.sim.simulations.length) {
					var a = self.alert({
						msg:"You Win!",
						closeButtonTxt:"Play again",
						bgColor:"#333",
						txtColor:"#fff",
						w:300,
						h:100,
						onok: function() {
							self.disableFilter();
							a.parentNode.removeChild(a);
							self.gotoSimulationIndex(0);
						}
					});
				}

				else {
					clearInterval(self.intervalLoop);
					self.disableFilter();
					self.gotoSimulationIndex(self.simulationIndex + 1);
				}


			}
		},

		setLife: function(c) {
			o.life = c;

			if(o.life === 0) {
				o.end();
			}

		},

		incrementLife: function() {
			o.setLife(o.life + 1);
		},

		decrementLife: function() {
			o.setLife(o.life - 1);
		},

		end: function() {

			self.pause();
			self.enableFilter();


			var a = self.alert({
				msg:"Game Over",
				closeButtonTxt:"Try again",
				bgColor:"#333",
				txtColor:"#fff",
				w:300,
				h:100,
				onok: function() {
					self.gotoSimulationIndex(self.simulationIndex);
					self.disableFilter();
					a.parentNode.removeChild(a);	
				}
			});

		}

	}

	return o;

}

/***/ }),
/* 32 */
/***/ (function(module, exports) {


/**
 * Gradient Namespace
 * @namespace
 */

PhSim.Gradients = {}

/**
 * @function
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PhSim.Static.Gradient} jsObject 
 */

PhSim.Gradients.extractGradient = function(ctx,jsObject) {

	var gradient = ctx.createLinearGradient(jsObject.limits.start.x,jsObject.limits.start.y,jsObject.limits.end.x,jsObject.limits.end.y);

	for(var i = 0; i < jsObject.stops.length; i++) {
		gradient.addColorStop(jsObject.stops[i].pos,jsObject.stops[i].color);
	}
	
	return gradient;

}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

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
	this.constraint = true;
}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * 
 * Calculate DynObject skinmesh
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.calc_skinmesh = function(dynObject) {

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

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// Simple Event Reference

PhSim.SimpeEventRef = function(trigger,ref) {
	this.trigger = trigger;
	this.ref = ref;
}

// Simple Event Reference Array

PhSim.prototype.simpleEventRefs = [];

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

/** @typedef {"afterslchange"} afterslchangeTriggerString
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
 * objlinkTriggerString|afterslchangeTriggerString|timeTriggerString} simpleEventTriggerString
 *
 * 
 * The simple event trigger string is a string defining {@link simpleEventOptions.trigger}
 */

/** 
 * Properties for a simple event.
 *
 * @typedef {Object} simpleEventOptions
 * @property {@external https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key|KeyboardEvent.key} key - The event.key value for triggering a simple event.
 * @property {Number} time - The time interval between a repeated event or a delay time for timeouts.
 * @property {Number} maxN - The maximum number of times a repeated SimpleEvent can be executed.
 * @property {PhSim.DynObject} triggerObj - Trigger object
 * 
 * The simple event options is an Object that is used for the {@link PhSim#addSimpleEvent} function.
 */

 /**
  * @callback SimpleEventCall
  * @param {Event} e - event object
  */

/**
 *
 * Create a SimpleEvent
 * @function
 * 
 * @param {simpleEventTriggerString} trigger - The type of SimpleEvent.
 * @param {SimpleEventCall} call - The JavaScript function to be executed.
 * @param {simpleEventOptions} options -  [The Simple Event Options Object]{@link simpleEventOptions}.
 * @returns {Number} - A reference to the simple event.
 * @this {PhSim}
 * 
 */


PhSim.prototype.addSimpleEvent = function(trigger,call,options) {

	if(trigger.match(/_global$/)) {
		options.triggerObj = null;
	}

	var self = this;
	
	if(trigger === "key") {

		if(options.triggerObj) {
		
			var f = function(e) {
				if(options.key === e.key) {
					call(e);
				}
			}

		}

		else {

			var f = function(e) {
				call(e);
			}

		}

		self.addEventListener("keydown",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "sensor" || trigger === "sensor_global") {

		var self = this;

		if(options.triggerObj) {
			
			var f = function(e) {

				var m = self.inSensorCollision(options.triggerObj)
	
				if(m) {
					call(e);
				}
	
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("collisionstart",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "update") {
		
		var f = function() {
			call();
		}

		self.addEventListener("beforeupdate",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "objclick" || trigger === "objclick_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objclick",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objmousedown" || trigger === "objmousedown_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objmousedown",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		this.addEventListener("firstslupdate",f);

	}
	
	if(trigger === "objmouseup" || trigger === "objmouseup_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objmouseup",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objlink") {
		options.triggerObj.objLinkFunctions = options.triggerObj.objLinkFunctions || [];
		options.triggerObj.objLinkFunctions.push(call);
	}

	if(trigger === "afterslchange") {

		
		if(options.triggerObj) {
			var f = function(e) {
				call(e);
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("afterslchange",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "time") {

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
	}

}

/** 
 * 
 * @param {Number} refNumber - Reference Number
 * 
*/

PhSim.prototype.removeSimpleEvent = function(refNumber) {
	
	var o = this.simpleEventRefs[refNumber];

	if(o.trigger === "key") {
		this.removeEventListener("keydown",o.ref);
	}

	if(o.trigger === "sensor") {
		this.removeEventListener("collisionstart",o.ref);
	}

	if(o.trigger === "update") {
		this.removeEventListener("beforeupdate",o.ref);
	}

}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * 
 * Process string by replacing magical words
 * 
 * @function
 * @param {String} str 
 * @returns {String}
 * 
 */

PhSim.prototype.processVar = function(str) {

	var str = str;
	
	if(str.search("{__game__score}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__score}/g,this.lclGame.score);
	}

	if(str.search("{__game__life}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__life}/g,this.lclGame.life);
	}

	if(str.search("{__game__goal}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__goal}/g,this.lclGame.goal);
	}

	if(str.search("{__game__int_life}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__int_life}/g,this.lclGame.intLife);
	}

	if(str.search("{__game__int_score}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__int_score}/g,this.lclGame.intScore);
	}

	return str;

}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// Generated by TypeDefGen module 
// Built on Tue Oct 27 2020 14:10:31 GMT-0500 (Central Daylight Time)
PhSim.boolKey = ["Velocity","Force","Position","Translate","DeleteSelf","Draggable","Coin","Hazard","Health","Elevator","TransformCameraByObject","TransformWithCamera","KeyboardControls","Alert","Connection","SetAngle","Rotation","NoRotation","RectText","NumVar","SetNumVar","SetColor","SetBorderColor","SetLineWidth","PlayAudio","ObjLink_a","Game","DeleteSelf","ToggleLock","CircularConstraint","DeleteSelf","ToggleSemiLock"];
PhSim.boolKey_lc = ["velocity","force","position","translate","deleteSelf","draggable","coin","hazard","health","elevator","transformCameraByObject","transformWithCamera","keyboardControls","alert","connection","setAngle","rotation","noRotation","rectText","numVar","setNumVar","setColor","setBorderColor","setLineWidth","playAudio","objLink_a","game","deleteSelf","toggleLock","circularConstraint","deleteSelf","toggleSemiLock"];

 
 
/**
* @typedef {simpleEventOptions|Velocity}
* @property {Boolean} velocity - Boolean for enabling the velocity widget
* @property {Vector} vector - Velocity vector
*/
 
/**
* @typedef {simpleEventOptions|Force}
* @property {Boolean} force - Boolean for enabling the force widget
* @property {Vector} vector - Force vector
*/
 
/**
* @typedef {simpleEventOptions|Position}
* @property {Boolean} position - Boolean for enabling the position widget
* @property {Vector} vector - Position vector
*/
 
/**
* @typedef {simpleEventOptions|Translate}
* @property {Boolean} translate - Boolean for enabling the translation widget
* @property {Vector} vector - Translation vector
*/
 
/**
* @typedef {simpleEventOptions|DeleteSelf}
* @property {Boolean} deleteSelf - Boolean for enabling the force widget
*/
 
/**
* @typedef {Object|Draggable}
* @property {Boolean} deleteSelf - Boolean for enabling the force widget
*/
 
/**
* @typedef {Object|Coin}
* @property {Boolean} deleteSelf - Boolean for enabling the coin widget
*/
 
/**
* @typedef {Object|Hazard}
* @property {Boolean} deleteSelf - Boolean for enabling the hazard widget
*/
 
/**
* @typedef {Object|Health}
* @property {Boolean} deleteSelf - Boolean for enabling the health widget
*/
 
/**
* @typedef {Object|Elevator}
* @property {Boolean} elevator - Boolean for enabling the elevator widget
* @property {Vector} pointA - First point
* @property {Vector} pointB - Second point
*/
 
/**
* @typedef {Object|TransformCameraByObject}
* @property {Boolean} deleteSelf - Boolean for enabling the hazard widget
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
* @typedef {simpleEventOptions|SetAngle}
* @property {Number} cycle - Angle
* @property {Boolean} circularConstraintRotation - Down velocity
* @property {Boolean} rotation - Right velocity
*/
 
/**
* @typedef {simpleEventOptions|Rotation}
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
* @typedef {simpleEventObjects|SetNumVar}
* @property {String} name - undefined
* @property {Number} value - undefined
* @property {Boolean} SetNumVar - undefined
*/
 
/**
* @typedef {simpleEventObjects|SetColor}
* @property {String} color - undefined
* @property {Boolean} setColor - undefined
*/
 
/**
* @typedef {simpleEventObjects|SetBorderColor}
* @property {String} color - undefined
* @property {Boolean} setBorderColor - undefined
*/
 
/**
* @typedef {simpleEventObjects|SetLineWidth}
* @property {Number} lineWidth - undefined
* @property {Boolean} setLineWidth - undefined
*/
 
/**
* @typedef {simpleEventObjects|PlayAudio}
* @property {String} src - undefined
* @property {Boolean} playAudio - undefined
*/
 
/**
* @typedef {simpleEventObjects|ObjLink_a}
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
* @typedef {Object|DeleteSelf}
* @property {Boolean} deleteSelf - Boolean for enabling the coin widget
*/
 
/**
* @typedef {Object|ToggleLock}
* @property {Boolean} toggleLock - Boolean for enabling the coin widget
*/
 
/**
* @typedef {Object|CircularConstraint}
* @property {Boolean} circularConstraint - Boolean for enabling the circular constraint widget
* @property {Number} x - Boolean for enabling the circular constraint widget
* @property {Number} y - Boolean for enabling the circular constraint widget
*/
 
/**
* @typedef {Object|DeleteSelf}
* @property {Boolean} deleteSelf - Boolean for enabling the self-deletion widget
*/
 
/**
* @typedef {simpleEventOptions|ToggleSemiLock}
* @property {Boolean} toggleSemiLock - Boolean for enabling the toggle semi-lock widget
*/
 
/** 
 * @typedef {Velocity|Force|Position|Translate|DeleteSelf|Draggable|Coin|Hazard|Health|Elevator|TransformCameraByObject|TransformWithCamera|KeyboardControls|Alert|Connection|SetAngle|Rotation|NoRotation|RectText|NumVar|SetNumVar|SetColor|SetBorderColor|SetLineWidth|PlayAudio|ObjLink_a|Game|DeleteSelf|ToggleLock|CircularConstraint|DeleteSelf|ToggleSemiLock} Widget 
*/


/***/ })
/******/ ]);