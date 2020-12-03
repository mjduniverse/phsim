const PhSim = require("../phSim");

PhSim.prototype.updateDynObj = function(currentObj) {


	// Loop must start at index 1 because the first element in the array is a reference to the parent object itself.

	if(currentObj.noDyn || currentObj.permStatic) {
		this.phRender.renderStatic(currentObj);	
	}
	
	else {

		if(currentObj.circle || currentObj.regPolygon || currentObj.rectangle) {
			currentObj.cycle = currentObj.firstCycle + currentObj.matter.angle;
		}
	
		if(currentObj.rectangle) {
			
			var v = {
				"x": currentObj.matter.position.x - currentObj.matter.positionPrev.x,
				"y": currentObj.matter.position.y - currentObj.matter.positionPrev.y 
			}
	
			currentObj.x = currentObj.matter.position.x - currentObj.w * 0.5
			currentObj.y = currentObj.matter.position.y - currentObj.h * 0.5
	
		}
	
		if(currentObj.circle || currentObj.regPolygon) {
			currentObj.x = currentObj.matter.position.x;
			currentObj.y = currentObj.matter.position.y;
		}
	
		if(currentObj.path) {
			PhSim.calc_skinmesh(currentObj);
		}

		if(this.phRender) {	
			this.phRender.dynamicRenderDraw(currentObj);
		}

	}

	var event = new PhSim.PhEvent();
	event.type = "objupdate";
	event.target = currentObj;

	this.callEventClass("objupdate",this,event);

}

PhSim.prototype.loopFunction = function() {

	if(this.paused === false) {

		var beforeUpdateEvent = new PhSim.PhDynEvent()

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


		PhSim.Matter.Engine.update(this.matterJSEngine,this.delta);

		if(this.simCtx) {

			this.simCtx.fillStyle = this.bgFillStyle;

			if(this.noCamera) {
				this.simCtx.fillRect(0,0,this.width,this.height);
			}
	
			else {
				this.simCtx.fillRect(0 - this.camera.x,0 - this.camera.y,this.width / this.camera.scale,this.height / this.camera.scale);
			}
		}

		for(i = 0; i < this.objUniverse.length; i++) {
			this.updateDynObj(this.objUniverse[i]);
		}
	
		this.applyGravitationalField()

		var afterUpdateEvent = new PhSim.PhDynEvent()

		afterUpdateEvent.simulation = this.simulation;

		this.sl_time = this.sl_time + this.delta;

		if(this.filter) {
			this.simCtx.fillStyle = "rgba(3,3,3,0.7)";
			this.simCtx.fillRect(0,0,this.width / this.camera.scale,this.height / this.camera.scale);
		}

		if(!this.firstSlUpdate) {
			this.callEventClass("firstslupdate",this,afterUpdateEvent);
			this.firstSlUpdate = true;
		}

		this.callEventClass("afterupdate",this,afterUpdateEvent);

		//this.renderAllCounters();


	}

}