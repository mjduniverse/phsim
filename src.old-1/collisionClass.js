var CollisionClass = function(name) {

	var this_a = this;

	this.name = name;

	this.world = Matter.World.create();

	this.engine = Matter.Engine.create({
		world: this_a.world
	});

}

CollisionClass.prototype.addDynObject = function(dynObject) {
	return Matter.World.add(this.world,dynObject.matter);
};

export default CollisionClass;