/**
 * @constructor
 * @param {String} name - Collision class name 
 */

PhSim.CollisionClass = function(name) {

	var this_a = this;

	this.name = name;

	this.world = Matter.World.create();

	this.engine = Matter.Engine.create({
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
	Matter.World.add(this.world,dynObject.matter);
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
	Matter.World.remove(this.world,dynObject.matter);
	return dynObject
}