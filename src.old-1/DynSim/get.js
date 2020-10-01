/**
 * @function getUniversalObjArray
 */

var Get = {}

Get.getUniversalObjArray = function() {
	
	var array = []
	
	for(var i = 0; i < this.matterJSWorld.composites.length; i++) {
		
		var a = this.matterJSWorld.composites[i].bodies;

		for(var j = 0; j < a.length; j++) {
			array.push(a[j]);
		}

	}

	for(var i = 0; i < this.matterJSWorld.bodies.length; i++) {
		array.push(this.matterJSWorld.bodies[i]);
	}

	return array;

}

/**
 * Get a layer branch
 * @function L
 * @param {Number} L - Layer Index
 */

Get.L = function(L) {
	return this.dynTree[L];
}

/**
 * Get an object in some layer branch
 * @function LO
 * @param {Number} L - Layer Index 
 * @param {Number} O - Object Index
 */

Get.LO = function(L,O) {
	return this.dynTree[L][O];
}

/**
 * 
 * @param {String} str 
 */

Get.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}

export default Get;