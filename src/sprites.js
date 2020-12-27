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

	/**
	 * 
	 * STAIC
	 * 
	 * @type {Object}
	 * @name PhSim.Sprites.spriteImgObj#static
	 */

	Object.defineProperty(this,"static",{
		enumerable: false,
		value: {},
		writable: true,
	});

	/**
	 * 
	 * Number of loaded sprites
	 * 
	 * @type {Number}
	 * @name PhSim.Sprites.spriteImgObj#loaded_n
	 */

	Object.defineProperty(this,"loaded_n",{
		enumerable: false,
		value: 0,
		writable: true
	});

	/**
	 * 
	 * Boolean telling us if it is loaded or not.
	 * 
	 * @type {Boolean}
	 * @name PhSim.Sprites.spriteImgObj#length
	 */

	Object.defineProperty(this,"loaded",{
		enumerable: false,
		value: false,
		writable: true,
	});

	/**
	 * 
	 * Function to call if loaded.
	 * 
	 * @type {Function}
	 * @name PhSim.Sprites.spriteImgObj#onload
	 */

	Object.defineProperty(this,"onload",{
		enumerable: false,
		value: onload,
		writable: true
	});

	/**
	 * 
	 * URL List
	 * 
	 * @type {Object}
	 * @name PhSim.Sprites.spriteImgObj#urls
	 */

	Object.defineProperty(this,"urls",{
		enumerable: false,
		value: [],
		writable: true
	})

	/**
	 * 
	 * Length
	 * 
	 * @type {Number}
	 * @name PhSim.Sprites.spriteImgObj#length
	 */

	Object.defineProperty(this,"length",{
		enumerable: false,
		value: 0,
		writable: true,
	})

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

Sprites.spriteImgObj.prototype.getBlobs = function() {



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

			var self = this;

			var f = function() {
				onload();
				img.removeEventListener("load",f);

				self.static[staticObj.src] = staticObj;
				self[staticObj.src] = img;
				self.urls.push(staticObj.src);
			
				self.length++;

			}

			img.addEventListener("load",f);
		
			img.src = staticObj.src;
		

		}

	}

}

module.exports = Sprites;