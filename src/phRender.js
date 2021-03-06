const Gradients = require("./gradient");
const BoundingBox = require("./tools/boundingBox");
const Centroid = require("./tools/centroid");
const Vertices = require("./tools/vertex");

/** 
 * 
 * PhRender constructor
 * PhRender is the rendering engine for PhSim.
 * 
 * @constructor
 * @memberof PhSim
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * 
 */

var PhRender = function(ctx) {

	/**
	 * PhRender Context
	 * @type {CanvasRenderingContext2D}
	 */

	this.ctx = ctx;
}

/**
 * Default Alpha
 * This the alpha of an object that has no alpha defined.
 * 
 * @type {Number}
 */

PhRender.prototype.defaultAlpha = 1;

/**
 * Default stroke style.
 * This is the stroke style of an object that has no stroke style defined.
 * 
 * @type {String}
 */

PhRender.prototype.defaultStrokeStyle = "transparent";

/**
 * Default fill style
 * This is the default fill style of an object.
 * 
 * @type {String}
 */

PhRender.prototype.defaultFillStyle = "transparent";

/**
 * Setting context
 * That is, this function sets the `globalAlpha`, `strokeStyle`, `fillStyle` and `lineWidth`
 * properties of the {@link PhRender#ctx} member of the {@link PhRender} object
 * using a {@link PhSimObject} object.
 * 
 * @function
 * @param {PhSimObject} object 
 */

