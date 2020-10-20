/**
 * @typedef {simpleEventOptions} Velocity
 * @property {Boolean} velocity - Boolean for determining it is a velocity widget.
 * @property {Vector} vector -  The velocity vector
 */

/**
 * @typedef {simpleEventOptions} Force
 * @property {Boolean} force - Boolean for determining it is a force widget.
 * @property {Vector} vector -  The force vector
 */

/**
 * @typedef {simpleEventOptions} Position
 * @property {Boolean} position - Boolean for determining it is a position widget.
 * @property {Vector} vector -  The position vector
 */

/**
 * @typedef {simpleEventOptions} Translate
 * @property {Boolean} force - Boolean for determining it is a translation widget.
 * @property {Vector} vector -  The translation vector
 */

/**
 * @typedef {simpleEventOptions} DeleteSelf
 * @property {Boolean} deleteSelf - Boolean for determining it is a self-deletion widget.
 */

/**
 * @typedef {Object} Draggable
 * @property {Boolean} draggable - Boolean for determining it is a draggable object.
 */

/**
 * @typedef {Object} Coin
 * @property {Boolean} coin - Boolean for determining it is a coin.
 */

/**
 * @typedef {Object} Hazard
 * @property {Boolean} hazard - Boolean for determining it is a hazard.
 */

/**
 * @typedef {Object} Health
 * @property {Boolean} hazard - Boolean for determining it is a health object.
 */

/**
 * @typedef {Object} Elevator
 * @property {Boolean} elevator - Boolean for determining it is a hazard.
 * @property {Vector} pointA - The first point of the elevator
 * @property {Vector} pointB -  The second point of the elevator
 */

/**
 * @typedef {Object} TransformCameraByObj
 * @property {Boolean} transformCameraByObj - Boolean for determining it makes the object transform the camera.
 */

/**
 * @typedef {Object} TransformWithCamera
 * @property {Boolean} transformWithCamera - Boolean for determining the object moves with the camera.
 * 
 */

/**
 * @typedef {Object} KeyboardControls
 * @property {Number} up - The up velocity
 * @property {Number} down - The down velocity
 * @property {Number} left - The left velocity
 * @property {Number} right - The right velocity
 * @property {Boolean} keyboardControls - Boolean for determining if it keyboard controls widget
 */

/**
 * @typedef {Object} Alert
 * @property {String} buttonTxt
 * @property {String} name
 * @property {String} text
 * @property {Boolean} alert
 */

 /**
  * @typedef {Object} Connection
  * @property {LOAddress} objectA
  * @property {LOAddress} objectB
  * @property {Boolean} connection
  */

 /**
  * @typedef {simpleEventOptions} Rotation
  * @property {Boolean} rotation
  * @property {Number} cycle 
  * @property {Boolean} circularConstraintRotation - If true, rotate around any existing circular constraints. Else, rotate around centroid 
  */

 /**
  * @typedef {simpleEventOptions} SetAngle
  * @property {Boolean} rotation
  * @property {Number} cycle 
  * @property {Boolean} circularConstraintRotation - If true, rotate around any existing circular constraints. Else, rotate around centroid 
  */

/** 
 * @typedef {Object} NoRotation
 * @property {Boolean} noRotation
 */

 /**
  * @typedef {Object} RectText
  * @property {String} content
  * @property {String} font
  * @property {Number} margin
  * @property {Number} size
  * @property {Number} borderSize
  * @property {String} fill
  * @property {Boolean} rectText
  * @property {String} lineWidth
  * @property {String} borderColor
  */

/**
 * @typedef {Object} NumVar 
 * @property {String} name 
 * @property {Number} value
 * @property {Boolean} numVar
 */

/**
 * @typedef {simpleEventOptions} SetNumVar
 * @property {Number} value
 * @property {Boolean} setNumVar
 */

/**
 * @typedef {simpleEventOptions} SetColor
 * @property {String} color
 * @property {Boolean} setColor
 */

/**
 * @typedef {simpleEventOptions} SetBorderColor
 * @property {String} color
 * @property {Boolean} setBorderColor
 */

/**
 * @typedef {simpleEventOptions} SetLineWidth
 * @property {Number} lineWidth
 * @property {Boolean} setLineWidth
 */

/**
 * @typedef {simpleEventOptions} PlayAudio
 * @property {String} src
 * @property {Boolean} playAudio
 */

