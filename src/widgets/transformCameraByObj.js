const PhSim = require("../index");
const Widget = require("../widget");

/**
 * 
 * The `transformCameraByObj` widget transforms the camera by an object.
 * 
 * @function
 * @this PhSim
 * @param {PhSim.DynObject} dyn_object - Object that will transform object.
 */


PhSim.Widgets.transformCameraByObj = function(dyn_object) {

    var w = new Widget(dyn_object);

    var self = this;

    var dx;
    var dy;

    // beforeUpdate

    var beforeUpdate = function(){
        if(w.status === "enabled") {
            dx = dyn_object.matter.position.x;
            dy = dyn_object.matter.position.y;
        }
    }

    this.on("beforeupdate",beforeUpdate,{
        "slEvent": true
    });

    // afterupdate

    var afterUpdate = function(){
        if(w.status === "enabled") {
            dx = dyn_object.matter.position.x - dx;
            dy = dyn_object.matter.position.y - dy;
            self.camera.translate(-dx,-dy);
        }
    }

    this.on("afterupdate",afterUpdate,{
        "slEvent": true
    });

    // Widget Destruction

    w.on("destoy",function(){
        self.off("afterupdate",afterUpdate);
        self.off("beforeupdate",beforeUpdate);
    });

    return w;

}