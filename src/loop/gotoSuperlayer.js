const PhSim = require("../index");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}


/**
 * Go to simulation in the composite simulation
 * 
 * In a PhSim object, there is a property known as PhSim.prototype.sim. 
 * This property is used to define a simulation.
 * 
 * When PhSim.prototype.gotoSimulationIndex is used, it resets 
 * 
 * @function
 * @param {Number} i
 * @this PhSim
 * @memberof PhSim
 * @returns {Promise} - A promise that is fulfiled if the loading is successful.
 * 
 */

var gotoSimulationIndex = function (i) {

	var self = this;

	var p = new Promise(function(resolve){

		self.status = PhSim.statusCodes.INT;

		var optionMap = new Map();  
	
		self.firstSlUpdate = false;
	
		var event = new PhSim.Events.PhSimEvent("slchange");
	
		event.type = "slchange";
	
		self.callEventClass("beforeslchange",self,event);
	
		if(!self.noCamera) {
			self.camera.translate(-self.camera.x,-self.camera.y);
		}
	
		if(self.ctx) {
			self.drawLoadingScreen();
		}
	
		self.simulation = self.simulations[i];
		self.simOptions = self.simulations[i];
	
		self.simulationIndex = i;
	
		if(self.ctx) {
			self.width = self.ctx.canvas.width;
			self.height = self.ctx.canvas.height;
		}
		
		self.paused = false;
	
		self.matterJSWorld = Matter.World.create();
	
		self.matterJSEngine = Matter.Engine.create({
			world: self.matterJSWorld
		});
	
		self.dynTree = [];
		self.objUniverse = [];
		self.staticSprites = [];
		self.staticAudio = [];
		self.audioPlayers = 0;
		self.simulationEventStack = new PhSim.EventStack();
	
	
		if(self.sprites) {
			self.staticSprites.concat(self.sprites);
		}
	
	
		if(self.simOptions && self.simOptions.world && self.simOptions.world.bg) {
			self.bgFillStyle = self.simOptions.world.bg;
		}
	
		if(self.world && self.world && self.world.bg) {
			self.bgFillStyle = self.world.bg;
		}
	
		if(self.simulations) {
		
			for(var L = 0; L < self.simOptions.layers.length; L++) {
	
				self.dynTree.push([]);
	
				for(var O = 0; O < self.simOptions.layers[L].objUniverse.length; O++) {
	
					var o = self.simOptions.layers[L].objUniverse[O];
	
					if(o.sprite) {
						self.staticSprites.push(o.sprite);	
					}
					
					if(o.noDyn) {
	
						self.addObject(o,{
							layer: L
						});
				
					}
	
					else {
						
						if(o instanceof PhSim.DynObject) {
							self.addObject(o,{
								layer: L
							});
						}
	
						else {
							var dynObject = new PhSim.DynObject(o);
	
							self.addObject(dynObject,{
								layer: L
							});
	
							optionMap.set(o,dynObject);
						}
	
					}
				}
	
				var a = new PhSim.Events.PhSimDynEvent();
				self.callEventClass("matterJSLoad",self,a);
	
			}
	
		}
	
		Matter.Events.on(self.matterJSEngine,"collisionStart",function(event) {
			
			var a = new PhSim.Events.PhSimDynEvent();
			a.matterEvent = event;
			self.callEventClass("collisionstart",self,a);
	
		});
	
		if(self.simOptions.game) {
			self.lclGame = new PhSim.Game(self,self.simOptions.game);
		}
	
		if(self.simulation.widgets) {
	
			for(var C = 0; C < self.simulation.widgets.length; C++) {
				var a = self.simulation.widgets[C];
				self.extractWidget(self,a);
			}
	
		}

		this.status = PhSim.statusCodes.LOADED_DYN_OBJECTS;

		resolve();

		
	}).then(function(){

		return new Promise(function(resolve){

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

		})

	}).then(function() {
		return new Promise(function(resolve){

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
		self.init = true;

		self.status = PhSim.statusCodes.LOADED_SIMULATION;

		var e = new PhSim.Events.PhSimDynEvent();
	
		self.callEventClass("load",self,e);

	}).catch(function(){
		
	});

	return p;

}

module.exports = gotoSimulationIndex;