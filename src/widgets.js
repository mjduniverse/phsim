const PhSim = require(".");

// Try to import matter-js as a commonJS module

try {
	const Matter = require("matter-js");
}

catch {
	
}

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
	this.type = "constraint";
}

PhSim.prototype.getWidgetByName = function(nameStr) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		this.objUniverse[i].getWidgetByName(nameStr);
	}
}

PhSim.prototype.widgets = {};

/**
 * Widget Object
 * @param {Function} onextraction 
 */

PhSim.Widget = function(onextraction) {
	this.onextraction = onextraction;
}

/**
 * 
 * @param {PhSimObject} o 
 */

PhSim.Widget.defineByBoolean = function(o) {

	Object.keys(PhSim.Widgets).forEach(function(p){
		if(o[p]) {
			o.type = p;
		}
	})

	
}

PhSim.Widget.WidgetOptions = function(type) {
	this.type = type;
}

/**
 * @typedef {WFunctionOptions|Object} WidgetOptions
 * @property {String} type - Name of widget. 
 */

/**
 * Widget Namespace.
 * @namespace
 * @memberof PhSim
 * @mixes PhSim.Game.Widgets
 */

PhSim.Widgets = {};

PhSim.Query.chkWidgetType = function() {
	
}


require("./widgets/circularConstraint.js");
require("./widgets/clone.js");
require("./widgets/draggable.js");


const Game = require("./game");

Object.assign(PhSim.Widgets,Game);

require("./widgets/lock.js");
require("./widgets/motion.js");
require("./widgets/objLink.js");
require("./widgets/wFunction.js");
require("./widgets/elevator.js");
require("./widgets/keyboardControls.js");
require("./widgets/transformCameraByObj");
require("./widgets/setRenderProperties.js");
require("./widgets/deleteSelf.js");
require("./widgets/stack.js");

PhSim.Widgets.constraint = require("./widgets/constraint.js");

/**
 * PlayAudio Widget
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget
 * @this PhSim
 */

PhSim.Widgets.playAudio = function(dyn_object,widget) {

    var self = this;

    var i = this.audioPlayers;
    
    this.staticAudio.push(widget);

    var f = function() {
        self.playAudioByIndex(i);
    }

    var r = this.createWFunction(dyn_object,f,widget);

    this.audioPlayers++;
}

/**
 * Make object not rotate
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {*} widget 
 */
    
PhSim.Widgets.noRotation = function(dyn_object) {
    Matter.Body.setInertia(dyn_object.matter, Infinity)
}