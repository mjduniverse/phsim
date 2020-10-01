/**
 * 
 * @function applyGravitationalField
 * Apply newtonian gravitational field
 * 
 */

export function applyGravitationalField() {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		for(var j = 0; j < a.length; j++) {
			if(i !== j && !a[i].matter.isStatic && !a[j].matter.isStatic) {
				var a1 = PhSim.Tools.scaleVector(PhSim.Tools.subtractVectors(a[j].matter.position,a[i].matter.position),6.67 * Math.pow(10,-11) * a[i].matter.mass * a[j].matter.mass * -1)
				var b1 = Math.pow(PhSim.Tools.calcVertDistance(a[j].matter.position,a[i].matter.position),3);
				var c = PhSim.Tools.divideVector(a1,b1);
				this.applyForce(a[j],a[i].matter.position,c);
			}
		}	
	}

}