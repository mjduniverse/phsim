/**
 * 
 * Get centroid of a rectangle
 * 
 * @function getRectangleCentroid
 * @param {PhSim.Objects.Rectangle} rectangle
 * @returns {PhSim.Objects.Vector}
 *  
 */

PhSim.Tools.getRectangleCentroid = function(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}


/*** Find Centroid of a path polygon ***/

PhSim.Tools.findCentroidOfPath = function(a) {
		
	var v = {
		x: 0,
		y: 0,
	}
	
	for(var j = 0; j < a.verts.length; j++) { 
		v.x += a.verts[j].x;
		v.y += a.verts[j].y;
	}
	
	v.x = (1/a.verts.length) * v.x;
	v.y = (1/a.verts.length) * v.y;
	
	return v;

}
