/**
 * Namespace for functions that get the centroid (the center) of a {@link PhSimObject}.
 * @memberof PhSim
 * @namespace
 */

const Centroid = {}

/**
 * 
 * Get centroid of a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Vector}
 *  
 */

Centroid.rectangle = function(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}


/** 
 * Find Centroid of a polygon
 * @function
 * @param {Polygon} a - Path
 * @returns {Vector}
 */

Centroid.polygon = function(a) {
		
	var v = new PhSim.Vector(0,0);
	
	for(var j = 0; j < a.verts.length; j++) { 
		v.x += a.verts[j].x;
		v.y += a.verts[j].y;
	}
	
	v.x = (1/a.verts.length) * v.x;
	v.y = (1/a.verts.length) * v.y;
	
	return v;

}

module.exports = Centroid;