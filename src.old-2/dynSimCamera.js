

// Simulation Camera

PhSim.DynSimCamera = function(dynSim) {

	/**
	 * Dynamic Simulation
	 * @type {PhSim.DynSim}
	 */

	this.dynSim = dynSim;

}

PhSim.DynSimCamera.prototype.scale = 1;
PhSim.DynSimCamera.prototype.x = 0;
PhSim.DynSimCamera.prototype.y = 0;
PhSim.DynSimCamera.prototype.targetObj = null;
PhSim.DynSimCamera.prototype.transformingObjects = []

PhSim.DynSimCamera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.simCtx.scale(scaleFactor,scaleFactor);
}

PhSim.DynSimCamera.prototype.translate = function(dx,dy) {
	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.simCtx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		this.dynSim.translate(this.transformingObjects[i],dx,dy);
	}
}

PhSim.DynSimCamera.prototype.setPosition = function(x,y) {
	this.dynSim.simCtx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}


PhSim.DynSim.prototype.loading = {
	"bgClr": "black",
	"txtClr": "White",
	"txtFace": "arial",
	"txtAlign": "center",
	"txt": "Loading...",
	"yPos": "center",
	"txtSize": 20
}

PhSim.DynSim.prototype.drawLoadingScreen = function() {
	this.simCtx.fillStyle = this.loading.bgClr;
	this.simCtx.fillRect(0,0,this.camera.scale,this.simCanvas.height);
	this.simCtx.fillStyle = this.loading.txtClr;
	this.simCtx.textAlign = this.loading.txtAlign;
	this.simCtx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.simCtx.fillText(this.loading.txt,this.simCanvas.width / 2,this.simCanvas.height / 2)
}

PhSim.DynSim.prototype.extractLclGame = function(localSettings) {

	var self = this;

	var o = {
		intLife: localSettings.life,
		goal: localSettings.goal,
		intScore: localSettings.score,
		static: localSettings,
		life: localSettings.life,
		score: localSettings.score,

		setScore: function(c) {

			o.score = c;

			if(o.score >= o.goal && Number.isInteger(o.score) && Number.isInteger(o.goal)) {
			
				self.pause();
				self.enableFilter();

				if(self.simulationIndex + 1 === self.sim.simulations.length) {
					var a = self.alert({
						msg:"You Win!",
						closeButtonTxt:"Play again",
						bgColor:"#333",
						txtColor:"#fff",
						w:300,
						h:100,
						onok: function() {
							self.disableFilter();
							a.parentNode.removeChild(a);
							self.gotoSimulationIndex(0);
						}
					});
				}

				else {
					clearInterval(self.intervalLoop);
					self.disableFilter();
					self.gotoSimulationIndex(self.simulationIndex + 1);
				}


			}
		},

		setLife: function(c) {
			o.life = c;

			if(o.life === 0) {
				o.end();
			}

		},

		incrementLife: function() {
			o.setLife(o.life + 1);
		},

		decrementLife: function() {
			o.setLife(o.life - 1);
		},

		end: function() {

			self.pause();
			self.enableFilter();


			var a = self.alert({
				msg:"Game Over",
				closeButtonTxt:"Try again",
				bgColor:"#333",
				txtColor:"#fff",
				w:300,
				h:100,
				onok: function() {
					self.gotoSimulationIndex(self.simulationIndex);
					self.disableFilter();
					a.parentNode.removeChild(a);	
				}
			});

		}

	}

	return o;

}