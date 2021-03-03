const PhSim = require("..");
const Motion = require("../motion");
const Widget = require("../widget");

/**
 * 
 * Clone object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options - The options used for creating a spawned object
 * @param {Vector} options.velocity -  The velocity to add to an object when it got spawned.
 * @param 
 */

PhSim.prototype.cloneObject = function(dynObject,options = {}) {

    var newObjStatic = Object.assign({},dynObject.static);

    Motion.setPosition(newObjStatic,dynObject.matter.position);
    
    var obj = new PhSim.DynObject(newObjStatic);
    
    /**
     * Property telling if object is cloned.
     * 
     * @type {Boolean|undefined}
     * @memberof PhSim.DynObject
     */

    obj.cloned = true;
    
    /**
     * 
     */


    obj.cloneParent = dynObject;
    
    PhSim.Motion.setVelocity(obj,options.velocity);

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.Events.PhSimEvent("clone");
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/**
 * 
 * The `clone` widget is a widget that makes copies of an object and inserts them into
 * the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Options.
 * @this PhSim
 */

PhSim.Widgets.clone = function(dyn_object,widget) {
 
    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.cloneObject(dyn_object,{
            velocity: widget.vector
        });
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;

}