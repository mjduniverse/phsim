const PhSim = require(".");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
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

PhSim.prototype.widgets = {};


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

require("./widgets/circularConstraint.js");
require("./widgets/clone.js");
require("./widgets/draggable.js");


const Game = require("./game");

Object.assign(PhSim.Widgets,Game.Widgets);

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
require("./widgets/connectDynObjects");

PhSim.Widgets.constraint = require("./widgets/constraint.js");

PhSim.Widgets.setImgSrc = require("./widgets/setImgSrc.js");

PhSim.Widgets.transformAgainstCamera = require("./widgets/transformAgainstCamera.js");

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

    this.createWFunction(dyn_object,f,widget);

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

/**
 * Get Widget object by name
 * @param {string} name 
 */

PhSim.prototype.getWidgetByName = function(name) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		for(var j = 0; i < this.objUniverse[i].widgets.length; i++) {
			if(this.objUniverse[i].widgets[j].name === name) {
				return this.objUniverse[i].widgets[j];
			}
		}
	}
}