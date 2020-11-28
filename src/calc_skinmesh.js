/**
 * 
 * Calculate DynObject skinmesh
 * 
 * @function
 * @memberof PhSim
 * @param {PhSim.DynObject} dynObject 
 */

var calc_skinmesh = function(dynObject) {

	/** Vector defining transformation */
	
	dynObject.transformVector = {
		x: (dynObject.matter.position.x - dynObject.matter.positionPrev.x),
		y: (dynObject.matter.position.y - dynObject.matter.positionPrev.y),
	}

	/** Number defining rotation */

	var transformAngle = dynObject.matter.angle - dynObject.matter.anglePrev 

	PhSim.Matter.Vertices.translate(dynObject.skinmesh,PhSim.Matter.Vertices.centre(dynObject.skinmesh),-1);
	PhSim.Matter.Vertices.rotate(dynObject.skinmesh,transformAngle,{x: 0, y: 0});
	PhSim.Matter.Vertices.translate(dynObject.skinmesh,dynObject.matter.position,1);

	dynObject.verts = dynObject.skinmesh;
	dynObject.verts = dynObject.skinmesh;

}

module.exports = calc_skinmesh;