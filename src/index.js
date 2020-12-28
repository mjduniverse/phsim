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

	if(dynSimOptions) {
		Object.assign(this,dynSimOptions);
	}

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

require("./matterPlugin.js" );

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

PhSim.PhRender = require("./phRender");
PhSim.Sprites = require("./sprites");
PhSim.Audio = require("./audio");
PhSim.Vector = require("./tools/vector");
PhSim.diagRect = require("./tools/diagRect");
PhSim.Vertices = require("./tools/vertex");

PhSim.Centroid = require("./tools/centroid");

// Bounding box functions

PhSim.BoundingBox = require("./tools/boundingBox");
PhSim.DynObject = require("./dynObject");
PhSim.Events = require("./events/eventObjects");

require("./lo");
require("./makeQuickly");
require("./filter");
require("./widgets/dynWidget");
require("./audioToggle");
require("./events/registerEvents");

PhSim.PhSimEventTarget =  require("./events/eventListener");

Object.assign(PhSim.prototype,PhSim.PhSimEventTarget);

require("./query");
require("./gravity");
require("./loop/toggle");

PhSim.prototype.gotoSimulationIndex = require("./loop/gotoSuperlayer");
PhSim.Motion = require("./motion");

require("./set");
require("./loop/update");
require("./widgets/extractWidgets");

PhSim.Camera = require("./dynSimCamera");
PhSim.Game = require("./game");
PhSim.Gradients = require("./gradient");

require("./widgets");

PhSim.calc_skinmesh = require("./calc_skinmesh");

require("./events/simpleEvent");
require("./processVar");

PhSim.ObjLoops = require("./objLoops");


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