/**
 * @typedef {simpleEventOptions} ObjLink_a
 * @property {LOAddress} target
 * @property {Boolean} objLink_a 
 */

/**
 * @typedef {Object} Game
 * @property {Number} life
 * @property {Number} goal
 * @property {Number} score
 * @property {Boolean} game - Boolean for enabling game widget
 */

/**
 * @typedef {simpleEventOptions} ToggleLock
 * @property {Boolean} toggleLock - Boolean for enabling toggle lock widget
 */

/**
 * @typedef {simpleEventOptions} ToggleSemiLock
 * @property {Boolean} toggleSemiLock - Boolean for enabling toggle lock widget
 */

/**
 * @typedef {Object} CircularConstraint
 * @property {Number} x - x-coordinate of circular constraint widget
 * @property {Number} y - y-coordinate of circular constriant widget
 * @property {Boolean} circularConstraint - Boolean for enabling circular constraing widget
 */

/**
 * @typedef {Object} AdditionalSprite
 * @property {Boolean} additionalSprite
 */

/**
 * @typedef {simpleEventOptions} Clone
 * @property {Vector} - Vector for initial velocity
 * @property {Boolean} copyWidgets
 * @property {Boolean} timeCloner
 * @property {Boolean} clone
 */


/**
 * @typedef {simpleEventOptions} InputBox
 * @property {String} text
 * @property {String} buttonTxt
 * @property {String} name
 * @property {Boolean} inputBox
 */


/**
 * 
 * @typedef {Velocity|Force|Position|Translate|DeleteSelf|Draggable|
 * Coin|Hazard|Health|Elevator|TransformCameraByObj|
 * TransformWithCamera|KeyboardControls|Alert|Connection
 * |Rotation|SetAngle|NoRotation|RectText|NumVar|SetNumVar|
 * SetBorderColor|SetLineWidth|PlayAudio|ObjLink_a|Game|ToggleLock|
 * ToggleSemiLock|CircularConstraint|AdditionalSprite|Clone|InputBox} Widget
 */


/** 
 * 
 * Extract Widgets from Dynamic Object.
 * To extract a widget in PhSim is to read all of the objects in the "widgets" array found in each
 * well-formed PhSim object and then translate it into JavaScript.
 * 
 * @param {Widget} widget - The Widget
 * @param {PhSim.DynObject} dyn_object The individual Dynamic Object
 * @returns undefined
 * 
*/

