const PhSim = require("..");

/**
 * Play simulation
 * 
 * @function
 * @memberof PhSim
 * @this PhSim
 * @returns {Promise} - A promise that is fulfilled if the playing the simulation is sucessful. 
 * If resolved, the promise is fullfilled with the `PhSim` instance as its value.
 */

PhSim.prototype.play = function() {

	var self = this;

	return new Promise(function(resolve){
		self.paused = false;
		self.intervalLoop = setInterval(self.loopFunction.bind(self),self.delta);
		resolve(self);
	});
}

/**
 * Pause simulation
 * @function
 * @returns {Promise} - A promise that is fulfilled if the pausing the simulation is sucessful. 
 * If resolved, the promise is fullfilled with the `PhSim` instance as its value.
 */

PhSim.prototype.pause = function() {

	var self = this;

	return new Promise(function(resolve){
		clearInterval(self.intervalLoop);
		self.paused = true;
		resolve(self);
	});

}

/**
 * Toggle Simulation
 * 
 * @function
 * @returns {Promise}
 */

PhSim.prototype.toggle = function() {

	var self = this;

	return new Promise(function(resolve,reject){

		if(self.paused) {

			self.play().then(function(phsim){
				resolve(phsim);
			}).catch(function(e){
				reject(e);
			});

		}

		else {

			self.pause().then(function(phsim){
				resolve(phsim)
			}).catch(function(e){
				reject(e)
			});

		}
	});


}

/**
 * Exit simulation
 * @function
 */

PhSim.prototype.exitSl = function() {

	var self = this;

	return new Promise(function(resolve){
		self.callEventClass("beforeslchange",self,new PhSim.Events.PhSimEvent("beforeslchange"));
		self.paused = false;
		clearInterval(self.intervalLoop);
		resolve(self);
	});

}

/**
 * 
 * Completely reset PhSim object. That is, make it as if it is a new one.
 * @function
 * @returns {Promise}
 */

PhSim.prototype.exit = function() {

	var self = this;

	return new Promise(function(resolve){

		// Remove references to avoid memory leak

		delete self.camera.dynSim
		delete self.phRender.dynSim

		for(var i = 0; i < self.objUniverse.length; i++) {
			delete self.objUniverse[i].phSim;
		}

		self.callEventClass("exit",self,new PhSim.Events.PhSimEvent("exit"));
		self.deregisterCanvasEvents();
		self.deregisterKeyEvents();
		self.exitSl();

		// Erase all things

		Object.assign(self,new PhSim());

		resolve(self);

	});

}