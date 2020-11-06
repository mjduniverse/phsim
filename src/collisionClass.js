/**
 * @constructor
 * @param {String} name - Collision class name 
 */

PhSim.CollisionClass = function(name) {

	var this_a = this;

	this.name = name;

	this.world = PhSim.Matter.World.create();

	this.engine = PhSim.Matter.Engine.create({
		world: this_a.world
	});

}

/**
 * 
 * Add dynamic object to collision class.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.CollisionClass.prototype.addDynObject = function(dynObject) {
	dynObject.collisionClasses.push(this);
	PhSim.Matter.World.add(this.world,dynObject.matter);
};

/**
 * 
 * Remove object from collision class.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {PhSim.DynObject} - The removed DynObject.
 */

PhSim.CollisionClass.prototype.removeDynObject = function(dynObject) {
	dynObject.collisionClasses.splice(dynObject.collisionClasses.indexOf(this),1);
	PhSim.Matter.World.remove(this.world,dynObject.matter);
	return dynObject
}