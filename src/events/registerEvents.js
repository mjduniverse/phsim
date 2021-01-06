const PhSim = require("..");

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
 * This function works if {@link PhSim.prototype#ctx} 
 * and {@link PhSim.prototype#canvas} are set.
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
	 * @fires Events#mousedown
	 * @fires Events#objmousedown
	 * 
	 */


	this.dispatchMouseDown = function(e) {

		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		eventObj.type = "mousedown";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(!self.paused) {
			if(self.objMouseArr && self.objMouseArr.length > 0) {
				
				eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

				self.callEventClass("objmousedown",canvas,eventObj);

				for(var i = 0; i < eventObj.dynArr.length; i++) {
					eventObj.dynArr[i].callEventClass("objmousedown",eventObj.dynArr[i],eventObj);
				}

			}
		}

		/**
		 * PhSim `mousedown` event.
		 * @event mousedown
		 * @type {PhSim.Events.PhSimMouseEvent}
		 */
	
		self.callEventClass("mousedown",canvas,eventObj);
	}

	this.canvas.addEventListener("mousedown",this.dispatchMouseDown);

	/**
	 * @function
	 * @param {external:MouseEvent} e 
	 * 
	 * @fires Events#click
	 * @fires Events#objclick
	 * 
	 */

	this.dispatchClick = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		eventObj.type = "click";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);

		if(self.objMouseArr.length > 0) {

			eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

			self.callEventClass("objclick",canvas,eventObj);

			for(var i = 0; i < eventObj.dynArr.length; i++) {
				eventObj.dynArr[i].callEventClass("objclick",eventObj.dynArr[i],eventObj);
			}

		}
	
		self.callEventClass("click",canvas,eventObj);
	}

	this.canvas.addEventListener("click",this.dispatchClick);

	/**
	 * 
	 * Dispatch `mousemove` event.
	 * 
	 * @function
	 * @param {external:MouseEvent} e - Standard MouseEvent Javascript object 
	 * 
	 * @fires PhSim.Events#objmousemove
	 * @fires PhSim.Events#objmouseover
	 * @fires PhSim.Events#objmouseout
	 * @fires PhSim.Events#mousemove
	 */

	this.dispatchMouseMove = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
	
		eventObj.x =  e.clientX - rect.left - self.camera.x;
		eventObj.y = e.clientY - rect.top - self.camera.y;

		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
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
	
			for(var i = 0; i < self.objUniverse.length; i++) {
	
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

				eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

				self.callEventClass("objmousemove",canvas,eventObj);

				for(var j = 0; j < eventObj.dynArr.length; j++) {
					eventObj.dynArr[j].callEventClass("objmousemove",eventObj.dynArr[j],eventObj);
				}

			}
	
			if(self.newMouseObjs && self.newMouseObjs.length > 0) {

				eventObj.newMouseObjs = self.newMouseObjs;

				eventObj.target = eventObj.newMouseObjs[eventObj.dynArr.length - 1];

				self.callEventClass("objmouseover",canvas,eventObj);

				for(var k = 0; k < eventObj.newMouseObjs.length; k++) {
					eventObj.newMouseObjs[k].callEventClass("objmouseover",eventObj.newMouseObjs[k],eventObj);
				}

			}
	
			if(self.formerMouseObjs && self.formerMouseObjs.length > 0) {

				eventObj.formerMouseObjs = self.formerMouseObjs;

				eventObj.target = eventObj.formerMouseObjs[eventObj.dynArr.length - 1];

				self.callEventClass("objmouseout",canvas,eventObj);

				for(var m = 0; m < eventObj.formerMouseObjs.length; m++) {
					eventObj.formerMouseObjs[m].callEventClass("objmouseout",eventObj.formerMouseObjs[m],eventObj);
				}

			}
		}
	
		/**
		 * @event mousemove
		 */
	
		self.callEventClass("mousemove",canvas,eventObj);
	
		//console.log(eventObj);
	}

	this.canvas.addEventListener("mousemove",this.dispatchMouseMove);

	this.dispatchMouseUp = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;

		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(self.objMouseArr.length > 0) {

			eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

			self.callEventClass("objmouseup",canvas,eventObj);

			for(var i = 0; i < eventObj.dynArr.length; i++) {
				eventObj.dynArr[i].callEventClass("objmouseup",eventObj.dynArr[i],eventObj);
			}

		}
	
		self.callEventClass("mouseup",canvas,eventObj);
	}

	this.canvas.addEventListener("mouseup",this.getEventBridge(self.dispatchMouseUp));

	self.dispatchMouseOut = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	this.canvas.addEventListener("mouseout",this.dispatchMouseOut);

}

PhSim.prototype.deregisterCanvasEvents = function() {
	//self.canvas.removeEventListener("mousedown",self.getEventBridge(self.mousedownListener));
	//self.canvas.removeEventListener("click",self.getEventBridge(self.clickListener));
	//self.canvas.removeEventListener("mousemove",self.getEventBridge(self.mousemoveListener));
	//self.canvas.removeEventListener("mouseup",self.getEventBridge(self.mouseupListener));
	//self.canvas.removeEventListener("mouseout",self.getEventBridge(self.mouseoutListener));

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