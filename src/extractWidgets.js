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

PhSim.prototype.extractWidget = function(dyn_object,widget) {

    if(PhSim.Widgets[widget.type]) {
        PhSim.Widgets[widget.type].call(this,dyn_object,widget);
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
    
            this.createWFunction(widget.trigger,closure(),{
                ...widget,
                wFunctionObj: dyn_object
            });
        }

        if(widget.noRotation) {
            PhSim.Matter.Body.setInertia(dyn_object.matter, Infinity)
        }
        
        if(widget.playAudio) {
    
            var i = this.audioPlayers;
    
            this.staticAudio.push(widget);
    
            var f = this.createWFunction(widget.trigger,function(){
                self.playAudioByIndex(i);
            },{
                ...widget,
                wFunctionObj: dyn_object
            });
    
            this.audioPlayers++;
        }
    
        if(widget.transformWithCamera) {
            this.camera.transformingObjects.push(dyn_object)
        }

    }

    /**
     * Extract all widgets from a dynamic object.
     * @param {PhSim.DynObject} dyn_object 
     */
    
    
    PhSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.widgets.length; i++) {
            this.extractWidget(dyn_object,dyn_object.widgets[i]);
        }
    }
    
    