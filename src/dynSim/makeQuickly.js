
/**
 * @function
 * @param {Object} sim 
 * @param {HTMLCanvasElement} canvas
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.createFromCanvas = function(sim,canvas) {
	var p = new PhSim.DynSim(sim);
	p.simCanvas = canvas;
	p.simCtx = canvas.getContext("2d");
	p.simCanvas.width = p.sim.box.width;
	p.simCanvas.height = p.sim.box.height;
	p.registerCanvasEvents();
	p.configRender(p.simCtx);
	return p;
}

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLElement} simContainer 
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.createFromContainer = function(sim,simContainer) {
	
	// Canvas

	var canvas = document.createElement("canvas");

	// Simulation object

	var p = PhSim.DynSim.createFromCanvas(sim,canvas);

	p.simContainer = simContainer;

	simContainer.appendChild(p.simCanvas);
	simContainer.classList.add("phsim-container");

	p.configFilter(simContainer);
	
	return p;
}

/**
 * @function
 * @param {*} sim 
 * @memberof PhSim.DymSim 
 */

PhSim.DynSim.createContainer = function(sim) {
	var container = document.createElement("div");
	return this.createFromContainer(sim,container);
}

/**
 * @function
 * @param {String} jsonURL - URL For JSON File
 * @param {function} onload - Onload function
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.loadFromJSON = function(jsonURL,onload) {

	var x = new XMLHttpRequest();
	x.open("GET",jsonURL);

	x.addEventListener("load",function(){
		var o = PhSim.DynSim.createContainer(JSON.parse(x.responseText));
		onload(o);
	})

	x.send();

}

/**
 * @function
 * @memberof PhSim.DynSim 
 */

PhSim.DynSim.prototype.configRender = function() {
	
	this.assignPhRender(new PhSim.PhRender(this.simCtx));
	
	if(!this.noCamera) {
		this.camera = new PhSim.DynSimCamera(this);
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

}