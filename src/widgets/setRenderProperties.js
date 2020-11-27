PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {
        
        var color = widget.color;
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(dyn_object,closure(),widget);
}
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setBorderColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(dyn_object,closure(),widget);
}
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var self = this;

    var f = function(){
        PhSim.DynObject.setLineWidth(dyn_object,widget.color);
    }

    var f = this.createWFunction(dyn_object,f,widget);
}