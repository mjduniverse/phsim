/**
 * Structure giving more human-readable meaning to PhSim status.
 * @type {String[]}
 */

export var statusStruct = {
	0: "Unloaded",
	1: "Initalized",
	2: "Loaded Images",
	3: "Loaded Audio",
	4: "Loaded Simulation"
}

export var getStatusStr = function() {
	return PhSim.DynSim.statusStruct[this.status];
}