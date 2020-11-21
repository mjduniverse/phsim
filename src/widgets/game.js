/**
 * Coin widget. Works if game widget is enabled. If not enabled, it throws an exception.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Widget options
 * @param {Number} widget.value - Value of coin. If undefined, the value of the coin is 1.
 * @this PhSim
 */

PhSim.Widgets.coin = function(dyn_object,widget) {

        var value = widget.value || 1;

        var self = this;

        var func = function() {

            var obj1 = dyn_object;

            var a = function() {

                if(self.inSensorCollision(obj1) && self.lclGame) {
                    self.lclGame.setScore(self.lclGame.score + value);
                    self.removeEventListener("collisionstart",a);	
                }

            }

            return a;

        }

        self.addEventListener("collisionstart",func());


}

PhSim.Widgets.hazard = function(dyn_object,widget) {

    var self = this;

    var func = function() {

        var obj1 = dyn_object;

        var a = function() {

            if(self.inSensorCollision(obj1) && self.lclGame) {
                self.lclGame.setLife(self.lclGame.life - 1);
                self.removeEventListener("collisionstart",a);	
            }

        }

        return a;

    }

    self.addEventListener("collisionstart",func());

}

PhSim.Widgets.health = function(dyn_object,widget) {

    var self = this;

    var func = function() {

        var obj1 = dyn_object;

        var a = function() {

            if(self.inSensorCollision(obj1) && self.lclGame) {
                self.lclGame.setLife(self.lclGame.life + 1);
                self.removeEventListener("collisionstart",a);	
            }

        }

        return a;

    }

    self.addEventListener("collisionstart",func());

}

PhSim.Widgets.endGame = function(dyn_object,widget) {
    var f = this.createMotionFunction("position",dyn_object,widget.vector);
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dyn_object
    });
}