/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens objmousedown
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */


/**
 * Listens click event
 * @function
 * @listens MouseEvent
 * @param {MouseEvent} e 
 */

/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens MouseEvent
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

/**
 * @function
 * @param {MouseEvent} e 
 */

/**
 * @function
 * @param {MouseEvent} e 
 */



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

	var self = this;

	this.dispatchMouseDown = function(e) {

		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "mousedown";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);
	
		if(!this.paused) {
			if(this.objMouseArr && this.objMouseArr.length > 0) {
	
					/**
					 * @event objmousedown
					 * @type {PhSim.PhMouseEvent}
					 */
	
	
				this.callEventClass("objmousedown",canvas,eventObj);
			}
		}
	
		this.callEventClass("mousedown",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mousedown",this.pressMouseDown);

	this.dispatchClick = function(e) {
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

	this.simCanvas.addEventListener("click",this.dispatchClick);

	this.dispatchMouseMove = function(e) {
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
	
			if(this.objMouseArr && this.objMouseArr.length > 0) {
				this.callEventClass("objmousemove",canvas,eventObj);
			}
	
			if(this.newMouseObj && this.newMouseObjs.length > 0) {
				eventObj.newMouseObjs = this.newMouseObjs;
				this.callEventClass("objmouseover",canvas,eventObj);
			}
	
			if(this.formerMouseObjs && this.formerMouseObjs.length > 0) {
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

	this.simCanvas.addEventListener("mousemove",this.dispatchMouseMove);

	this.dispatchMouseUp = function(e) {
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

	this.simCanvas.addEventListener("mouseup",this.getEventBridge(this.dispatchMouseUp));

	this.dispatchMouseOut = function(e) {
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

	this.simCanvas.addEventListener("mouseout",this.dispatchMouseOut);

}

PhSim.prototype.deregisterCanvasEvents = function() {
	//this.simCanvas.removeEventListener("mousedown",this.getEventBridge(this.mousedownListener));
	//this.simCanvas.removeEventListener("click",this.getEventBridge(this.clickListener));
	//this.simCanvas.removeEventListener("mousemove",this.getEventBridge(this.mousemoveListener));
	//this.simCanvas.removeEventListener("mouseup",this.getEventBridge(this.mouseupListener));
	//this.simCanvas.removeEventListener("mouseout",this.getEventBridge(this.mouseoutListener));

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