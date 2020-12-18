const Static = require("../objects");

/**
 * Get bounding box from an array of vectors.
 * 
 * @constructor
 * @memberof PhSim
 * @extends PhSim.Options.Rectangle
 * @param {Vector[]} verts 
 */

const BoundingBox = function(verts) {

	verts.sort(function(a,b){
		return a.x - b.x;
	});

	/**
	 * The x coordinate of the left most vertex of `verts`.
	 * @type {Number}
	 */

	this.smallX = verts[0].x;

	/**
	 * The x coordinate of the right most vertex of `verts`.
	 * @type {Number}
	 */

	this.largeX = verts[verts.length - 1].x;

	verts.sort(function(a,b){
		return a.y - b.y;
	});

	this.smallY = verts[0].y;
	this.largeY = verts[verts.length - 1].y;

	var w = this.largeX - this.smallX;
	var h = this.largeY - this.smallY;
	var x = this.smallX;
	var y = this.smallY;

	Static.Rectangle.call(this,w,h,x,y);

}

/**
 * Get bounding box of PhSim shape.
 * @param {PhSimObject} object - The Static Object
 * @returns {PhSim.BoundingBox} 
 */

PhSim.BoundingBox.fromShape = function(object) {
	
	if(object.shape === "polygon") {
		return new BoundingBox(object.verts);
	}

	if(object.shape === "regPolygon") {
		return new BoundingBox(PhSim.getRegPolygonVerts(object));
	}

	if(object.shape === "rectangle") {
		return new BoundingBox(PhSim.getRectangleVertArray(object,true));
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

		return new BoundingBox(a);

	}
}

module.exports = BoundingBox;