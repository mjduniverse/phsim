/**
 * Object containing variables that can be read by widgets such as
 * the {@link|RectText} widget. 
 */

PhSim.prototype.vars = {}

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
	
	if(str.search("{__game__score}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__score}/g,this.lclGame.score);
	}

	if(str.search("{__game__life}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__life}/g,this.lclGame.life);
	}

	if(str.search("{__game__goal}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__goal}/g,this.lclGame.goal);
	}

	if(str.search("{__game__int_life}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__int_life}/g,this.lclGame.intLife);
	}

	if(str.search("{__game__int_score}") !== -1 && this.lclGame) {
		str = str.replace(/{__game__int_score}/g,this.lclGame.intScore);
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