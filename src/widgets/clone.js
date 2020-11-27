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
	obj.cloned = true;
    obj.cloneParent = dynObject;
    
    PhSim.Motion.setVelocity(obj,options.velocity);

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.PhEvent;
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

PhSim.Widgets.clone = function(dyn_object,widget) {

    var self = this;

    var o = {
        velocity: widget.vector
    }
    
    // Clone By Time

    if(widget.trigger === "time") {
    
        var getFunction = function() {

            var time = widget.time;
            var maxN = widget.maxN;

            var func = null;

            if(Number.isInteger(maxN)) {

                func = function(e) {

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

                func = function(e) {
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

        var getFunction = function() {

            var kc = widget.key;
            var vc = widget.vector;

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