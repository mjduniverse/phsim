
/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function getRegPolygonVerts
 * @param {PhSim.Objects.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Objects.Vector[]}
 * 
 */

PhSim.Tools.getRegPolygonVerts = function(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new PhSim.Objects.Vector(x,y));
	}

	return a;

}


/* 

Rectangles

*/

PhSim.Tools.getRectangleVertArray = function(rectangle) {

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

	Matter.Vertices.rotate(a, rectangle.cycle, PhSim.Tools.getRectangleCentroid(rectangle));


	return a;

}


PhSim.Tools.getRectangleCorners = function(rectangle) {


	var a = PhSim.Tools.getRectangleVertArray(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}