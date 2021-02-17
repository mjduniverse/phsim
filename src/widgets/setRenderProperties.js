const PhSim = require("../index");
const Widget = require("../widget")

/**
 * 
 * The `setColor` widget changes the color of an object.
 * It utlizies the {@link PhSim.DynObject.setColor} function.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Dynamic Object that will have it's color changed.
 * @param {WFunctionOptions} widget - Widget Options
 * @param {String} widget.color - The new color of the object.
 * @returns {PhSim.Widget}
 */

PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dynObject,widget);

    var f = function() {
        PhSim.DynObject.setColor(dyn_object,widget.color);
    }

    w.wFunction = self.createWFunction(dyn_object,f,widget);

    dyn_object.test1 = w;

    return w;

}

/**
 * 
 * The `setBorderColor` widget sets the border color of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Widget properties.
 * @param {String} widget.color - The new color of the object border
 * @returns {PhSim.Widget}
 * 
 */
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setBorderColor(obj,color);
        }

        return f;

    }

    w.wFunction = this.createWFunction(dyn_object,closure(),widget);

    return w;
}

/**
 * 
 * The `setLineWidth` widget sets the line width of an object.
 * 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The object to be affected.
 * @param {WFunctionOptions} widget - Widget options
 * @param {Number} widget.width - New line width
 * @returns {PhSim.Widget}
 * 
 */
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var f = function(){
        PhSim.DynObject.setLineWidth(dyn_object,widget.width);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
}