PhRender.prototype.setCtx = function(object) {
	
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

PhRender.prototype.unsetCtx = function() {
	this.ctx.globalAlpha = 1;
}

/**
 * 
 * Render a a {@link polygon}.
 * 
 * @function
 * @param {Path} path 
 */

PhRender.prototype.renderPolygon = function (path) {

	var w;
	var h;

	this.setCtx(path);

	this.ctx.beginPath();

	this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

	for(var j = 0; j < path.verts.length; j++) {
		this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();
	this.ctx.fill();

	if(path.sprite && path.sprite.src) {

		var img = this.getImgObj(path.sprite.src);

		var centroid = Centroid.polygon(path);

		this.ctx.imageSmoothingEnabled = path.sprite.smooth;

		this.ctx.save();

		this.ctx.beginPath();

		this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

		for(let j = 0; j < path.verts.length; j++) {
			this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
		}

		this.ctx.closePath();

		this.ctx.translate(centroid.x,centroid.y);

		if(path.sprite.repeat) {

			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;

			this.ctx.fill();
		}

		else if(path.sprite.fit) {

			this.ctx.clip();

			var box = BoundingBox.fromShape(path);

			h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,box.w,h,0);
		}

		else if(typeof path.sprite.w === "number" && typeof path.sprite.h === "number") {

			this.ctx.clip();

			w = path.sprite.w || img.width;
			h = path.sprite.h || img.height;

			this.renderSpriteByCenter(path.sprite.src,0,0,w,h,0);

		}

		else if(typeof path.sprite.w !== "number" && typeof path.sprite.h === "number") {
			
		    this.ctx.clip();

			let w = (img.width/img.height) * path.sprite.h;

			this.renderSpriteByCenter(path.sprite.src,0,0,w,path.sprite.h,0);
		}

		else if(typeof path.sprite.w === "number" && typeof path.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * path.sprite.w;
			
			this.renderSpriteByCenter(path.sprite.src,0,0,path.sprite.w,h,0);
		}

		else if(typeof path.sprite.w !== "number" && typeof path.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(path.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();	

	this.unsetCtx();
	
}

/**
 * 
 * Render sprite by center
 * 
 * @function
 * @param {String|HTMLCanvasElement|HTMLImageElement|ImageData} url - URL of object loaded in PhRender.prototype.spriteImgObj
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} a - angle
 */

PhRender.prototype.renderSpriteByCenter = function(url,x,y,w,h,a) {

	var spriteImg;

	if(typeof url === "string") {
		spriteImg = this.spriteImgObj[url];
	}

	if(url instanceof HTMLCanvasElement || url instanceof HTMLImageElement) {
		spriteImg = url;
	}

	this.ctx.save();
	this.ctx.translate(x,y)
	this.ctx.rotate(a)

	if(typeof url === "string" || url instanceof HTMLCanvasElement || url instanceof HTMLImageElement) {
		
		if(h === null) {
			this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w);
		}

		else {
			this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w,h);
		}

	}

	if(url instanceof ImageData) {
		this.ctx.putImageData(url, - url.width * 0.5, - url.height * 0.5);
	}

	this.ctx.restore();
}

PhRender.prototype.getImgObj = function(src) {

	if(typeof src === "string") {
		return this.spriteImgObj[src];
	}

	else {
		return src;
	}

}


/**
 * 
 * Render circle
 * 
 * @function
 * @param {PhSim.Static.Circle} circle 
 */

PhRender.prototype.renderCircle = function (circle) {

	var w;
	var h;
	
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
		this.ctx.fillStyle = Gradients.extractGradient(this.ctx,circle.gradient);
		this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.restore();	

	}

	if(circle.sprite && circle.sprite.src) {

		/**
		 * 
		 * @type {HTMLImageElement}
		 */

		var img = this.getImgObj(circle.sprite.src);

		this.ctx.imageSmoothingEnabled = circle.sprite.smooth;

		this.ctx.save();
		this.ctx.translate(circle.x,circle.y);
		this.ctx.rotate(circle.cycle);
		this.ctx.arc(0,0,circle.radius,0,2*Math.PI);

		if(circle.sprite.repeat) {
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.fill();	
		}

		else if(circle.sprite.fit) {

			this.ctx.clip();
			var box = BoundingBox.fromShape(circle);

			h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(circle.sprite.src,0,0,box.w,h);
			this.ctx.restore();	
		}

		else if(typeof circle.sprite.w === "number" && typeof circle.sprite.h === "number") {

			w = circle.sprite.w || img.width;
			h = circle.sprite.h || img.height;

			this.ctx.clip(); 
			this.renderSpriteByCenter(circle.sprite.src,0,0,w,h,0);
		}

		else if(typeof circle.sprite.w !== "number" && typeof circle.sprite.h === "number") {
			
		    this.ctx.clip();

			let w = (img.width/img.height) * circle.sprite.h;

			this.renderSpriteByCenter(circle.sprite.src,0,0,w,circle.sprite.h,0);
		}

		else if(typeof circle.sprite.w === "number" && typeof circle.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * circle.sprite.w;
			
			this.renderSpriteByCenter(circle.sprite.src,0,0,circle.sprite.w,h,0);
		}

		else if(typeof circle.sprite.w !== "number" && typeof circle.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(circle.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();

	this.unsetCtx();

}


/**
 * 
 * Render rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle - Rectangle object
 * @param rectangle.sprite - Sprite Object
 */

PhRender.prototype.renderRectangle = function(rectangle) {

	var c = Centroid.rectangle(rectangle);

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
		for(let i = 0; i < rectangle.widgets.length; i++) {
			if(rectangle.widgets[i].type === "rectText") {
				this.rectText(rectangle.widgets[i],x,y,rectangle.w,rectangle.h,0);
			}
		}
	}

	this.ctx.rotate(-rectangle.cycle);
	this.ctx.translate(-c.x,-c.y);


	if(typeof rectangle.sprite === "object" && rectangle.sprite.src) {

		var img = this.getImgObj(rectangle.sprite.src);

		this.ctx.imageSmoothingEnabled = rectangle.sprite.smooth;

		this.ctx.save();
		this.ctx.translate(c.x,c.y);
		this.ctx.rotate(rectangle.cycle);
		this.ctx.rect(-rectangle.w * 0.5,-rectangle.h * 0.5,rectangle.w,rectangle.h);

		if(rectangle.sprite.repeat) {
	
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.fill();
			this.ctx.restore();	
		}

		else if(rectangle.sprite.fit) {

			this.ctx.clip();

			let h = img.height * (rectangle.w/img.width);

			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.w,h,0);
		}

		else if(typeof rectangle.sprite.w === "number" && typeof rectangle.sprite.h === "number") { 
			
			this.ctx.clip();
			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.sprite.w,rectangle.sprite.h,0);
		}

		else if(typeof rectangle.sprite.w !== "number" && typeof rectangle.sprite.h === "number") {
			
			this.ctx.clip();

			let w = (img.width/img.height) * rectangle.sprite.h;

			this.renderSpriteByCenter(rectangle.sprite.src,0,0,w,rectangle.sprite.h,0);
		}

		else if(typeof rectangle.sprite.w === "number" && typeof rectangle.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * rectangle.sprite.w;
			
			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.sprite.w,h,0);
		}

		else if(typeof rectangle.sprite.w !== "number" && typeof rectangle.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(rectangle.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();	
	this.unsetCtx();

}

// Draw text

/**
 * @function
 * @param {*} text
 * @param {String} text.fill - Text Fill Style
 * @param {Number} text.lineWidth - Text border line width
 * @param {String} text.borderColor - Text border color
 * @param {Number} text.size - Text size
 * @param {String} text.font - Text font
 * @param {}
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} a 
 */

PhRender.prototype.rectText = function(text,x,y,w,h,a) {
	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.rotate(a);
	this.ctx.beginPath();
	this.ctx.rect(0,0,w,h);
	this.ctx.clip();
	this.ctx.textAlign = "left";
	this.ctx.fillStyle = text.fill || "#000000";

	// Reset Line Width

	this.ctx.lineWidth = undefined;

	if(text.lineWidth) {
		this.ctx.lineWidth = text.lineWidth;
	}

	this.ctx.strokeStyle = text.borderColor || "#000000";
	this.ctx.font = text.size + "px " + text.font;
	this.ctx.textBaseline = "top";
	var content = text.content || "";

	if(this.dynSim) {
		content = this.dynSim.processVar(content);
	}

	var lineHeight = text.lineHeight || this.ctx.measureText("M").width;

	var lines = content.split("\n");

	for(let i = 0; i < lines.length; i++) {

		this.ctx.fillText(lines[i],0,lineHeight * i);

		if(text.lineWidth) {
			this.ctx.strokeText(lines[i],0,lineHeight * i);
		}

	}

	this.ctx.restore();
}

// Draw a regular polygon

/**
 * @function
 * @param {PhSim.Static.RegPolygon} regPolygon 
 */

PhRender.prototype.renderRegPolygon = function(regPolygon) {

	var vertSet = Vertices.regPolygon(regPolygon);
	
	this.setCtx(regPolygon);

	this.ctx.beginPath();

	this.ctx.moveTo(vertSet[0].x, vertSet[0].y);

	for(let j = 0; j < vertSet.length; j++) {
		this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();

	this.ctx.globalAlpha = regPolygon.fillAlpha;

	this.ctx.fill();

	if(regPolygon.sprite && regPolygon.sprite.src) {

		var img = this.getImgObj(regPolygon.sprite.src);

		this.ctx.imageSmoothingEnabled = regPolygon.sprite.smooth;

		this.ctx.save();

		this.ctx.beginPath();

		this.ctx.moveTo(vertSet[0].x, vertSet[0].y);
	
		for(let j = 0; j < vertSet.length; j++) {
			this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
		}
	
		this.ctx.closePath();

		this.ctx.translate(regPolygon.x,regPolygon.y);
		this.ctx.rotate(regPolygon.cycle);

		if(regPolygon.sprite.repeat) {
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.fill();
		}

		if(regPolygon.sprite.fit) {

			this.ctx.clip();

			let box = BoundingBox.fromShape(regPolygon);

			let h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,box.w,h,0);

		}

		else if(typeof regPolygon.sprite.w === "number" && typeof regPolygon.sprite.h === "number") {
			
			this.ctx.clip();

			let w = regPolygon.sprite.w;
			let h = regPolygon.sprite.h;

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,w,h,0);
		}

        else if(typeof regPolygon.sprite.w !== "number" && typeof regPolygon.sprite.h === "number") {
			
		    this.ctx.clip();

			let w = (img.width/img.height) * regPolygon.sprite.h;

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,w,regPolygon.sprite.h,0);
		}

		else if(typeof regPolygon.sprite.w === "number" && typeof regPolygon.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * regPolygon.sprite.w;
			
			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,regPolygon.sprite.w,h,0);
		}

		else if(typeof regPolygon.sprite.w !== "number" && typeof regPolygon.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();	

	this.unsetCtx();

}

// Draw Static object

/**
 * @function
 * @param {PhSimObject} obj 
 */

PhRender.prototype.renderStatic = function(obj) {
				
	if (obj.shape === "polygon")  {
		this.renderPolygon(obj);
	}
	
	if( obj.shape === "circle") {
		this.renderCircle(obj); 
	}

	if( obj.shape === "rectangle") {
		this.renderRectangle(obj);
	}

	if( obj.shape === "regPolygon") {
		this.renderRegPolygon(obj);
	}

	if( obj.shape === "composite") {
		for(var i = 0; i < obj.parts.length; i++) {
			this.renderStatic(obj.parts[i]);
		}
	}

}

// Draws a layer

/**
 * @function
 * @param {*} layer 
 */

PhRender.prototype.renderStaticLayer = function(layer) {

	for(var i = 0; i < layer.objUniverse.length; i++) {

			this.renderStatic(layer.objUniverse[i])
			
	}	
}

/**
 * @function
 * @param {*} simulation 
 */

PhRender.prototype.simulation = function(simulation) {

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

PhRender.prototype.dynamicSkeleton = function(object) {

	if(object.static.shape === "polygon") {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x, object.skinmesh[0].y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x, object.skinmesh[j].y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x, object.matter.vertices.y);

		for(let j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x, object.matter.vertices[j].y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton_center = function(object) {

	if(object.static.shape === "polygon") {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x - object.matter.position.x, object.skinmesh[0].y - object.matter.position.y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x - object.matter.position.x, object.skinmesh[j].y - object.matter.position.y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x - object.matter.position.x, object.matter.vertices.y - object.matter.position.y);

		for(let j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x - object.matter.position.x, object.matter.vertices[j].y - object.matter.position.y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.drawDynamicSkeleton = function (object) {

	this.dynamicSkeleton(object);
	this.ctx.closePath();
	this.ctx.stroke();

}

/**
 * @function
 * @param {*} dynObject 
 */

PhRender.prototype.dynamicRenderDraw = function (dynObject) {

	this.ctx.lineWidth = dynObject.lineWidth;
	this.ctx.fillStyle = dynObject.fillStyle;
	this.ctx.strokeStyle = dynObject.strokeStyle;

	
	if(dynObject.shape === "polygon") {
		
		this.drawDynamicSkeleton(dynObject);
		
		this.ctx.fill();

		if(dynObject.sprite && dynObject.sprite.src) {

			var img = this.getImgObj(dynObject.sprite.src);

			this.ctx.imageSmoothingEnabled = dynObject.sprite.smooth;

			if(dynObject.sprite.repeat) {

				this.ctx.save();

				this.dynamicSkeleton(dynObject);
				this.ctx.translate(dynObject.matter.position.x,dynObject.matter.position.y);
				this.ctx.rotate(dynObject.matter.angle);
				this.ctx.scale(dynObject.sprite.scale,dynObject.sprite.scale);
		

				var pattern = this.ctx.createPattern(img,"repeat");
				this.ctx.fillStyle = pattern;
				this.ctx.fill();

				this.ctx.restore();
			}

			else if(dynObject.sprite.fit) {

				this.ctx.save();
	
				this.ctx.beginPath();
	
				this.ctx.moveTo(dynObject.verts[0].x, dynObject.verts[0].y);
	
				for(var j = 0; j < dynObject.verts.length; j++) {
					this.ctx.lineTo(dynObject.verts[j].x, dynObject.verts[j].y);
				}
	
				this.ctx.closePath();
	
				this.ctx.clip();
	
				var box = BoundingBox.fromShape(dynObject);
	
				var h = img.height * (box.w/img.width);
	
				this.renderSpriteByCenter(dynObject.sprite.src,dynObject.matter.position.x,dynObject.matter.position.y,box.w,h,dynObject.matter.angle);
	
				this.ctx.restore();	

				//

			}
	
			else {
				this.renderSpriteByCenter(dynObject.sprite.src,dynObject.matter.position.x,dynObject.matter.position.y,img.width,img.height,dynObject.matter.angle);
			}

			//this.ctx.restore();	
	
		}
		
	}

	if(dynObject.shape === "circle") {
		this.renderCircle(dynObject);	
	}
	
	if(dynObject.shape === "regPolygon") {
		this.renderRegPolygon(dynObject);		
	}

	if(dynObject.shape === "rectangle") {
		this.renderRectangle(dynObject);		
	}

	if(dynObject.shape === "composite") {
		for(var i = 1; i < dynObject.parts.length; i++) {
			this.dynamicRenderDraw(dynObject.parts[i]);
		}
	}

}

/**
 * @function
 * @param {*} L 
 */

PhRender.prototype.dynamicDrawLayer = function(L,sim,simulationI) {
	
	for(let i = 0; i < sim.simulations[simulationI].layers[L].length; i++) {
		this.dynamicRenderDraw(L,i);
	}

}

module.exports = PhRender;