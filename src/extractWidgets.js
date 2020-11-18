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
        
        if(widget.keyboardControls) {
            this.addKeyboardControls(dyn_object,widget);
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
    
    