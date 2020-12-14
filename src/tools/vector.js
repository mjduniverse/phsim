/** 
 * Constructor for the minimal requirements for being a {@link Vector}.
 *  
 * @memberof PhSim
 * @constructor
 * @param {Number} x 
 * @param {Number} y
 * 
 */

var Vector = function(x,y) {
	
	/**
	 * x-coordinate of the vector
	 * @type {Number}
	 */
	
	this.x;

	/**
	 * y-coordinate of the vector
	 * @type {Number}
	 */
	
	this.y;

	if(typeof x === "number") {
		this.x = x;
	}

	else {
		console.trace();
		throw "Expecting a number in argument 1";
	}

	if(typeof y === "number") {
		this.y = y;
	}

	else {
		console.trace()
		throw "Expecting a number in argument 2"
	}

}

/**
 * 
 * Perform vector addition
 * 
 * @function
 * @param {Vector} vector1 - The first vector
 * @param {Vector} vector2 - The second vector
 * 
 * @param {Boolean} [newObj = true] - Boolean that determines the return value. 
 * If true, then it returns a new Vector object `vector` such that 
 * `vector.x === vector1.x + vector2.x` and `vector.x === vector1.y + vector2.y`
 * 
 * If false, then `vector2.x` is added to `vector1.x`, `vector2.y` is added to `vector1.y`
 * and then `vector1` is returned.
 * 
 * @returns {Vector} - The sum of the two vectors. New object if `newObj` is true. Returns
 * `vector1` otherwise. 
 */

Vector.add = function(vector1,vector2,newObj = true) {
	
	if(newObj) {
		return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
	}

	else {
		vector1.x = vector1.x + vector2.x;
		vector1.y = vector1.y + vector2.y;
		return vector1;
	}

}

/**
 * 
 * Perform vector subtraction
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * 
 * * @param {Boolean} [newObj = true] - Boolean that determines the return value. 
 * If true, then it returns a new Vector object `vector` such that 
 * `vector.x === vector1.x - vector2.x` and `vector.x === vector1.y - vector2.y`
 * 
 * If false, then `vector2.x` is subtracted from `vector1.x`, `vector2.y` is subtracted 
 * from `vector1.y` and then `vector1` is returned.
 * 
 * @returns {Vector} - The difference between the two vectors. New object if `newObj` is true. Returns
 * `vector1` otherwise. 
 */

Vector.subtract = function(vector1,vector2,newObj = true) {

	if(newObj) {
		return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);	}

	else {
		vector1.x = vector1.x - vector2.x;
		vector1.y = vector1.y - vector2.y;
		return vector1;
	}

}

/**
 * 
 * Multiply a vector by a scalar
 * 
 * @function
 * @param {Vector} vector 
 * @param {Number} scalar
 * @returns {Vector} 
 * 
 */

Vector.scale = function(vector,scalar) {
	return new Vector(vector.x * scalar,vector.y * scalar)
}

/**
 * 
 * Divide a vector by a scalar
 * 
 * @function
 * @param {Vector} vector 
 * @param {Number} scalar
 * @returns {Vector} 
 *  
 */

Vector.divide = function(vector,scalar) {
	return new Vector(vector.x * (1/scalar),vector.y * (1/scalar));
}

/**
 * 
 * Get distance between two vectors.
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2
 * @returns - The vector distance
 *  
 */

Vector.distance = function(vector1,vector2) {
	
	var l1 = Math.pow(vector1.x - vector2.x,2);
	var l2 = Math.pow(vector1.y - vector2.y,2);

	return Math.sqrt(l1+l2);

}

/**
 * 
 * Get length of the vector
 * 
 * @function
 * @param {Vector} vector 
 * @returns {Number} - The length of the vector
 */

Vector.getLength = function(vector) {
	return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2))
}

/**
 * 
 * Get normalized vector of some vector.
 * 
 * @function
 * @param {Vector} vector - Vector to normalize.
 * @returns {Vector} -  The Unit Vector
 */

Vector.unitVector = function(vector) {
	return Vector.scale(vector,1/Vector.getLength(vector));
}

/**
 * Apply a linear transformation defined by a 2x2 matrix to a vector.
 * 
 * @function
 * @param {Number} a11 - Element found in row 1, column 1
 * @param {Number} a12 - Element found in row 1, column 2
 * @param {Number} a21 - Element found in row 2, column 1
 * @param {Number} a22 - Element found in row 2, column 2
 * @param {Number} x - x-coordinate of vector to be transformed
 * @param {Number} y - y-coordinate of vector to be transformed
 * @returns - The transformed vector 
 */

Vector.applyTransformation = function(a11,a12,a21,a22,x,y) {
	return new Vector(a11 * x + a12 * y,a21 * x + a22 * y);
}

/**
 * 
 * Rotate a vector (x,y) by angle a
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} a - Angle in radians
 * @returns {Vector}
 */

Vector.rotate = function(x,y,a) {
	return Vector.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}

/**
 * Get SVG point
 * @param {Number} x 
 * @param {Number} y
 * @returns {String} - SVG Vector String 
 */

Vector.svgVector = function(x,y) {
	return x + "," + y;
}

module.exports = Vector;