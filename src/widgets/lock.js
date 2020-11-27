PhSim.prototype.setLock = function(dynObject,value) {
    dynObject.locked = value;
	PhSim.Matter.Body.setStatic(dynObject.matter,value);
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
	PhSim.Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

PhSim.Widgets.toggleLock = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var o = dyn_object;

        var f = function() {
            self.toggleLock(o);
        }

        return f;
    }

    this.createWFunction(dyn_object,closure(),widget);
}

PhSim.Widgets.toggleSemiLock = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var o = dyn_object;

        var f = function() {
            self.toggleSemiLock(o);
        }

        return f;
    }

    this.createWFunction(dyn_object,closure(),widget);
}