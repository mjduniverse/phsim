PhSim.DynSim.prototype.registerCanvasEvents = function() {

	var self = this;

	// onmousedown

	this.eventStack.mousedown = []

	this.mousedownBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "mousedown";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);

		if(!self.paused) {
			if(self.objMouseArr.length > 0) {
				self.callEventClass("objmousedown",canvas,eventObj);
			}
		}

		self.callEventClass("mousedown",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mousedown",function(e) {
		if(!self.filter) {
			self.mousedownBridge(e);
		}
	});

	// click

	this.eventStack.click = []
	this.eventStack.objclick = []

	this.clickBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		eventObj.type = "click";
		eventObj.dynArr = this.pointObjArray(eventObj.x,eventObj.y);


		if(self.objMouseArr.length > 0) {
			self.callEventClass("objclick",canvas,eventObj);
		}

		self.callEventClass("click",canvas,eventObj);
	}

	this.simCanvas.addEventListener("click",function(e) {
		if(!self.filter) {
			self.clickBridge(e);
		}
	});

	//mousemove

	this.eventStack.mousemove = this.eventStack.mousemove || []
	this.eventStack.objmousemove = this.eventStack.objmousemove || []

	this.mousemoveBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
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

			if(self.objMouseArr.length > 0) {
				self.callEventClass("objmousemove",canvas,eventObj);
			}

			if(self.newMouseObjs.length > 0) {
				eventObj.newMouseObjs = self.newMouseObjs;
				self.callEventClass("objmouseover",canvas,eventObj);
			}

			if(self.formerMouseObjs.length > 0) {
				eventObj.formerMouseObjs = self.formerMouseObjs;
				self.callEventClass("objmouseout",canvas,eventObj);
			}
		}

		//console.log(self.objMouseArr)

		self.callEventClass("mousemove",canvas,eventObj);

		//console.log(eventObj);
	}

	this.simCanvas.addEventListener("mousemove",function(e) {
		if(!self.filter) {
			self.mousemoveBridge(e);
		}
	});

	/*** Mouseup bridge ***/

	this.eventStack.objmouseup = [];

	this.mouseupBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
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

	this.simCanvas.addEventListener("mouseup",function(e) {
		if(!self.filter) {
			self.mouseupBridge(e);
		}
	});

	/*** Mouseout bridge ***/

	this.mouseoutBridge = function(e) {
		var eventObj = new PhSim.PhMouseEvent();
		var canvas = this.simCtx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
		eventObj.x =  e.clientX - rect.left;
		eventObj.y = e.clientY - rect.top;
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	this.simCanvas.addEventListener("mouseout",function(e) {
		if(!self.filter) {
			self.mouseoutBridge(e);
		}
	});

}

PhSim.DynSim.prototype.registerKeyEvents = function() {

	this.windowObj = this.windowObj || window;

	var self = this;

	this.keyElm = document.createElement("div");

	this.keydownBridge = function(e) {
		var eventObj = new PhSim.PhKeyEvent();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",self,eventObj);
	}

	this.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	this.windowObj.addEventListener("keydown",this.keydownBridgeWrapper);
}

PhSim.DynSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",this.keydownBridgeWrapper);
}