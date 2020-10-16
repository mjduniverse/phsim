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
 * /

/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} sim - The simulation object
 * 
 */

PhSim.DynSim = function(dynSimOptions) {

	/**
	 * The static simulation object
	 */

	
	if(Array.isArray(dynSimOptions.simulations)) {
		this.sim = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions.layers)) {
		this.sim = new PhSim.Static.CompositeSimulation();
		this.sim.simulations[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions)) {

	}

	this.registerKeyEvents();

}

/**
 * Number of frames per second
 */

PhSim.DynSim.prototype.delta = 50/3; // 16 frames per second, or 16 frames per 1000ms

/**
 * Boolean property for telling if the simulation has loaded a simulation at least one time.
 * @type {Boolean}
 */

PhSim.DynSim.prototype.init = false;

/**
 * Time for inside the world
 * @type {Number}
 */

PhSim.DynSim.prototype.sl_time = 0;

/**
 * Index of the current simulation
 * @type {Number}
 */

PhSim.DynSim.prototype.simulationIndex = null;

/**
 * Loading status of the dynamic simulation
 * @type {Number}
 */

PhSim.DynSim.prototype.status = 0;

/**
 * x-coordinate of the mouse
 * @type {Number}
 */

PhSim.DynSim.prototype.mouseX = null;

/**
 * y-coordinate of the mouse
 * @type {Number}
 */

PhSim.DynSim.prototype.mouseY = null;

/**
 * Boolean property to tell if the simulation is paused or not.
 * @type {Boolean}
 */

PhSim.DynSim.prototype.paused = true;

/**
 * Global event stack
 * @type {PhSim.EventStack}
 */

PhSim.DynSim.prototype.eventStack = new PhSim.EventStack();


/**
 * Event stack for simulation specfic events
 * @type {PhSim.EventStack}
 */

PhSim.DynSim.prototype.slEventStack = new PhSim.EventStack();

 /**
  * 
  * @callback PhSimEventCall
  * @param {PhSim.PhEvent} phEvent
  * 
  */

 PhSim.DynSim.nextId = "0";

/**
 * Structure giving more human-readable meaning to PhSim status.
 * @type {String[]}
 */

PhSim.DynSim.statusStruct = {
	0: "Unloaded",
	1: "Initalized",
	2: "Loaded Images",
	3: "Loaded Audio",
	4: "Loaded Simulation"
}



PhSim.DynSim.prototype.forAllObjects = function(call) {
	
	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}


PhSim.DynSim.prototype.addToOverlayer = function(dynObject) {
	Matter.World.add(this.matterJSWorld, dynObject.matter);
	this.objUniverse.push(dynObject);
}

require("./eventObjects");
require("./lo");
require("./makeQuickly");
require("./filter");
require("./dynWidget");
require("./audioToggle");
require("./registerEvents");
require("./eventListener");
require("./query");
require("./gravity");
require("./toggle");
require("./gotoSuperlayer");
require("./matterAliases");
require("./set");
require("./update");
require("./extractWidgets");