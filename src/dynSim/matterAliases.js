/**
 * @function
 * @param {PhSim.Objects.DynObject} dynObject 
 * @param {PhSim.Vector} position 
 * @param {PhSim.Vector} forceVector 
 */

PhSim.DynSim.prototype.applyForce = function(dynObject,position,forceVector) {
	return Matter.Body.applyForce(dynObject.matter,position,forceVector);
}


/**
 * @function
 * @param {PhSim.Objects.DynObject} dynObject 
 * @param {PhSim.Vector} velocityVector 
 */

PhSim.DynSim.prototype.setVelocity = function(dynObject,velocityVector) {
	return Matter.Body.setVelocity(dynObject.matter,velocityVector);
}

/**
 * @function
 * @param {PhSim.Objects.DynObject} dynObject 
 * @param {PhSim.Vector} translationVector 
 */

PhSim.DynSim.prototype.translate = function(dynObject,translationVector) {
	return Matter.Body.translate(dynObject.matter,translationVector);
}

/**
 * @function
 * @param {PhSim.Objects.DynObject} dynObject 
 * @param {PhSim.Vector} positionVector 
 */

PhSim.DynSim.prototype.setPosition = function(dynObject,positionVector) {
	Matter.Body.setPosition(dynObject.matter,positionVector);
}

/**
 * @function
 * @param {PhSim.Objects.DynObject} dynObject 
 * @param {Number} angle 
 * @param {PhSim.Vector} point 
 */

PhSim.DynSim.prototype.rotate = function(dynObject,angle,point) {

	if(dynObject.skinmesh) {
		Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
	}

	return Matter.Body.rotate(dynObject.matter, angle, point)
}

/**
 * @function
 * @param {PhSim.Objects.DynObject} dynObject 
 * @param {Number} angle 
 */

PhSim.DynSim.prototype.setAngle = function(dynObject,angle) {

	if(dynObject.skinmesh) {
		Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
		Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
	}

	return Matter.Body.setAngle(dynObject.matter,angle);
}