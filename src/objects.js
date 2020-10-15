
/**
 * Objects module
 * @namespace
 */

PhSim.Objects = {}

/*** 
 * Vector 
 * @constructor
 * @param {Number} x 
 * @param {Number} y
 * 
 */

PhSim.Objects.Vector = function(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * Gradient limits
 * @constructor
 * @param {Number} x0 - x coordinate of the first point
 * @param {Number} y0 - y coordinate of the first point
 * @param {Number} x1 - x coordinate of the second point
 * @param {Number} y1 - y coordinate of the second point
 */

PhSim.Objects.GradientLimits = function(x0,y0,x1,y1) {

	/**
	 * Start vector
	 * @type {PhSim.Objects.Vector}
	 */

	this.start = new PhSim.Objects.Vector(x0,y0);	
	
	/**
	 * End vector
	 * @type {PhSim.Objects.Vector}
	 */

	this.end = new PhSim.Objects.Vector(x1,y1);
}

/**
 * @constructor
 * @param {Number} pos - Position of the gradient stop
 * @param {String} color - String denoting the color of the stop
 */

PhSim.Objects.GradientStop = function(pos,color) {
	
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


PhSim.Objects.Gradient = function() {

	/**
	 * Gradient Stops
	 * @type {PhSim.Objects.GradientStop[]}
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

PhSim.Objects.lclGradient = function() {
	this.src = null;
	this.limits = new PhSim.Objects.GradientLimits(x0,y0,x1,y1);
	this.type = "linear";
}

/**
 * A path is defined by vertices. They can be used as a regular polygon.
 * @constructor
 */

PhSim.Objects.Path = function() {

	/**
	 * Array of vectors defining a path or a polygon
	 * @type {PhSim.Objects.Vector}
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
 * @constructor
 */

PhSim.Objects.Circle = function() {

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
 * @constructor
 * @param {Number} x - x-coordinate of the center
 * @param {Number} y - y-coordinate of the center
 * @param {Number} r - radius of the regular polygon
 * @param {Number} n - sides of the regular polygon
 */

PhSim.Objects.RegPolygon = function(x,y,r,n) {

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
 * @constructor
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * 
 */

PhSim.Objects.Rectangle = function(x,y,w,h) {

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
 * @typedef {PhSim.Objects.Rectangle | PhSim.Objects.Circle | PhSim.Objects.RegPolygon | PhSim.Objects.Path} StaticObject
 * 
 */

 /**
 * Composite Object 
 */

PhSim.Objects.Composite = function() {
	this.composite = true;
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

PhSim.Objects.SimBox = function(w,h) {
	
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

PhSim.Objects.Camera = function(x,y,scale) {

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

PhSim.Objects.Layer = function() {

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
 * simulation Object 
 * @constructor
 */

PhSim.Objects.Simulation = function() {

	/**
	 * Array of layers
	 * @type {PhSim.Objects.Layer[]}
	 */

	this.layers = [];

	this.layers.push(new PhSim.Objects.Layer())
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

PhSim.Objects.CompositeSimulation = function() {

	/**
	 * PhSim version
	 * @type {Number}
	 */

	this.version = 1;

	/** 
	 * PhSim Static simulation Array 
	 * @type {PhSim.Objects.Simulation[]}
	 */

	this.simulations = [];
	
	this.simulations.push(new PhSim.Objects.Simulation());
	this.simulations[0].layers[0].name = "Untitled Layer"
	this.simulations[0].name = "Untitled simulation";

	/** PhSim Box Settings */

	this.box = new PhSim.Objects.SimBox(800,600);

	/** PhSim Camera */

	this.camera = new PhSim.Objects.Camera(0,0,1);

}

/**
 * Matter.js body
 * @external {MatterBody}
 * @see {@link https://brm.io/matter-js/docs/classes/Body.html|MatterBody} 
 */

/**
 * 
 * Create Dynamic Object from static object
 * @constructor
 * @param {StaticObject} staticObject - Static Object
 * @param {string} staticObject.name - Object Name;
 * @param {boolean} staticObject.locked - Lock
 * @param {Number} staticObject.density - Density
 * @param {Number} staticObject.mass  - Object mass, overrides density if set
 * @param {boolean} staticObject.path - Tells if object is irregular polygon
 * @param {Array} staticObject.verts - Array for vertices, used if object.path === true.
 * @param {boolean} staticObject.circle - Tells if object is a circle.
 * @param {Number} staticObject.x - Center of regular polygon, center of circle or upper left corner of rectangle.
 * @param {Number} staticObject.radius - Radius of circle or circle that circumscribes regular polygon.
 * @param {boolean} staticObject.rectangle - Tells if object is a rectangle
 * @param {Number} staticObject.w - Rectangle Width
 * @param {Number} staticObject.h - Rectangle Height
 * 
 */

PhSim.Objects.DynObject = function(staticObject) {

	Object.assign(this,staticObject);

	var opts = staticObject

	if(staticObject.name) {
		opts.label = staticObject.name;
	}

	if(staticObject.locked) {
		opts.isStatic = staticObject.locked;
	}

	if(typeof staticObject.density === "number") {
		opts.density = staticObject.density;

	}

	if(typeof staticObject.mass === "number") {
		opts.mass = staticObject.mass;
		opts.inverseMass = 1/staticObject.mass;
	}

	if(Number.isInteger(staticObject.collisionNum)) {
		opts.collisionFilter = staticObject.collisionNum;
	}

	if(staticObject.path === true) {

		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);

		/** Irregular polygon skinmesh */

		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));

		//PhSim.Objects.Path.call(this);

	}

	if(staticObject.circle === true) {
		this.matter = Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
		this.firstCycle = staticObject.cycle;
		//PhSim.Objects.Circle.call(this);
	}

	if(staticObject.rectangle === true) {
		var set = PhSim.Tools.getRectangleVertArray(staticObject);
		this.firstCycle = staticObject.cycle;
		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
		//PhSim.Objects.Rectangle.call(this);
	}

	if(staticObject.regPolygon === true) {
		var set = PhSim.Tools.getRegPolygonVerts(staticObject);
		this.firstCycle = staticObject.cycle;
		this.matter = Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
		//PhSim.Objects.RegPolygon.call(this);
	}

	
	/** 
	 * Reference to static object used to create the DynObject
	 * @type {StaticObject}
	 */

	this.static = staticObject;

	/** 
	 * Object ID 
	 * @type {String}
	 * */

	this.id = PhSim.DynSim.nextId;

	PhSim.DynSim.nextId = (Number.parseInt(PhSim.DynSim.nextId,36) + 1).toString(36);
	
	/** 
	 * Refernce of DynObj in matter object 
	 * @type {Object}
	 * */

	this.matter.plugin.ph = this;

}