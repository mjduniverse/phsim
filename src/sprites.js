/**
 * Sprites namespace
 * @namespace
 * @memberof PhSim
 */

var Sprites = {
    Calc: {}
}

Sprites.Sprite = function() {
	this.src = null;
	this.w = null;
	this.h = null;
	this.x = null;
	this.y = null;
	this.fit = null;
	this.repeat = null;
	this.object = null;
}

Sprites.renderSprite = function(ctx,sprite) {
	var localElm = document.createElement("img");
	localElm.src = sprite.src;
	if(sprite.spec === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}

	if(sprite.auto === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}
}

Sprites.renderGlobalSprites = function(ctx,simulation) {

	for(i = 0; i < simulation.sprites.length; i++) {
		Sprites.renderSprite(ctx,simulation.sprites[i]);
	}

}


Sprites.circularSpriteRenderCanvas = function(ctx,canvas,angle) {

	var localElm = document.createElement("canvas");
	var localCtx = localElm.getContext("2d");

	var localImg = document.createElement("img");
	localImg.src = canvas.src;

	localCtx.rotate(angle);

	localCtx.drawImage()


}

/**
 * 
 * The sprite image array is an interface that is used for 
 * 
 * @constructor
 * @param {Sprites.Sprite[]} sprites 
 * @param {Function} onload 
 */

Sprites.spriteImgObj = function(sprites,onload = function() {}) {
	
	// Force load if sprites list is empty

	this.static = {};
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;

	/**
	 * 
	 * Length of interface
	 * 
	 * @property {Number}
	 * @name length
	 * 
	 */

	Object.defineProperty(this,"length",{
		value: 0,
		enumerable: false
	});

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

/**
 * 
 * Add sprite to the Sprite Image Array.
 * 
 * @function
 * @this Sprites.spriteImgObj
 * @param {Sprites.Sprite|PhSim.Sprite.Sprite[]} staticObj - This could be a sprite or an array of sprites
 * @param {Function} [onload] - a function that is executed when the image loads.
 */

Sprites.spriteImgObj.prototype.addSprite = function(staticObj,onload = function() {} ) {
	
	var self = this;
	
	if(Array.isArray(staticObj)) {
		for(var i = 0; i < staticObj.length; i++) {
			this.addSprite(staticObj[i]);
		}
	}

	else {

		if(staticObj.src) {

			var img = document.createElement("img");

			var f = function() {
				onload();
				img.removeEventListener("load",f)
			}

			img.addEventListener("load",f);
		
			img.src = staticObj.src;
		
			this.static[staticObj.src] = staticObj;
			this[staticObj.src] = img;
		
			this.length++;

		}

	}

}

module.exports = Sprites;