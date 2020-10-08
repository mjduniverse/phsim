/**
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2)
 * 
 */

PhSim.Tools.diagRect = function(x1,y1,x2,y2) {

	var w = x2 - x1;
	var h = y2 - y1;

    return new PhSim.Objects.Rectangle(x1,y1,w,h);
    
 }
