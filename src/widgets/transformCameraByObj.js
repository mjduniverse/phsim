const PhSim = require("../index");

/**
 * 
 * The `transformCameraByObj` widget transforms the camera by an object.
 * 
 * @function
 * @this PhSim
 * @param {PhSim.DynObject} dyn_object - Object that will transform object.
 */


PhSim.Widgets.transformCameraByObj = function(dyn_object) {
    var self = this;

    var dx;
    var dy;

    this.on("beforeupdate",function(){
        dx = dyn_object.matter.position.x;
        dy = dyn_object.matter.position.y;
    },{
        "slEvent": true
    });

    this.on("afterupdate",function(){
        dx = dyn_object.matter.position.x - dx;
        dy = dyn_object.matter.position.y - dy;
        self.camera.translate(-dx,-dy);
    },{
        "slEvent": true
    });

}