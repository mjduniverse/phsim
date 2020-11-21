/**
 * @namespace
 * Namespace of functions used to move objects in various ways.
 */

PhSim.Motion = {}

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

PhSim.Motion.applyForce = function(dynObject,position,forceVector) {
	if(!dynObject.locked && !dynObject.permStatic) {
		return PhSim.Matter.Body.applyForce(dynObject.matter,position,forceVector);
	}
}


/**
 * 
 * Apply velocity to a dynamic object.
 * Velocity is ineffective against locked, semi-locked objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} velocityVector 
 */

PhSim.Motion.setVelocity = function(dynObject,velocityVector) {
	if(!dynObject.locked) {
		return PhSim.Matter.Body.setVelocity(dynObject.matter,velocityVector);
	}

}

/**
 * 
 * Apply a transformation to a dynamic object.
 * Transformation is ineffective against locked objects.
 * However, it moves semi-locked objects and permanetly static objects.
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Vector} translationVector 
 */

PhSim.Motion.translate = function(o,translationVector) {
	if(!o.locked) {

		if(o.path) {
			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = o.verts[i].x + translationVector.x;
				o.verts[i].y = o.verts[i].y + translationVector.y;
			}
		}

		if(o.circle || o.rectangle || o.regPolygon) {
				o.x = o.x + translationVector.x;
				o.y = o.y + translationVector.y;
		}

		if(!o.noDyn) {
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

PhSim.Motion.setPosition = function(dynObject,positionVector) {
	if(!dynObject.locked) {

		if(o.circle || o.regPolygon) {
				o.x = positionVector.x;
				o.y = positionVector.y;
		}

		if(o.rectangle) {

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

PhSim.Motion.rotate = function(dynObject,angle,point) {

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

PhSim.Motion.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			PhSim.Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			PhSim.Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return PhSim.Matter.Body.setAngle(dynObject.matter,angle);

	}
}