export var applyForce = function(dynObject,position,forceVector) {
	return Matter.Body.applyForce(dynObject.matter,position,forceVector);
}

export var setVelocity = function(dynObject,velocityVector) {
	return Matter.Body.setVelocity(dynObject.matter,velocityVector);
}

export var translate = function(dynObject,translationVector) {
	return Matter.Body.translate(dynObject.matter,translationVector);
}

export var setPosition = function(dynObject,positionVector) {
	Matter.Body.setPosition(dynObject.matter,positionVector);
}

export var rotate = function(dynObject,angle,point) {
	return Matter.Body.rotate(dynObject.matter, angle, point)
}

export var setAngle = function(dynObject,angle) {
	return Matter.Body.setAngle(dynObject.matter,angle);
}