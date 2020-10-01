var Gradients = {}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx - Context
 * @param {PhSim.Objects.Gradient} o - Gradient Configuration
 */

Gradients.extractGradient = function(ctx,o) {

	var gradient = ctx.createLinearGradient(o.limits.start.x,o.limits.start.y,o.limits.end.x,o.limits.end.y);

	for(var i = 0; i < o.stops.length; i++) {
		gradient.addColorStop(o.stops[i].pos,o.stops[i].color);
	}
	
	return gradient;

}

export default Gradients;