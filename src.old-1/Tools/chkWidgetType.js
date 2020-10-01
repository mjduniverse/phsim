
export default function chkWidgetType(widget) {

	var widgetKeys = Object.keys(PhSim.Widgets);

	for(var i = 0; i < widgetKeys.length; i++) {

		var sa1 = widgetKeys[i].split("");
		sa1[0] = sa1[0].toLowerCase();
		var sa2 = sa1.join("");

		if(widget[sa2]) {
			return sa2;
		}
	}

	return "unknown_widget";

}