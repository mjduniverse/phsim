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
 * The standard object for mouse related DOM events
 * @external MouseEvent
 * @type {MouseEvent} 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
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
 * @this PhSim
 *  
 */

PhSim.prototype.registerCanvasEvents = function() {

	var self = this;

	/**
	 * @function 
	 * @this HTMLCanvasElement
	 * @param {external:MouseEvent} e - MouseEvent object
	 * 
	 * @fires event:mousedown
	 * @fires event:objmousedown
	 * 
	 */


	this.dispatchMouseDown = function(e) {

		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "mousedown";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(!self.paused) {
			if(self.objMouseArr && self.objMouseArr.length > 0) {

				self.callEventClass("objmousedown",canvas,eventObj);
			}
		}

		/**
		 * PhSim `mousedown` event.
		 * @event mousedown
		 * @type {PhSim.Events.PhSimMouseEvent}
		 */
	
		self.callEventClass("mousedown",canvas,eventObj);
	}

	self.simCanvas.addEventListener("mousedown",self.pressMouseDown);

	self.dispatchClick = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "click";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
	
		if(self.objMouseArr.length > 0) {
			self.callEventClass("objclick",canvas,eventObj);
		}
	
		self.callEventClass("click",canvas,eventObj);
	}

	self.simCanvas.addEventListener("click",self.dispatchClick);

	self.dispatchMouseMove = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
	
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
	
		if(self.mouseX && self.mouseY) {
			self.prevMouseX = self.mouseX;
			self.prevMouseY = self.mouseY;
		}
	
		self.prevObjMouseArr = [];
	
		if(self.objMouseArr) {
			self.prevObjMouseArr = [...self.objMouseArr];
		}
	
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
	
		self.dynArr = self.objMouseArr;
	
		self.objMouseArr = [];
		self.formerMouseObjs = [];
		self.newMouseObjs = [];
	
		if(self.init) {
	
			for(i = 0; i < self.objUniverse.length; i++) {
	
				if(self.pointInObject(self.objUniverse[i],self.mouseX,self.mouseY)) {
					self.objMouseArr.push(self.objUniverse[i])
				}
	
				if(!self.objMouseArr.includes(self.objUniverse[i]) && self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.formerMouseObjs.push(self.objUniverse[i])
				}
	
				if(self.objMouseArr.includes(self.objUniverse[i]) && !self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.newMouseObjs.push(self.objUniverse[i])
				}
	
			}
	
			if(self.objMouseArr && self.objMouseArr.length > 0) {
				self.callEventClass("objmousemove",canvas,eventObj);
			}
	
			if(self.newMouseObj && self.newMouseObjs.length > 0) {
				eventObj.newMouseObjs = self.newMouseObjs;
				self.callEventClass("objmouseover",canvas,eventObj);
			}
	
			if(self.formerMouseObjs && self.formerMouseObjs.length > 0) {
				eventObj.formerMouseObjs = self.formerMouseObjs;
				self.callEventClass("objmouseout",canvas,eventObj);
			}
		}
	
		/**
		 * @event mousemove
		 */
	
		self.callEventClass("mousemove",canvas,eventObj);
	
		//console.log(eventObj);
	}

	self.simCanvas.addEventListener("mousemove",self.dispatchMouseMove);

	self.dispatchMouseUp = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
	
		if(self.objMouseArr.length > 0) {
			self.callEventClass("objmouseup",canvas,eventObj);
		}
	
		self.callEventClass("mouseup",canvas,eventObj);
	}

	self.simCanvas.addEventListener("mouseup",self.getEventBridge(self.dispatchMouseUp));

	self.dispatchMouseOut = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	self.simCanvas.addEventListener("mouseout",self.dispatchMouseOut);

}

PhSim.prototype.deregisterCanvasEvents = function() {
	//self.simCanvas.removeEventListener("mousedown",self.getEventBridge(self.mousedownListener));
	//self.simCanvas.removeEventListener("click",self.getEventBridge(self.clickListener));
	//self.simCanvas.removeEventListener("mousemove",self.getEventBridge(self.mousemoveListener));
	//self.simCanvas.removeEventListener("mouseup",self.getEventBridge(self.mouseupListener));
	//self.simCanvas.removeEventListener("mouseout",self.getEventBridge(self.mouseoutListener));

}

PhSim.prototype.registerKeyEvents = function() {

	var self = this;

	self.windowObj = self.windowObj || window;

	self.keydownBridge = function(e) {
		var eventObj = new PhSim.Events.PhSimEventKey();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",this,eventObj);
	}

	self.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	self.windowObj.addEventListener("keydown",self.keydownBridgeWrapper);
}

PhSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",self.keydownBridgeWrapper);
}