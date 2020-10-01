var Sprites = {};

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
		PhSim.Sprites.renderSprite(ctx,simulation.sprites[i]);
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

Sprites.SpriteImgArray = function(sprites,onload = function() {}) {
	
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

Sprites.SpriteImgArray.prototype.addSprite = function(staticObj,onload = function() {} ) {
	
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

export default Sprites;