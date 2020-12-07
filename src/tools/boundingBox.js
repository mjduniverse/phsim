/**
 * 
 * Get bounding box from an array of vertices.
 * 
 * 
 * @function
 * @param {Array} verts 
 */

PhSim.getVertBoundingBox = function(verts) {

	var verts = JSON.parse(JSON.stringify(verts));

	var o = {
		"smallX": null,
		"largeX": null,
		"smallY": null,
		"largeY": null,
		"w": null,
		"h": null,
		"x": null,
		"y": null,
		"upperLeftCorner": null,
		"upperRightCorner": null,
		"lowerLeftCorner": null,
		"lowerRightCorner": null,
		"rectangle": true,
	};

	verts.sort(function(a,b){
		return a.x - b.x;
	});

	o.smallX = verts[0].x;
	o.largeX = verts[verts.length - 1].x;

	verts.sort(function(a,b){
		return a.y - b.y;
	});

	o.smallY = verts[0].y;
	o.largeY = verts[verts.length - 1].y;

	o.w = o.largeX - o.smallX;
	o.h = o.largeY - o.smallY;
	o.x = o.smallX;
	o.y = o.smallY;

	return o;
}

/**
 * 
 * @param {Object} object - The Static Object
 * @returns {Object} 
 */

PhSim.getStaticBoundingBox = function(object) {
	
	if(object.shape === "polygon") {
		return PhSim.getVertBoundingBox(object.verts);
	}

	if(object.shape === "regPolygon") {
		return PhSim.getVertBoundingBox(PhSim.getRegPolygonVerts(object));
	}

	if(object.shape === "rectangle") {
		return PhSim.getVertBoundingBox(PhSim.getRectangleVertArray(object,true));
	}

	if(object.shape === "circle") {

		var ax = object.x - object.radius;
		var ay = object.y - object.radius;
		var bx = object.x + object.radius;
		var by = object.y + object.radius;

		return PhSim.diagRect(ax,ay,bx,by,0);
	}

	if(object.composite) {
		
		var a = [];

		for(var i = 0; i < object.objUniverse.length; i++) {
			a.push( PhSim.getRectangleVertArray( this.getStaticBoundingBox(object.objUniverse[i]) ) );
		}

		a = a.flat(Infinity);

		return PhSim.getVertBoundingBox(a);

	}
}

/**
 * 
 * Get bounding box of a static object
 * 
 * @function
 * @param {PhSim.DynObject} dynObj 
 */

PhSim.getDynBoundingBox = function(dynObj) {
	return {
		"x": dynObj.matter.bounds.min.x,
		"y": dynObj.matter.bounds.min.y,
		"w": dynObj.matter.bounds.max.x - dynObj.bounds.min.x,
		"h": dynObj.matter.bounds.max.y - dynObj.bounds.min.y,
	}
}