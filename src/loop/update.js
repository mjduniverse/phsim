const PhSim = require("..");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

/**
 * 
 * Update a dynamic object.
 * 
 * @function
 * @param {PhSimObject} currentObj - Object to be updated
 * @fires PhSim.Events.PhSimEvent
 * 
 */

PhSim.prototype.updateDynObj = function(currentObj) {


	// Loop must start at index 1 because the first element in the array is a reference to the parent object itself.

	if(currentObj.noDyn) {
		this.phRender.renderStatic(currentObj);	
	}
	
	else {

		if(currentObj.shape === "circle" || currentObj.shape === "regPolygon" || currentObj.shape === "rectangle") {
			currentObj.cycle = currentObj.firstCycle + currentObj.matter.angle;
		}
	
		if(currentObj.shape === "rectangle") {
			currentObj.x = currentObj.matter.position.x - currentObj.w * 0.5
			currentObj.y = currentObj.matter.position.y - currentObj.h * 0.5
		}
	
		if(currentObj.shape === "circle" || currentObj.shape === "regPolygon") {
			currentObj.x = currentObj.matter.position.x;
			currentObj.y = currentObj.matter.position.y;
		}
	
		if(currentObj.shape === "polygon") {
			PhSim.calc_skinmesh(currentObj);
		}

		if(this.phRender) {	
			this.phRender.dynamicRenderDraw(currentObj);
		}

	}

	var event = new PhSim.Events.PhSimEvent("objupdate");
	event.target = currentObj;

	this.callEventClass("objupdate",this,event);

}

/**
 * The loopFunction is a function that is executed over and over again. It is responsible
 * for providing the simulation loop.
 */

PhSim.prototype.loopFunction = function() {

	if(this.paused === false && this.status === PhSim.statusCodes.LOADED_SIMULATION) {

		var beforeUpdateEvent = new PhSim.Events.PhSimDynEvent()

		beforeUpdateEvent.simulation = this.simulation;

		this.prevDate = this.prevDate && this.updateDate;
	
		this.callEventClass("beforeupdate",this,beforeUpdateEvent);

		if(!this.firstSlUpdate) {
			this.callEventClass("beforefirstslupdate",this,afterUpdateEvent);
		}

		this.updateDate = new Date();

		if(this.prevDate) {
			this.updateTimeInterval = this.updateDate - this.prevDate;
		}


		Matter.Engine.update(this.matterJSEngine,this.delta);

		if(this.ctx) {

			this.ctx.fillStyle = this.bgFillStyle;

			if(this.noCamera) {
				this.ctx.fillRect(0,0,this.width,this.height);
			}
	
			else {
				this.ctx.fillRect(0 - this.camera.x,0 - this.camera.y,this.width / this.camera.scale,this.height / this.camera.scale);
			}
		}

		for(let i = 0; i < this.objUniverse.length; i++) {
			this.updateDynObj(this.objUniverse[i]);
		}
	
		this.applyGravitationalField()

		var afterUpdateEvent = new PhSim.Events.PhSimDynEvent()

		afterUpdateEvent.simulation = this.simulation;

		this.sl_time = this.sl_time + this.delta;

		if(this.filter) {
			this.ctx.fillStyle = "rgba(3,3,3,0.7)";
			this.ctx.fillRect(0,0,this.width / this.camera.scale,this.height / this.camera.scale);
		}

		if(!this.firstSlUpdate) {
			this.callEventClass("firstslupdate",this,afterUpdateEvent);
			this.firstSlUpdate = true;
		}

		this.callEventClass("afterupdate",this,afterUpdateEvent);

		//this.renderAllCounters();


	}

}