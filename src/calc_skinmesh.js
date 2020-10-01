/**
 * 
 * Calculate DynObject skinmesh
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.calc_skinmesh = function(dynObject) {

	/** Vector defining transformation */
	
	dynObject.transformVector = {
		x: (dynObject.matter.position.x - dynObject.matter.positionPrev.x),
		y: (dynObject.matter.position.y - dynObject.matter.positionPrev.y),
	}

	/** Number defining rotation */

	var transformAngle = dynObject.matter.angle - dynObject.matter.anglePrev 

	Matter.Vertices.translate(dynObject.skinmesh,Matter.Vertices.centre(dynObject.skinmesh),-1);
	Matter.Vertices.rotate(dynObject.skinmesh,transformAngle,{x: 0, y: 0});
	Matter.Vertices.translate(dynObject.skinmesh,dynObject.matter.position,1);

	dynObject.verts = dynObject.skinmesh;
	dynObject.object.verts = dynObject.skinmesh;

}