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
 * @typedef {PhSim.Options|PhSim.Options.Simulation|StaticObject[]} DynSimOptions
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
 * 
 */

function PhSim(dynSimOptions = new PhSim.Options()) {

	/**
	 * The static simulation object
	 * @typedef {DynSimOptions}
	 */

	this.options;

	if(Array.isArray(dynSimOptions.simulations)) {
		this.options = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions.layers)) {
		this.options = new PhSim.Options();
		this.options.simulations[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions)) {
		this.options = new PhSim.Options();
		this.options.simulations[0].layers[0].objUniverse = dynSimOptions;
	}

	/**
	 * Array of simulations to be loaded.
	 * 
	 * @type {PhSim.Options.Simulation[]}
	 */

	this.simulations = PhSim.Query.deepClone(this.options.simulations);

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

	
	this.simCanvas.width = this.options.box.w || this.options.box.width;
	this.simCanvas.height = this.options.box.h || this.options.box.height;
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
  * @param {PhSim.PhEvent} phEvent
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

if(typeof window === "object") {
	window.PhSim = PhSim;
}

if(typeof module === "object") {
    module.exports = PhSim;
}

PhSim.Options = require("./objects" );

require("./matterPlugin.js" );
require("./events/eventStack" );

PhSim.PhRender = require("./phRender");
PhSim.Sprites = require("./sprites");
PhSim.Audio = require("./audio");
PhSim.Vector = require("./tools/vector");

require("./tools/objectChecker");

PhSim.diagRect = require("./tools/diagRect");

require("./tools/vertex");
require("./tools/centroid");

// Bounding box functions

require("./tools/boundingBox");

PhSim.DynObject = require("./dynObject");

require("./events/eventObjects");
require("./lo");
require("./makeQuickly");
require("./filter");
require("./widgets/dynWidget");
require("./audioToggle");
require("./events/registerEvents");
require("./events/eventListener");
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