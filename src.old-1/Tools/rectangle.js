/*** 
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2)
 * 
 * ***/

export function diagRect(x1,y1,x2,y2,a) {

	var v = {
		"x": x2 - x1,
		"y": y2 - y1
	}

	v = {
		"x": v.x * Math.cos(-a) - v.y * Math.sin(-a),
		"y": v.x * Math.sin(-a) + v.y * Math.cos(-a)
	}

	v = {
		"x": v.x + x1,
		"y": v.y + y1
	}

	x2 = v.x;
	y2 = v.y;

	return new PhSim.Objects.Rectangle(x,y,x2-x1,y2-y1);
 }



/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function getRegPolygonVerts
 * @param {PhSim.Objects.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Objects.Vector[]}
 * 
 */

export function getRegPolygonVerts(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new PhSim.Objects.Vector(x,y));
	}

	return a;

}

export function getRectangleVertArray(rectangle) {

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

/**
 * 
 * Get centroid of a rectangle
 * 
 * @function getRectangleCentroid
 * @param {PhSim.Objects.Rectangle} rectangle
 * @returns {PhSim.Objects.Vector}
 *  
 */

export function getRectangleCentroid(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}

export function getRectangleCorners(rectangle) {


	var a = PhSim.Tools.getRectangleVertArray(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}

/**
 * 
 * Get bounding box from an array of vertices.
 * 
 * 
 * @function getVertBoundingBox
 * @param {Array} verts 
 */

export function getVertBoundingBox(verts) {

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

export function getStaticBoundingBox(object) {
	
	if(object.path) {
		return PhSim.Tools.getVertBoundingBox(object.verts);
	}

	if(object.regPolygon) {
		return PhSim.Tools.getVertBoundingBox(PhSim.Tools.getRegPolygonVerts(object));
	}

	if(object.rectangle) {
		return PhSim.Tools.getVertBoundingBox(PhSim.Tools.getRectangleVertArray(object,true));
	}

	if(object.circle) {

		var ax = object.x - object.radius;
		var ay = object.y - object.radius;
		var bx = object.x + object.radius;
		var by = object.y + object.radius;

		return PhSim.Tools.diagRect(ax,ay,bx,by,0);
	}

	if(object.composite) {
		
		var a = [];

		for(var i = 0; i < object.objUniverse.length; i++) {
			a.push( PhSim.Tools.getRectangleVertArray( this.getStaticBoundingBox(object.objUniverse[i]) ) );
		}

		a = a.flat(Infinity);

		return PhSim.Tools.getVertBoundingBox(a);

	}
}

/**
 * 
 * Get bounding box of a static object
 * 
 * @function getDynBoundingBox
 * @param {PhSim.DynObject} dynObj 
 */

export function getDynBoundingBox(dynObj) {
	return {
		"x": dynObj.matter.bounds.min.x,
		"y": dynObj.matter.bounds.min.y,
		"w": dynObj.matter.bounds.max.x - dynObj.bounds.min.x,
		"h": dynObj.matter.bounds.max.y - dynObj.bounds.min.y,
	}
}

/**
 * 
 * Get the special points of a rectangle
 * 
 * @function getSpecialRectanglePoints
 * @param {Object} rectangle 
 */

export function getSpecialRectanglePoints(rectangle) {
	
	var o = {

		"center": {
			"rel": {
				"x": 0.5 * rectangle.w,
				"y": 0.5 * rectangle.h
			},
	
			"abs": {
				"x": rectangle.x + o.center.rel.x,
				"y": rectangle.h + o.center.rel.y
			},
		},

		"sidepoint": {

			"rel": {
				"x": rectangle.w,
				"y": 0.5 * rectangle.h
			},

			"abs": {
				"x": o.sidepoint.rel.x + rectangle.x,
				"y": o.sidepoint.rel.y + rectangle.y 
			}

		},

	}

	return o;

}

/**
 * 
 * @param {Number} cx - x-coordinate of upper left corner.
 * @param {Number} cy - y-coordinate of upper left corner.
 * @param {Number} cw - width of rectangle
 * @param {Number} ch - height of rectangle
 * @param {Number} px - x-coordinate of point to be checked.
 * @param {Number} py - y-coordinate of point to be checked.
 */

export function isPointInRawRectangle (cx,cy,cw,ch,px,py) {
	
	var cond = (cx < px) && (px < cx + cw) && (cy < py) && (py < cy + ch) 

	if(cond) {
		return true;
	}

	else {
		return false;
	}
}

/*** Polygon ***/



/*

Gradient Object

*/
