/**
 * 
 * Constraint Widget
 * 
 * @function
 * @memberof PhSim.Widgets
 * @param {PhSim} phsim 
 * @param {Object} widget
 * @param {LOAddress|PhSim.DynObject} widget.objectA - Object A
 * @param {LOAddress|PhSim.DynObject} widget.objectB - Object B
 */

function constraint(phsim,widget) {
    
    var b = {}

    if(widget.objectA) {

        if(widget.objectA instanceof PhSim) {
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

        if(widget.objectB instanceof PhSim) {
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

    var c = Matter.Constraint.create(b);

    Matter.World.add(phsim.matterJSWorld,c);

}

module.exports = constraint;