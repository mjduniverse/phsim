const PhSim = require("../../index");

PhSim.AnimatedSprite = function(dynObject) {

    /**
     * @type {PhSim.Sprites}
     */

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

    if(this.frameIndex < this.frames.length) {
        this.frameIndex++;
    }

    else {
        this.frameIndex = 0;
    }
}

PhSim.AnimatedSprite.prototype.play = function() {
    this.loopRef = setInterval(this.loopFunction);
}