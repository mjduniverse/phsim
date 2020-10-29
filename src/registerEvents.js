/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens objmousedown
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

PhSim.prototype.mousedownListener = function(e) {

	var eventObj = new PhSim.PhMouseEvent();
	var canvas = this.simCtx.canvas;
	var rect = canvas.getBoundingClientRect();
	eventObj.domEvent = e;
	eventObj.x =  e.clientX - rect.left;
	eventObj.y = e.clientY - rect.top;
	eventObj.type = "mousedown";
	eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);

	if(!this.paused) {
		if(this.objMouseArr.length > 0) {

				/**
				 * @event objmousedown
				 * @type {PhSim.PhMouseEvent}
				 */


			this.callEventClass("objmousedown",canvas,eventObj);
		}
	}

	this.callEventClass("mousedown",canvas,eventObj);
}

/**
 * Listens click event
 * @function
 * @listens MouseEvent
 * @param {MouseEvent} e 
 */

PhSim.prototype.clickListener = function(e) {
	var eventObj = new PhSim.PhMouseEvent();
	var canvas = this.simCtx.canvas;
	var rect = canvas.getBoundingClientRect();
	eventObj.domEvent = e;
	eventObj.x =  e.clientX - rect.left;
	eventObj.y = e.clientY - rect.top;
	eventObj.type = "click";
	eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);


	if(this.objMouseArr.length > 0) {
		this.callEventClass("objclick",canvas,eventObj);
	}

	this.callEventClass("click",canvas,eventObj);
}

/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens MouseEvent
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

PhSim.prototype.mousemoveListener = function(e) {
	var eventObj = new PhSim.PhMouseEvent();
	var canvas = this.simCtx.canvas;
	var rect = canvas.getBoundingClientRect();
	eventObj.domEvent = e;

	eventObj.x =  e.clientX - rect.left;
	eventObj.y = e.clientY - rect.top;

	if(this.mouseX && this.mouseY) {
		this.prevMouseX = this.mouseX;
		this.prevMouseY = this.mouseY;
	}

	this.prevObjMouseArr = [];

	if(this.objMouseArr) {
		this.prevObjMouseArr = [...this.objMouseArr];
	}

	this.mouseX = eventObj.x;
	this.mouseY = eventObj.y;

	this.dynArr = this.objMouseArr;

	this.objMouseArr = [];
	this.formerMouseObjs = [];
	this.newMouseObjs = [];

	if(this.init) {

		for(i = 0; i < this.objUniverse.length; i++) {

			if(this.pointInObject(this.objUniverse[i],this.mouseX,this.mouseY)) {
				this.objMouseArr.push(this.objUniverse[i])
			}

			if(!this.objMouseArr.includes(this.objUniverse[i]) && this.prevObjMouseArr.includes(this.objUniverse[i])) {
				this.formerMouseObjs.push(this.objUniverse[i])
			}

			if(this.objMouseArr.includes(this.objUniverse[i]) && !this.prevObjMouseArr.includes(this.objUniverse[i])) {
				this.newMouseObjs.push(this.objUniverse[i])
			}

		}

		if(this.objMouseArr.length > 0) {
			this.callEventClass("objmousemove",canvas,eventObj);
		}

		if(this.newMouseObjs.length > 0) {
			eventObj.newMouseObjs = this.newMouseObjs;
			this.callEventClass("objmouseover",canvas,eventObj);
		}

		if(this.formerMouseObjs.length > 0) {
			eventObj.formerMouseObjs = this.formerMouseObjs;
			this.callEventClass("objmouseout",canvas,eventObj);
		}
	}

	/**
	 * @event mousemove
	 */

	this.callEventClass("mousemove",canvas,eventObj);

	//console.log(eventObj);
}

/**
 * @function
 * @param {MouseEvent} e 
 */

PhSim.prototype.mouseupListener = function(e) {
	var eventObj = new PhSim.PhMouseEvent();
	var canvas = this.simCtx.canvas;
	var rect = canvas.getBoundingClientRect();
	eventObj.domEvent = e;
	eventObj.x =  e.clientX - rect.left;
	eventObj.y = e.clientY - rect.top;
	this.mouseX = eventObj.x;
	this.mouseY = eventObj.y;

	if(this.objMouseArr.length > 0) {
		this.callEventClass("objmouseup",canvas,eventObj);
	}

	this.callEventClass("mouseup",canvas,eventObj);
}

/**
 * @function
 * @param {MouseEvent} e 
 */

PhSim.prototype.mouseoutListener = function(e) {
	var eventObj = new PhSim.PhMouseEvent();
	var canvas = this.simCtx.canvas;
	var rect = canvas.getBoundingClientRect();
	eventObj.domEvent = e;
	eventObj.x =  e.clientX - rect.left;
	eventObj.y = e.clientY - rect.top;
	this.mouseX = eventObj.x;
	this.mouseY = eventObj.y;
	this.callEventClass("mouseout",canvas,eventObj);
}

/**
 * 
 * Create a wrapping function that is used for events.
 * 
 * @param {Function} f - Function
 * 
 */

PhSim.prototype.getEventBridge = function(f) {

	var self = this;

	return function(e) {
		f.call(self,e);
	}
}

/**
 * 
 * Used to set event listeners for a canvas.
 * This function works if {@link PhSim.prototype#simCtx} 
 * and {@link PhSim.prototype#simCanvas} are set.
 * 
 * @function
 *  
 */

PhSim.prototype.registerCanvasEvents = function() {
	this.simCanvas.addEventListener("mousedown",this.getEventBridge(this.mousedownListener));
	this.simCanvas.addEventListener("click",this.getEventBridge(this.clickListener));
	this.simCanvas.addEventListener("mousemove",this.getEventBridge(this.mousemoveListener));
	this.simCanvas.addEventListener("mouseup",this.getEventBridge(this.mouseupListener));
	this.simCanvas.addEventListener("mouseout",this.getEventBridge(this.mouseoutListener));

}

PhSim.prototype.registerKeyEvents = function() {

	var self = this;

	this.windowObj = this.windowObj || window;

	this.keydownBridge = function(e) {
		var eventObj = new PhSim.PhKeyEvent();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",this,eventObj);
	}

	this.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	this.windowObj.addEventListener("keydown",this.keydownBridgeWrapper);
}

PhSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",this.keydownBridgeWrapper);
}