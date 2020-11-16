/**
 * @function
 * @param {Number} L 
 */

PhSim.prototype.L = function(L) {
	return this.dynTree[L];
}

/**
 * @function
 * @param {*} L 
 * @param {*} O 
 */

PhSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

/**
 * A Layer-Object string (LOStr) is a string specifying the layer and object indexes
 * of an object in the DynTree.'
 * 
 * The form of the LOStr is:
 * <layer_index>,<object_index>
 * 
 * @typedef {String} LOStr
 */

/**
 * @function
 * @param {LOStr} str 
 */

PhSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}