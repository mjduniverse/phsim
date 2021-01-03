// Try to import matter-js as a commonJS module

try {
	const Matter = require("matter-js");
}

catch {
	
}

/**
 * 
 * The `elevator` widget makes objects go back and forth within some range.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Options
 * @param {Vector} widget.pointA - First point of the elevator
 * @param {Vector} widget.pointB - Second point of the elevator
 * @param {"x"|"y"} widget.bounding - Rules for deteriming the range of the elevator. 
 * 
 * If `widget.bounding` is equal to `"x"`, then the elevator switches direction if the
 * `x` value of the position of `dyn_object` is equal to `widget.pointA.x` or `widget.pointB.x`.
 * 
 * If `widget.bounding` is equal to `"y"`, then the elevator switches direction if the
 * `y` value of the position of `dyn_object` is equal to `widget.pointA.y` or `widget.pointB.y`.
 * 
 */

PhSim.Widgets.elevator = function(dyn_object,widget) {
            
    var self = this;
    
    var func = function() {
    
        var bounding = widget.bounding;

        var obj = dyn_object;
        var relVec = PhSim.Vector.subtract(widget.pointB,widget.pointA);
        
        var u = PhSim.Vector.unitVector(relVec);
        
        var ax;
        var ay;
        var bx;
        var by;
        
        // Corrections
        
        var reversable = true;
        
        // Condition function for checking if object is in bounds
        
        var cond_f = function() {}
        
        if(bounding === "x") {

            if(widget.pointA.x < widget.pointB.x) {
                ax = widget.pointA.x;
                bx = widget.pointB.x;
            }
            
            if(widget.pointB.x < widget.pointA.x) {
               ax = widget.pointB.x;
               bx = widget.pointA.x;
            }
        
            cond_f = function() {
                return (ax <= obj.matter.position.x) && (obj.matter.position.x <= bx);
            }
        
        }
        
        if(bounding === "y") {

            if(widget.pointA.y < widget.pointB.y) {
                ay = widget.pointA.y;
                by = widget.pointB.y;
            }
            
            if(widget.pointB.y < widget.pointA.y) {
               ay = widget.pointB.y;
               by = widget.pointA.y;
            }
        
            cond_f = function() {
                return (ay <= obj.matter.position.y) && (obj.matter.position.y <= by);
            }
        
        }
        
        // Set body static
        
        Matter.Body.setStatic(dyn_object.matter,true);
        
        // Event function

        var inRange = function() {

        if( cond_f() ) {
        PhSim.Motion.translate(obj,PhSim.Vector.scale(u,1));
                reversable = true;
        }
          
            else {
            
                if(reversable) {

                    u = {
                        "x": -u.x,
                        "y": -u.y
                    }

                    reversable = false;
                }

                else {
                    PhSim.Motion.translate(obj,PhSim.Vector.scale(u,1));
                }
            
            }
            

        }

        return inRange


    }

    this.on("afterupdate",func());

}