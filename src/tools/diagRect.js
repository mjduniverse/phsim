const Static = require("../objects");

/**
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2);
 * 
 * @function
 * @memberof PhSim
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2 
 * @returns {PhSim.Static.Rectangle} - Rectangle Object
 * 
 */

var diagRect = function(x1,y1,x2,y2) {

	var w = x2 - x1;
	var h = y2 - y1;

    return new Static.Rectangle(x1,y1,w,h);
    
 }

module.exports = diagRect;
