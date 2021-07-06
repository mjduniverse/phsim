const Widget = require("../widget");

/**
 * Widget to transform object by camera.
 * @param {Object} dynObject 
 * @this PhSim
 */


function transformAgainstCamera(o) {

    var self = this;

    var w = new Widget(o);

    this.camera.transformingObjects.push(o);

    var destroy = function() {
        var i = self.camera.transformingObjects.indexOf(o); 
        self.camera.transformingObjects.splice(i,1);
    }

    w.on("destroy",destroy);
    w.on("disable",destroy);

    return w;

}

module.exports = transformAgainstCamera;