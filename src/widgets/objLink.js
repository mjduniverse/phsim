/**
 * 
 * Call ObjLink functions
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

const DynObject = require("../dynObject");

PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * The `objLink_a` widget executes all functions in the {@link PhSim.DynObject#objLinkFunctions}
 * array of `widget.target`. 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Reciever Object
 * @param {WFunctionOptions} widget - Widget options
 * @param {LOAddress|PhSim.DynObject} widget.target -  Target object
 */

PhSim.Widgets.objLink_a = function(dyn_object,widget) {

    var self = this;
    
    var widgetO = widget;

    this.on("load",function(){

        if(typeof widget.target.L === "number" && typeof widget.target.O === "number") {
            var targetObj = self.LO(widgetO.target.L,widgetO.target.O);
        }

        else if(widget.target instanceof DynObject) {
            var targetObj = widget.target;     
        }
    
        var eventFunc = function(){
            self.callObjLinkFunctions(targetObj);
        } 
        
        var options = {
            ...widgetO,
            wFunctionObj: dyn_object
        }
    
        var f = self.createWFunction(widgetO.trigger,eventFunc,options);

    });

}