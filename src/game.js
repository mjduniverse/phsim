/**
 * 
 * PhSim game constructor.
 * 
 * @constructor
 * @param {PhSim} phSim 
 * @param {PhSim.Game.Options} options 
 */

PhSim.Game = function(phSim,options) {

	/**
     * Inital Life
	 * @type {Number}
	 */

	this.intLife = options.life;

	/**
     * Game goal
	 * @type {Number}
	 */

	this.goal = options.goal;

	/**
     * Inital Score
	 * @type {Number}
	 */
	
	this.intScore = options.score;

	/**
     * 
     * Options passed into the constructor
	 * @type {Number}
	 */

	this.options = options;

	/**
     * Life
	 * @type {Number}
     * 
	 */

	this.life = options.life;

	/**
     * Score
	 * @type {Number}
	 */

	this.score = options.score;

	/**
     * Reference to the parent PhSim simulation
	 * @type {PhSim}
	 */

	this.phSim = phSim;

	// Adding arrays to phSim eventstack

	phSim.eventStack["score"] = [];

	phSim.eventStack["hazard"] = [];

	phSim.eventStack["gamewin"] = [];

	phSim.eventStack["levelwin"] = [];

	phSim.eventStack["levelloss"] = [];

}

/**
 * Game Options
 * @constructor
 * @param {Number} goal 
 * @param {Number} life 
 * @param {Number} score 
 */

PhSim.Game.Options = function(goal,life,score) {

	/**
     * Game Goal
	 * @type {Number}
	 */

	this.goal = goal;

	/**
     * Game goal
	 * @type {Number}
	 */

	this.life = life;

	/**
     * Game score
	 * @type {Number}
     * 
	 */

	this.score = score;
}

PhSim.Game.prototype.defaultGameWinModal = true;
PhSim.Game.prototype.defaultLevelWinModal = true;

/**
 * Set score
 * @function
 * @param {Number} c - Score
 */

PhSim.Game.prototype.setScore = function(c) {

    var self = this;

	this.score = c;

	if(this.score >= this.goal && Number.isInteger(this.score) && Number.isInteger(this.goal)) {
	
		this.phSim.pause();
		this.phSim.enableFilter();

		// Code to execute 

		if(this.phSim.simulationIndex + 1 === this.phSim.options.simulations.length) {

			if(this.defaultGameWinModal) {

                this.phSim.callEventClass("gamewin",this,{});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

				var a = self.phSim.alert({
					msg:"You Win!",
					closeButtonTxt:"Play again",
					bgColor:"#333",
					txtColor:"#fff",
					w:300,
					h:100,
					onok: function() {
						self.phSim.disableFilter();
						a.parentNode.removeChild(a);
						self.phSim.gotoSimulationIndex(0);
						self.phSim.play();
					}
				});

			}

		}

		// If not the final simulation

		else {

			this.phSim.callEventClass("levelwin",this,{}); 

			clearInterval(this.phSim.intervalLoop);
			this.phSim.disableFilter();
			this.phSim.gotoSimulationIndex(this.phSim.simulationIndex + 1);
			self.phSim.play();
		}


	}

	this.phSim.callEventClass("score",this,{}); 
},

/**
 * Set life
 * @function
 * @param {Number} c - Life value
 */

PhSim.Game.prototype.setLife = function(c) {
	this.life = c;

	if(this.life === 0) {
		this.end();
	}
}

/**
 * Increment life (add 1 to the current life)
 * @function
 */

PhSim.Game.prototype.incrementLife = function() {
	this.setLife(this.life + 1);
}

/**
 * Decrement life (subtract 1 from life)
 * @function
 */

PhSim.Game.prototype.decrementLife = function() {
	this.setLife(this.life - 1);
}

/**
 * End game
 * @function
 */

PhSim.Game.prototype.end = function() {

	this.phSim.pause();
	this.phSim.enableFilter();

	var self = this;


	var a = this.phSim.alert({
		msg:"Game Over",
		closeButtonTxt:"Try again",
		bgColor:"#333",
		txtColor:"#fff",
		w:300,
		h:100,
		onok: function() {
			self.phSim.gotoSimulationIndex(self.phSim.simulationIndex);
			self.phSim.play();
			self.phSim.disableFilter();
			a.parentNode.removeChild(a);	
		}
	});

	this.phSim.callEventClass("levelloss",this,{}); 

}