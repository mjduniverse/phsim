/**
 * 
 * The `setColor` widget changes the color of an object.
 * It utlizies the {@link PhSim.DynObject.setColor} function.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Dynamic Object that will have it's color changed.
 * @param {WFunctionOptions} widget - Widget Options
 * @param {String} widget.color - The new color of the object.
 */

PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {
        
        var color = widget.color;
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(dyn_object,closure(),widget);
}

/**
 * 
 * The `setBorderColor` widget sets the border color of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Widget properties.
 * @param {String} widget.color - The new color of the object border
 */
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setBorderColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(dyn_object,closure(),widget);
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
 * 
 */
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var self = this;

    var f = function(){
        PhSim.DynObject.setLineWidth(dyn_object,widget.width);
    }

    var f = this.createWFunction(dyn_object,f,widget);
}