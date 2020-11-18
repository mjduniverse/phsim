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


PhSim.Widgets.objLink_a = function() {
    
    var widgetO = widget;

    this.addEventListener("matterJSLoad",function(){
        var eventFuncClosure = function() {

            var targetObj = self.LO(widgetO.target.L,widgetO.target.O);

            var eventFunc = function(){
                self.callObjLinkFunctions(targetObj);
            } 

            return eventFunc;
        
        }


        var options = {
            ...widgetO,
            simpleEventObj: dyn_object
        }

        var f = self.addSimpleEvent(widgetO.trigger,eventFuncClosure(),options);
    });

}