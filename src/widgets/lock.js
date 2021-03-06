// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

const PhSim = require("..");
const Widget = require("../widget");

/**
 * Set lock of the Dynamic Object
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Boolean} value - If  `true`, lock. Otherwise, unlock.
 */


PhSim.prototype.setLock = function(dynObject,value) {
    dynObject.locked = value;
	Matter.Body.setStatic(dynObject.matter,value);
}

/**
 * Toggle Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleLock = function(dynObject) {
    this.setLock(dynObject,!dynObject.locked);
}

/**
 * Toggle Semi-Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleSemiLock = function(dynObject) {
	dynObject.locked = !dynObject.locked;
	Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

/**
 * The `toggleLock` widget toggles the lock status of the Dynamic Object.
 * If locked, the object is unlocked.
 * If unlocked, the object is locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleLock = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.toggleLock(dyn_object);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
}

/**
 * The `toggleSemiLock` widget toggles the semi-lock status of the Dynamic Object.
 * If semi-locked, the object is semi-unlocked.
 * If semi-unlocked, the object is semi-locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleSemiLock = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.toggleSemiLock(dyn_object);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
    
}