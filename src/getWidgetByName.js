/**
 * Get widget by name
 * @memberof PhSim
 * @param {String} nameStr 
 */

function getWidgetByName(nameStr) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		this.objUniverse[i].getWidgetByName(nameStr);
	}
}

module.exports = getWidgetByName;