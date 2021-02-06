/**
 * Widget Object
 * @param {Object} options 
 */

const Widget = function(options) {
	Object.assign(this,options);
}

/**
 * Function for enabling widget
 * @type {Function}
 */

Widget.enable = function() {

}

/**
 * Function for disabling widget
 * @type {Function}
 */

Widget.disable = function() {

}

/**
 * Function for destroying widget
 * @type 
 */


Widget.destroy = function() {
	 
}

/**
 * 
 * @param {PhSimObject} o 
 */

Widget.defineByBoolean = function(o) {

	Object.keys(Widgets).forEach(function(p){
		if(o[p]) {
			o.type = p;
		}
	})

	
}

Widget.WidgetOptions = function(type) {
	this.type = type;
}

module.exports = Widget;