/*** 
 * 
 * PhRender
 * 
 * @constructor PhRender
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * 
 ***/

var PhRender = function(ctx) {

	/**
	 * PhRender Context
	 */

	this.ctx = ctx;
}

/**
 * Default Alpha
 * @type {Number}
 */

PhRender.prototype.defaultAlpha = 1;

/**
 * Default stroke style
 * @type {String}
 */

PhRender.prototype.defaultStrokeStyle = "transparent";

/**
 * Default fill style
 * @type {String}
 */

PhRender.prototype.defaultFillStyle = "transparent";

/**
 * Setting context
 * 
 * @function setCtx
 * @param {Object} object 
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

/**
 * 
 * @param {*} path 
 */

PhRender.prototype.static_path = function (path) {

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
 * @function renderSpriteByCenter
 * @param {String} url - URL of object loaded in PhRender.prototype.spriteImgArray
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} a - angle
 */

PhRender.prototype.renderSpriteByCenter = function(url,x,y,w,h,a) {

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
 * 
 * @param {Object} constraint 
 */

PhRender.prototype.renderConstraint = function (constraint) {

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
 * @function static_circle
 * @param {PhSim.Objects.Circle} circle 
 */

PhRender.prototype.static_circle = function (circle) {
	
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
 * @function static_rectangle
 * @param {PhSim.Objects.Rectangle} rectangle - Rectangle object
 * 
 */

PhRender.prototype.static_rectangle = function(rectangle) {

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
 * 
 * @param {*} text 
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
 * 
 * @param {PhSim.Objects.RegPolygon} regPolygon 
 */

PhRender.prototype.static_regPolygon = function(regPolygon) {

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
 * 
 * @param {*} obj 
 */

PhRender.prototype.renderStatic = function(obj) {
				
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
 * 
 * @param {*} layer 
 */

PhRender.prototype.renderStaticLayer = function(layer) {

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


			//PhRender.prototype.renderStaticObject(layer.objUniverse[i]);
			
	}	
}

/**
 * 
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
 * 
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton = function(object) {

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
 * 
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton_center = function(object) {

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
 * 
 * @param {*} object 
 */

PhRender.prototype.drawDynamicSkeleton = function (object) {

	this.dynamicSkeleton(object);
	this.ctx.closePath();
	this.ctx.stroke();

}

/**
 * 
 * @param {*} arg 
 */

PhRender.prototype.dynamicRenderDraw = function (arg) {

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
 * 
 * @param {*} L 
 */

PhRender.prototype.dynamicDrawLayer = function(L) {
	
	for(var i = 0; i < sim.simulations[simulationI].layers[L].length; i++) {
		this.dynamicRenderDraw(L,i);
	}

}

export default PhRender