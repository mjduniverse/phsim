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
 * 
 * @callback WidgetExtractionFunction
 * @param {Object} options
 * @param {PhSim.DynObject} dyn_object
 * @this {PhSim}
 * 
 * A WidgetExtractionFunction is a function that is run when the widget is extracted.
 * In such a function, the "this" keyword refers the PhSim simulation.
 */

/**
 * @constructor
 * @param {String} name 
 * @param {WidgetExtractionFunction} onExtraction 
 */

PhSim.Widget = function(name,onExtraction) {
	this.name = name;
	this.onExtraction = onExtraction;
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

/**
 * Widget Namespace.
 * @namespace
 * 
 */

PhSim.Widgets = {};

PhSim.Query.chkWidgetType = function() {
	
}


require("./widgets/circularConstraint.js");
require("./widgets/clone.js");
require("./widgets/draggable.js");


const Game = require("../game");

/**
 * @alias PhSim.Game.Widgets.coin
 */

PhSim.Widgets.coin = Game.Widgets.coin;

/**
 * @alias PhSim.Game.Widgets.hazard
 */

PhSim.Widgets.hazard = Game.Widgets.hazard;
PhSim.Widgets.health = Game.Widgets.health;
PhSim.Widgets.endGame = Game.Widgets.endGame;

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
    PhSim.Matter.Body.setInertia(dyn_object.matter, Infinity)
}