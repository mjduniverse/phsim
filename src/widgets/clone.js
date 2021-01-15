const PhSim = require("..");

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
    
    var obj = new PhSim.DynObject(dynObject.static);
    
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
 */

PhSim.Widgets.clone = function(dyn_object,widget) {

    var self = this;

    var getFunction;

    var o = {
        velocity: widget.vector
    }
    
    // Clone By Time

    if(widget.trigger === "time") {
    
        getFunction = function() {

            var time = widget.time;
            var maxN = widget.maxN;

            var func = null;

            if(Number.isInteger(maxN)) {

                func = function() {

                    if(func.__n === maxN) {
                        clearInterval(func.__interN);
                    }

                    else {
                        if(!self.paused) {
                            self.cloneObject(dyn_object,o);
                            func.__n++;
                        }
                    }

                }

                func.__n = 0;

            }

            else {

                func = function() {
                    if(!self.paused) {
                        self.cloneObject(dyn_object,o);
                    }
                }

            }


            func.__phtime = time;
            func.__interN = null;

            return func;

        }

        var refFunc = getFunction();

        refFunc.__interN = setInterval(refFunc,refFunc.__phtime);

    }

    // Clone By Key

    if(widget.trigger === "key") {

        getFunction = function() {

            var kc = widget.key;

            var cloneByKeyFunc = function(e) {
                if(e.key === kc) {
                    self.cloneObject(dyn_object,o);
                }
            }

            return cloneByKeyFunc;

        }

        this.on("keydown",getFunction());

    }

}