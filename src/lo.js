PhSim.prototype.L = function(L) {
	return this.dynTree[L][O];
}

PhSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

PhSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}