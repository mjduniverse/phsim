/**
 * Go to simulation in the composite simulation
 * 
 * In a PhSim object, there is a property known as PhSim.prototype.sim. 
 * This property is used to define a simulation.
 * 
 * When PhSim.prototype.gotoSimulationIndex is used, it resets 
 * @param {Number} i
 * @this PhSim
 * @function
 * 
 *  
 */

PhSim.prototype.gotoSimulationIndex = function (i) {

	var self = this;

	this.firstSlUpdate = false;

	var event = new PhSim.PhEvent();

	event.type = "slchange";

	this.callEventClass("beforeslchange",this,event);

	if(!this.noCamera) {
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

	if(this.simCtx) {
	    this.drawLoadingScreen();
	}

	this.simulation = this.options.simulations[i];
	this.simOptions = this.options.simulations[i];

	this.simulationIndex = i;

	if(this.simCtx) {
		this.width = this.simCtx.canvas.width;
		this.height = this.simCtx.canvas.height;
	}
	
	this.paused = false;

	var this_a = this;

	this.matterJSWorld = Matter.World.create();

	this.matterJSEngine = Matter.Engine.create({
		world: this_a.matterJSWorld
	});

	this.dynTree = [];
	this.objUniverse = [];
	this.staticSprites = [];
	this.staticAudio = [];
	this.audioPlayers = 0;
	this.collisionClasses = {};
	this.slEventStack = new PhSim.EventStack();

	if(this.simOptions && this.simOptions.world && this.simOptions.world.bg) {
		this.bgFillStyle = this.simOptions.world.bg;
	}

	var ncc = new PhSim.CollisionClass("__main");
	ncc.engine = this.matterJSEngine;
	ncc.world = this.matterJSWorld;

	this.collisionClasses["__main"] = ncc;

	if(this.options.simulations) {
	
		for(var L = 0; L < this.simOptions.layers.length; L++) {

			this.dynTree.push([]);

			for(var O = 0; O < this.simOptions.layers[L].objUniverse.length; O++) {

				var o = this.simOptions.layers[L].objUniverse[O];

				if(o.sprite) {
					this.staticSprites.push(o.sprite);	
				}
				
				if(o.noDyn || o.permStatic) {

					this.addObject(o,{
						layer: L
					});
			
				}

				else {
					
					var dynObject = new PhSim.DynObject(o);

					this.addObject(dynObject,{
						layer: L
					});

				}
			}

			var a = new PhSim.PhDynEvent();
			this_a.callEventClass("matterJSLoad",this_a,a);

		}

	}

	Matter.Events.on(this.matterJSEngine,"collisionStart",function(event) {
		
		var a = new PhSim.PhDynEvent();
		a.matterEvent = event;
		this_a.callEventClass("collisionstart",this_a,a);

	});

	if(this.simOptions.game) {
		this.lclGame = new PhSim.Game(this,this.simOptions.game);
	}

	for(var C = 0; C < this_a.simulation.widgets.length; C++) {
			
		var a = this_a.simulation.widgets[C];

		if(a.constraint) {

			var b = {}

			if(a.objectA) {
				b.bodyA = this_a.LO(a.objectA.L,a.objectA.O);;
			}

			if(a.objectB) {
				b.bodyB = this_a.LO(a.objectB.L,a.objectB.O);
			}

			if(a.pointA) {
				b.pointA = a.pointA;
			}

			if(a.pointB) {
				b.pointB = a.pointB;
			}

			var c = Matter.Constraint.create(b);

			Matter.World.add(this.matterJSWorld,c)

		}

		if(a.connection) {

			this_a.connectDynObjects(this_a.dynTree[a.objectA.L][a.objectA.O],this_a.dynTree[a.objectB.L][a.objectB.O]);

		}

		if(a.wFunction) {

            var wf = self.createWFunction(a.function,this_a);

            var closure = function() {

                var f = function(){
                    wf();
                };

                return f;

            }

            var f = this.addSimpleEvent(a.trigger,closure(),a);

        }



	}

	var promise = new Promise(function(resolve,reject){

		if(self.phRender) {
			self.phRender.spriteImgArray = new PhSim.Sprites.SpriteImgArray(self.staticSprites,function() {
				resolve();
			});
		}

		else {
			resolve();
		}

	}).then(function() {
		return new Promise(function(resolve,reject){
			self.audioArray = new PhSim.Audio.AudioArray(self.staticAudio,function(){
				resolve();
			});
		})
	}).then(function(){
		this_a.intervalLoop = setInterval(this_a.loopFunction.bind(this_a),this_a.delta);
		this_a.init = true;
	});

}

PhSim.prototype.initSim = function(simulationI) {

	this.status = 1;
	var self = this;
	this.status = 2;

	this.status = 3;
	var e = new PhSim.PhEvent();
	self.gotoSimulationIndex(0);
	self.callEventClass("load",self,e);
	self.addEventListener("collisionstart",function() {
		//self.playAudioByIndex(self.simulation.collisionSound);
	});
	self.status = 4;

}