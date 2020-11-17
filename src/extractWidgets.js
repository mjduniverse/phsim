PhSim.prototype.booleanWPatch = function(o) {

}

/** 
 * 
 * Extract Widgets from Dynamic Object.
 * To extract a widget in PhSim is to read all of the objects in the "widgets" array found in each
 * well-formed PhSim object and then translate it into JavaScript.
 * 
 * @function
 * @param {Widget} widget - The Widget
 * @param {PhSim.DynObject} dyn_object The individual Dynamic Object
 * @returns undefined
 * 
*/

PhSim.prototype.extractWidget = function(widget,dyn_object) {

    if(PhSim.Widgets[widget.type]) {
        PhSim.Widgets[widget.type].call(this,widget,dyn_object);
    }
	
    var self = this;
    
        if(widget.changeSl) {
    
            var closure = function() {
    
                var i = widget.slIndex;
    
                var f = function() {
                    self.gotoSimulationIndex(i)
                }
    
                return f;
            }
    
            this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                simpleEventObj: dyn_object
            });
        }
    
        if(widget.numVar) {
            self.numVar[widget.name] === widget.value;
        }
        
        if(widget.keyboardControls) {
            this.addKeyboardControls(dyn_object,widget);
        }
    
        if(widget.circularConstraint) {
            this.createCircularConstraint(dyn_object,widget.x,widget.y);
        }
    
        if(widget.setNumVar) {
    
            var closure = function() {
    
                var c = widget.value;
                var a = widget.name;
    
                var f = function() {
                    self.numVar[a] === c;
                }
    
                return f;
            }
    
            this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                simpleEventObj: dyn_object
            });
    
        }
    
        if(widget.setAngleByMouse) {
            this.addEventListener("mousemove")
        }
    
        if(widget.deleteSelf) {
    
            var ref = null;
    
            var closure = function() {
    
                var o = dyn_object;
    
                var f = function(){
                    self.removeDynObj(o);
                    self.removeSimpleEvent(ref);
                }
    
                return f;
            }
    
            var ref = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                simpleEventObj: dyn_object
            });
        }
    
        if(widget.rectText) {
            dyn_object.rectTextWidget === true;
        }
    

    
        if(widget.noRotation) {
            PhSim.Matter.Body.setInertia(dyn_object.matter, Infinity)
        }
    
        if(widget.elevator) {
            
    
            var func = function() {
            
                var type = widget.type;
    
                var obj = dyn_object;
                var relVec = PhSim.Vector.subtract(widget.pointB,widget.pointA);
                
                var u = PhSim.Vector.unitVector(relVec);
                
                var ax;
                var ay;
                var bx;
                var by;
                
                // Corrections
                
                var reversable = true;
                
                // Condition function for checking if object is in bounds
                
                var cond_f = function() {}
                
                if(type === "x-bounded") {
    
                    if(widget.pointA.x < widget.pointB.x) {
                        ax = widget.pointA.x;
                        bx = widget.pointB.x;
                    }
                    
                    if(widget.pointB.x < widget.pointA.x) {
                       ax = widget.pointB.x;
                       bx = widget.pointA.x;
                    }
                
                    cond_f = function() {
                        return (ax <= obj.matter.position.x) && (obj.matter.position.x <= bx);
                    }
                
                }
                
                if(type === "y-bounded") {
    
                    if(widget.pointA.y < widget.pointB.y) {
                        ay = widget.pointA.y;
                        by = widget.pointB.y;
                    }
                    
                    if(widget.pointB.y < widget.pointA.y) {
                       ay = widget.pointB.y;
                       by = widget.pointA.y;
                    }
                
                    cond_f = function() {
                        return (ay <= obj.matter.position.y) && (obj.matter.position.y <= by);
                    }
                
                }
                
                // Set body static
                
                PhSim.Matter.Body.setStatic(dyn_object.matter,true);
                
                // Event function
    
                var inRange = function() {
        
                if( cond_f() ) {
                self.translate(obj,PhSim.Vector.scale(u,1));
                        reversable = true;
                }
                  
                    else {
                    
                        if(reversable) {
    
                            u = {
                                "x": -u.x,
                                "y": -u.y
                            }
    
                            reversable = false;
                        }
    
                        else {
                            self.translate(obj,PhSim.Vector.scale(u,1));
                        }
                    
                    }
                    
    
                }
    
                return inRange
    
    
            }
    
            this.addEventListener("afterupdate",func());
    
        }
    
        if(widget.setColor) {
    
    
            var closure = function() {
                
                var color = widget.color;
                var obj = dyn_object;
    
                var f = function() {
                    self.setColor(obj,color);
                }
    
                return f;
    
            }
    
            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                simpleEventObj: dyn_object
            });
        }
    
        if(widget.setBorderColor) {
    
            var closure = function() {
    
                var color = widget.color
                var obj = dyn_object;
    
                var f = function() {
                    self.setBorderColor(obj,color);
                }
    
                return f;
    
            }
    
            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                simpleEventObj: dyn_object
            });
        }
        
        if(widget.setLineWidth) {
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.setLineWidth(dyn_object,widget.color);
            },{
                ...widget,
                simpleEventObj: dyn_object
            });
        }
        
        if(widget.playAudio) {
    
            var i = this.audioPlayers;
    
            this.staticAudio.push(widget);
    
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.playAudioByIndex(i);
            },{
                ...widget,
                simpleEventObj: dyn_object
            });
    
            this.audioPlayers++;
        }
    
        if(widget.transformCameraByObj) {
    
            var self = this;
    
            this.addEventListener("afterupdate",function(){
                var dx = dyn_object.matter.position.x - dyn_object.matter.positionPrev.x;
                var dy = dyn_object.matter.position.y - dyn_object.matter.positionPrev.y;
                self.camera.translate(-dx,-dy);
            },{
                "slEvent": true
            });
    
        }
    
        if(widget.transformWithCamera) {
            this.camera.transformingObjects.push(dyn_object)
        }
    
        if(widget.cameraWindow) {
            self.camera.translate(dyn_object.x,dyn_object.y);
            self.camera.scale()
        }

        if(widget.wFunction) {

            var wf = self.createWFunction(widget.function,dyn_object);

            var closure = function() {

                var f = function(){
                    wf();
                };

                return f;

            }

            var f = this.addSimpleEvent(widget.trigger,closure(),{
                ...widget,
                simpleEventObj: dyn_object
            });

        }
    
        if(widget.objLink_a) {
    
            var widgetO = widget;
    
            this.addEventListener("matterJSLoad",function(){
                var eventFuncClosure = function() {
    
                    var targetObj = self.LO(widgetO.target.L,widgetO.target.O);
    
                    var eventFunc = function(){
                        self.callObjLinkFunctions(targetObj);
                    } 
    
                    return eventFunc;
                
                }
    
    
                var options = {
                    ...widgetO,
                    simpleEventObj: dyn_object
                }
    
                var f = self.addSimpleEvent(widgetO.trigger,eventFuncClosure(),options);
            });
    
        }
    
        
    
    }

    /**
     * Extract all widgets from a dynamic object.
     * @param {PhSim.DynObject} dyn_object 
     */
    
    
    PhSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.widgets.length; i++) {
            this.extractWidget(dyn_object.widgets[i],dyn_object);
        }
    }
    
    