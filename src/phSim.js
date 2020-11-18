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

module.exports = require("./core");

require("./objects" );
require("./matterPlugin.js" );
require("./events/eventStack" );
require("./phRender");
require("./sprites");
require("./audio");

require("./collisionClass");

require("./tools/vector");
require("./tools/objectChecker");
require("./tools/diagRect");
require("./tools/vertex");
require("./tools/centroid");

// Bounding box functions

require("./tools/boundingBox");

require("./dynObject");

require("./events/eventObjects");
require("./lo");
require("./makeQuickly");
require("./filter");
require("./dynWidget");
require("./audioToggle");
require("./events/registerEvents");
require("./events/eventListener");
require("./query");
require("./gravity");
require("./toggle");
require("./gotoSuperlayer");
require("./matterAliases");
require("./set");
require("./update");
require("./extractWidgets");

require("./dynSimCamera");
require("./game");
require("./gradient");
require("./widgets");
require("./calc_skinmesh");
require("./events/simpleEvent");
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