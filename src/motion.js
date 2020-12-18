const DynObject = require("./dynObject");

/**
 * Namespace of functions used to move objects in various ways.
 * @memberof PhSim
 * @namespace
 * 
 */

var Motion = {}

/**
 * 
 * Apply force to a dynamic object.
 * Force is ineffective against locked, semi-locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} position 
 * @param {Vector} forceVector
 *   
 */

Motion.applyForce = function(dynObject,position,forceVector) {
	if(!dynObject.locked && !dynObject.noDyn) {
		return PhSim.Matter.Body.applyForce(dynObject.matter,position,forceVector);
	}
}


/**
 * 
 * Apply velocity to a dynamic object.
 * Velocity does not effect locked, semi-locked objects or static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} velocityVector 
 */

Motion.setVelocity = function(dynObject,velocityVector) {
	if(!dynObject.locked) {
		return PhSim.Matter.Body.setVelocity(dynObject.matter,velocityVector);
	}

}

/**
 * 
 * Apply a transformation to a dynamic object.
 * Transformation does not move locked objects.
 * However, it moves semi-locked objects and static objects.
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Vector} translationVector 
 */

Motion.translate = function(o,translationVector) {
	if(!o.locked) {

		if(o.shape === "polygon") {
			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = o.verts[i].x + translationVector.x;
				o.verts[i].y = o.verts[i].y + translationVector.y;
			}
		}

		if(o.shape === "circle" || o.shape === "rectangle" || o.shape === "regPolygon") {
				o.x = o.x + translationVector.x;
				o.y = o.y + translationVector.y;
		}

		if(o instanceof DynObject) {
			return PhSim.Matter.Body.translate(o.matter,translationVector);
		}

	}
	
}

/**
 * Apply a transformation to a dynamic object.
 * Setting positions is ineffective against locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} positionVector 
 */

Motion.setPosition = function(dynObject,positionVector) {
	if(!dynObject.locked) {

		if(o.type === "circle" || o.type === "regPolygon") {
				o.x = positionVector.x;
				o.y = positionVector.y;
		}

		if(o.shape === "rectangle") {

		}

		PhSim.Matter.Body.setPosition(dynObject.matter,positionVector);
	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 * @param {Vector} point 
 */

Motion.rotate = function(dynObject,angle,point) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			PhSim.Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
		}

		return PhSim.Matter.Body.rotate(dynObject.matter, angle, point)

	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 */

Motion.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			PhSim.Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			PhSim.Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return PhSim.Matter.Body.setAngle(dynObject.matter,angle);

	}
}

module.exports = Motion;