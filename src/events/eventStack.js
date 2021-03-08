/**
 * 
 * The event stack is an object that is used to store event listeners.
 * @constructor
 * @memberof PhSim
 * @enum {PhSimEventCall[]}
 * 
 */

const EventStack = function() {

	/** 
	 * 
	 * Array of functions to be executed whenever two or more objects contact each other
	 * This array represents {@link event:contact} 
	 * @type {PhSimEventCall[]}
	 * 
	*/

	this.contact = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation updates 
	 * This array represents {@link event:beforeupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeupdate = [];

	/** 
	 * 
	 * Array of functions to be exected when PhSim.updateDynObject is called 
	 * This array represents {@link event:objupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.objupdate = [];


	/** 
	 * 
	 * Array of functions to be executed after the simulation updates 
	 * This array represents {@link event:afterupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterupdate = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation is changed 
	 * This array represents {@link event:beforeslchange} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeslchange = [];

	/** 
	 * 
	 * Array of functions to be executed after the simulation is changed 
	 * This array represents {@link event:afterslchange} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterslchange = [];

	/** 
	 * 
	 * Array of functions to be executed before the Sprite Image Array loads 
	 * This array represents {@link event:beforespriteimgload} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforespriteimgload = [];

	/** Array of functions to be executed after the Sprite Image Array loads */

	this.afterspriteimgload = [];
	this.beforeforcekey = [];

	/** 
	 * Array of functions to be executed when mouse is let go while over simulation 
	 * canvas 
	 * 
	 * This array represents {@link event:mouseup} 
	 * 
	 */

	this.mouseup = [];

	/** 
	 * Array of functions to be executed when mouse leaves simulation canvas 
	 * 
	 * This array represents {@link event:mouseout} 
	 *
	 */

	this.mouseout = [];

	/** 
	 * Array of functions to be executed when the mouse moves
	 * This array represents {@link event:mousemove} 
	 * 
	 */

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

	/** Array of functions to be executed when the mouse is down on an object */

	this.objmousedown = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseover = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseout = [];

	/** Array of functions  */

	this.firstslupdate = [];

	/** Array of functions to be executed before the simulation exit */

	this.exit = []

	/** Array of functions to be executed when the canvas is clicked down on */

	this.mousedown = [];

	/** Array of functions to be executed when the canvas is clicked on */

	this.click = [];

	this.objclick = [];

	this.objmousemove = [];

	this.objmouseup = [];

	this.score = [];

	this.hazard = [];

	this.gamewin = [];

	this.levelwin = [];

	this.levelloss = [];

	/**
	 * Array of functions to be executed when an wFunction body makes an error.
	 */

	this.wfunctionerror = [];

	/**
	 * Array of functions to be executed after the canvas are cleared.
	 */

	this.aftercanvasclear = [];


}

module.exports = EventStack;