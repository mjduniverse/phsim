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

	for(let i = 0; i < simulation.sprites.length; i++) {
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
 * The `spriteImgObj` class is used to store catche for sprites.
 * 
 * @constructor
 * @param {Sprites.Sprite[]} sprites 
 * @param {Function} onload 
 */

Sprites.spriteImgObj = function(sprites,onload = function() {}) {
	
	// Force load if sprites list is empty

	/**
	 * Array of catched sprites
	 */

	Object.defineProperty(this,"array",{
		enumerable: false,
		value: [],
		writable: true,
	})

	/**
	 * 
	 * Object of static sprite objects
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

			if(self.loaded_n === self.length) {
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

		if(staticObj instanceof HTMLImageElement) {
			self.static[staticObj.src] = staticObj;
			self[staticObj.src] = staticObj;
			self.urls.push(self.src);
			onload();
		}

		else if(typeof staticObj === "object" && typeof staticObj.src === "string") {

			let img = document.createElement("img");

			let f = function() {

				self.static[staticObj.src] = staticObj;
				self[staticObj.src] = img;
				self.urls.push(staticObj.src);
			
				self.length++;

				onload();

				img.removeEventListener("load",f);

			}

			img.addEventListener("load",f);

			img.src = staticObj.src;
			
		}

		else if(typeof staticObj === "string") {

			let img = document.createElement("img");

			let f = function() {

				self[staticObj] = img;
				self.urls.push(staticObj);
			
				self.length++;

				onload();

				img.removeEventListener("load",f);

			}

			img.addEventListener("load",f);

			img.src = staticObj;

		}
	}

	
}

module.exports = Sprites;