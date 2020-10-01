export function extractLclGame(localSettings) {

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
