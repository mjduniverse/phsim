const Static = require("../objects");
const Centroid = require("./centroid");
const Vector = require("./vector");

const Vertices = {}

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function
 * @param {PhSim.Static.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Vector[]}
 * 
 */

Vertices.regPolygon = function(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new Vector(x,y));
	}

	return a;

}


/**
 * 
 * Get vertices for a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Object[]} 
 */

Vertices.rectangle = function(rectangle) {

	var a = [

			{
				"x": rectangle.x,
				"y": rectangle.y,
				"topLeft": true
			},
	
			{
				"x": rectangle.x + rectangle.w,
				"y": rectangle.y,
				"topRight": true
			},

			{
				"x": rectangle.x + rectangle.w,
				"y": rectangle.y + rectangle.h,
				"bottomRight": true
			},
	
			{
				"x": rectangle.x,
				"y": rectangle.y + rectangle.h,
				"bottomLeft": true
			}
	
	];

	if(rectangle.cycle) {
		Matter.Vertices.rotate(a, rectangle.cycle, Centroid.rectangle(rectangle));
	}

	return a;

}

/**
 * 
 * Get rectangle corners
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle 
 * @returns {Object}
 */


Vertices.getRectangleCorners = function(rectangle) {


	var a = Vertices.rectangle(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}

/**
 * Get vertices for regular polygon inscribed in circle.
 * @param {Circle} circle 
 * @param {Number} sides 
 */

Vertices.inscribedRegPolygonCircle = function(circle,sides) {
	return new Static.RegPolygon(circle.x,circle.y,circle.radius,sides);
}

/**
 * Returns the vertices for a regular polygon inscribed in the circle. It has 25 sides.
 * This is meant to create a regular polygon that is used to create Matter.js circles.
 * 
 * @param {Circle} circle 
 * 
 */

Vertices.inscribedMatterCirclePolygon = function(circle) {
	return Vertices.inscribedRegPolygonCircle(circle,25);
}

/**
 * Get verticles of PhSim objects
 * @param {*} o 
 */

Vertices.object = function(o) {

	if(o.shape === "rectangle") {
		return Vertices.rectangle(o);
	}

	if(o.shape === "regPolygon") {
		return Vertices.regPolygon(o);
	}

	if(o.shape === "polygon") {
		return o.shape.verts;
	}

	if(o.shape === "circle") {

	}

}

module.exports = Vertices;