PhSim.DynSim.prototype.extractWidget = function(widget,dyn_object) {
	
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
                triggerObj: dyn_object
            });
        }
    
        if(widget.numVar) {
            self.numVar[widget.name] === widget.value;
        }
        
        if(widget.keyboardControls) {
            this.addKeyboardControls(dyn_object,widget)
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
                triggerObj: dyn_object
            });
    
        }
    
        if(widget.force) {
            var f = this.createMotionFunction("force",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.velocity) {
            var f = this.createMotionFunction("velocity",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.translate) {
            var f = this.createMotionFunction("translate",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.position) {
            var f = this.createMotionFunction("position",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.rotation) {
    
            if(widget.circularConstraintRotation) {
                var f = this.createMotionFunction("circular_constraint_rotation",dyn_object,widget.cycle);
            }
    
            else {
                var f = this.createMotionFunction("rotation",dyn_object,widget.cycle);
            }
            
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
    
        if(widget.setAngle) {
            
            if(widget.circularConstraintRotation) {
                var f = this.createMotionFunction("circular_constraint_setAngle",dyn_object,widget.cycle);
            }
    
            else {
                var f = this.createMotionFunction("setAngle",dyn_object,widget.cycle);
            }
            
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
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
                triggerObj: dyn_object
            });
        }
    
        if(widget.toggleLock) {
            
        }
    
        if(widget.clone) {
    
            // Clone By Time
    
            if(widget.trigger === "time") {
            
                var getFunction = function() {
    
                    var time = widget.time;
                    var maxN = widget.maxN;
    
                    var func = null;
    
                    if(Number.isInteger(maxN)) {
    
                        func = function(e) {
    
                            if(func.__n === maxN) {
                                clearInterval(func.__interN);
                            }
    
                            else {
                                if(!self.paused) {
                                    self.spawnObject(dyn_object);
                                    func.__n++;
                                }
                            }
    
                        }
    
                        func.__n = 0;
    
                    }
    
                    else {
    
                        func = function(e) {
                            if(!self.paused) {
                                self.spawnObject(dyn_object);
                            }
                        }
    
                    }
    
    
                    func.__phtime = time;
                    func.__interN = null;
    
                    return func;
    
                }
    
                var refFunc = getFunction();
    
                refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
    
            }
    
            // Clone By Key
    
            if(widget.trigger === "key") {
    
                var getFunction = function() {
    
                    var kc = widget.key;
                    var vc = widget.vector;
    
                    var cloneByKeyFunc = function(e) {
                        if(e.key === kc) {
                            self.spawnObject(dyn_object,vc);
                        }
                    }
    
                    return cloneByKeyFunc;
    
                }
    
                this.addEventListener("keydown",getFunction());
    
            }
    
        }
    
        if(widget.draggable) {
    
    
            var func = function(e) {
    
                var change = false;
                var __ismoving = true;
                var constraint = null;
    
                // Displacement vector between mouse and centroid of object when the mouse is pushed downwards.
    
                var delta = {}
    
                // Mouse Position
    
                var mV = {
                    x: null,
                    y: null
                }
    
                var __onmousemove = function(e) {
                    mV.x = e.x - delta.x;
                    mV.y = e.y - delta.y;
                }
    
                var __onmouseup = function() {
                    self.removeEventListener("mousemove",__onmousemove);
                    self.removeEventListener("mouseup",__onmouseup);
                    self.removeEventListener("beforeupdate",__onbeforeupdate);
                }
    
                var __onbeforeupdate = function() {
                    Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
                    self.setPosition(dyn_object,mV);
                }
    
                var __onmousedown = function(e) {
                    if(self.pointInObject(dyn_object,e.x,e.y)) {
    
                        delta.x = e.x - dyn_object.matter.position.x;
                        delta.y = e.y - dyn_object.matter.position.y;
    
                        self.addEventListener("mousemove",__onmousemove);
                        self.addEventListener("mouseup",__onmouseup);
                        self.addEventListener("beforeupdate",__onbeforeupdate);
    
                        __onmousemove(e);
                    }
                }
                
                self.addEventListener("mouseout",__onmouseup);
    
                return __onmousedown;
    
            }
    
            this.addEventListener("mousedown",func());
        }
    
        if(widget.rectText) {
            dyn_object.rectTextWidget === true;
        }
    
        if(widget.coin) {
    
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
        
        if(widget.hazard) {
    
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
    
        if(widget.health) {
    
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
    
        if(widget.noRotation) {
            Matter.Body.setInertia(dyn_object.matter, Infinity)
        }
    
        if(widget.elevator) {
            
    
            var func = function() {
            
                var type = widget.type;
    
                var obj = dyn_object;
                var relVec = PhSim.Tools.subtractVectors(widget.pointB,widget.pointA);
                
                var u = PhSim.Tools.getUnitVector(relVec);
                
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
                
                Matter.Body.setStatic(dyn_object.matter,true);
                
                // Event function
    
                var inRange = function() {
        
                if( cond_f() ) {
                self.translate(obj,PhSim.Tools.scaleVector(u,1));
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
                            self.translate(obj,PhSim.Tools.scaleVector(u,1));
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
                triggerObj: dyn_object
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
                triggerObj: dyn_object
            });
        }
        
        if(widget.setLineWidth) {
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.setLineWidth(dyn_object,widget.color);
            },{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.endGame) {
            var f = this.createMotionFunction("position",dyn_object,widget.vector);
            this.addSimpleEvent(widget.trigger,f,{
                ...widget,
                triggerObj: dyn_object
            });
        }
        
        if(widget.playAudio) {
    
            var i = this.audioPlayers;
    
            this.staticAudio.push(widget);
    
            var f = this.addSimpleEvent(widget.trigger,function(){
                self.playAudioByIndex(i);
            },{
                ...widget,
                triggerObj: dyn_object
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
                    triggerObj: dyn_object
                }
    
                var f = self.addSimpleEvent(widgetO.trigger,eventFuncClosure(),options);
            });
    
        }
    
        
    
    }
    
    
    PhSim.DynSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.widgets.length; i++) {
            this.extractWidget(dyn_object.widgets[i],dyn_object);
        }
    }
    
    