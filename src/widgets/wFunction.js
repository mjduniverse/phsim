/**
 * A widget function is a function that used for the WidgetFunction widget.
 * The "this" keyword in the body of function refers to the current instance of
 * PhSim simulation.
 * 
 * @typedef {Function} WFunction
 */

/**
 * Array of widget functions
 * @type {WFunctions[]}
 */

PhSim.prototype.wFunctions = [];

/**
 * Create a widget function and push it to the wFunctions array.
 * @function
 * @param {String|Function} arg - content of function if string, function if function
 * @param {Object} thisRef - 
 * @returns {WFunction}
 */

PhSim.prototype.createWFunction = function(arg,thisRef) {

	if(typeof arg === "string") {
		var o = new Function(arg).bind(thisRef);
	}

	else if(typeof arg === "function") {
		var o = arg.bind(thisRef);
	}

	else {
		throw "Expecting \"function\" or \"string\" type";
	}

    return o;
}

PhSim.Widgets.wFunction = function(widget,dyn_object) {

    var self = this;

    var wf = self.createWFunction(widget.function,dyn_object);

    var closure = function() {

        var f = function(){
            wf();
        };

        return f;

    }

    var f = this.addSimpleEvent(widget.trigger,closure(),{
        ...widget,
        simpleEventObj: dyn_object
    });

}