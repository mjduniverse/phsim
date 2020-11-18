PhSim.Widgets.draggable = function(widget,dyn_object) {
    
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
            self.removeEventListener("mousemove",__onmousemove);
            self.removeEventListener("mouseup",__onmouseup);
            self.removeEventListener("beforeupdate",__onbeforeupdate);
        }

        var __onbeforeupdate = function() {
            PhSim.Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
            self.setPosition(dyn_object,mV);
        }

        var __onmousedown = function(e) {
            if(self.pointInObject(dyn_object,e.x,e.y)) {

                delta.x = e.x - dyn_object.matter.position.x;
                delta.y = e.y - dyn_object.matter.position.y;

                self.addEventListener("mousemove",__onmousemove);
                self.addEventListener("mouseup",__onmouseup);
                self.addEventListener("beforeupdate",__onbeforeupdate);

                __onmousemove(e);
            }
        }
        
        self.addEventListener("mouseout",__onmouseup);

        return __onmousedown;

    }

    this.addEventListener("mousedown",func());
}