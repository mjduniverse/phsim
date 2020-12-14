/**
 * Go to simulation in the composite simulation
 * 
 * In a PhSim object, there is a property known as PhSim.prototype.sim. 
 * This property is used to define a simulation.
 * 
 * When PhSim.prototype.gotoSimulationIndex is used, it resets 
 * @param {Number} i
 * @this PhSim
 * @memberof PhSim
 * @returns {Promise} - A promise that is fulfiled if the loading is successful.
 * @function
 * 
 *  
 */

var gotoSimulationIndex = function (i) {

	this.status = PhSim.statusCodes.INT;

	var optionMap = new Map();  

	var self = this;

	this.firstSlUpdate = false;

	var event = new PhSim.PhEvent("slchange");

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

	this.matterJSWorld = PhSim.Matter.World.create();

	this.matterJSEngine = PhSim.Matter.Engine.create({
		world: this_a.matterJSWorld
	});

	this.dynTree = [];
	this.objUniverse = [];
	this.staticSprites = [];
	this.staticAudio = [];
	this.audioPlayers = 0;
	this.slEventStack = new PhSim.EventStack();

	if(this.simOptions && this.simOptions.world && this.simOptions.world.bg) {
		this.bgFillStyle = this.simOptions.world.bg;
	}

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
					
					if(o instanceof PhSim.DynObject) {
						this.addObject(o,{
							layer: L
						});
					}

					else {
						var dynObject = new PhSim.DynObject(o);

						this.addObject(dynObject,{
							layer: L
						});

						optionMap.set(o,dynObject);
					}

				}
			}

			var a = new PhSim.PhDynEvent();
			this_a.callEventClass("matterJSLoad",this_a,a);

		}

	}

	PhSim.Matter.Events.on(this.matterJSEngine,"collisionStart",function(event) {
		
		var a = new PhSim.PhDynEvent();
		a.matterEvent = event;
		this_a.callEventClass("collisionstart",this_a,a);

	});

	if(this.simOptions.game) {
		this.lclGame = new PhSim.Game(this,this.simOptions.game);
	}

	for(var C = 0; C < this_a.simulation.widgets.length; C++) {
			
		var a = this_a.simulation.widgets[C];

		if(a.type === "constraint") {

			var b = {}

			if(a.objectA) {

				if(a.objectA instanceof PhSim) {
					b.bodyA = a.objectA.matter;
				}

				else {

					if(typeof a.objectA.L === "number" && typeof a.objectA.O === "number") {
						b.bodyA = this_a.LO(a.objectA.L,a.objectA.O).matter;
					}

					else {
						b.bodyA = optionMap.get(a.objectA).matter;
					}

				}

 			}

			if(a.objectB) {
				b.bodyB = this_a.LO(a.objectB.L,a.objectB.O).matter;

				if(a.objectB instanceof PhSim) {
					b.bodyB = a.objectB.matter;
				}

				else {

					if(typeof a.objectB.L === "number" && typeof a.objectB.O === "number") {
						b.bodyB = this_a.LO(a.objectB.L,a.objectB.O).matter;
					}

					else {
						b.bodyB = optionMap.get(a.objectB).matter;
					}

				}

			}

			if(a.pointA) {
				b.pointA = a.pointA;
			}

			if(a.pointB) {
				b.pointB = a.pointB;
			}

			var c = PhSim.Matter.Constraint.create(b);

			PhSim.Matter.World.add(this.matterJSWorld,c)

		}

		if(a.type === "connection") {

			this_a.connectDynObjects(this_a.dynTree[a.objectA.L][a.objectA.O],this_a.dynTree[a.objectB.L][a.objectB.O]);

		}

		if(a.type === "wFunction") {
            self.createWFunction(self,a.function,a);
        }



	}

	this.status = PhSim.statusCodes.LOADED_DYN_OBJECTS;

	var p = new Promise(function(resolve,reject){

		if(self.phRender && self.staticSprites.length) {
			self.phRender.spriteImgObj = new PhSim.Sprites.spriteImgObj(self.staticSprites,function() {
				resolve();
				self.status = PhSim.statusCodes.LOADED_SPRITES;
			});
		}

		else {
			resolve();
			self.status = PhSim.statusCodes.LOADED_SPRITES;
		}

	}).then(function() {
		return new Promise(function(resolve,reject){

			if(self.staticAudio.length) {
				self.audioArray = new PhSim.Audio.AudioArray(self.staticAudio,function(){
					self.status = PhSim.statusCodes.LOADED_AUDIO;
					resolve();
				});
			}

			else {
				self.status = PhSim.statusCodes.LOADED_AUDIO;
				resolve();
			}

		});
	}).then(function(){
		this_a.init = true;

		self.status = PhSim.statusCodes.LOADED_SIMULATION;

		var e = new PhSim.PhDynEvent();
	
		self.callEventClass("load",self,e);

	});

	return p;

}

module.exports = gotoSimulationIndex;