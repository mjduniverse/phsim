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
 * PhSim Module
 * @namespace
 * @global
 */

var PhSim = {}

/**
 * PhSim Name
 * @readonly
 */

PhSim.name = "phsim"

/**
 * PhSim version
 * @readonly
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

require("./tools/tools");
require("./tools/vectorTools");
require("./tools/objectChecker");
require("./tools/diagRect");
require("./tools/vertex");
require("./tools/centroid");

// Bounding box functions

require("./tools/boundingBox");

require("./dynSim/dynSim");

require("./dynSimCamera");
require("./gradient");
require("./widgets");
require("./collisionClass");
require("./dynObject");
require("./calc_skinmesh");
require("./simpleEvent");
require("./processVar");