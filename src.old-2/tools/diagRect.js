/*** 
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2)
 * 
 * ***/

PhSim.Tools.diagRect = function(x1,y1,x2,y2,a) {

	var v = {
		"x": x2 - x1,
		"y": y2 - y1
	}

	v = {
		"x": v.x * Math.cos(-a) - v.y * Math.sin(-a),
		"y": v.x * Math.sin(-a) + v.y * Math.cos(-a)
	}

	v = {
		"x": v.x + x1,
		"y": v.y + y1
	}

	x2 = v.x;
	y2 = v.y;

    return new PhSim.Objects.Rectangle(x2-x1,y2-y1,x1,y1);
    
 }
