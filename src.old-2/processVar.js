/**
 * 
 * Process string by replacing magical words
 * 
 * @function processVar
 * @param {String} str 
 * @returns {String}
 * 
 */

PhSim.DynSim.prototype.processVar = function(str) {

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

	return str;

}