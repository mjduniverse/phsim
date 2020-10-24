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

PhSim.prototype.applyForce = function(dynObject,position,forceVector) {
	if(!dynObject.locked && !dynObject.permStatic) {
		return Matter.Body.applyForce(dynObject.matter,position,forceVector);
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

PhSim.prototype.setVelocity = function(dynObject,velocityVector) {
	if(!dynObject.locked) {
		return Matter.Body.setVelocity(dynObject.matter,velocityVector);
	}

	if(dynObject.noDyn) {

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

PhSim.prototype.translate = function(o,translationVector) {
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
			return Matter.Body.translate(o.matter,translationVector);
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

PhSim.prototype.setPosition = function(dynObject,positionVector) {
	if(!dynObject.locked) {

		if(o.circle || o.regPolygon) {
				o.x = positionVector.x;
				o.y = positionVector.y;
		}

		if(o.rectangle) {

		}

		Matter.Body.setPosition(dynObject.matter,positionVector);
	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 * @param {Vector} point 
 */

PhSim.prototype.rotate = function(dynObject,angle,point) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
		}

		return Matter.Body.rotate(dynObject.matter, angle, point)

	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 */

PhSim.prototype.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return Matter.Body.setAngle(dynObject.matter,angle);

	}
}