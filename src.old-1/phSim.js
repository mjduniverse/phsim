/***

Physics Simulator (PhSim) Library

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

var PhSim = {}

PhSim.name = "phsim"
PhSim.version = "1"

// Widgets

import Widgets from "./widgets";
PhSim.Widgets = Widgets;

// Constraints

import Constraints from "./constraints";
PhSim.Constraints = Constraints;

// Dynamic Object

import DynObject from "./dynObject";
PhSim.DynObject = DynObject;

// Objects 

import Objects from "./objects.js"
PhSim.Objects = Objects;

// Gradient Functions 

import Gradients from "./gradients";
PhSim.Gradients = Gradients;

// Sprites

import Sprites from "./sprites";
PhSim.Sprites = Sprites;

// Audio 

import Audio from "./audio";
PhSim.Audio = Audio;

// PhRender

import PhRender from "./phRender.js"
PhSim.PhRender = PhRender;

import EventConstructors from "./eventConstructors";
Object.assign(PhSim,EventConstructors);

// Dynamic Event Objects

import DynEventObjects from "./dynEventObjects";
Object.assign(PhSim,DynEventObjects);

// Event Stack

import EventStack from "./eventStack";
PhSim.EventStack = EventStack;

// Collision Classes

import CollisionClass from "./collisionClass";
PhSim.CollisionClass = CollisionClass;


// Camera

import DynSimCamera from "./camera";
PhSim.DynSimCamera = DynSimCamera;

// Calculate Object Skinmesh

import calc_skinmesh from "./calc_skinmesh";
PhSim.calc_skinmesh = calc_skinmesh;

// Tools

import Tools from "./Tools/tools";
PhSim.Tools = Tools;

// DynSim

import DynSim from "./DynSim/dynSim";
PhSim.DynSim = DynSim;

// Allow access to PhSim object in browsers

if(typeof window === "object") {
    window.PhSim = PhSim;
}

// Allow access to PhSim object in Node.js