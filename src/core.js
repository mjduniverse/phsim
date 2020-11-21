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

PhSim.prototype.connectCanvas = function(canvas) {
	this.simCanvas = canvas;
	this.simCtx = canvas.getContext("2d");
	this.simCanvas.width = this.options.box.w || this.options.box.width;
	this.simCanvas.height = this.options.box.h || this.options.box.height;
	this.registerCanvasEvents();
	this.configRender(this.simCtx);
}

PhSim.prototype.connectContainer = function(c) {
	
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

if(typeof window === "object") {
	window.PhSim = PhSim;
}

if(typeof module === "object") {
    module.exports = PhSim;
}