PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var self = this;
    
    var ref;

    var f = function(){
        self.removeDynObj(dyn_object);
        self.disableWFunction(ref);
    }

    var ref = this.createWFunction(dyn_object,f,widget);

}