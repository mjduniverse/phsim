/**
 * @namespace
 * @memberof PhSim
 */

var ObjLoops = {}

/**
 * Execute function on all members of a PhSim simulation or PhSim options.
 * @param {PhSim|PhSimOptions} sim 
 * @param {Function} method 
 */

ObjLoops.global = function(sim,method) {

    if(sim instanceof PhSim) {
        for(var i = 0; i < sim.objUniverse.length; i++) {
            method(sim.objUniverse[i]);
        }
    }

    else {

        for(var i = 0; i < sim.simulations.length; i++) {
            for(var j = 0; j < sim.simulations[i].layers.length; j++) {
                for(var k = 0; k < sim.simulations[i].layers[j].objUniverse.length; k++) {
                    method(sim.simulations[i].layers[j].objUniverse[k]);
                }
            }
        }

    }

}

/**
 * Execute function on all members of a simulation object.
 * @param {*} simulation 
 * @param {*} method 
 */

ObjLoops.simulation = function(simulation,method) {
    for(var j = 0; j < simulation.layers.length; j++) {
        for(k = 0; k < simulation.layers[j].objUniverse.length; k++) {
            method(simulation.layers[j].objUniverse[k]);
        }
    }
}

/**
 * Execute function on all members of an 
 */

ObjLoops.layer = function(layer,method) {
    for(k = 0; k < layer.objUniverse.length; k++) {
        method(layer.objUniverse[k]);
    }
}

module.exports = ObjLoops;