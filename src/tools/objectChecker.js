/**
 * Possible Object Structure
 */

PhSim.objectTypes = {
	path: true,
	circle: true,
	regularPolygon: true,
	rectangle: true
}

/*** Structure defining possible object types ***/

/**
 * Check object type
 * 
 * @function
 * @param {String} objectTypeStr
 * @returns {Boolean} 
 * 
 */

PhSim.checkObjectType = function (objectTypeStr) {
	if(objectTypes[objectTypeStr])
		return false;
	else {
		return true;
	}
}