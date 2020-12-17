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

    this.on("afterupdate",function(){
        var dx = dyn_object.matter.position.x - dyn_object.matter.positionPrev.x;
        var dy = dyn_object.matter.position.y - dyn_object.matter.positionPrev.y;
        self.camera.translate(-dx,-dy);
    },{
        "slEvent": true
    });

}