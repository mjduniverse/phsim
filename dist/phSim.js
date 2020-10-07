/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***

Physics Simulator Class Library

Copyright 2020 Mjduniverse.com

@author Mjduniverse.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

***/

/**
 * PhSim Module
 * @namespace
 * @global
 */

var PhSim = {}

/**
 * PhSim Name
 * @readonly
 */

PhSim.name = "phsim"

/**
 * PhSim version
 * @readonly
 */

PhSim.version = "0.1.0-alpha"

if(typeof window === "object") {
	window.PhSim = PhSim;
}
__webpack_require__(1 );
__webpack_require__(2 );
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);

__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);

// Bounding box functions

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);

/***/ }),
/* 1 */
/***/ (function(module, exports) {


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

 /*** 
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * 
 * The event stack is an object that is used to store event listeners.
 * @constructor
 * 
 */

PhSim.EventStack = function() {

	/** 
	 * 
	 * Array of functions to be executed whenever two or more objects contact each other 
	 * @type {PhSimEventCall[]}
	 * 
	*/

	this.contact = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation updates 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.beforeupdate = [];

	/** 
	 * 
	 * Array of functions to be exected when PhSim.DynSim.updateDynObject is called 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.objupdate = [];


	/** 
	 * 
	 * Array of functions to be executed after the simulation updates 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.afterupdate = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation is changed 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.beforeslchange = [];

	/** 
	 * 
	 * Array of functions to be executed after the simulation is changed 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.afterslchange = [];

	/** 
	 * 
	 * Array of functions to be executed before the Sprite Image Array loads 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.beforespriteimgload = [];

	/** Array of functions to be executed after the Sprite Image Array loads */

	this.afterspriteimgload = [];
	this.beforeforcekey = [];

	/** Array of functions to be executed when mouse is let go while over simulation canvas */

	this.mouseup = [];

	/** Array of functions to be executed when mouse leaves simulation canvas */

	this.mouseout = [];

	/** Array of functions to be executed when the mouse moves */

	this.mousemove = [];

	/** Array of functions to be executed when at least one key is pressed */

	this.keydown = [];

	/** Array of functions to be executed when a new collision is created */

	this.collisionstart = [];

	/** Array of functions to be executed during an active collision */

	this.collisionactive = [];

	/** Array of functions to be executed when a new collision is deleted */

	this.collisionend = [];

	this.beforecounterset = [];

	this.aftercounterset = [];

	this.collisionchange = [];

	this.load = [];

	this.matterJSLoad = [];

	/** Array of functions to be executed when an object is cloned */

	this.clone = [];

	/** Array of functions to be executed when the mouse is down on an object */

	this.objmousedown = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseover = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseout = [];

	/** Array of functions  */

	this.firstslupdate = [];

	/** Array of functions to be executed before the simulation exit */

	this.exit = []
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/** 
 * 
 * PhRender constructor
 * 
 * @constructor
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * 
 */

PhSim.PhRender = function(ctx) {

	/**
	 * PhRender Context
	 */

	this.ctx = ctx;
}

/**
 * Default Alpha
 * @type {Number}
 */

PhSim.PhRender.prototype.defaultAlpha = 1;

/**
 * Default stroke style
 * @type {String}
 */

PhSim.PhRender.prototype.defaultStrokeStyle = "transparent";

/**
 * Default fill style
 * @type {String}
 */

PhSim.PhRender.prototype.defaultFillStyle = "transparent";

/**
 * Setting context
 * 
 * @function
 * @param {Object} object 
 */

PhSim.PhRender.prototype.setCtx = function(object) {
	this.ctx.lineCap = "round";

	if(typeof this.ctx.globalAlpha === "number") {
		this.ctx.globalAlpha = object.globalAlpha
	}

	else {
		this.ctx.globalAlpha = this.defaultAlpha;
	}

	this.ctx.strokeStyle = object.strokeStyle || this.defaultStrokeStyle;
	this.ctx.fillStyle = object.fillStyle || this.defaultFillStyle;

	if(object.lineWidth) {

		if(object.lineWidth === 0) {
			this.ctx.strokeStyle = "transparent"
		}

		else {
			this.ctx.lineWidth = object.lineWidth;
		}

	}

	else {
		this.ctx.strokeStyle = "transparent"
	}
	
}

/**
 * @function
 * @param {*} path 
 */

PhSim.PhRender.prototype.static_path = function (path) {

	this.setCtx(path);

	this.ctx.beginPath();

	this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

	for(var j = 0; j < path.verts.length; j++) {
	  this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();
	this.ctx.fill();

	if(path.sprite) {

		var img = this.spriteImgArray[path.sprite.src];

		var centroid = findCentroidOfPath(path);

		this.ctx.imageSmoothingEnabled = path.sprite.smooth;

		if(path.sprite.repeat) {

			this.ctx.save();

			this.ctx.beginPath();

			this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

			for(var j = 0; j < path.verts.length; j++) {
				this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
			}
		

			this.ctx.translate(centroid.x,centroid.y);
			//this.ctx.rotate(circle.cycle);
			this.ctx.scale(path.sprite.scale,path.sprite.scale);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;

			this.ctx.closePath();

			this.ctx.fill();
			this.ctx.restore();	
		}

		if(path.sprite.fit) {

			this.ctx.save();

			this.ctx.beginPath();

			this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

			for(var j = 0; j < path.verts.length; j++) {
				this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
			}

			this.ctx.closePath();

			this.ctx.clip();

			var box = PhSim.Tools.getStaticBoundingBox(path);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,box.w,h,0);

			this.ctx.restore();	

		}

		else {
			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,img.width,img.height,0);
		}

	}

	
}

/**
 * @function
 * @param {String} url - URL of object loaded in PhSim.PhRender.prototype.spriteImgArray
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} a - angle
 */

PhSim.PhRender.prototype.renderSpriteByCenter = function(url,x,y,w,h,a) {

	var spriteImg = this.spriteImgArray[url];

	this.ctx.save();
	this.ctx.translate(x,y)
	this.ctx.rotate(a)
	
	if(h === null) {
		this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w);
	}

	else {
		this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w,h);
	}

	this.ctx.restore();
}

/**
 * @function
 * @param {Object} constraint 
 */

PhSim.PhRender.prototype.renderConstraint = function (constraint) {

	var path = SLO(constraint.object.S, constraint.object.L, constraint.object.O);

	this.ctx.save();

	this.ctx.globalAlpha = 0.5
	this.ctx.strokeStyle = "black";

	this.ctx.arc(constraint.point.x, constraint.point.y, 10, 0, 2 * Math.PI);
	this.ctx.stroke();

	this.ctx.arc(constraint.relativeEndPoint.x + findCentroidOfPath(path).x , constraint.relativeEndPoint.y + findCentroidOfPath(path).y, 10, 0, 2 * Math.PI);
	this.ctx.stroke();

	this.ctx.setLineDash([10,10]);

	this.ctx.moveTo(constraint.point.x, constraint.point.y);
	this.ctx.lineTo(constraint.relativeEndPoint.x + findCentroidOfPath(path).x, constraint.relativeEndPoint.y + findCentroidOfPath(path).y);
	this.ctx.stroke();

	this.ctx.restore();

}



/**
 * 
 * Render circle
 * 
 * @function
 * @param {PhSim.Objects.Circle} circle 
 */

PhSim.PhRender.prototype.static_circle = function (circle) {
	
	this.setCtx(circle);

	this.ctx.beginPath();
	this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI)
	this.ctx.closePath();

	this.ctx.fill();
	this.ctx.stroke();

	if(circle.gradient) {
		this.ctx.save();
		this.ctx.translate(circle.x,circle.y);
		this.ctx.rotate(circle.cycle);
		this.ctx.fillStyle = PhSim.Gradients.extractGradient(this.ctx,circle.gradient);
		this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.restore();	

	}

	if(circle.sprite) {

		var img = this.spriteImgArray[circle.sprite.src];

		this.ctx.imageSmoothingEnabled = circle.sprite.smooth;

		if(circle.sprite.repeat) {
			this.ctx.save();
			this.ctx.translate(circle.x,circle.y);
			this.ctx.rotate(circle.cycle);
			this.ctx.scale(circle.sprite.scale,circle.sprite.scale);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
			this.ctx.fill();
			this.ctx.restore();	
		}

		if(circle.sprite.fit) {
			this.ctx.save();
			this.ctx.translate(circle.x,circle.y);
			this.ctx.rotate(circle.cycle);
			this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
			this.ctx.clip();
			var box = PhSim.Tools.getStaticBoundingBox(circle);

			var h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(circle.sprite.src,0,0,box.w,h);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(circle.sprite.src,circle.x,circle.y,circle.cycle);
		}

	}

}


/**
 * 
 * Render rectangle
 * 
 * @function
 * @param {PhSim.Objects.Rectangle} rectangle - Rectangle object
 * 
 */

PhSim.PhRender.prototype.static_rectangle = function(rectangle) {

	/*
	var rectangle = {
		"cycle": arg.cycle,
		"x": arg.x,
		"y": arg.y,
		"w": arg.w,
		"h": arg.h,
		"globalAlpha": arg.globalAlpha,
		"strokeStyle": arg.strokeStyle,
		"fillStyle": arg.fillStyle,
		"lineWidth": arg.lineWidth
	}

	*/

	//var c = getCentroid.object(rectangle);

	var c = PhSim.Tools.getRectangleCentroid(rectangle);

	var x = -rectangle.w * 0.5;
	var y = -rectangle.h * 0.5;
	
	this.setCtx(rectangle);
	this.ctx.translate(c.x,c.y);
	this.ctx.rotate(rectangle.cycle);
	this.ctx.beginPath();
	this.ctx.rect(x,y,rectangle.w,rectangle.h);
	this.ctx.closePath();
	this.ctx.stroke();
	this.ctx.fill();

	if(rectangle.widgets) {
		for(var i = 0; i < rectangle.widgets.length; i++) {
			if(rectangle.widgets[i].rectText) {
				this.rectText(rectangle.widgets[i],x,y,rectangle.w,rectangle.h,0);
			}
		}
	}

	/*
	if(rectangle.text) {
	
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.rect(0,0,rectangle.w,rectangle.h);
		this.ctx.clip();
		this.ctx.fillStyle = rectangle.text.fill;
		this.ctx.strokeStyle = rectangle.text.borderColor
		this.ctx.font = rectangle.text.size + "px " + rectangle.text.font;
		this.ctx.textBaseline = "top";
		this.ctx.strokeText(rectangle.text.content, 0, (0));
		this.ctx.restore();
		

		this.rectText(rectangle.text,0,0,rectangle.w,rectangle.h);
	}

	*/

	this.ctx.rotate(-rectangle.cycle);
	this.ctx.translate(-c.x,-c.y);


	if(Number.isInteger(rectangle.sprite)) {

		var img = this.spriteImgArray[rectangle.sprite.src];

		this.ctx.imageSmoothingEnabled = rectangle.sprite.smooth;

		if(rectangle.sprite.repeat) {
			this.ctx.save();
			this.ctx.translate(c.x,c.y);
			this.ctx.rotate(rectangle.cycle);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.rect(-rectangle.w * 0.5,-rectangle.h * 0.5,rectangle.w,rectangle.h);
			this.ctx.fill();
			this.ctx.restore();	
		}

		if(rectangle.sprite.fit) {
			this.ctx.save();
			this.ctx.translate(c.x,c.y);
			this.ctx.rotate(rectangle.cycle);
			this.ctx.rect(-rectangle.w * 0.5,-rectangle.h * 0.5,rectangle.w,rectangle.h);
			this.ctx.clip();
			var box = PhSim.Tools.getStaticBoundingBox(rectangle);

			var h = img.height * (rectangle.w/img.width);

			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.w,h);
			this.ctx.restore();	
		}

		else { 
			this.renderSpriteByCenter(rectangle.sprite.src,c.x,c.y,img.w,img.h,rectangle.cycle);
		}

	}

}

