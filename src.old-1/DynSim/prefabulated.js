export function createFromCanvas(sim,canvas) {
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
 * 
 * @param {Object} sim 
 * @param {Node} simContainer 
 * 
 */

export function createFromContainer(sim,simContainer) {
	
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

export function createContainer(sim) {
	var container = document.createElement("div");
	return this.createFromContainer(sim,container);
}

/**
 * @function loadFromJSON
 * @param {String} jsonURL - URL For JSON File
 * @param {function} onload - Onload function
 * 
 */

export function loadFromJSON(jsonURL,onload) {

	var x = new XMLHttpRequest();
	x.open("GET",jsonURL);

	x.addEventListener("load",function(){
		var o = PhSim.DynSim.createContainer(JSON.parse(x.responseText));
		onload(o);
	})

	x.send();

}