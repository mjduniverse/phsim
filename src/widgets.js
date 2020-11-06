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
	this.constraint = true;
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
 * Array of custom widgets.
 * @type {PhSim.Widget[]}
 */

PhSim.Widgets = [];

PhSim.chkWidgetType = function() {
	
}