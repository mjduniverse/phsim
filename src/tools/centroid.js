/**
 * Namespace for functions that get the centroid (the center) of a {@link PhSimObject}.
 * @memberof PhSim
 * @namespace
 */

const Centroid = {}

/**
 * Get centroid of any shape.
 * If it is a circle or a regPolygon, then `o` is returned because the properties `x` and
 * `y` already define the centroid of the object.
 * 
 * @param {PhSimObject} o 
 * @returns {Vector}
 */

Centroid.shape = function(o) {
	
	if(o.shape === "rectangle") {
		return Centroid.rectangle(o);
	}

	if(o.shape === "polygon") {
		return Centroid.polygon(o)
	}

	if(o.shape === "circle" || o.shape === "regPolygon") {
		return o;
	}

}

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