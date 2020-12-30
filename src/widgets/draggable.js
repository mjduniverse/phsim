// Try to import matter-js as a commonJS module

try {
	const Matter = require("matter-js");
}

catch {
	
}

/**
 * The `draggable` widget makes {@link PhSim.DynObject} objects draggable.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @this PhSim
 * @param {*} widget 
 */

PhSim.Widgets.draggable = function(dyn_object,widget) {

    var self = this;
    
    var func = function(e) {

        var change = false;
        var __ismoving = true;
        var constraint = null;

        // Displacement vector between mouse and centroid of object when the mouse is pushed downwards.

        var delta = {}

        // Mouse Position

        var mV = {
            x: null,
            y: null
        }

        var __onmousemove = function(e) {
            mV.x = e.x - delta.x;
            mV.y = e.y - delta.y;
        }

        var __onmouseup = function() {
            self.off("mousemove",__onmousemove);
            self.off("mouseup",__onmouseup);
            self.off("beforeupdate",__onbeforeupdate);
        }

        var __onbeforeupdate = function() {
            Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
            PhSim.Motion.setPosition(dyn_object,mV);
        }

        var __onmousedown = function(e) {
            if(self.pointInObject(dyn_object,e.x,e.y)) {

                delta.x = e.x - dyn_object.matter.position.x;
                delta.y = e.y - dyn_object.matter.position.y;

                self.on("mousemove",__onmousemove);
                self.on("mouseup",__onmouseup);
                self.on("beforeupdate",__onbeforeupdate);

                __onmousemove(e);
            }
        }
        
        self.on("mouseout",__onmouseup);

        return __onmousedown;

    }

    this.on("mousedown",func());
}