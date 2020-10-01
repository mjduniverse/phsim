/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

PhSim.Tools.addVectors = function(vector1,vector2) {
	return new PhSim.Objects.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

PhSim.Tools.subtractVectors = function(vector1,vector2) {
	return new PhSim.Objects.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * @param {Number} scalar 
 */

PhSim.Tools.scaleVector = function(vector,scalar) {
	return new PhSim.Objects.Vector(vector.x * scalar,vector.y * scalar)
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * @param {Number} scalar 
 */

PhSim.Tools.divideVector = function(vector,scalar) {
	return new PhSim.Objects.Vector(vector.x * (1/scalar),vector.y * (1/scalar));
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

PhSim.Tools.calcVertDistance = function(vector1,vector2) {
	
	var l1 = Math.pow(vector1.x - vector2.x,2);
	var l2 = Math.pow(vector1.y - vector2.y,2);

	return Math.sqrt(l1+l2);

}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * 
 */

PhSim.Tools.getVectorLength = function(vector) {
	return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2))
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 */

PhSim.Tools.getUnitVector = function(vector) {
	return PhSim.Tools.scaleVector(vector,1/PhSim.Tools.getVectorLength(vector));
}

/*** Vector Transformation */

PhSim.Tools.applyTransformation = function(a11,a12,a21,a22,x,y) {
	return {
		"x": a11 * x + a12 * y,
		"y": a21 * x + a22 * y   
	}
}

/*** Rotate Vector ***/

PhSim.Tools.rotatedVector = function(x,y,a) {
	return PhSim.Tools.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}