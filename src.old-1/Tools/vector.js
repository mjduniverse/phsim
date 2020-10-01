// Vector Math

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

export var addVectors = function(vector1,vector2) {
	return new PhSim.Objects.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

export var subtractVectors = function(vector1,vector2) {
	return new PhSim.Objects.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * @param {Number} scalar 
 */

export var scaleVector = function(vector,scalar) {
	return new PhSim.Objects.Vector(vector.x * scalar,vector.y * scalar)
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * @param {Number} scalar 
 */

export var divideVector = function(vector,scalar) {
	return new PhSim.Objects.Vector(vector.x * (1/scalar),vector.y * (1/scalar));
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

export var calcVertDistance = function(vector1,vector2) {
	
	var l1 = Math.pow(vector1.x - vector2.x,2);
	var l2 = Math.pow(vector1.y - vector2.y,2);

	return Math.sqrt(l1+l2);

}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * 
 */

export var getVectorLength = function(vector) {
	return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2))
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 */

export var getUnitVector = function(vector) {
	return PhSim.Tools.scaleVector(vector,1/PhSim.Tools.getVectorLength(vector));
}

/*** Rotate Vector ***/

export var rotatedVector = function(x,y,a) {
	return PhSim.Tools.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}