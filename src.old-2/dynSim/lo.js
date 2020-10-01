PhSim.DynSim.prototype.L = function(L) {
	return this.matterJSEngine.world.composites[L];
}

PhSim.DynSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

PhSim.DynSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}