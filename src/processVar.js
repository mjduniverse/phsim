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

	/**
	 * The `__game__score` magical word returns the game score if the game widget is enabled.
	 * @function
	 * @returns {Number} - Game score.
	 */

	__game__score: function() {
		return this.lclGame && this.lclGame.score;
	},

	/**
	 * The `__game__life` magical word returns the live count of the player if the 
	 * game widget is enabled.
	 * 
	 * @function
	 * @returns {Number} - Life count
	 */

	__game__life: function() {
		return this.lclGame && this.lclGame.life; 
	},

	/**
	 * The `__game__goal` magical word returns the goal of the game if the game widget
	 * is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__goal: function() {
		return this.lclGame && this.lclGame.goal;
	},

	/**
	 * The `__game__int_life` magical word returns the intial life count of the game,
	 * given the game widget is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__int_life: function() {
		return this.lclGame && this.lclGame.intLife;
	},

	/**
	 * The `__game__int_score` magical word returns the inital game score given the 
	 * game widget is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__int_score: function() {
		return this.lclGame && this.lclGame.intScore;
	}

}

/**
 * 
 * Adds a global magical word function.
 * 
 * @function
 * @param {String} name - Name of magical word
 * @param {Function} call 
 */

PhSim.addGlobalMagicalWord = function(name,call) {
	
	if(PhSim.MagicWords[name]) {
		throw "Magical word " + name + " already exists."
	}

	else {
		PhSim.MagicWords[name] = call;
	}

}

/**
 * 
 * Adds a local magical word function.
 * 
 * @function
 * @param {String} name - Name of magical word
 * @param {Function} call 
 */

PhSim.prototype.addLocalMagicalWord = function(name,call) {

	if(this.magicWords[name]) {
		throw "Magical word " + name + " already exists."
	}

	else {
		this.magicWords[name] = call;
	}

}

/**
 * 
 * Process string by replacing magical words and the values of elements in
 * {@link PhSim#vars|PhSim.prototype.vars}.
 * 
 * Some of the magic words are the following:
 * 
 * `{__game__score}` - The game score
 * `{__game__life}` -  The game life
 * `{__game__goal}` - The game goal
 * `{__game__int_life}` - The inital life value for the game
 * 
 * The expression `${key}` is replaced by the value of `{@link PhSim#vars |PhSim.prototype.vars[key]}`.
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