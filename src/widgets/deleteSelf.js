const PhSim = require("../index");
const Widget = require("../widget");

/**
 * 
 * The deleteSelf widget makes an object delete itself from the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The Dynamic Object to be configured.
 * @param {WFunctionOptions} widget - Configuration options
 */

PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var self = this;
    
    var f = function(){
        self.removeDynObj(dyn_object);
        self.disableWFunction(w.wFunction);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;

}