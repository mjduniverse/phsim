
/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function
 * @param {PhSim.Static.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Vector[]}
 * 
 */

PhSim.getRegPolygonVerts = function(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new PhSim.Vector(x,y));
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

PhSim.getRectangleVertArray = function(rectangle) {

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

	PhSim.Matter.Vertices.rotate(a, rectangle.cycle, PhSim.getRectangleCentroid(rectangle));


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


PhSim.getRectangleCorners = function(rectangle) {


	var a = PhSim.getRectangleVertArray(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}