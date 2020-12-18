Dynamic Objects are objects that can be affected by the laws of physics in a PhSim simulation.

Dynamic Objects are created using the {@link PhSim.DynObject} constructor.

Dynamic Objects are associated with a Matter.js body. The matter.js body is found in `PhSim.DynObject.prototype.matter`.

### Moving Dynamic Objects
Dynamic objects can undergo motion in several ways. First, they are affected by gravity. Second, there are functions in the {@link PhSim.Motion} namespace that can make objects move:

* {@link PhSim.Motion.applyForce} - Applies a force to an object.
* {@link PhSim.Motion.rotate} - Rotates an object
* {@link PhSim.Motion.setAngle} - Set angle
* {@link PhSim.Motion.setPosition} - Set position
* {@link PhSim.Motion.setVelocity} - Set the velocity of a dynamic object.
* {@link PhSim.Motion.translate} - Translate a dynamic Object

Dynamic Objects can be moved using widgets as well.