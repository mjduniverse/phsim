/** 
 * Dynamic Simulation Instance Object 
 * @param {object} sim - The simulation object
 * */

var DynSim = function(sim) {

	/**
	 * The static simulation object
	 */
	
	this.sim = sim;

	/**
	 * Global event stack
	 * @type {PhSim.EventStack}
	 */

	this.eventStack = new PhSim.EventStack();


	/**
	 * Event stack for simulation specfic events
	 * @type {PhSim.EventStack}
	 */

	this.slEventStack = new PhSim.EventStack();

	this.registerKeyEvents();

}

// Simple Event Reference

DynSim.SimpeEventRef = function(trigger,ref) {
	this.trigger = trigger;
	this.ref = ref;
}

/**
 * Number of frames per second
 */

DynSim.prototype.delta = 50/3; // 16 frames per second, or 16 frames per 1000ms

/**
 * Boolean property for telling if the simulation has loaded a simulation at least one time.
 * @type {Boolean}
 */

DynSim.prototype.init = false;

/**
 * Time for inside the world
 * @type {Number}
 */

DynSim.prototype.sl_time = 0;

/**
 * Index of the current simulation
 * @type {Number}
 */

DynSim.prototype.simulationIndex = null;

/**
 * Loading status of the dynamic simulation
 * @type {Number}
 */

DynSim.prototype.status = 0;

/**
 * x-coordinate of the mouse
 * @type {Number}
 */

DynSim.prototype.mouseX = null;

/**
 * y-coordinate of the mouse
 * @type {Number}
 */

DynSim.prototype.mouseY = null;

/**
 * Boolean property to tell if the simulation is paused or not.
 * @type {Boolean}
 */

DynSim.prototype.paused = true;

/** 
 * 
 * Dealing with PhSim Object IDs
 * 
*/

DynSim.nextId = "0";

// Prefabulated PhSim.DynSim Objects

import * as prefabulated from "./prefabulated";
Object.assign(DynSim,prefabulated);

// Prefabulated PhSim.DynSim Objects

import * as filter from "./filter";
Object.assign(DynSim.prototype,filter);

// Functions for getting objects

import * as get from "./get";
Object.assign(DynSim.prototype,get);

// PhRender assignment

import * as phRenderAssignment from "./phRenderAssignment";
Object.assign(DynSim.prototype,phRenderAssignment);

// Newtonian Gravity Field

import * as applyGravitationalField from "./gravitationalField";
Object.assign(DynSim.prototype,applyGravitationalField);

// Loading Screen

import * as loadingScreen from "./loadingScreen";
Object.assign(DynSim.prototype,loadingScreen);

// Event Listeners

import * as phAddEventListener from "./addEventListener";
Object.assign(DynSim.prototype,phAddEventListener);

// Simple Events

import * as simpleEvent from "./simpleEvent";
Object.assign(DynSim.prototype,simpleEvent);

// Dynamic Events

import * as dynEvents from "./dynEvents";
Object.assign(DynSim.prototype,dynEvents);

// CreateMotionFunction

import * as createMotionFunction from "./createMotionFunction";
Object.assign(DynSim.prototype,createMotionFunction);

// Matter Alias Functions

import * as matterAlias from "./matterAlias";
Object.assign(DynSim.prototype,matterAlias);

// Dynamic Widget Functions

import * as widgets from "./widgets";
Object.assign(DynSim.prototype,widgets);

// Dynamic Widget Extraction

import * as extractWidget from "./extractWidget";
Object.assign(DynSim.prototype,extractWidget);

// GotoSimulationIndex function

import * as gotoSimulationIndex from "./gotoSimulationIndex";
Object.assign(DynSim.prototype,gotoSimulationIndex);

// Process Magical Keywords in text

import processVar from "./processVar";
DynSim.prototype.processVar = processVar;

// Simulation Loops

import * as loop from "./loop";
Object.assign(DynSim.prototype,loop);

// Dynamic Queries

import DynQueries from "./dynQueries";
Object.assign(DynSim.prototype,DynQueries);

// Initialize 

import * as init from "./init";
Object.assign(DynSim.prototype,init);

// Extract Local Game

import * as extractLclGame from "./extractLclGame";
Object.assign(DynSim.prototype,extractLclGame);

/*/
DynSim.prototype = {
	...DynSim.prototype,
	...get,
	...phRenderAssignment,
	...loadingScreen,
	...applyGraviationalField,
	...phAddEventListener,
	...dynEvents,
	...createMotionFunction,
	...simpleEvent,
	...matterAlias,
	...widgets,
	...extractWidget,
	...loop,
	...gotoSimulationIndex,
	...processVar
}
*/

export default DynSim;