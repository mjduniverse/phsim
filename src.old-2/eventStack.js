PhSim.EventStack = function() {

	/** 
	 * 
	 * Array of functions to be executed whenever two or more objects contact each other 
	 * @type {PhSimEventCall[]}
	 * 
	*/

	this.contact = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation updates 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.beforeupdate = [];

	/** 
	 * 
	 * Array of functions to be exected when PhSim.DynSim.updateDynObject is called 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.objupdate = [];


	/** 
	 * 
	 * Array of functions to be executed after the simulation updates 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.afterupdate = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation is changed 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.beforeslchange = [];

	/** 
	 * 
	 * Array of functions to be executed after the simulation is changed 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.afterslchange = [];

	/** 
	 * 
	 * Array of functions to be executed before the Sprite Image Array loads 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 * */

	this.beforespriteimgload = [];

	/** Array of functions to be executed after the Sprite Image Array loads */

	this.afterspriteimgload = [];
	this.beforeforcekey = [];

	/** Array of functions to be executed when mouse is let go while over simulation canvas */

	this.mouseup = [];

	/** Array of functions to be executed when mouse leaves simulation canvas */

	this.mouseout = [];

	/** Array of functions to be executed when the mouse moves */

	this.mousemove = [];

	/** Array of functions to be executed when at least one key is pressed */

	this.keydown = [];

	/** Array of functions to be executed when a new collision is created */

	this.collisionstart = [];

	/** Array of functions to be executed during an active collision */

	this.collisionactive = [];

	/** Array of functions to be executed when a new collision is deleted */

	this.collisionend = [];

	this.beforecounterset = [];

	this.aftercounterset = [];

	this.collisionchange = [];

	this.load = [];

	this.matterJSLoad = [];

	/** Array of functions to be executed when an object is cloned */

	this.clone = [];

	this.objmousedown = [];

	this.objmouseover = [];

	this.objmouseout = [];

	/** Array of functions  */

	this.firstslupdate = [];

	/** Array of functions to be executed before the simulation exit */

	this.exit = []
}