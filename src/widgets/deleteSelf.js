const PhSim = require("../index");

/**
 * 
 * The deleteSelf widget makes an object delete itself from the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The Dynamic Object to be configured.
 * @param {WFunctionOptions} widget - Configuration options
 */

PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var self = this;
    
    var ref;

    var f = function(){
        self.removeDynObj(dyn_object);
        self.disableWFunction(ref);
    }

    ref = this.createWFunction(dyn_object,f,widget);

}