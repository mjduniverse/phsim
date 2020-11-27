PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var self = this;
    
    var ref = null;

    var closure = function() {

        var o = dyn_object;

        var f = function(){
            self.removeDynObj(o);
            self.disableWFunction(ref);
        }

        return f;
    }

    var ref = this.createWFunction(dyn_object,closure(),widget);

    
}