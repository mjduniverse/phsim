const Vector = require("../tools/vector");
const DynObject = require("../dynObject");
const { Vector } = require("matter-js");

/**
 * 
 * 
 * Constraint Widget
 * 
 * @function
 * @memberof PhSim.Widgets
 * @param {PhSim} phsim 
 * @param {Object} widget - Widget Options
 * @param {LOAddress|PhSim.DynObject} [widget.objectA] - Object A - First point.
 * @param {LOAddress|PhSim.DynObject} [widget.objectB] - Object B - Second Point
 * @param {Vector} [widget.pointA] - First point (see `widget.position` for more information)
 * @param {Vector} [widget.pointB] - Second point (see `widget.position` for more information)
 * @param {"relative"|"absolute"} [widget.position = "absolute"] - Positions of points. 
 * 
 * If set to `"relative"`, then the rules for positioning a point is the following:
 * 
 * * If `widget.objectA` is set, then `widget.pointA` defines the offset from the 
 * centroid of `widget.objectA`. Otherwise, the point is set to a point in the phsim space.
 * 
 * * If `widget.objectB` is set, then `widget.pointB` defines the offset from the centroid
 * of `widget.objectB`. Otherwise, the point is set to a point in the phsim space.
 * 
 * Note: If one is familar with Matter.js, then the rules are simular to rules of making a 
 * constraint are simular to those in Matter.js.
 * 
 * If set to `"absolute"`, then the rules for positioning a point is that the points 
 * are set to points in space. This is the default value.
 */

function constraint(phsim,widget) {

    var position = "absolute";

    if(widget.position === "relative") {
        position = "relative"
    } 
    
    else if(widget.position === "absolute") {
        position = "absolute";
    }
    
    var b = {}

    if(position === "absolute") {

        if(widget.objectA) {

            if(widget.objectA instanceof DynObject) {
                b.bodyA = widget.objectA.matter;
            }
    
            else {
    
                if(typeof widget.objectA.L === "number" && typeof widget.objectA.O === "number") {
                    b.bodyA = phsim.LO(widget.objectA.L,widget.objectA.O).matter;
                }
    
                else {
                    b.bodyA = optionMap.get(widget.objectA).matter;
                }
    
            }
    
        }
    
        if(widget.objectB) {
            b.bodyB = phsim.LO(widget.objectB.L,widget.objectB.O).matter;
    
            if(widget.objectB instanceof DynObject) {
                b.bodyB = widget.objectB.matter;
            }
    
            else {
    
                if(typeof widget.objectB.L === "number" && typeof widget.objectB.O === "number") {
                    b.bodyB = phsim.LO(widget.objectB.L,widget.objectB.O).matter;
                }
    
                else {
                    b.bodyB = optionMap.get(widget.objectB).matter;
                }
    
            }
    
        }
    
        if(widget.pointA) {
    
            if(widget.objectA) {
                b.pointA = Vector.subtract(widget.pointA,b.bodyA.position);
            }
    
            else {
                b.pointA = widget.pointA;
            }
    
        }
    
        if(widget.pointB) {
            
            if(widget.objectB) {
                b.pointB = Vector.subtract(widget.pointB,b.bodyB.position);
            }
    
            else {
                b.pointB = widget.pointB;
            }
        }

    }

    if(positon === "relative") {
        b.pointA = widget.pointA;
        b.pointB = widget.pointB;
        b.bodyA = widget.objectA.plugin.dynObject;
        b.bodyB = widget.objectB.plugin.dynObject;
    }

    var c = Matter.Constraint.create(b);

    Matter.World.add(phsim.matterJSWorld,c);

}

module.exports = constraint;