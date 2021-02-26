const PhSim = require(".");
const DynObject = require("./dynObject");
const PhSimEventTarget = require("./events/eventListener");

/**
 * Dynamic Widget Object
 * @param {Object} options 
 */

const Widget = function(target,options) {

	/**
	 * Status of widget
	 * @type {"enabled"|"disabled"|"destroyed"}
	 */

	this.status;

	/**
	 * Thing to be affected by the widget.
	 * @type {PhSim|PhSim.DynObject}
	 */

	
	this.target = target;

	if(typeof options !== "undefined") {
		Object.assign(this,options);
	}

	Object.assign(this,PhSimEventTarget);

	this.enable();

}

Widget.prototype.eventStack = {
	enable: [],
	disable: [],
	destroy: []
}

Widget.prototype.enable = function() {

	if(typeof this.wFunction === "function") {
		this.wFunction.wFunction_enabled = true;

		if(this.wFunction._bodyFunction.motionFunctionEnabled === false) {
			this.wFunction._bodyFunction.motionFunctionEnabled = false;
		}

	}

	this.callEventClass("enable",this,this);

	this.status = "enabled";

}

/**
 * Function for disabling widget
 * @type {Function}
 */

Widget.prototype.disable = function() {

	if(typeof this.wFunction === "function") {

		this.wFunction.wFunction_enabled = false;

		if(this.wFunction._bodyFunction.motionFunctionEnabled === true) {
			this.wFunction._bodyFunction.motionFunctionEnabled = false;
		}

	}

	this.callEventClass("disable",this,this);

	this.status = "disabled";

}

/**
 * Function for destroying widget
 * @type 
 */


Widget.prototype.destroy = function() {

	if(typeof this.wFunction === "function") {

		if(this.wFunction._thisRef instanceof DynObject) {
			wFunction._thisRef.phsim.destroyWFunction(w.wFunction);
		}

		if(this.wFunction._thisRef instanceof PhSim) {
			wFunction._thisRef.destroyWFunction(w.wFunction);	
		}

	}

	delete this.wFunction;

	this.callEventClass("destroy",this,this);

	this.status = "destroyed";

}


/**
 * 
 * @param {PhSimObject} o 
 */

Widget.defineByBoolean = function(o) {

	Object.keys(Widgets).forEach(function(p){
		if(o[p]) {
			o.type = p;
		}
	})

	
}

Widget.WidgetOptions = function(type) {
	this.type = type;
}

module.exports = Widget;