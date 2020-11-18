/**
 * Config filter
 * @param {HTMLElement} container 
 */

PhSim.prototype.configFilter = function(container) {
	this.htmlFilter = document.createElement("div");
	this.htmlFilter.style.background = "rgba(3,3,3,0.7)";
	this.htmlFilter.style.position = "absolute";
	this.htmlFilter.style.display = "none";
	this.htmlFilter.classList.add("dynsim-filter");
	container.appendChild(this.htmlFilter);
}

/**
 * Enable filter
 * @function
 */

PhSim.prototype.enableFilter = function() {
	var elmBox = this.simCanvas.getBoundingClientRect();
	this.htmlFilter.style.display = "inline-block";
	this.htmlFilter.style.left = "0px";
	this.htmlFilter.style.position = "absolute";
	//this.htmlFilter.style.top = elmBox.top + "px";
	this.htmlFilter.style.width = Math.floor(elmBox.width) + "px";
	this.htmlFilter.style.height = Math.floor(elmBox.height) + "px";
}

/**
 * Disable filter
 * @function
 */

PhSim.prototype.disableFilter = function() {
	this.htmlFilter.style.display = "none";
}

/**
 * Toggle filter
 * @function
 */

PhSim.prototype.toggleFilter = function() {

	if(this.htmlFilter.style.display === "none") {
		this.enableFilter();
	}

	else {
		this.disableFilter();
	}
}

/**
 * @function
 * @param {Object} options - Options
 * @param {String} options.msg - The message
 * @param {String} options.closeButtonTxt - Inner text for closing button
 * @param {String} options.bgColor - Background Color
 * @param {String} options.txtColor - Text Color
 * @param {Number} options.w - Width
 * @param {Number} options.h - Height
 * @param {Function} options.onok - Function to call when alert is closed
 *  
 */

PhSim.prototype.alert = function(options) {
	
	var alertBox = document.createElement("div");
	alertBox.style.backgroundColor = options.bgColor;
	alertBox.style.color = options.txtColor;
	alertBox.style.textAlign = "center";
	alertBox.style.width = options.w + "px";
	alertBox.style.height = options.h + "px";
	alertBox.style.fontSize = "20px";

	var rect = alertBox.getBoundingClientRect();

	var elmBox = this.simCanvas.getBoundingClientRect();

	var alertBoxMsg = document.createElement("div");
	alertBoxMsg.className = "phsim-alertbox-msg"
	alertBoxMsg.innerText = options.msg;
	alertBoxMsg.style.textAlign = "left";
	alertBoxMsg.style.padding = "20px";

	alertBox.appendChild(alertBoxMsg);

	var closeButton = document.createElement("div");
	closeButton.addEventListener("click",options.onok);
	closeButton.innerText = options.closeButtonTxt;
	alertBox.appendChild(closeButton);

	this.simContainer.appendChild(alertBox);

	alertBox.style.position = "absolute";
	alertBox.style.left = (elmBox.width * 0.5 - alertBox.offsetWidth * 0.5) + "px";
	alertBox.style.top = (elmBox.height * 0.5 - alertBox.offsetHeight * 0.5) + "px";

	return alertBox;

}