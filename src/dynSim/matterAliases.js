PhSim.DynSim.prototype.applyForce = function(dynObject,position,forceVector) {
	return Matter.Body.applyForce(dynObject.matter,position,forceVector);
}

PhSim.DynSim.prototype.setVelocity = function(dynObject,velocityVector) {
	return Matter.Body.setVelocity(dynObject.matter,velocityVector);
}

PhSim.DynSim.prototype.translate = function(dynObject,translationVector) {
	return Matter.Body.translate(dynObject.matter,translationVector);
}

PhSim.DynSim.prototype.setPosition = function(dynObject,positionVector) {
	Matter.Body.setPosition(dynObject.matter,positionVector);
}

PhSim.DynSim.prototype.rotate = function(dynObject,angle,point) {
	return Matter.Body.rotate(dynObject.matter, angle, point)
}

PhSim.DynSim.prototype.setAngle = function(dynObject,angle) {
	return Matter.Body.setAngle(dynObject.matter,angle);
}