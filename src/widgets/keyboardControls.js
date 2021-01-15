const PhSim = require("../index");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

/**
 * 
 * The `keyboardControls` widget is a widget that makes an object go at a certain velocity
 * if the arrow keys are pressed.
 * 
 * @function
 * @param {PhSim.DynObject} dynObj 
 * @param {Object} keyboardControls - Keyboard Controls options
 * 
 * @param {Number} keyboardControls.right - Velocity in the right direction if the right key is pressed.
 * @param {NUmber} keyboardControls.up - Velocity in the up direction if the up key is pressed.
 * @param {Number} keyboardControls.left - Velocity in the left direction if the left key is pressed.
 * @param {Number} keyboardControls.down - Velocity in the down direction if the down key is pressed.
 */

PhSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			Matter.Body.setVelocity(dynObj.matter, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			Matter.Body.setVelocity(dynObj.matter, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			Matter.Body.setVelocity(dynObj.matter, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.on("keydown",f,{
		"slEvent": true
	}); 
4
}

PhSim.Widgets.keyboardControls = function(dyn_object,widget) {
    this.addKeyboardControls(dyn_object,widget);
}