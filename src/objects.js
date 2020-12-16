
/**
 * Objects module
 * @namespace
 * @constructor
 * @memberof PhSim
 * 
 */

const PhSim = require("./phSim");

var Options = function() {

	/**
	 * PhSim version
	 * @type {Number}
	 */

	this.version = PhSim.version;

	/** 
	 * PhSim Static simulation Array 
	 * @type {PhSim.Options.Simulation[]}
	 */

	this.simulations = [];
	
	this.simulations.push(new PhSim.Options.Simulation());
	this.simulations[0].layers[0].name = "Untitled Layer"
	this.simulations[0].name = "Untitled simulation";

	/** PhSim Box Settings */

	this.box = new PhSim.Static.Rectangle(0,0,800,600);

	/** PhSim Camera */

	this.camera = new PhSim.Options.Camera(0,0,1);

}

/**
 * 
 * @typedef {PhSim.Vector|Circle|Rectangle|RegPolygon} Vector
 * 
 * In PhSim, a vector is any object with the properties `x` and `y` 
 * such that both are of the Number type.
 * 
 * In a {@link Circle}, the `x` and `y` coordinates refer to the center of the circle and the
 * same goes for the {@link RegPolygon|Regular Polygon}. In a {@link Rectangle}, it refers to the upper left
 * corner of the rectangle.
 * 
 */

/**
 * Gradient limits
 * @constructor
 * @param {Number} x0 - x coordinate of the first point
 * @param {Number} y0 - y coordinate of the first point
 * @param {Number} x1 - x coordinate of the second point
 * @param {Number} y1 - y coordinate of the second point
 */

Options.GradientLimits = function(x0,y0,x1,y1) {

	/**
	 * Start vector
	 * @type {Vector}
	 */

	this.start = new PhSim.Vector(x0,y0);
	
	/**
	 * End vector
	 * @type {Vector}
	 */

	this.end = new PhSim.Vector(x1,y1);
}

/**
 * @constructor
 * @param {Number} pos - Position of the gradient stop
 * @param {String} color - String denoting the color of the stop
 */

Options.GradientStop = function(pos,color) {
	
	/**
	 * Gradient Color
	 * @type {String}
	 */
	
	this.color = color;

	/**
	 * Gradient position
	 * @type {Number}
	 */

	this.pos = pos;
}


