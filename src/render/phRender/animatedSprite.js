PhSim.AnimatedSprite = function(dynObject) {
    this.frames = [];
    this.frameIndex = 0;

    /**
     * @type {PhSim.DynObject}
     */

    this.dynObject = dynObject;
}

PhSim.AnimatedSprite.prototype.fps = 0.5;

PhSim.AnimatedSprite.prototype.loopFunction = function() {
    this.dynObject.sprite.src = this.frames[this.frameIndex]
}

PhSim.AnimatedSprite.prototype.play = function() {
    
    var self = this;

    this.loopRef = setInterval(this.loopFunction);

}