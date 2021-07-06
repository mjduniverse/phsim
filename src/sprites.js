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
 * @param {String[]} sprites - An array of strings representing sources
 * @param {Function} onload - A function that is executed when all of the images are loaded.
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
	});

	/**
	 * 
	 * Image List
	 * 
	 * @type {Array}
	 * @name PhSim.Sprites.spriteImgObj#urls
	 */

	Object.defineProperty(this,"img",{
		enumerable: false,
		value: [],
		writable: true
	});

	/**
	 * 
	 * Image List
	 * 
	 * @type {Array}
	 * @name PhSim.Sprites.spriteImgObj#urls
	 */

	Object.defineProperty(this,"loadedImg",{
		enumerable: false,
		value: [],
		writable: true
	});

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
			if(self.loadedImg.length === self.img.length) {
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
 * 
 * @param {string|Object} src - Source of sprite. If ```src``` is a string representing 
 * a url, then the image added has its source as ```src```. If ```src``` is an object, 
 * then the source is ```src.src```. This means that any object with an ```src``` property
 * can be added.
 * 
 * @param {Function} [onload] - a function that is executed when the image loads.
 * 
 * @returns {Image}
 */

Sprites.spriteImgObj.prototype.addSprite = function(src,onload = function() {} ) {

	// Insuring that the sprite src stays a string.

	if(typeof src === "object" && typeof src.src === "string") {
		src = src.src;
	}

	var self = this;

	let img = document.createElement("img");

	let f = function() {

		self[src] = img;
		self.urls.push(src);
		self.loadedImg.push(this);
		self.length++;

		onload();

		img.removeEventListener("load",f);

	}

	img.addEventListener("load",f);

	this.img.push(img);

	img.src = src;

	return img;

}

module.exports = Sprites;