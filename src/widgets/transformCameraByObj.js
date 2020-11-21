PhSim.Widgets.transformCameraByObj = function(dyn_object) {
    
    var self = this;

    this.addEventListener("afterupdate",function(){
        var dx = dyn_object.matter.position.x - dyn_object.matter.positionPrev.x;
        var dy = dyn_object.matter.position.y - dyn_object.matter.positionPrev.y;
        self.camera.translate(-dx,-dy);
    },{
        "slEvent": true
    });

}