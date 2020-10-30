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

	var ncc = new PhSim.CollisionClass("__main");
	ncc.engine = this.matterJSEngine;
	ncc.world = this.matterJSWorld;

	this.collisionClasses["__main"] = ncc;

	if(this.options.simulations) {
	
		for(var L = 0; L < this.simOptions.layers.length; L++) {

			var layerComposite = Matter.Composite.create();
			var layerBranch = [];

			for(var O = 0; O < this.simOptions.layers[L].objUniverse.length; O++) {
				
				if(this.simOptions.layers[L].objUniverse[O].noDyn || this.simOptions.layers[L].objUniverse[O].permStatic) {
					layerBranch.push(this.simOptions.layers[L].objUniverse[O]);
					this.objUniverse.push(this.simOptions.layers[L].objUniverse[O]);
					this.staticSprites.push(this.simOptions.layers[L].objUniverse[O].sprite)				
				}

				else {
					
					var dynObject = new PhSim.DynObject(this.simOptions.layers[L].objUniverse[O])
					dynObject.phSim = this;

					// If the collision class object exists

					if(dynObject.static.collisionClass && dynObject.static.collisionClass.trim() !== "__main") {

						var a = this.getCollisionClasses(dynObject);

						for(var i = 0; i < a.length; i++) {
							
							if(this.collisionClasses[a[i]]) {
								this.collisionClasses[a[i]].addDynObject(dynObject)
							}

							else {
								var ncc = new PhSim.CollisionClass(a[i]);
								ncc.addDynObject(dynObject);
								this.collisionClasses[a[i]] = ncc;
							}
						}

					}

					else {
						Matter.World.add(layerComposite,dynObject.matter);
					}
					
					if(dynObject.static.widgets) {
						this.extractWidgets(dynObject);
					}

					layerBranch.push(dynObject);
					this.objUniverse.push(dynObject);
					dynObject.layerBranch = layerBranch;
					
					if(dynObject.static.sprite) {
						this.staticSprites.push(dynObject.static.sprite)
					}

				}
			}

			Matter.World.add(this.matterJSWorld,layerComposite);
			this.dynTree.push(layerBranch);

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
		this.lclGame = this.extractLclGame(this.simOptions.game);
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