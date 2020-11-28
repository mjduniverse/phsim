const PhSim = require("./phSim");

/**
 * Object containing variables that can be read by widgets such as
 * the {@link|RectText} widget. 
 */

PhSim.prototype.vars = {}

/**
 * Object containing magic words
 */

PhSim.prototype.magicWords = {}

PhSim.MagicWords = {

	__test1: function() {
		return "4";
	},

	__game__score: function() {
		return this.lclGame && this.lclGame.score;
	},

	__game__life: function() {
		return this.lclGame && this.lclGame.life; 
	},

	__game__goal: function() {
		return this.lclGame && this.lclGame.goal;
	},

	__game__int_life: function() {
		return this.lclGame && this.lclGame.intLife;
	},

	__game__int_score: function() {
		return this.lclGame && this.lclGame.intScore;
	}

}

/**
 * 
 * Process string by replacing magical words and the values of elements in
 * [PhSim.prototype.vars]{@link|PhSim#vars}.
 * 
 * Some of the magic words are the following:
 * 
 * {__game__score} - The game score
 * {__game__life} -  The game life
 * {__game__goal} - The game goal
 * {__game__int_life} - The inital life value for the game
 * 
 * The expression ${key} is replaced by the value of PhSim.prototype.vars[key].
 * 
 * @function
 * @param {String} str 
 * @returns {String}
 * 
 */

PhSim.prototype.processVar = function(str) {

	var str = str;

	var magicWordKeys = Object.keys(PhSim.MagicWords);

	for(var i = 0; i < magicWordKeys.length; i++) {

		var magicWord = magicWordKeys[i];
		var mgkWordRegex = new RegExp("{" + magicWord + "}","g");

		if(str.search(mgkWordRegex) !== -1) {

			str = str.replace(mgkWordRegex,PhSim.MagicWords[magicWord].call(this));
		}

	}

	var a = Object.keys(this.vars);

	for(var i = 0; i < a.length; i++) {

		var v = "\\$\\{" + a[i] + "\\}";
		var regex = new RegExp(v,"g");
		var s = str.search(regex);

		if(s !== -1) {
			str = str.replace(regex,this.vars[ a[i] ]);
		}
	}

	return str;

}