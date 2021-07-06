const DynObject = require("../dynObject")
const PhSim = require("../index");
const Widget = require("../widget");
/**
 * 
 * Call ObjLink functions
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */


PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * The `objLink` widget executes all functions in the {@link PhSim.DynObject#objLinkFunctions}
 * array of `widget.target`. 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Reciever Object
 * @param {WFunctionOptions} widget - Widget options
 * @param {LOAddress|PhSim.DynObject} widget.target -  Target object
 */

PhSim.Widgets.objLink = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var self = this;
    var targetObj;
    var widgetO = widget;

    this.on("load",function(){

        if(typeof widget.target.L === "number" && typeof widget.target.O === "number") {
            targetObj = self.LO(widgetO.target.L,widgetO.target.O);
        }

        else if(widget.target instanceof DynObject) {
            targetObj = widget.target;     
        }
    
        var eventFunc = function(){
            self.callObjLinkFunctions(targetObj);
        } 
    
        w.wFunction = self.createWFunction(dyn_object,eventFunc,widget);

    },{
        slEvent: true
    });
    
    return w;
    
}