// Draw text

/**
 * @function
 * @param {*} text 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} a 
 */

PhSim.PhRender.prototype.rectText = function(text,x,y,w,h,a) {
	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.rotate(a);
	this.ctx.beginPath();
	this.ctx.rect(0,0,w,h);
	this.ctx.clip();
	this.ctx.textAlign = "left";
	this.ctx.fillStyle = text.fill;

	// Reset Line Width

	this.ctx.lineWidth = undefined;

	if(text.lineWidth) {
		this.ctx.lineWidth = text.lineWidth;
	}

	this.ctx.strokeStyle = text.borderColor
	this.ctx.font = text.size + "px " + text.font;
	this.ctx.textBaseline = "top";
	var content = text.content;

	if(this.dynSim) {
		content = this.dynSim.processVar(content);
	}

	this.ctx.fillText(content,0,0);

	if(text.lineWidth) {
		this.ctx.strokeText(content,0,0);
	}

	this.ctx.restore();
}

// Draw a regular polygon

/**
 * @function
 * @param {PhSim.Objects.RegPolygon} regPolygon 
 */

PhSim.PhRender.prototype.static_regPolygon = function(regPolygon) {

	var vertSet = PhSim.Tools.getRegPolygonVerts(regPolygon);
	
	this.setCtx(regPolygon);

	this.ctx.beginPath();

	this.ctx.moveTo(vertSet[0].x, vertSet[0].y);

	for(var j = 0; j < vertSet.length; j++) {
	  this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();

	this.ctx.fill();

	if(regPolygon.sprite) {

		var img = this.spriteImgArray[regPolygon.sprite.src];

		this.ctx.imageSmoothingEnabled = regPolygon.sprite.smooth;

		if(regPolygon.sprite.repeat) {
			this.ctx.save();
			this.ctx.translate(regPolygon.x,regPolygon.y);
			this.ctx.rotate(regPolygon.cycle);
			this.ctx.scale(regPolygon.sprite.scale,regPolygon.sprite.scale);
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.arc(0,0,regPolygon.radius,0,2*Math.PI);
			this.ctx.fill();
			this.ctx.restore();	
		}

		if(regPolygon.sprite.center) { 
			this.renderSpriteByCenter(regPolygon.sprite.src,regPolygon.x,regPolygon.y,regPolygon.cycle);
		}

	}


}

// Draw Static object

/**
 * @function
 * @param {*} obj 
 */

PhSim.PhRender.prototype.renderStatic = function(obj) {
				
	if ( obj.path === true )  {
		this.static_path(obj);
	}
	
	if( obj.circle === true) {
		this.static_circle(obj); 
	}

	if( obj.rectangle === true) {
		this.static_rectangle(obj);
	}

	if( obj.regPolygon === true ) {
		this.static_regPolygon(obj);
	}

	if( obj.composite === true) {
		for(var i = 0; i < obj.objUniverse.length; i++) {
			this.renderStatic(obj.objUniverse[i]);
		}
	}

}

// Draws a layer

/**
 * @function
 * @param {*} layer 
 */

PhSim.PhRender.prototype.renderStaticLayer = function(layer) {

	for(var i = 0; i < layer.objUniverse.length; i++) {

			this.renderStatic(layer.objUniverse[i])
			
			/*** Drawing Path ***/

			/*
			
			if ( layer.objUniverse[i].path === true )  {
				this.static_path(layer.objUniverse[i]);
			}
			
			if( layer.objUniverse[i].circle === true) {
				this.static_circle(layer.objUniverse[i]); 
			}

			if( layer.objUniverse[i].rectangle === true) {
				this.static_rectangle(layer.objUniverse[i]);
			}

			if( layer.objUniverse[i].regPolygon === true ) {
				this.static_regPolygon(layer.objUniverse[i]);
			}

			*/


			//PhSim.PhRender.prototype.renderStaticObject(layer.objUniverse[i]);
			
	}	
}

/**
 * @function
 * @param {*} simulation 
 */

PhSim.PhRender.prototype.simulation = function(simulation) {

	for(var i = 0; i < simulation.layers.length; i++) {
		if(!simulation.layers[i].hidden) {
			this.layer(simulation.layers[i])
		}
	}
}

/**
 * @function
 * @param {*} object 
 */

PhSim.PhRender.prototype.dynamicSkeleton = function(object) {

	if(object.static.path) {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x, object.skinmesh[0].y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x, object.skinmesh[j].y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x, object.matter.vertices.y);

		for(var j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x, object.matter.vertices[j].y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhSim.PhRender.prototype.dynamicSkeleton_center = function(object) {

	if(object.static.path) {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x - object.matter.position.x, object.skinmesh[0].y - object.matter.position.y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x - object.matter.position.x, object.skinmesh[j].y - object.matter.position.y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x - object.matter.position.x, object.matter.vertices.y - object.matter.position.y);

		for(var j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x - object.matter.position.x, object.matter.vertices[j].y - object.matter.position.y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhSim.PhRender.prototype.drawDynamicSkeleton = function (object) {

	this.dynamicSkeleton(object);
	this.ctx.closePath();
	this.ctx.stroke();

}

/**
 * @function
 * @param {*} arg 
 */

PhSim.PhRender.prototype.dynamicRenderDraw = function (arg) {

	this.ctx.lineWidth = arg.object.lineWidth;
	this.ctx.fillStyle = arg.object.fillStyle;
	this.ctx.strokeStyle = arg.object.strokeStyle;

	
	if(arg.object.path) {
		
		this.drawDynamicSkeleton(arg);
		
		this.ctx.fill();

		if(arg.object.sprite) {

			var img = this.spriteImgArray[arg.object.sprite.src];

			this.ctx.imageSmoothingEnabled = arg.object.sprite.smooth;

			if(arg.object.sprite.repeat) {

				this.ctx.save();

				this.dynamicSkeleton(arg);
				this.ctx.translate(arg.matter.position.x,arg.matter.position.y);
				this.ctx.rotate(arg.matter.angle);
				this.ctx.scale(arg.object.sprite.scale,arg.object.sprite.scale);
		

				var pattern = this.ctx.createPattern(img,"repeat");
				this.ctx.fillStyle = pattern;
				this.ctx.fill();

				this.ctx.restore();
			}

			if(arg.object.sprite.fit) {

				this.ctx.save();
	
				this.ctx.beginPath();
	
				this.ctx.moveTo(arg.object.verts[0].x, arg.object.verts[0].y);
	
				for(var j = 0; j < arg.object.verts.length; j++) {
					this.ctx.lineTo(arg.object.verts[j].x, arg.object.verts[j].y);
				}
	
				this.ctx.closePath();
	
				this.ctx.clip();
	
				var box = PhSim.Tools.getStaticBoundingBox(arg.object);
	
				var h = img.height * (box.w/img.width);
	
				this.renderSpriteByCenter(arg.object.sprite.src,arg.matter.position.x,arg.matter.position.y,box.w,h,arg.matter.angle);
	
				this.ctx.restore();	
	
			}
	
			else {
				this.renderSpriteByCenter(arg.object.sprite.src,arg.matter.position.x,arg.matter.position.y,img.width,img.height,arg.matter.angle);
			}

			//this.ctx.restore();	
	
		}
		
	}

	if(arg.object.circle) {
		this.static_circle(arg.object);	
	}
	
	if(arg.object.regPolygon) {
		this.static_regPolygon(arg.object);		
	}

	if(arg.object.rectangle) {
		this.static_rectangle(arg.object);		
	}

	if(arg.object.composite) {
		for(var i = 1; i < arg.parts.length; i++) {
			this.dynamicRenderDraw(arg.parts[i]);
		}
	}

}

/**
 * @function
 * @param {*} L 
 */

PhSim.PhRender.prototype.dynamicDrawLayer = function(L) {
	
	for(var i = 0; i < sim.simulations[simulationI].layers[L].length; i++) {
		this.dynamicRenderDraw(L,i);
	}

}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*** Sprites ***/

PhSim.Sprites = {
    Calc: {}
}

PhSim.Sprites.Sprite = function() {
	this.src = null;
	this.w = null;
	this.h = null;
	this.x = null;
	this.y = null;
	this.fit = null;
	this.repeat = null;
	this.object = null;
}

PhSim.Sprites.renderSprite = function(ctx,sprite) {
	var localElm = document.createElement("img");
	localElm.src = sprite.src;
	if(sprite.spec === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}

	if(sprite.auto === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}
}

PhSim.Sprites.renderGlobalSprites = function(ctx,simulation) {

	for(i = 0; i < simulation.sprites.length; i++) {
		PhSim.Sprites.renderSprite(ctx,simulation.sprites[i]);
	}

}


PhSim.Sprites.circularSpriteRenderCanvas = function(ctx,canvas,angle) {

	var localElm = document.createElement("canvas");
	var localCtx = localElm.getContext("2d");

	var localImg = document.createElement("img");
	localImg.src = canvas.src;

	localCtx.rotate(angle);

	localCtx.drawImage()


}

PhSim.Sprites.SpriteImgArray = function(sprites,onload = function() {}) {
	
	// Force load if sprites list is empty

	this.static = {};
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;
	this.length = 0;

	var self = this;

	for(var i = 0; i < sprites.length; i++) {
		self.addSprite(sprites[i],function(){

			self.loaded_n++;

			if(self.loaded_n = self.length) {
				onload();
			}
		})
	}

	if(sprites.length === 0) {
		self.onload();
		self.loaded = true;
	}

}

PhSim.Sprites.SpriteImgArray.prototype.addSprite = function(staticObj,onload = function() {} ) {
	
	var self = this;
	
	var img = document.createElement("img");

	img.addEventListener("load",function() {
		onload();
	});

	img.src = staticObj.src;

	this.static[staticObj.src] = staticObj;
	this[staticObj.src] = img;

	this.length++;
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

PhSim.Audio = {}

PhSim.Audio.AudioArray = function(p_audio,onload) {

	// force load function if audio list is empty
	
	this.array = [];
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;

	var self = this;

	
	if(p_audio.length === 0) {
		self.loaded = true;
		self.onload();
	}

	for(var i = 0; i < p_audio.length; i++) {

		var audio = document.createElement("audio");

		audio.addEventListener("canplaythrough",function() {
			self.loaded_n++;

			if(self.array.length === self.loaded_n) {
				self.loaded = true;
				self.onload();
			}

		})

		audio.src = p_audio[i].src;
		audio.loop = p_audio[i].loop

		this.array.push(audio);

	}

}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// Tools declaration

/**
 * @namespace
 */

PhSim.Tools = {}



/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

PhSim.Tools.addVectors = function(vector1,vector2) {
	return new PhSim.Objects.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

PhSim.Tools.subtractVectors = function(vector1,vector2) {
	return new PhSim.Objects.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * @param {Number} scalar 
 */

PhSim.Tools.scaleVector = function(vector,scalar) {
	return new PhSim.Objects.Vector(vector.x * scalar,vector.y * scalar)
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * @param {Number} scalar 
 */

PhSim.Tools.divideVector = function(vector,scalar) {
	return new PhSim.Objects.Vector(vector.x * (1/scalar),vector.y * (1/scalar));
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector1 
 * @param {PhSim.Objects.Vector} vector2 
 */

PhSim.Tools.calcVertDistance = function(vector1,vector2) {
	
	var l1 = Math.pow(vector1.x - vector2.x,2);
	var l2 = Math.pow(vector1.y - vector2.y,2);

	return Math.sqrt(l1+l2);

}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 * 
 */

PhSim.Tools.getVectorLength = function(vector) {
	return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2))
}

/**
 * 
 * @param {PhSim.Objects.Vector} vector 
 */

PhSim.Tools.getUnitVector = function(vector) {
	return PhSim.Tools.scaleVector(vector,1/PhSim.Tools.getVectorLength(vector));
}

/*** Vector Transformation */

PhSim.Tools.applyTransformation = function(a11,a12,a21,a22,x,y) {
	return {
		"x": a11 * x + a12 * y,
		"y": a21 * x + a22 * y   
	}
}

/*** Rotate Vector ***/

PhSim.Tools.rotatedVector = function(x,y,a) {
	return PhSim.Tools.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Possible Object Structure
 */

PhSim.objectTypes = {
	path: true,
	circle: true,
	regularPolygon: true,
	rectangle: true
}

/*** Structure defining possible object types ***/

/**
 * 
 * @param {String} objectTypeStr
 * @returns {Boolean} 
 * 
 */

PhSim.Tools.checkObjectType = function (objectTypeStr) {
	if(objectTypes[objectTypeStr])
		return false;
	else {
		return true;
	}
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*** 
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2)
 * 
 * ***/

PhSim.Tools.diagRect = function(x1,y1,x2,y2,a) {

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

    return new PhSim.Objects.Rectangle(x2-x1,y2-y1,x1,y1);
    
 }


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function getRegPolygonVerts
 * @param {PhSim.Objects.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Objects.Vector[]}
 * 
 */

PhSim.Tools.getRegPolygonVerts = function(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new PhSim.Objects.Vector(x,y));
	}

	return a;

}


/* 

Rectangles

*/

PhSim.Tools.getRectangleVertArray = function(rectangle) {

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


PhSim.Tools.getRectangleCorners = function(rectangle) {


	var a = PhSim.Tools.getRectangleVertArray(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

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


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * 
 * Get bounding box from an array of vertices.
 * 
 * 
 * @function getVertBoundingBox
 * @param {Array} verts 
 */

PhSim.Tools.getVertBoundingBox = function(verts) {

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

PhSim.Tools.getStaticBoundingBox = function(object) {
	
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

PhSim.Tools.getDynBoundingBox = function(dynObj) {
	return {
		"x": dynObj.matter.bounds.min.x,
		"y": dynObj.matter.bounds.min.y,
		"w": dynObj.matter.bounds.max.x - dynObj.bounds.min.x,
		"h": dynObj.matter.bounds.max.y - dynObj.bounds.min.y,
	}
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 
 * @typedef {PhSim.Objects.CompositeSimulation|PhSim.Objects.Simulation|StaticObject[]} DynSimOptions
 * 
 * The options that can be used to create a dynamic simulation could be a 
 * CompositeSimulation object, a simulation object or an array 
 * of static objects.
 * 
 * If an array is chosen, then it is used to create
 * 
 * /

/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} sim - The simulation object
 * 
 */

PhSim.DynSim = function(dynSimOptions) {

	/**
	 * The static simulation object
	 */

	
	if(Array.isArray(dynSimOptions.simulations)) {
		this.sim = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions.layers)) {
		this.sim = new PhSim.Objects.CompositeSimulation();
		this.sim.simulations[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions)) {

	}

	this.registerKeyEvents();

}

/**
 * Number of frames per second
 */

PhSim.DynSim.prototype.delta = 50/3; // 16 frames per second, or 16 frames per 1000ms

/**
 * Boolean property for telling if the simulation has loaded a simulation at least one time.
 * @type {Boolean}
 */

PhSim.DynSim.prototype.init = false;

/**
 * Time for inside the world
 * @type {Number}
 */

PhSim.DynSim.prototype.sl_time = 0;

/**
 * Index of the current simulation
 * @type {Number}
 */

PhSim.DynSim.prototype.simulationIndex = null;

/**
 * Loading status of the dynamic simulation
 * @type {Number}
 */

PhSim.DynSim.prototype.status = 0;

/**
 * x-coordinate of the mouse
 * @type {Number}
 */

PhSim.DynSim.prototype.mouseX = null;

/**
 * y-coordinate of the mouse
 * @type {Number}
 */

PhSim.DynSim.prototype.mouseY = null;

/**
 * Boolean property to tell if the simulation is paused or not.
 * @type {Boolean}
 */

PhSim.DynSim.prototype.paused = true;

/**
 * Global event stack
 * @type {PhSim.EventStack}
 */

PhSim.DynSim.prototype.eventStack = new PhSim.EventStack();


/**
 * Event stack for simulation specfic events
 * @type {PhSim.EventStack}
 */

PhSim.DynSim.prototype.slEventStack = new PhSim.EventStack();

 /**
  * 
  * @callback PhSimEventCall
  * @param {PhSim.PhEvent} phEvent
  * 
  */

 PhSim.DynSim.nextId = "0";

/**
 * Structure giving more human-readable meaning to PhSim status.
 * @type {String[]}
 */

PhSim.DynSim.statusStruct = {
	0: "Unloaded",
	1: "Initalized",
	2: "Loaded Images",
	3: "Loaded Audio",
	4: "Loaded Simulation"
}



PhSim.DynSim.prototype.forAllObjects = function(call) {
	
	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}


PhSim.DynSim.prototype.addToOverlayer = function(dynObject) {
	Matter.World.add(this.matterJSWorld, dynObject.matter);
	this.objUniverse.push(dynObject);
}

__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

PhSim.DynSim.removeClickRectRegion = function(reference) {
	this.removeEventListener("mousedown",reference);
}

/**
 * @constructor
 */

PhSim.PhEvent = function () {
	this.target = null;
	this.timestamp = null;
	this.type = null;
}

/**
 * @constructor
 */

PhSim.PhDynEvent = function() {
	PhSim.PhEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

PhSim.PhDynEvent.prototype = Object.create(PhSim.PhEvent.prototype);

/**
 * @constructor
 */


PhSim.PhKeyEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

PhSim.PhKeyEvent.prototype = Object.create(PhSim.PhDynEvent.prototype);

/**
 * @constructor
 */


PhSim.PhMouseEvent = function() {
	PhSim.PhDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

PhSim.PhMouseEvent.prototype = Object.create(PhSim.PhDynEvent.prototype);

/**
 * @constructor
 */


PhSim.phSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

/**
 * @constructor
 */

PhSim.CollisionReport = function() {
	this.before = null;
	this.current = null;
	this.difference = null;
	this.objectA = null;
	this.objectB = null;
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.L = function(L) {
	return this.matterJSEngine.world.composites[L];
}

PhSim.DynSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

PhSim.DynSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * @function
 * @param {Object} sim 
 * @param {HTMLCanvasElement} canvas
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.createFromCanvas = function(sim,canvas) {
	var p = new PhSim.DynSim(sim);
	p.simCanvas = canvas;
	p.simCtx = canvas.getContext("2d");
	p.simCanvas.width = p.sim.box.width;
	p.simCanvas.height = p.sim.box.height;
	p.registerCanvasEvents();
	p.configRender(p.simCtx);
	return p;
}

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLElement} simContainer 
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.createFromContainer = function(sim,simContainer) {
	
	// Canvas

	var canvas = document.createElement("canvas");

	// Simulation object

	var p = PhSim.DynSim.createFromCanvas(sim,canvas);

	p.simContainer = simContainer;

	simContainer.appendChild(p.simCanvas);
	simContainer.classList.add("phsim-container");

	p.configFilter(simContainer);
	
	return p;
}

/**
 * @function
 * @param {*} sim 
 * @memberof PhSim.DymSim 
 */

PhSim.DynSim.createContainer = function(sim) {
	var container = document.createElement("div");
	return this.createFromContainer(sim,container);
}

/**
 * @function
 * @param {String} jsonURL - URL For JSON File
 * @param {function} onload - Onload function
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.loadFromJSON = function(jsonURL,onload) {

	var x = new XMLHttpRequest();
	x.open("GET",jsonURL);

	x.addEventListener("load",function(){
		var o = PhSim.DynSim.createContainer(JSON.parse(x.responseText));
		onload(o);
	})

	x.send();

}

/**
 * @function
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.prototype.configRender = function() {
	
	this.assignPhRender(new PhSim.PhRender(this.simCtx));
	
	if(!this.noCamera) {
		this.camera = new PhSim.DynSimCamera(this);
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.configFilter = function(container) {
	this.htmlFilter = document.createElement("div");
	this.htmlFilter.style.background = "rgba(3,3,3,0.7)";
	this.htmlFilter.style.position = "absolute";
	this.htmlFilter.style.display = "none";
	this.htmlFilter.classList.add("dynsim-filter");
	container.appendChild(this.htmlFilter);
}

PhSim.DynSim.prototype.enableFilter = function() {
	var elmBox = this.simCanvas.getBoundingClientRect();
	this.htmlFilter.style.display = "inline-block";
	this.htmlFilter.style.left = "0px";
	this.htmlFilter.style.position = "absolute";
	//this.htmlFilter.style.top = elmBox.top + "px";
	this.htmlFilter.style.width = Math.floor(elmBox.width) + "px";
	this.htmlFilter.style.height = Math.floor(elmBox.height) + "px";
}

PhSim.DynSim.prototype.disableFilter = function() {
	this.htmlFilter.style.display = "none";
}

PhSim.DynSim.prototype.toggleFilter = function() {

	if(this.htmlFilter.style.display === "none") {
		this.enableFilter();
	}

	else {
		this.disableFilter();
	}
}

/**
 * 
 * @param {Object} options - Options
 * @param {String} options.msg - The message
 * @param {String} options.closeButtonTxt - Inner text for closing button
 * @param {String} options.bgColor - Background Color
 * @param {String} options.txtColor - Text Color
 * @param {Number} options.w - Width
 * @param {Number} options.h - Height
 * @param {Function} options.onok - Function to call when alert is closed
 *  
 */

PhSim.DynSim.prototype.alert = function(options) {
	
	var alertBox = document.createElement("div");
	alertBox.style.backgroundColor = options.bgColor;
	alertBox.style.color = options.txtColor;
	alertBox.style.textAlign = "center";
	alertBox.style.width = options.w + "px";
	alertBox.style.height = options.h + "px";
	alertBox.style.fontSize = "20px";

	var rect = alertBox.getBoundingClientRect();

	var elmBox = this.simCanvas.getBoundingClientRect();

	var alertBoxMsg = document.createElement("div");
	alertBoxMsg.className = "phsim-alertbox-msg"
	alertBoxMsg.innerText = options.msg;
	alertBoxMsg.style.textAlign = "left";
	alertBoxMsg.style.padding = "20px";

	alertBox.appendChild(alertBoxMsg);

	var closeButton = document.createElement("div");
	closeButton.addEventListener("click",options.onok);
	closeButton.innerText = options.closeButtonTxt;
	alertBox.appendChild(closeButton);

	this.simContainer.appendChild(alertBox);

	alertBox.style.position = "absolute";
	alertBox.style.left = (elmBox.width * 0.5 - alertBox.offsetWidth * 0.5) + "px";
	alertBox.style.top = (elmBox.height * 0.5 - alertBox.offsetHeight * 0.5) + "px";

	return alertBox;

}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {string} mode - The possible modes are "force","velocity","translate"
 * @param {dyn_object} dyn_object - The dynamic object to put in motion.
 * @param {*} motion - The vector or scalar that defines the motion.
 * @returns {Function} - The method to 
 * 
 * 
*/

PhSim.DynSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

	var self = this;
	
	if(mode === "force") {
		return function() {
			return self.applyForce(dyn_object,dyn_object.matter.position,motion);
		}
	}

	if(mode === "velocity") {
		return function() {
			return self.setVelocity(dyn_object,motion);
		}
	}

	if(mode === "translate") {
		return function() {
			return self.translate(dyn_object,motion);
		}
	}

	if(mode === "position") {
		return function() {
			return self.setPosition(dyn_object,motion)
		}
	}

	if(mode === "rotation") {
		return function() {
			return self.rotate(dyn_object,motion,dyn_object.matter.position);
		}
	}

	if(mode === "circular_constraint_rotation") {
		return function() {
			return self.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	if(mode === "setAngle") {
		return function() {
			return self.setAngle(dyn_object,motion);
		}
	}

	if(mode === "circular_constraint_setAngle") {
		return function() {
			var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
			self.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
			self.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
		}
	}

	return console.error("Parameter 'mode' must either be equal to the one of the following strings: 'force','velocity' or 'position'.");

}

// Set Angle to mouse.

// Object Connection

PhSim.DynSim.prototype.connectDynObjects = function(parent,child) {

	Matter.Body.setStatic(child,true);

	var self = this;
	
	var f = function() {

		var v = {
			"x": parent.matter.position.x - parent.matter.positionPrev.x,
			"y": parent.matter.position.y - parent.matter.positionPrev.y,
		}

		self.translate(child,v);

		self.rotate(child,parent.matter.angle - parent.matter.anglePrev,parent.matter.position);

	}

	this.addEventListener("afterupdate",f)

	return f;

}

PhSim.DynSim.prototype.createCircularConstraint = function(dynObject,x,y) {
	
	var c = Matter.Constraint.create({
		
		"bodyA": dynObject.matter,
		
		"pointB": {
			"x": x,
			"y": y
		}

	});

	Matter.World.add(this.matterJSWorld,c)

	var relAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x);

	this.addEventListener("afterupdate",function(){
		var newAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x) - relAngle;
		this.setAngle(dynObject,newAngle);
	});


	dynObject.circularConstraintVector = {
		"x": x,
		"y": y
	}

}

/**
 * 
 * @param {*} dynObject 
 */

PhSim.DynSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

// Spawn Function

PhSim.DynSim.prototype.spawnObject = function(dynObject) {
	var obj = new PhSim.DynObject(dynObject.static);
	obj.cloned = true;
	obj.loneParent = dynObject;

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.PhEvent;
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/*** 

Keyboard Controls

***/

PhSim.DynSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			Matter.Body.setVelocity(dynObj.matter, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			Matter.Body.setVelocity(dynObj.matter, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.addEventListener("keydown",f,{
		"slEvent": true
	}); 

}

/**
 * Remove dynamic object
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 */

PhSim.DynSim.prototype.removeDynObj = function(dynObject) {
	Matter.Composite.remove(this.matterJSWorld,dynObject.matter,true);
	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);
}

/**
 * Set Object Lifespan
 * 
 * @function setDynObjectLifespan
 * @param {*} dynObject - Dynamic Object
 * @param {Number} lifespan - Milliseconds 
 * 
 */

PhSim.DynSim.prototype.setDynObjectLifespan = function(dynObject,lifespan) {

	var self = this;

	setTimeout(lifespan,function(){
		self.removeDynObj(dynObject);
	});

}

PhSim.DynSim.prototype.renderAllCounters = function() {
	for(var i = 0; i < this.counterArray.length; i++) {
		this.renderCounterByIndex(i);
	}
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {


// Play Audio Index

PhSim.DynSim.prototype.playAudioByIndex = function(i) {
	this.audioArray.array[i].play();
}

PhSim.DynSim.prototype.pauseAudioByIndex = function(i) {
	this.audioArray.array[i].pause();
}

PhSim.DynSim.prototype.pauseAudioByIndex = function(i) {
	this.audioArray.array[i].pause();
}

PhSim.DynSim.prototype.setAudioVolByIndex = function(i,v) {
	this.audioArray.array[i].volume = v;
	return this.audioArray.array[i].volume; 
}

PhSim.DynSim.prototype.setAudioMuteByIndex = function(i) {
	this.audioArray.array[i].muted = v;
	return this.audioArray.array[i].muted;
}

PhSim.DynSim.prototype.toggleAudioByIndex = function(i) {
	
	if(	this.audioArray.array[i].muted === true) {
		this.audioArray.array[i].muted = false;
		return false;
	}

	if(	this.audioArray.array[i].muted === false) {
		this.audioArray.array[i].muted = true;
		return true;
	}

}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.registerCanvasEvents = function() {

	var self = this;

	// onmousedown

	this.eventStack.mousedown = []

	this.mousedownBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "mousedown";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);

		if(!self.paused) {
			if(self.objMouseArr.length > 0) {
				self.callEventClass("objmousedown",canvas,eventObj);
			}
		}

		self.callEventClass("mousedown",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mousedown",function(e) {
		if(!self.filter) {
			self.mousedownBridge(e);
		}
	});

	// click

	this.eventStack.click = []
	this.eventStack.objclick = []

	this.clickBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "click";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);


		if(self.objMouseArr.length > 0) {
			self.callEventClass("objclick",canvas,eventObj);
		}

		self.callEventClass("click",canvas,eventObj);
	}

	this.simCanvas.addEventListener("click",function(e) {
		if(!self.filter) {
			self.clickBridge(e);
		}
	});

	//mousemove

	this.eventStack.mousemove = this.eventStack.mousemove || []
	this.eventStack.objmousemove = this.eventStack.objmousemove || []

	this.mousemoveBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;

		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;

		if(self.mouseX && self.mouseY) {
			self.prevMouseX = self.mouseX;
			self.prevMouseY = self.mouseY;
		}

		self.prevObjMouseArr = [];

		if(self.objMouseArr) {
			self.prevObjMouseArr = [...self.objMouseArr];
		}

		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
	
		self.dynArr = self.objMouseArr;

		self.objMouseArr = [];
		self.formerMouseObjs = [];
		self.newMouseObjs = [];

		if(self.init) {

			for(i = 0; i < self.objUniverse.length; i++) {

				if(self.pointInObject(self.objUniverse[i],self.mouseX,self.mouseY)) {
					self.objMouseArr.push(self.objUniverse[i])
				}
	
				if(!self.objMouseArr.includes(self.objUniverse[i]) && self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.formerMouseObjs.push(self.objUniverse[i])
				}
	
				if(self.objMouseArr.includes(self.objUniverse[i]) && !self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.newMouseObjs.push(self.objUniverse[i])
				}
	
			}

			if(self.objMouseArr.length > 0) {
				self.callEventClass("objmousemove",canvas,eventObj);
			}

			if(self.newMouseObjs.length > 0) {
				eventObj.newMouseObjs = self.newMouseObjs;
				self.callEventClass("objmouseover",canvas,eventObj);
			}

			if(self.formerMouseObjs.length > 0) {
				eventObj.formerMouseObjs = self.formerMouseObjs;
				self.callEventClass("objmouseout",canvas,eventObj);
			}
		}

		//console.log(self.objMouseArr)

		self.callEventClass("mousemove",canvas,eventObj);

		//console.log(eventObj);
	}

	this.simCanvas.addEventListener("mousemove",function(e) {
		if(!self.filter) {
			self.mousemoveBridge(e);
		}
	});

	/*** Mouseup bridge ***/

	this.eventStack.objmouseup = [];

	this.mouseupBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;

		if(self.objMouseArr.length > 0) {
			self.callEventClass("objmouseup",canvas,eventObj);
		}

		self.callEventClass("mouseup",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseup",function(e) {
		if(!self.filter) {
			self.mouseupBridge(e);
		}
	});

	/*** Mouseout bridge ***/

	this.mouseoutBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseout",function(e) {
		if(!self.filter) {
			self.mouseoutBridge(e);
		}
	});

}

PhSim.DynSim.prototype.registerKeyEvents = function() {

	this.windowObj = this.windowObj || window;

	var self = this;

	this.keyElm = document.createElement("div");

	this.keydownBridge = function(e) {
		var eventObj = new PhSim.PhKeyEvent();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",self,eventObj);
	}

	this.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	this.windowObj.addEventListener("keydown",this.keydownBridgeWrapper);
}

PhSim.DynSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",this.keydownBridgeWrapper);
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * 
 * Used to add events to a PhSim simulation
 * 
 * @function
 * @param {string} eventStr - String representing the event.
 * @param {PhSimEventCall} call - Function to run when event is executed.
 * @param {object} [options = {}] - Event Listener Options.
 * @param {boolean} [options.once] - If true, the function is executed only once.
 * @param {boolean} [options.slEvent] - If true, the event will be removed when the simulation changes
 * 
 */

PhSim.DynSim.prototype.addEventListener = function(eventStr,call,options = {}) {
	
	

	if(options && options.slEvent === true) {
		if(this.slEventStack[eventStr]) {
			this.slEventStack[eventStr].push(call);
		}
	}

	else {
		if(this.eventStack[eventStr]) {
			this.eventStack[eventStr].push(call);
		}
	}


	if(options) {
		if(options === true) {
			if(options.once) {
	
				var f = function(e) {
					this.removeEventListener(eventStr,call)
					this.removeEventListener(eventStr,f)
				}
	
				this.addEventListener(eventStr,f);

			}
		}

	}


	else {
		throw new Error("Event Target Not Available")
	}

}

/**
 * @function 
 * @param {String} eventStr 
 * @param {PhSimEventCall} call 
 */


PhSim.DynSim.prototype.removeEventListener = function(eventStr,call) {
	
	if(this.eventStack[eventStr] && this.eventStack[eventStr].includes(call)) {
		var callIndex = this.eventStack[eventStr].indexOf(call);
		this.eventStack[eventStr].splice(callIndex,1);
	}

	if(this.slEventStack[eventStr] && this.slEventStack[eventStr].includes(call)) {
		var callIndex = this.slEventStack[eventStr].indexOf(call);
		this.slEventStack[eventStr].splice(callIndex,1);
	}

}

/**
 * @function
 * @param {String} eventStr 
 * @param {Object} thisArg 
 * @param {Object} eventArg 
 */

PhSim.DynSim.prototype.callEventClass = function(eventStr,thisArg,eventArg) {
	
	if(this.eventStack[eventStr]) {
		for(var i = 0; i < this.eventStack[eventStr].length; i++) {
			var func = this.eventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}

	if(this.slEventStack[eventStr]) {
		for(var i = 0; i < this.slEventStack[eventStr].length; i++) {

			var func = this.slEventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * 
 * Get the special points of a rectangle
 * 
 * @function
 * @param {Object} rectangle 
 */

PhSim.Tools.getSpecialRectanglePoints = function(rectangle) {
	
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
 * Get the status string of the the dynamic simulation
 * @function
 */

PhSim.DynSim.prototype.getStatusStr = function() {
	return PhSim.DynSim.statusStruct[this.status];
}

/**
 * 
 * Get collision classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {String[]}
 * 
 */

PhSim.DynSim.prototype.getCollisionClasses = function(dynObject) {

	if(dynObject.object.collisionClass) {
		var a = dynObject.object.collisionClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * @function
 */

PhSim.DynSim.prototype.getUniversalObjArray = function() {
	
	var array = []
	
	for(var i = 0; i < this.matterJSWorld.composites.length; i++) {
		
		var a = this.matterJSWorld.composites[i].bodies;

		for(var j = 0; j < a.length; j++) {
			array.push(a[j]);
		}

	}

	for(var i = 0; i < this.matterJSWorld.bodies.length; i++) {
		array.push(this.matterJSWorld.bodies[i]);
	}

	return array;

}

/**
 * 
 * @param {Object} widget 
 */

PhSim.Tools.chkWidgetType = function(widget) {

	var widgetKeys = Object.keys(PhSim.Widgets);

	for(var i = 0; i < widgetKeys.length; i++) {

		var sa1 = widgetKeys[i].split("");
		sa1[0] = sa1[0].toLowerCase();
		var sa2 = sa1.join("");

		if(widget[sa2]) {
			return sa2;
		}
	}

	return "unknown_widget";

}

/**
 * Get static object of a dynamic object
 * @param {PhSim.DynObject} dynObject - The dynamic object
 */

PhSim.DynSim.prototype.getStatic = function(dynObject) {
	
	if(dynObject.permStatic || dynObject.permStatic) {
		return null;
	}

	else {
		return dynObject.static;
	}
}

/**
 * Get object by name
 * 
 * @function
 * @param {String} str - String for the name
 * @returns {PhSim.DynObject}
 */

PhSim.DynSim.prototype.getObjectByName = function(str) {

	var returnObj;
	var self = this;
	
	this.forAllObjects(function(dynObject) {
		if(self.getStatic(dynObject).name === str) {
			returnObj = dynObject;
			return false;
		}
	});

	return returnObj;

}

/**
 * Check if two objects are colliding
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB
 * @returns {Boolean} 
 */

PhSim.DynSim.prototype.collided = function(dynObjectA,dynObjectB) {
	return Matter.SAT.collides(dynObjectA.matter,dynObjectB.matter).collided;
}

/**
 * Check if an object is in a collision
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.DynSim.prototype.isInCollision = function(dynObject) {

	var self = this;

	var returnValue = false;

	this.forAllObjects(function(object) {
		var a = self.collided(dynObject,object);
		if(a === true) {
			returnValue = a;
			return false;
		}	
	});

	return returnValue;
}

/**
 * 
 * Check if a point (x,y) is in a dynamic object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {Boolean}
 */

PhSim.DynSim.prototype.pointInObject = function(dynObject,x,y) {
	var c = document.createElement("canvas");
	
	var l = c.getContext("2d");
	var m = new PhSim.PhRender(l);
	m.dynamicSkeleton(dynObject);
	var t = l.isPointInPath(x,y);
	return t;
}

/**
 * Get object by ID
 * 
 * @function
 * @param {String} idNum
 * @returns {PhSim.DynObject} 
 * 
 */

PhSim.DynSim.prototype.getDynObjectByID = function(idNum) {

	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		if(a[i].id === idNum) {
			return a[i];
		}
	}

}

/**
 * 
 * Get array of objects that contain a certain point 
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.DynSim.prototype.pointObjArray = function(x,y) {

	var b = [];

	var a = this.objUniverse || [];

	for(var i = 0; i < a.length; i++) {
		if(this.pointInObject(a[i],x,y)) {
			b.push(a[i]);
		}
	}

	return b;

}

/** 
 * Get the collison pairs that contain a certain object 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject
 * @returns {PhSim.phSimCollision[]}
 * 
 */

PhSim.DynSim.prototype.getCollisionList = function(dynObject) {

	var z = [];

	for(var i = 0; i < this.matterJSEngine.pairs.list.length; i++) {

		var a = this.matterJSEngine.pairs.list[i];

		if(a.bodyA.plugin.ph.id === dynObject.id || a.bodyB.plugin.ph.id === dynObject.id) {
			
			var o = new PhSim.phSimCollision();
			o.bodyA = a.bodyA.plugin.ph;
			o.bodyB = a.bodyB.plugin.ph;
			o.matter = a;
			z.push(o);

			console.dir(o);

		}

	}

	return z;
}

/**
 * 
 * Get array of Dynamic Object colliding some specified colliding object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.DynSim.prototype.getCollidingObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		if(a[i].matter.bodyA.plugin.id === dynObject.id) {
			b.push(a[i].bodyB);
		}

		if(a[i].matter.bodyB.plugin.id === dynObject.id) {
			b.push(a[i].bodyA);		
		}

	}

	return b;

}

/**
 * Get senor classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {String[]}
 */

PhSim.DynSim.prototype.getSensorClasses = function(dynObject) {

	if(dynObject.object.sensorClass) {
		var a = dynObject.object.sensorClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * 
 * Check if two objects share at least one sensor class
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB 
 * @returns {Boolean}
 */

PhSim.DynSim.prototype.sameSensorClasses = function(dynObjectA,dynObjectB) {
	return intersectionExists(this.getSensorClasses(dynObjectA),this.getSensorClasses(dynObjectB));
}

function intersectionExists(array1,array2) {

	for(var i = 0; i < array1.length; i++) {
		var a = array2.indexOf(array1[i]);
		if(a !== -1) {
			return true;
		}
	}

	return false;
}

/**
 * 
 * Get objects colliding some object that share the same 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Object to check for colliding sensor objects
 * @returns {PhSim.DynObject[]} 
 */

PhSim.DynSim.prototype.getCollidingSensorObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		var dynCol = a[i]
		var matterCol = dynCol.matter;

		if(matterCol.bodyA.plugin.ph.id === dynObject.id && this.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.plugin.ph.id === dynObject.id && this.sameSensorClasses(dynObject,dynCol.bodyA)) {
			b.push(dynCol.bodyA);		
		}

	}

	return b;

}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.DynSim.prototype.inSensorCollision = function(dynObject) {
	
	var a = this.getCollidingSensorObjects(dynObject); 
	
	if(a.length > 0) {
		return true;	
	}

	else {
		return false;
	}
}

/**
 * @function
 * @param {Number} cx - x-coordinate of upper left corner.
 * @param {Number} cy - y-coordinate of upper left corner.
 * @param {Number} cw - width of rectangle
 * @param {Number} ch - height of rectangle
 * @param {Number} px - x-coordinate of point to be checked.
 * @param {Number} py - y-coordinate of point to be checked.
 * @returns {Boolean}
 */

PhSim.Tools.isPointInRawRectangle = function(cx,cy,cw,ch,px,py) {
	
	var cond = (cx < px) && (px < cx + cw) && (cy < py) && (py < cy + ch) 

	if(cond) {
		return true;
	}

	else {
		return false;
	}
}

/**
 * 
 * Get object that checks the collision relations between two objects
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA - The first object
 * @param {PhSim.DynObject} dynObjectB - The second object
 * @returns {PhSim.CollisionReport} - A collision report that updates itself after each update
 */

PhSim.DynSim.prototype.getCollisionChecker = function(dynObjectA,dynObjectB) {

	var self = this;
	var report = new PhSim.CollisionReport();
	report.before = null;
	report.current = null;
	report.difference = null;
	report.objectA = dynObjectA;
	report.objectB = dynObjectB;

	this.addEventListener("beforeupdate",function() {
		report.before = self.collided(dynObjectA,dynObjectB);
	});

	this.addEventListener("afterupdate",function() {
		report.current = self.collided(dynObjectA,dynObjectB);
		report.difference = report.current - report.before;
		if(report.difference) {
			var eventObj = new PhSim.PhDynEvent();
			eventObj.report = report;
			eventObj.difference = report.difference;
			self.callEventClass("collisionchange",self,eventObj);
		}

	})

	return report;
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// Newtonian Gravity

PhSim.DynSim.prototype.applyGravitationalField = function() {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		for(var j = 0; j < a.length; j++) {
			if(i !== j && !a[i].matter.isStatic && !a[j].matter.isStatic) {
				var a1 = PhSim.Tools.scaleVector(PhSim.Tools.subtractVectors(a[j].matter.position,a[i].matter.position),6.67 * Math.pow(10,-11) * a[i].matter.mass * a[j].matter.mass * -1)
				var b1 = Math.pow(PhSim.Tools.calcVertDistance(a[j].matter.position,a[i].matter.position),3);
				var c = PhSim.Tools.divideVector(a1,b1);
				this.applyForce(a[j],a[i].matter.position,c);
			}
		}	
	}

}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.play = function() {

	if(this.init === false) {
		this.initSim(0);
	}

	else {
		this.paused = false;
	}

}

PhSim.DynSim.prototype.toggle = function() {
	
	if(this.paused === false) {
		this.paused = true;
		return true;
	}

	if(this.paused === true) {
		this.paused = false;
		return false;
	}; 

}

PhSim.DynSim.prototype.pause = function() {
	this.paused = true;
}

PhSim.DynSim.prototype.exitSl = function() {
	this.callEventClass("beforeslchange",this,new PhSim.PhEvent());
	this.paused = false;
	clearInterval(this.intervalLoop);
}

PhSim.DynSim.prototype.exit = function() {
	this.callEventClass("exit",this,new PhSim.PhEvent());
	this.deregisterKeyEvents();
	this.exitSl();
}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * Go to simulation in the composite simulation
 * @param {Number} i 
 */

PhSim.DynSim.prototype.gotoSimulationIndex = function (i) {

	var self = this;

	this.firstSlUpdate = false;

	var event = new PhSim.PhEvent();

	event.type = "slchange";

	this.callEventClass("beforeslchange",this,event);

	if(!this.noCamera) {
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

	if(this.simCtx) {
	    this.drawLoadingScreen();
	}
	
	//this.dynsimulation = new DynSL(this.sim.simulations[i],this.simCtx);

	this.slEventStack = new PhSim.EventStack();

	this.simulation = this.sim.simulations[i];

	this.simulationIndex = i;

	if(this.simCtx) {
		this.width = this.simCtx.canvas.width;
		this.height = this.simCtx.canvas.height;
	}
	
	this.paused = false;


	if(this.paused) {
		this.paused = false;
	}

	else {

		var this_a = this;

		this.matterJSWorld = Matter.World.create();
		this.dynTree = [];
		this.objUniverse = [];
		this.staticSprites = [];
		this.staticAudio = [];
		this.audioPlayers = 0;
		this.collisionClasses = {};

		this.matterJSEngine = Matter.Engine.create({
			world: this_a.matterJSWorld
		});

		var ncc = new PhSim.CollisionClass("__main");
		ncc.engine = this.matterJSEngine;
		ncc.world = this.matterJSWorld;

		this.collisionClasses["__main"] = ncc;

		if(this.sim.simulations) {
		
			for(var L = 0; L < this.simulation.layers.length; L++) {

				var layerComposite = Matter.Composite.create();
				var layerBranch = [];

				for(var O = 0; O < this.simulation.layers[L].objUniverse.length; O++) {
					
					if(this.simulation.layers[L].objUniverse[O].noDyn || this.simulation.layers[L].objUniverse[O].permStatic) {
						layerBranch.push(this.simulation.layers[L].objUniverse[O]);
						this.objUniverse.push(this.simulation.layers[L].objUniverse[O]);
						this.staticSprites.push(this.simulation.layers[L].objUniverse[O].sprite)				
					}

					else {
						var dynObject = new PhSim.DynObject(this.simulation.layers[L].objUniverse[O])
						
						// If the collision class object exists

						if(dynObject.static.collisionClass && dynObject.static.collisionClass.trim() !== "__main") {

							var a = this.getCollisionClasses(dynObject);

							for(var i = 0; i < a.length; i++) {
								
								if(this.collisionClasses[a[i]]) {
									this.collisionClasses[a[i]].addDynObject(dynObject)
								}

								else {
									var ncc = new PhSim.CollisionClass(a[i]);
									ncc.addDynObject(dynObject);
									this.collisionClasses[a[i]] = ncc;
								}
							}

						}

						else {
							Matter.World.add(layerComposite,dynObject.matter);
						}
						
						if(dynObject.static.widgets) {
							this.extractWidgets(dynObject);
						}

						layerBranch.push(dynObject);
						this.objUniverse.push(dynObject);
						dynObject.layerBranch = layerBranch;
						
						if(dynObject.static.sprite) {
							this.staticSprites.push(dynObject.static.sprite)
						}

					}
				}

				Matter.World.add(this.matterJSWorld,layerComposite);
				this.dynTree.push(layerBranch);

				var a = new PhSim.PhDynEvent();
				this_a.callEventClass("matterJSLoad",this_a,a);

			}

		}

		Matter.Events.on(this.matterJSEngine,"collisionStart",function(event) {
			
			var a = new PhSim.PhDynEvent();
			a.matterEvent = event;
			this_a.callEventClass("collisionstart",this_a,a);

		});

		if(this.simulation.game) {
			this.lclGame = this.extractLclGame(this.simulation.game);
		}

		for(var C = 0; C < this_a.simulation.widgets.length; C++) {
				
			var a = this_a.simulation.widgets[C];

			if(a.constraint) {

				var b = {}

				if(a.objectA) {
					b.bodyA = this_a.LO(a.objectA.L,a.objectA.O);;
				}

				if(a.objectB) {
					b.bodyB = this_a.LO(a.objectB.L,a.objectB.O);
				}

				if(a.pointA) {
					b.pointA = a.pointA;
				}

				if(a.pointB) {
					b.pointB = a.pointB;
				}

				var c = Matter.Constraint.create(b);

				Matter.World.add(this.matterJSWorld,c)

			}

			if(a.connection) {

				this_a.connectDynObjects(this_a.dynTree[a.objectA.L][a.objectA.O],this_a.dynTree[a.objectB.L][a.objectB.O]);

			}



		}

		var promise = new Promise(function(resolve,reject){

			if(self.phRender) {
				self.phRender.spriteImgArray = new PhSim.Sprites.SpriteImgArray(self.staticSprites,function() {
					resolve();
				});
			}

			else {
				resolve();
			}

		}).then(function() {
			return new Promise(function(resolve,reject){
				self.audioArray = new PhSim.Audio.AudioArray(self.staticAudio,function(){
					resolve();
				});
			})
		}).then(function(){
			this_a.intervalLoop = setInterval(this_a.loopFunction.bind(this_a),this_a.delta);
			this_a.init = true;
		});

		
		//return this.MatterJSEngine;

	}



	return this.dynsimulation;
}

PhSim.DynSim.prototype.initSim = function(simulationI) {

	this.status = 1;
	var self = this;
	this.status = 2;

	this.status = 3;
	var e = new PhSim.PhEvent();
	self.gotoSimulationIndex(0);
	self.callEventClass("load",self,e);
	self.addEventListener("collisionstart",function() {
		//self.playAudioByIndex(self.simulation.collisionSound);
	});
	self.status = 4;

}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.applyForce = function(dynObject,position,forceVector) {
	return Matter.Body.applyForce(dynObject.matter,position,forceVector);
}

PhSim.DynSim.prototype.setVelocity = function(dynObject,velocityVector) {
	return Matter.Body.setVelocity(dynObject.matter,velocityVector);
}

PhSim.DynSim.prototype.translate = function(dynObject,translationVector) {
	return Matter.Body.translate(dynObject.matter,translationVector);
}

PhSim.DynSim.prototype.setPosition = function(dynObject,positionVector) {
	Matter.Body.setPosition(dynObject.matter,positionVector);
}

PhSim.DynSim.prototype.rotate = function(dynObject,angle,point) {
	return Matter.Body.rotate(dynObject.matter, angle, point)
}

PhSim.DynSim.prototype.setAngle = function(dynObject,angle) {
	return Matter.Body.setAngle(dynObject.matter,angle);
}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.assignPhRender = function(phRender) {

	/** PhRender object */

	this.phRender = phRender;

	/** Refence to simulation in PhRender */

	this.phRender.sim = this.sim;

	/** Refence to dynamic simulation in PhRender */

	this.phRender.dynSim = this;
	return phRender;
}

PhSim.DynSim.prototype.setRadius = function(dynObject,radius) {

	var ratio = radius / dynObject.object.radius;

	if(dynObject.object.regPolygon || dynObject.object.circle) {
		Matter.Body.scale(dynObject.object, ratio, ratio);
	}

}

PhSim.DynSim.prototype.setRectWidthAndHeight = function(dynObject,w,h) {

}

/**
 * 
 * @param {*} dyn_object - Dynamic Object
 * @param {*} colorStr - Color
 */

PhSim.DynSim.prototype.setColor = function(dyn_object,colorStr) {
	dyn_object.object.fillStyle = colorStr;
}

/**
 * 
 * @param {*} dyn_object 
 * @param {*} colorStr 
 */

PhSim.DynSim.prototype.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.object.strokeStyle = colorStr;
}

/**
 * 
 * @param {*} dyn_object 
 * @param {*} lineWidth 
 */

PhSim.DynSim.prototype.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.object.lineWidth = lineWidth;
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

PhSim.DynSim.prototype.updateDynObj = function(currentObj) {


	// Loop must start at index 1 because the first element in the array is a reference to the parent object itself.

	if(currentObj.noDyn || currentObj.permStatic) {
		this.phRender.renderStatic(currentObj);	
	}
	
	else {

		if(currentObj.object.circle || currentObj.object.regPolygon || currentObj.object.rectangle) {
			currentObj.object.cycle = currentObj.firstCycle + currentObj.matter.angle;
		}
	
		if(currentObj.object.rectangle) {
			
			var v = {
				"x": currentObj.matter.position.x - currentObj.matter.positionPrev.x,
				"y": currentObj.matter.position.y - currentObj.matter.positionPrev.y 
			}
	
			currentObj.object.x = currentObj.matter.position.x - currentObj.object.w * 0.5
			currentObj.object.y = currentObj.matter.position.y - currentObj.object.h * 0.5
	
		}
	
		if(currentObj.object.circle || currentObj.object.regPolygon) {
			currentObj.object.x = currentObj.matter.position.x;
			currentObj.object.y = currentObj.matter.position.y;
		}
	
		if(currentObj.object.path) {
			PhSim.calc_skinmesh(currentObj);
		}

		if(this.phRender) {	
			this.phRender.dynamicRenderDraw(currentObj);
		}

	}

	var event = new PhSim.PhEvent();
	event.type = "objupdate";
	event.target = currentObj;

	this.callEventClass("objupdate",this,event);

}

PhSim.DynSim.prototype.loopFunction = function() {

	if(this.paused === false) {

		var beforeUpdateEvent = new PhSim.PhDynEvent()

		beforeUpdateEvent.simulation = this.simulation;

		this.prevDate = this.prevDate && this.updateDate;
	
		this.callEventClass("beforeupdate",this,beforeUpdateEvent);

		this.updateDate = new Date();

		if(this.prevDate) {
			this.updateTimeInterval = this.updateDate - this.prevDate;
		}

		for(var c in this.collisionClasses) {
			Matter.Engine.update(this.collisionClasses[c].engine,this.delta);
		}

		if(this.simCtx) {

			this.simCtx.fillStyle = this.simulation.world.bg;

			if(this.noCamera) {
				this.simCtx.fillRect(0,0,this.width,this.height);
			}
	
			else {
				this.simCtx.fillRect(0 - this.camera.x,0 - this.camera.y,this.width / this.camera.scale,this.height / this.camera.scale);
			}
		}

		for(i = 0; i < this.objUniverse.length; i++) {
			this.updateDynObj(this.objUniverse[i]);
		}
	
		this.applyGravitationalField()

		var afterUpdateEvent = new PhSim.PhDynEvent()

		afterUpdateEvent.simulation = this.simulation;

		this.sl_time = this.sl_time + this.delta;

		if(this.filter) {
			this.simCtx.fillStyle = "rgba(3,3,3,0.7)";
			this.simCtx.fillRect(0,0,this.width / this.camera.scale,this.height / this.camera.scale);
		}

		if(!this.firstSlUpdate) {
			this.callEventClass("firstslupdate",this,afterUpdateEvent);
			this.firstSlUpdate = true;
		}

		this.callEventClass("afterupdate",this,afterUpdateEvent);

		//this.renderAllCounters();


	}

}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/** 
 * 
 * Extract Widgets from Dynamic Object.
 * To extract a widget in PhSim is to read all of the objects in the "widgets" array found in each
 * well-formed PhSim object and then translate it into JavaScript.
 * 
 * @param {Object} widget - The Widget
 * @param {PhSim.DynObject} dyn_object The individual Dynamic Object
 * @returns undefined
 * 
*/

PhSim.DynSim.prototype.extractWidget = function(widget,dyn_object) {
	
    var self = this;
    
        if(widget.changeSl) {
    
            var closure = function() {
    
                var i = widget.slIndex;
    
                var f = function() {
                    self.gotoSimulationIndex(i)
                }
    
                return f;
            }
    
            this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.numVar) {
            self.numVar[widget.name] === widget.value;
        }
        
        if(widget.keyboardControls) {
            this.addKeyboardControls(dyn_object,widget)
        }
    
        if(widget.circularConstraint) {
            this.createCircularConstraint(dyn_object,widget.x,widget.y);
        }
    
        if(widget.setNumVar) {
    
            var closure = function() {
    
                var c = widget.value;
                var a = widget.name;
    
                var f = function() {
                    self.numVar[a] === c;
                }
    
                return f;
            }
    
            this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
    
        }
    
        if(widget.force) {
            var f = this.createMotionFunction("force",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.velocity) {
            var f = this.createMotionFunction("velocity",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.translate) {
            var f = this.createMotionFunction("translate",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.position) {
            var f = this.createMotionFunction("position",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.rotation) {
    
            if(widget.circularConstraintRotation) {
                var f = this.createMotionFunction("circular_constraint_rotation",dyn_object,widget.cycle);
            }
    
            else {
                var f = this.createMotionFunction("rotation",dyn_object,widget.cycle);
            }
            
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.setAngle) {
            
            if(widget.circularConstraintRotation) {
                var f = this.createMotionFunction("circular_constraint_setAngle",dyn_object,widget.cycle);
            }
    
            else {
                var f = this.createMotionFunction("setAngle",dyn_object,widget.cycle);
            }
            
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });		
        }
    
        if(widget.deleteSelf) {
    
            var ref = null;
    
            var closure = function() {
    
                var o = dyn_object;
    
                var f = function(){
                    self.removeDynObj(o);
                    self.removeSimpleEvent(ref);
                }
    
                return f;
            }
    
            var ref = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.toggleLock) {
            
        }
    
        if(widget.clone) {
    
            // Clone By Time
    
            if(widget.trigger === "time") {
            
                var getFunction = function() {
    
                    var time = widget.time;
                    var maxN = widget.maxN;
    
                    var func = null;
    
                    if(Number.isInteger(maxN)) {
    
                        func = function(e) {
    
                            if(func.__n === maxN) {
                                clearInterval(func.__interN);
                            }
    
                            else {
                                if(!self.paused) {
                                    self.spawnObject(dyn_object);
                                    func.__n++;
                                }
                            }
    
                        }
    
                        func.__n = 0;
    
                    }
    
                    else {
    
                        func = function(e) {
                            if(!self.paused) {
                                self.spawnObject(dyn_object);
                            }
                        }
    
                    }
    
    
                    func.__phtime = time;
                    func.__interN = null;
    
                    return func;
    
                }
    
                var refFunc = getFunction();
    
                refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
    
            }
    
            // Clone By Key
    
            if(widget.trigger === "key") {
    
                var getFunction = function() {
    
                    var kc = widget.key;
                    var vc = widget.vector;
    
                    var cloneByKeyFunc = function(e) {
                        if(e.key === kc) {
                            self.spawnObject(dyn_object,vc);
                        }
                    }
    
                    return cloneByKeyFunc;
    
                }
    
                this.addEventListener("keydown",getFunction());
    
            }
    
        }
    
        if(widget.draggable) {
    
    
            var func = function(e) {
    
                var change = false;
                var __ismoving = true;
                var constraint = null;
    
                // Displacement vector between mouse and centroid of object when the mouse is pushed downwards.
    
                var delta = {}
    
                // Mouse Position
    
                var mV = {
                    x: null,
                    y: null
                }
    
                var __onmousemove = function(e) {
                    mV.x = e.x - delta.x;
                    mV.y = e.y - delta.y;
                }
    
                var __onmouseup = function() {
                    self.removeEventListener("mousemove",__onmousemove);
                    self.removeEventListener("mouseup",__onmouseup);
                    self.removeEventListener("beforeupdate",__onbeforeupdate);
                }
    
                var __onbeforeupdate = function() {
                    Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
                    self.setPosition(dyn_object,mV);
                }
    
                var __onmousedown = function(e) {
                    if(self.pointInObject(dyn_object,e.x,e.y)) {
    
                        delta.x = e.x - dyn_object.matter.position.x;
                        delta.y = e.y - dyn_object.matter.position.y;
    
                        self.addEventListener("mousemove",__onmousemove);
                        self.addEventListener("mouseup",__onmouseup);
                        self.addEventListener("beforeupdate",__onbeforeupdate);
    
                        __onmousemove(e);
                    }
                }
                
                self.addEventListener("mouseout",__onmouseup);
    
                return __onmousedown;
    
            }
    
            this.addEventListener("mousedown",func());
        }
    
        if(widget.rectText) {
            dyn_object.rectTextWidget === true;
        }
    
        if(widget.coin) {
    
            var func = function() {
    
                var obj1 = dyn_object;
    
                var a = function() {
    
                    if(self.inSensorCollision(obj1) && self.lclGame) {
                        self.lclGame.setScore(self.lclGame.score + 1);
                        self.removeEventListener("collisionstart",a);	
                    }
    
                }
    
                return a;
    
            }
    
            self.addEventListener("collisionstart",func());
        
        }
        
        if(widget.hazard) {
    
            var func = function() {
    
                var obj1 = dyn_object;
    
                var a = function() {
    
                    if(self.inSensorCollision(obj1) && self.lclGame) {
                        self.lclGame.decrementLife(self.lclGame.score + 1);
                        self.removeEventListener("collisionstart",a);	
                    }
    
                }
    
                return a;
    
            }
    
            self.addEventListener("collisionstart",func());
    
        }
    
        if(widget.health) {
    
            var func = function() {
    
                var obj1 = dyn_object;
    
                var a = function() {
    
                    if(self.inSensorCollision(obj1) && self.lclGame) {
                        self.lclGame.incrementLife(self.lclGame.score + 1);
                        self.removeEventListener("collisionstart",a);	
                    }
    
                }
    
                return a;
    
            }
    
            self.addEventListener("collisionstart",func());
    
        }
    
        if(widget.noRotation) {
            Matter.Body.setInertia(dyn_object.matter, Infinity)
        }
    
        if(widget.elevator) {
            
    
            var func = function() {
            
                var type = widget.type;
    
                var obj = dyn_object;
                var relVec = PhSim.Tools.subtractVectors(widget.pointB,widget.pointA);
                
                var u = PhSim.Tools.getUnitVector(relVec);
                
                var ax;
                var ay;
                var bx;
                var by;
                
                // Corrections
                
                var reversable = true;
                
                // Condition function for checking if object is in bounds
                
                var cond_f = function() {}
                
                if(type === "x-bounded") {
    
                    if(widget.pointA.x < widget.pointB.x) {
                        ax = widget.pointA.x;
                        bx = widget.pointB.x;
                    }
                    
                    if(widget.pointB.x < widget.pointA.x) {
                       ax = widget.pointB.x;
                       bx = widget.pointA.x;
                    }
                
                    cond_f = function() {
                        return (ax <= obj.matter.position.x) && (obj.matter.position.x <= bx);
                    }
                
                }
                
                if(type === "y-bounded") {
    
                    if(widget.pointA.y < widget.pointB.y) {
                        ay = widget.pointA.y;
                        by = widget.pointB.y;
                    }
                    
                    if(widget.pointB.y < widget.pointA.y) {
                       ay = widget.pointB.y;
                       by = widget.pointA.y;
                    }
                
                    cond_f = function() {
                        return (ay <= obj.matter.position.y) && (obj.matter.position.y <= by);
                    }
                
                }
                
                // Set body static
                
                Matter.Body.setStatic(dyn_object.matter,true);
                
                // Event function
    
                var inRange = function() {
        
                if( cond_f() ) {
                self.translate(obj,PhSim.Tools.scaleVector(u,1));
                        reversable = true;
                }
                  
                    else {
                    
                        if(reversable) {
    
                            u = {
                                "x": -u.x,
                                "y": -u.y
                            }
    
                            reversable = false;
                        }
    
                        else {
                            self.translate(obj,PhSim.Tools.scaleVector(u,1));
                        }
                    
                    }
                    
    
                }
    
                return inRange
    
    
            }
    
            this.addEventListener("afterupdate",func());
    
        }
    
        if(widget.setColor) {
    
    
            var closure = function() {
                
                var color = widget.color;
                var obj = dyn_object;
    
                var f = function() {
                    self.setColor(obj,color);
                }
    
                return f;
    
            }
    
            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.setBorderColor) {
    
            var closure = function() {
    
                var color = widget.color
                var obj = dyn_object;
    
                var f = function() {
                    self.setBorderColor(obj,color);
                }
    
                return f;
    
            }
    
            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.setLineWidth) {
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.setLineWidth(dyn_object,widget.color);
            },{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.endGame) {
            var f = this.createMotionFunction("position",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.playAudio) {
    
            var i = this.audioPlayers;
    
            this.staticAudio.push(widget);
    
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.playAudioByIndex(i);
            },{
                ...widget,
                triggerObj: dyn_object
            });
    
            this.audioPlayers++;
        }
    
        if(widget.transformCameraByObj) {
    
            var self = this;
    
            this.addEventListener("afterupdate",function(){
                var dx = dyn_object.matter.position.x - dyn_object.matter.positionPrev.x;
                var dy = dyn_object.matter.position.y - dyn_object.matter.positionPrev.y;
                self.camera.translate(-dx,-dy);
            },{
                "slEvent": true
            });
    
        }
    
        if(widget.transformWithCamera) {
            this.camera.transformingObjects.push(dyn_object)
        }
    
        if(widget.cameraWindow) {
            self.camera.translate(dyn_object.x,dyn_object.y);
            self.camera.scale()
        }
    
        if(widget.objLink_a) {
    
            var widgetO = widget;
    
            this.addEventListener("matterJSLoad",function(){
                var eventFuncClosure = function() {
    
                    var targetObj = self.LO(widgetO.target.L,widgetO.target.O);
    
                    var eventFunc = function(){
                        self.callObjLinkFunctions(targetObj);
                    } 
    
                    return eventFunc;
                
                }
    
    
                var options = {
                    ...widgetO,
                    triggerObj: dyn_object
                }
    
                var f = self.addSimpleEvent(widgetO.trigger,eventFuncClosure(),options);
            });
    
        }
    
        
    
    }
    
    
    PhSim.DynSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.object.widgets.length; i++) {
            this.extractWidget(dyn_object.object.widgets[i],dyn_object);
        }
    }
    
    

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * @constructor
 * @param {*} dynSim 
 */

PhSim.DynSimCamera = function(dynSim) {

	/**
	 * Dynamic Simulation
	 * @type {PhSim.DynSim}
	 */

	this.dynSim = dynSim;

}

/**
 * Camera scale
 * @type {Number}
 */

PhSim.DynSimCamera.prototype.scale = 1;

/**
 * Camera offset x 
 * @type {Number}
 */

PhSim.DynSimCamera.prototype.x = 0;

/**
 * Camera offset y
 * @type {Number}
 */

PhSim.DynSimCamera.prototype.y = 0;

/**
 * Target object
 * @type {StaticObject}
 */

PhSim.DynSimCamera.prototype.targetObj = null;

/**
 * Objects that will transform with the camera
 * @type {StaticObject[]}
 */

PhSim.DynSimCamera.prototype.transformingObjects = []

PhSim.DynSimCamera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

PhSim.DynSimCamera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		this.dynSim.translate(this.transformingObjects[i],dx,dy);
	}
}

PhSim.DynSimCamera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}


PhSim.DynSim.prototype.loading = {
	"bgClr": "black",
	"txtClr": "White",
	"txtFace": "arial",
	"txtAlign": "center",
	"txt": "Loading...",
	"yPos": "center",
	"txtSize": 20
}

PhSim.DynSim.prototype.drawLoadingScreen = function() {
	this.simCtx.fillStyle = this.loading.bgClr;
	this.simCtx.fillRect(0,0,this.camera.scale,this.simCanvas.height);
	this.simCtx.fillStyle = this.loading.txtClr;
	this.simCtx.textAlign = this.loading.txtAlign;
	this.simCtx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.simCtx.fillText(this.loading.txt,this.simCanvas.width / 2,this.simCanvas.height / 2)
}

PhSim.DynSim.prototype.extractLclGame = function(localSettings) {

	var self = this;

	var o = {
		intLife: localSettings.life,
		goal: localSettings.goal,
		intScore: localSettings.score,
		static: localSettings,
		life: localSettings.life,
		score: localSettings.score,

		setScore: function(c) {

			o.score = c;

			if(o.score >= o.goal && Number.isInteger(o.score) && Number.isInteger(o.goal)) {
			
				self.pause();
				self.enableFilter();

				if(self.simulationIndex + 1 === self.sim.simulations.length) {
					var a = self.alert({
						msg:"You Win!",
						closeButtonTxt:"Play again",
						bgColor:"#333",
						txtColor:"#fff",
						w:300,
						h:100,
						onok: function() {
							self.disableFilter();
							a.parentNode.removeChild(a);
							self.gotoSimulationIndex(0);
						}
					});
				}

				else {
					clearInterval(self.intervalLoop);
					self.disableFilter();
					self.gotoSimulationIndex(self.simulationIndex + 1);
				}


			}
		},

		setLife: function(c) {
			o.life = c;

			if(o.life === 0) {
				o.end();
			}

		},

		incrementLife: function() {
			o.setLife(o.life + 1);
		},

		decrementLife: function() {
			o.setLife(o.life - 1);
		},

		end: function() {

			self.pause();
			self.enableFilter();


			var a = self.alert({
				msg:"Game Over",
				closeButtonTxt:"Try again",
				bgColor:"#333",
				txtColor:"#fff",
				w:300,
				h:100,
				onok: function() {
					self.gotoSimulationIndex(self.simulationIndex);
					self.disableFilter();
					a.parentNode.removeChild(a);	
				}
			});

		}

	}

	return o;

}

/***/ }),
/* 31 */
/***/ (function(module, exports) {


/**
 * Gradient Namespace
 * @namespace
 */

PhSim.Gradients = {}

/**
 * @function
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PhSim.Objects.Gradient} jsObject 
 */

PhSim.Gradients.extractGradient = function(ctx,jsObject) {

	var gradient = ctx.createLinearGradient(jsObject.limits.start.x,jsObject.limits.start.y,jsObject.limits.end.x,jsObject.limits.end.y);

	for(var i = 0; i < jsObject.stops.length; i++) {
		gradient.addColorStop(jsObject.stops[i].pos,jsObject.stops[i].color);
	}
	
	return gradient;

}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

/*** 
 * 
 * 
 * Object Widgets
 * 
 * 
****/

PhSim.Widgets = {}

PhSim.Widgets.Velocity = function() {
	this.velocity = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

//PhSim.Widgets.VelocityKey.desc = "VelocityKey is a widget that allows the user to change the velocity of a physical object by some key."

PhSim.Widgets.Force = function() {
	this.trigger = null;
	this.force = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

PhSim.Widgets.Position = function() {
	this.trigger = null;
	this.position = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

PhSim.Widgets.Translate = function() {
	this.trigger = null;
	this.translate = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

PhSim.Widgets.Clone = function() {
	this.trigger = null;
	this.timeCloner = true;
	this.time = null;
	this.clone = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
	this.copyWidgets = true;
	this.maxN = null;
}

PhSim.Widgets.DeleteSelf = function() {
	this.deleteSelf = true;
	this.trigger = null;
}

PhSim.Widgets.PointInWidgetsReturn = function() {
	this.widget = null;
	this.point = null;
	this.pointInWidgetsReturn = true;
}

PhSim.Widgets.Draggable = function() {
	this.draggable = true;
}

PhSim.Widgets.Coin = function() {
	this.coin = true;
}

PhSim.Widgets.Hazard = function() {
	this.hazard = true;
}

PhSim.Widgets.Health = function() {
	this.health = true;
}

PhSim.Widgets.Elevator = function() {
	
	this.pointA = {
		x: null,
		y: null,
	}

	this.pointB = {
		x: null,
		y: null,
	}

	this.elevator = true;

}

PhSim.Widgets.TransformCameraByObj = function() {
	this.transformCameraByObj = true;
}

PhSim.Widgets.TransformWithCamera = function() {
	this.transformWithCamera = true;
}

PhSim.Widgets.KeyboardControls = function() {
	this.up = null;
	this.down = null;
	this.left = null;
	this.right = null;
	this.keyboardControls = true;
}

PhSim.Widgets.SimpleEvent = function() {
	this.simpleEvent = true;
	this.trigger = null;
	this.action = null;
	this.args = []
}

PhSim.Widgets.InputBox = function() {
	this.trigger = null;
	this.text = null;
	this.buttonTxt = null;
	this.name = null;
	this.inputBox = true;
}

PhSim.Widgets.Alert = function() {
	this.buttonTxt = null;
	this.name = null;
	this.text = null;
	this.name = null;
	this.alert = true;
}


PhSim.Widgets.SimpleEvent.actionStruct = [
	"deleteSelf",
	"addScore",
	"subtractScore",
	"explodeSelf",
	"endGame",
	"goto"
]

// Connection Widget

PhSim.Widgets.Connection = function() {
	
	this.objectA = {
		"L": null,
		"O": null
	};

	this.objectB = {
		"L": null,
		"O": null
	};

	this.connection = true;
}

// 

// Composite Widget

PhSim.Widgets.Composite = function() {
	this.objUniverse = [];
	this.composite = true;
}

// Rotation Widget

PhSim.Widgets.Rotation = function() {
	this.trigger = null;
	this.rotation = true;
	this.key = null;
	this.cycle = null;
	this.circularConstraintRotation = null;
}

// Rotation Widget

PhSim.Widgets.SetAngle = function() {
	this.trigger = null;
	this.setAngle = true;
	this.key = null;
	this.cycle = null;
	this.circularConstraintRotation = null;
}

// Disable Rotation Widget

PhSim.Widgets.NoRotation = function() {
	this.noRotation = true;
}

// RectText Widget

PhSim.Widgets.RectText = function() {
	this.content = "";
	this.font = "";
	this.margin = 0;
	this.size = null;
	this.borderSize = 0;
	this.fill = "#000000";
	this.rectText = true;
	this.lineWidth = null;
	this.borderColor = null;
}

PhSim.Widgets.NumVar = function() {
	this.name = null;
	this.value = null;
	this.numVar = true;
}

PhSim.Widgets.SetNumVar = function() {
	this.value;
	this.name = null;
	this.trigger = null;
	this.setNumVar = true;
}

PhSim.Widgets.SetColor = function() {
	this.color = null;
	this.trigger = null;
	this.setColor = true;
}

PhSim.Widgets.SetBorderColor = function() {
	this.color = null;
	this.trigger = null;
	this.setBorderColor = true;
}

PhSim.Widgets.SetLineWidth = function() {
	this.lineWidth = null;
	this.trigger = null;
	this.setLineWidth = true;
}

PhSim.Widgets.Game = function() {
	this.life = null;
	this.goal = null;
	this.score = null;
	this.game = true;
}

PhSim.Widgets.PlayAudio = function() {
	this.trigger = null;
	this.src = null;
	this.playAudio = true;
}

PhSim.Widgets.RectText.valueStruc = {
	content: "",
	textAlign: ["start","end","left","right","center"],
	textBaseLine: ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"],
	direction: ["ltr","rtl"],
	font: ""
}

PhSim.Widgets.ObjLink_a = function() {
	this.trigger = null;

	this.target = {
		"L": 0,
		"O": 0
	};

	this.objLink_a = true;
}

PhSim.Widgets.ToggleLock = function() {
	this.toggleLock = true;
	this.trigger = null;
}

PhSim.Widgets.CircularConstraint = function() {
	this.x = 30;
	this.y = 30;
	this.circularConstraint = true;
}

PhSim.Widgets.AdditionalSprite = function() {
	this.additionalSprite = true;
	PhSim.Sprites.Sprite.call(this);
}

PhSim.Widgets.CompositeSprite = function() {
	this.srcArray = [];
}

PhSim.Widgets.RectText.alignStruct = [
	"left",
	"right",
	"center",
]

/*

Constraint types

*/

PhSim.Constraints = {
    Static: {}
}

PhSim.Constraints.Static.SingleObjectConstraint = function() {
	this.damping = 0,
	this.relativeEndPoint = new Vector();
	this.point = new Vector();
	this.object =  null;
	this.SingleObjectConstraint = true;
}

PhSim.Constraints.Static.DoubleObjectConstraint = function(rel1,rel2) {
	this.doubleObjectConstraint = true
}

PhSim.Constraints.Static.Constraint = function() {
	this.objectA = null;
	this.objectB = null;
	this.pointA = null;
	this.pointB = null;
	this.constraint = true;
}



/***/ }),
/* 33 */
/***/ (function(module, exports) {

PhSim.CollisionClass = function(name) {

	var this_a = this;

	this.name = name;

	this.world = Matter.World.create();

	this.engine = Matter.Engine.create({
		world: this_a.world
	});

}

PhSim.CollisionClass.prototype.addDynObject = function(dynObject) {
	return Matter.World.add(this.world,dynObject.matter);
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

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

PhSim.DynObject = function(staticObject) {

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

	/** Deep cloned copy of the static object used to create the DynObject*/

	this.object = JSON.parse(JSON.stringify(staticObject));

	/** Reference to static object used to create the DynObject*/

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

/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * 
 * Calculate DynObject skinmesh
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.calc_skinmesh = function(dynObject) {

	/** Vector defining transformation */
	
	dynObject.transformVector = {
		x: (dynObject.matter.position.x - dynObject.matter.positionPrev.x),
		y: (dynObject.matter.position.y - dynObject.matter.positionPrev.y),
	}

	/** Number defining rotation */

	var transformAngle = dynObject.matter.angle - dynObject.matter.anglePrev 

	Matter.Vertices.translate(dynObject.skinmesh,Matter.Vertices.centre(dynObject.skinmesh),-1);
	Matter.Vertices.rotate(dynObject.skinmesh,transformAngle,{x: 0, y: 0});
	Matter.Vertices.translate(dynObject.skinmesh,dynObject.matter.position,1);

	dynObject.verts = dynObject.skinmesh;
	dynObject.object.verts = dynObject.skinmesh;

}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// Simple Event Reference

PhSim.DynSim.SimpeEventRef = function(trigger,ref) {
	this.trigger = trigger;
	this.ref = ref;
}

// Simple Event Reference Array

PhSim.DynSim.prototype.simpleEventRefs = [];

/**
 * Create a SimpleEvent
 * @function
 * @param {string} trigger - The type of SimpleEvent.
 * @param {Function} call - The JavaScript function to be executed.
 * @param {Object} options - A JavaScript option for the various triggers.
 * @param {string} options.key -  The event.key value for triggering the simpleEvent.
 * @param {Number} options.time - The time interval between a repeated event or a delay time for timeouts.
 * Relevant when the trigger is set to "time".
 * @param {Number} options.maxN - The maximum number of times a repeated SimpleEvent can be executed.
 * @param {PhSim.DynObject} options.triggerObj - Trigger object
 * @returns {Number} - A reference to the simple event.
 * @this {PhSim.DynSim}
 * */


PhSim.DynSim.prototype.addSimpleEvent = function(trigger,call,options) {

	if(trigger.match(/_global$/)) {
		options.triggerObj = null;
	}

	var self = this;
	
	if(trigger === "key") {

		if(options.triggerObj) {
		
			var f = function(e) {
				if(options.key === e.key) {
					call();
				}
			}

		}

		else {

			var f = function(e) {
				call();
			}

		}

		self.addEventListener("keydown",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "sensor" || trigger === "sensor_global") {

		var self = this;

		if(options.triggerObj) {
			
			var f = function(e) {

				var m = self.inSensorCollision(options.triggerObj)
	
				if(m) {
					call(e);
				}
	
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("collisionstart",f,{
			"slEvent": true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "update") {
		
		var f = function() {
			call();
		}

		self.addEventListener("beforeupdate",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
		
	}

	if(trigger === "objclick" || trigger === "objclick_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objclick",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objmousedown" || trigger === "objmousedown_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objmousedown",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "firstslupdate") {
		
		var f = function(e) {
			call(e)
		}

		this.addEventListener("firstslupdate",f);

	}
	
	if(trigger === "objmouseup" || trigger === "objmouseup_global") {

		if(options.triggerObj) {
			var f = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === options.triggerObj) {
					call(e);
				}
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("objmouseup",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;
	}

	if(trigger === "objlink") {
		options.triggerObj.objLinkFunctions = options.triggerObj.objLinkFunctions || [];
		options.triggerObj.objLinkFunctions.push(call);
	}

	if(trigger === "afterslchange") {

		
		if(options.triggerObj) {
			var f = function(e) {
				call(e);
			}
		}

		else {
			var f = function(e) {
				call(e);
			}
		}

		self.addEventListener("afterslchange",f,{
			slEvent: true
		});

		return this.simpleEventRefs.push(new PhSim.DynSim.SimpeEventRef(trigger,f)) - 1;

	}

	if(trigger === "time") {

		var getFunction = function() {

			if(Number.isInteger(options.maxN)) {

				func = function(e) {

					if(func.__n === options.maxN) {
						clearInterval(func.__interN);
					}

					else {
						if(!self.paused) {
							call();
							func.__n++;
						}
					}

				}

				func.__n = 0;

			}

			else {

				func = function(e) {
					if(!self.paused) {
						call();
					}
				}

			}


			func.__phtime = options.time;
			func.__interN = null;

			return func;

		}

		var refFunc = getFunction();

		refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
	}

}

/** 
 * 
 * @param {Number} refNumber - Reference Number
 * 
*/

PhSim.DynSim.prototype.removeSimpleEvent = function(refNumber) {
	
	var o = this.simpleEventRefs[refNumber];

	if(o.trigger === "key") {
		this.removeEventListener("keydown",o.ref);
	}

	if(o.trigger === "sensor") {
		this.removeEventListener("collisionstart",o.ref);
	}

	if(o.trigger === "update") {
		this.removeEventListener("beforeupdate",o.ref);
	}

}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * 
 * Process string by replacing magical words
 * 
 * @function
 * @param {String} str 
 * @returns {String}
 * 
 */

PhSim.DynSim.prototype.processVar = function(str) {

	var str = str;
	
	if(str.search("{__game__score}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__score}/g,this.lclGame.score);
	}

	if(str.search("{__game__life}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__life}/g,this.lclGame.life);
	}

	if(str.search("{__game__goal}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__goal}/g,this.lclGame.goal);
	}

	if(str.search("{__game__int_life}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__int_life}/g,this.lclGame.intLife);
	}

	if(str.search("{__game__int_score}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__int_score}/g,this.lclGame.intScore);
	}

	return str;

}

/***/ })
/******/ ]);