Options.Gradient = function() {

	/**
	 * Gradient Stops
	 * @type {PhSim.Options.GradientStop[]}
	 */

	this.stops = [];

	/**
	 * Gradient name
	 * @type {String}
	 */
	
	this.name = "";

	/**
	 * Limits
	 * @type {Object}
	 */

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

Options.lclGradient = function() {
	this.src = null;
	this.limits = new PhSim.Options.GradientLimits(x0,y0,x1,y1);
	this.type = "linear";
}

/**
 * Constuctor defining the minimal requirements for a {@link Path}.
 * @constructor
 * @param {PhSim.Vector[]} verts -  Vertcies
 */

Static.Polygon = function(verts) {

	/**
	 * Array of vectors defining a path or a polygon
	 * @type {PhSim.Vector[]}
	 */

	this.verts;

	if(Array.isArray(verts)) {
		this.verts = verts;
	}

	else {
		throw "Expecting array in argument 1"
	}

	/**
	 * Boolean indicating it is a path
	 * @type {Boolean}
	 */

	this.shape = "polygon";
}

/**
 * 
 * A path is defined by vertices. They can be used as a regular polygon.
 * Any object that contains an array of vectors and has the boolean property ``path`` set to ``true`` is reconized as a path.
 * Paths can be used to define any polygon in general.
 * 
 * In PhSim, a path is any object `obj` such that the following is true:
 * 
 * `Array.isArray(obj) === true`
 * `obj.shape === "polygon"`
 * 
 * If a path is used as a polygon, it must have at least three vectors in the `verts` property. 
 * 
 * @typedef {PhSim.Static.Polygon} Polygon
 * 
 */
 

/**
 * Constructor for the minimal requirements for a {@link Circle}.
 * @constructor
 */

Static.Circle = function(x = null,y = null,r = null) {

	/**
	 * Boolean indicating a circle
	 * @type {Boolean}
	 */

	this.shape = "circle";

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
 * A circle is a set all points equidistant from some point known as the center.
 * 
 * In PhSim, a circle is any object `obj` such that the following are all true:
 * `obj.shape === "circle"`;
 * `typeof obj.x === number`;
 * `typeof obj.y === number`;
 * `typeof obj.radius === number`;
 * `typeof obj.cycle === number || obj.cycle`;
 * 
 * @typedef {PhSim.Static.Circle} Circle
 */

/**
 * A regular polygon is a polygon that has all of its sides equal in length.
 * 
 * In PhSim, a regular polgon is any object `obj` such that the following are true:
 * 
 * `this.shape === "regPolygon"`
 * 
 * 
 * @constructor
 * @param {Number} x - x-coordinate of the center
 * @param {Number} y - y-coordinate of the center
 * @param {Number} r - radius of the regular polygon
 * @param {Number} n - sides of the regular polygon
 */

Static.RegPolygon = function(x,y,r,n) {

	/**
	 * Boolean for indicating a regular polygon
	 * @type {Boolean}
	 */

	this.shape = "regPolygon";

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
 * @constructor
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * 
 */

Static.Rectangle = function(x,y,w,h) {

	/**
	 * Boolean for indicating a rectangle
	 * @type {Boolean}
	 */

	this.shape = "rectangle";

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
 * @typedef {PhSim.Static.Rectangle | PhSim.Static.Circle | PhSim.Static.RegPolygon | PhSim.Static.Polygon} StaticObject
 * @property {Number} [mass] - The mass of the object.
 * @property {Number} [density] - The density of the object
 * @property {Boolean} [locked] - A boolean deterimining the lock status of the object
 * @property {Boolean} [semiLocked] - A boolean deteriming the semi-lock status of the object
 * @property {String} [name] - The name of the object
 * @property {String} [fillStyle] -  Fill Color 
 * @property {String} [strokeStyle] - Stroke Color
 * @property {String} [lineWidth] - Stroke Width
 * @property {PhSim.Sprites.Sprite} [sprite] - Sprite Object
 * @property {Array} [widgets] - {@link PhSim.Widgets|Static Widget Objects}.
 * 
 */

 /**
 * Composite Object 
 */

Options.Composite = function() {
	this.shape = "composite";
	this.name = "Untitled";
}

/***
 * Simulation Box Object 
 * 
 * @constructor
 * @param {Number} w
 * @param {Number} h
 * 
 */

Options.SimBox = function(w,h) {
	
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

/** 
 * Simulation Camera 
 * @constructor
 * 
 *
 */

Options.Camera = function(x,y,scale) {

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
 * @constructor
 */

Options.Layer = function() {

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

/**
 * @typedef {Object} Layer
 * @property {PhSimObjects[]} objUniverse - The array of objects.
 * @property {String} name - The name of the layer
 */

/** 
 * simulation Object 
 * @constructor
 */

Options.Simulation = function() {

	/**
	 * Array of layers
	 * @type {PhSim.Options.Layer[]}
	 */

	this.layers = [];

	this.layers.push(new PhSim.Options.Layer())
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
 * 
 * @typedef {Object} Simulation
 * @property {Layer[]} layers - An array of layers
 * @property {Object} world - World Object
 * @property {Boolean} simulation - Boolean indicating a simulation
 * @property {Widget} widgets - Array of array options
 */

/**
 * 
 * @param {Simulation} L 
 * @param {*} O 
 */

Options.LO = function(L,O) {
	L.layers[0].objUniverse
}

/**
 * 
 * Specify object location by layer and object indexes.
 * 
 * @typedef LOAddress
 * @property {Number} L - layer
 * @property {Number} O - object
 * 
 */

Options.SLO = function(S,L,O) {

}

 /**
  * Specify object location by superlayer, layer and object indexes.
  * 
  * @typedef SLOAddress
  * @property {Number} S - superlayer
  * @property {Number} L - layer
  * @property {Number} O - object
  */


/**
 * Matter.js body
 * @external MatterBody
 * @see {@link https://brm.io/matter-js/docs/classes/Body.html|MatterBody} 
 */

module.exports = Options;