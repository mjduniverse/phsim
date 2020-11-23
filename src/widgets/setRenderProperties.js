PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {
        
        var color = widget.color;
        var obj = dyn_object;

        var f = function() {
            self.setColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(widget.trigger,closure(),{
        ...widget,
        wFunctionObj: dyn_object
    });
}
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var self = this;

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            self.setBorderColor(obj,color);
        }

        return f;

    }

    var f = this.createWFunction(widget.trigger,closure(),{
        ...widget,
        wFunctionObj: dyn_object
    });
}
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var self = this;

    var f = this.createWFunction(widget.trigger,function(){
        self.setLineWidth(dyn_object,widget.color);
    },{
        ...widget,
        wFunctionObj: dyn_object
    });
}