PhSim.Widgets.coin = function(widget,dyn_object) {
    var func = function() {

        var obj1 = dyn_object;

        var a = function() {

            if(self.inSensorCollision(obj1) && self.lclGame) {
                self.lclGame.setScore(self.lclGame.score + 1);
                self.removeEventListener("collisionstart",a);	
            }

        }

        return a;

    }

    self.addEventListener("collisionstart",func());
}

PhSim.Widgets.widget.hazard = function(widget,dyn_object) {

    var func = function() {

        var obj1 = dyn_object;

        var a = function() {

            if(self.inSensorCollision(obj1) && self.lclGame) {
                self.lclGame.decrementLife(self.lclGame.score + 1);
                self.removeEventListener("collisionstart",a);	
            }

        }

        return a;

    }

    self.addEventListener("collisionstart",func());

}

PhSim.Widgets.health = function(widget,dyn_object) {

    var func = function() {

        var obj1 = dyn_object;

        var a = function() {

            if(self.inSensorCollision(obj1) && self.lclGame) {
                self.lclGame.incrementLife(self.lclGame.score + 1);
                self.removeEventListener("collisionstart",a);	
            }

        }

        return a;

    }

    self.addEventListener("collisionstart",func());

}

PhSim.Widgets.endGame = function(widget,dyn_object) {
    var f = this.createMotionFunction("position",dyn_object,widget.vector);
    this.addSimpleEvent(widget.trigger,f,{
        ...widget,
        simpleEventObj: dyn_object
    });
}