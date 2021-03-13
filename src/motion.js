const DynObject = require("./dynObject");
const Centroid = require("./tools/centroid");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

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
		return Matter.Body.applyForce(dynObject.matter,position,forceVector);
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
		return Matter.Body.setVelocity(dynObject.matter,velocityVector);
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
			for(let i = 0; i < o.verts.length; i++) {
				o.verts[i].x = o.verts[i].x + translationVector.x;
				o.verts[i].y = o.verts[i].y + translationVector.y;
			}
		}

		if(o.shape === "circle" || o.shape === "rectangle" || o.shape === "regPolygon") {
				o.x = o.x + translationVector.x;
				o.y = o.y + translationVector.y;
		}

		if(o instanceof DynObject) {
			return Matter.Body.translate(o.matter,translationVector);
		}

	}
	
}

/**
 * Apply a transformation to a dynamic object.
 * Setting positions is ineffective against locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} o 
 * @param {Vector} position 
 */

Motion.setPosition = function(o,position) {

	var c;

	if(!o.locked) {

		if(o.shape === "circle" || o.shape === "regPolygon") {
			o.x = position.x;
			o.y = position.y;
		}

		if(o.shape === "rectangle") {
			c = Centroid.rectangle(o);
			o.x = (o.x - c.x) + position.x;
			o.y = (o.y - c.y) + position.y;
		}

		if(o.shape === "polygon") {

			c = Centroid.polygon(o)

			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = (o.verts[i].x - c.x) + position.x;
				o.verts[i].y = (o.verts[i].y - c.y) + position.y;
			}

		}

		if(o instanceof DynObject) {
			Matter.Body.setPosition(o.matter,position);
		}

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
			Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
		}

		return Matter.Body.rotate(dynObject.matter, angle, point)

	}
}

/**
 * Rotate dynamic object towards point
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} point 
 */

Motion.rotateTowards = function(dynObject,point) {

	var a = Math.atan2(point.y - dynObject.matter.position.y ,point.x - dynObject.matter.position.x)

	Motion.rotate(dynObject,a,dynObject.matter.position);
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 */

Motion.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return Matter.Body.setAngle(dynObject.matter,angle);

	}
}

module.exports = Motion;