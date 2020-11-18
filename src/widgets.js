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
 * Array of custom widgets.
 * @enum {PhSim.Widget[]}
 */

PhSim.Widgets = {};

PhSim.chkWidgetType = function() {
	
}


require("./widgets/circularConstraint.js");
require("./widgets/clone.js");
require("./widgets/draggable.js");
require("./widgets/game.js");
require("./widgets/lock.js");
require("./widgets/motion.js");
require("./widgets/objLink.js");
require("./widgets/wFunction.js");
require("./widgets/elevator.js");