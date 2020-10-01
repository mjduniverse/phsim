var Objects = {};

/*** 
 * Vector 
 * 
 * @param {Number} x 
 * @param {Number} y
 * 
 */

Objects.Vector = function(x, y) {
	this.x = x;
	this.y = y;
}

Objects.GradientLimits = function(x0,y0,x1,y1) {
    this.start = new Vector(x0,y0);
    this.end = new Vector(x1,y1);
}

Objects.GradientStop = function(pos,color) {
	this.color = color;
	this.pos = pos;
}


Objects.Gradient = function() {
	this.stops = [];
	this.name = "";

	this.limits = {

		start: {
			x: null,
			y: null
		},

		end: {
			x: null,
			y: null
		}

	};
}

Objects.lclGradient = function() {
	this.src = null;
	this.limits = new Objects.GradientLimits(x0,y0,x1,y1);
	this.type = "linear";
}


Objects.Path = function() {

	/**
	 * Array of vectors defining a path or a polygon
	 * @type {Objects.Vector}
	 */

	this.verts = [];

	/**
	 * Boolean indicating it is a path
	 * @type {Boolean}
	 */

	this.path = true;
}


/**
 * Circle constructor
 * 
 */

Objects.Circle = function() {

	/**
	 * Boolean indicating a circle
	 * @type {Boolean}
	 */

	this.circle = true,

	/**
	 * x-coordinate of the center
	 * @type {Number}
	 */

	this.x = null;

	/**
	 * y-coordinate of the center
	 * @type {Number}
	 */

	this.y = null;

	/**
	 * Radius of the circle
	 * @type {Number}
	 */

	this.radius = null

	/**
	 * Angle of the circle
	 * @type {Number}
	 */

	this.cycle = null;
}

/**
 * Regular Polygon Constructor
 */

Objects.RegPolygon = function(x,y,r,n) {

	/**
	 * Boolean for indicating a regular polygon
	 * @type {Boolean}
	 */

	this.regPolygon =  true;

	/**
	 * x-coordinate of the center of the regular polygon
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate for the center of the regular polygon
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * The radius of the regular polygon
	 * @type {Number}
	 */

	this.radius = r;

	/**
	 * The angle of the regular polygon
	 * @type {Number}
	 */

	this.cycle = null;

	/**
	 * The number of sides the regular polygon has
	 * @type {Number}
	 */

	this.sides = n;
}

/**
 * 
 * Constructor for a static Rectangle
 * 
 * @constructor Rectangle
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * 
 */

Objects.Rectangle = function(x,y,w,h) {

	/**
	 * Boolean for indicating a rectangle
	 * @type {Boolean}
	 */

	this.rectangle = true;

	/**
	 * x-coordinate of the upper left corner of the rectangle
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate of the upper left corner of the rectangle
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Width of rectangle
	 * @type {Number}
	 */

	this.w = w;

	/**
	 * Height of rectangle
	 * @type {Number}
	 */

	this.h = h;

	/**
	 * Angle of rectangle
	 * @type {Number}
	 */

	this.cycle = 0;
}

/**
 * 
 * Static Object Type
 * 
 * @typedef {Objects.Rectangle | Objects.Circle | Objects.RegPolygon | Objects.Path} StaticObject
 * 
 */

 /*** 
 * Composite Object 
 */

Objects.Composite = function() {
	this.composite = true;
	this.name = "Untitled";
}

/*** 
 * Simulation Box Object 
 * 
 * @param {Number} w
 * @param {Number} h
 * 
 */

Objects.SimBox = function(w,h) {
	
	/**
	 * Simulation Width
	 * @type {Number}
	 */

	this.width = w;

	/**
	 * Simulation Height
	 * @type {Number}
	 */

	this.height = h;
}

/*** Simulation Camera **/

Objects.Camera = function(x,y,scale) {

	/**
	 * x-coordinate vector of camera
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate vector of camera
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Scaling factor of camera
	 */

	this.c = scale;
}

/**
 * Layer constructor
 */

Objects.Layer = function() {

	/**
	 * The array of objects
	 * @type {StaticObject[]}
	 */

	this.objUniverse = [];

	/**
	 * The name of the layer
	 * @type {String}
	 */

	this.name = null;
}

/*** 
 * simulation Object 
 * 
 * */

Objects.simulation = function() {

	/**
	 * Array of layers
	 * @type {Objects.Layer[]}
	 */

	this.layers = [];

	this.layers.push(new Objects.Layer())
	this.world = {
		grav: 1,
		bg: "white",
		border: null,
		unit: 1
	}

	/**
	 * Property indicating a simulation
	 * @type {Boolean}
	 * 
	 */

	this.simulation = true;
	this.widgets = [];
}

/**
 * Simulation Object
 * @constructor
 * 
 */

Objects.CompositeSimulation = function() {

	/**
	 * PhSim version
	 * @type {Number}
	 */

	this.version = 1;

	/** 
	 * PhSim Static simulation Array 
	 * @type {Objects.simulation[]}
	 */

	this.simulations = [];
	
	this.simulations.push(new Objects.simulation());
	this.simulations[0].layers[0].name = "Untitled Layer"
	this.simulations[0].name = "Untitled simulation";

	/** PhSim Box Settings */

	this.box = new Objects.SimBox(800,600);

	/** PhSim Camera */

	this.camera = new Objects.Camera(0,0,1);

}

// Export Default

export default Objects;