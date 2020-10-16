/**
 * 
 * Get centroid of a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {PhSim.Vector}
 *  
 */

PhSim.Tools.getRectangleCentroid = function(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}


/** 
 * Find Centroid of a path polygon
 * @function
 * @param {PhSim.Static.Path} a - Path
 * @returns {PhSim.Vector}
 */

PhSim.Tools.findCentroidOfPath = function(a) {
		
	var v = new PhSim.Vector(0,0);
	
	for(var j = 0; j < a.verts.length; j++) { 
		v.x += a.verts[j].x;
		v.y += a.verts[j].y;
	}
	
	v.x = (1/a.verts.length) * v.x;
	v.y = (1/a.verts.length) * v.y;
	
	return v;

}
