const PhSim = require(".");

/**
 * @namespace
 * @memberof PhSim
 */

const ObjLoops = {}

/**
 * Execute function on all members of a PhSim simulation or PhSim options.
 * @function
 * @param {PhSim|PhSimOptions} sim 
 * @param {Function} method 
 */

ObjLoops.global = function(sim,method) {

    if(sim instanceof PhSim) {
        for(let i = 0; i < sim.objUniverse.length; i++) {
            method(sim.objUniverse[i]);
        }
    }

    else {

        for(let i = 0; i < sim.simulations.length; i++) {
            for(let j = 0; j < sim.simulations[i].layers.length; j++) {
                for(let k = 0; k < sim.simulations[i].layers[j].objUniverse.length; k++) {
                    method(sim.simulations[i].layers[j].objUniverse[k]);
                }
            }
        }

    }

}

/**
 * Execute function on all members of a simulation object.
 * @function
 * @param {Object} simulation 
 * @param {Function} method 
 */

ObjLoops.simulation = function(simulation,method) {
    for(let j = 0; j < simulation.layers.length; j++) {
        for(let k = 0; k < simulation.layers[j].objUniverse.length; k++) {
            method(simulation.layers[j].objUniverse[k]);
        }
    }
}

/**
 * Execute function on all members of an layer
 * @function
 * @param {Object} layer
 * @param {Function} method
 */

ObjLoops.layer = function(layer,method) {
    for(let k = 0; k < layer.objUniverse.length; k++) {
        method(layer.objUniverse[k]);
    }
}

module.exports = ObjLoops;