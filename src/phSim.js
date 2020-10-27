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

require("./objects" );
require("./eventStack" );
require("./phRender");
require("./sprites");
require("./audio");

require("./collisionClass");

require("./tools/vectorTools");
require("./tools/objectChecker");
require("./tools/diagRect");
require("./tools/vertex");
require("./tools/centroid");

// Bounding box functions

require("./tools/boundingBox");

require("./dynObject");

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

require("./dynSimCamera");
require("./gradient");
require("./widgets");
require("./calc_skinmesh");
require("./simpleEvent");
require("./processVar");


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