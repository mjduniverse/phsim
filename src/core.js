/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} [dynSimOptions] - The simulation object
 * @mixes PhSim.PhSimEventTarget
 * 
 */

export default function PhSim(dynSimOptions) {

    PhSim.Static.call(this);

    if(typeof dynSimOptions === "object") {
        Object.assign(this,dynSimOptions);
    }

    if(Array.isArray(dynSimOptions.simulations)) {
        this.simulations = dynSimOptions.simulations;
    }

    else if(Array.isArray(dynSimOptions.layers)) {
        this.simulations[0] = dynSimOptions;
    }

    else if(Array.isArray(dynSimOptions.objUniverse)) {
        this.simulations[0].layers[0] = dynSimOptions;
    }

    else if(Array.isArray(dynSimOptions)) {
        this.simulations[0].layers[0].objUniverse = [];
    }

    if(typeof dynSimOptions.wFunctions === "object") {
        this.wFunctions = dynSimOptions.wFunctions
    }

    // Register Plugin
    
    if(!dynSimOptions.noUse) {
        Matter.use(PhSim.matterPlugin);
    }

    /**
     * The static simulation object
     * @typedef {DynSimOptions}
     */

    this.options = dynSimOptions;

    /**
     * Debugging Configuration
     * @type {Object}
     */

    this.debugging = this.debugging || {
        logMouseMovePerformance: true
    }

    /**
     * Debugging data
     * @type {Object}
     */
    
    this.debuggingData = {}

    // Configure canvas

    if(dynSimOptions.canvas) {
        this.connectCanvas(dynSimOptions.canvas)
    }

    else {
        var newCanvas = document.createElement("canvas");
        this.connectCanvas(newCanvas);
    }

    // Configure container

    if(dynSimOptions.container) {
        this.connectContainer(dynSimOptions.container);
    }

    else {
        var newContainer = document.createElement("div");
        this.connectContainer(newContainer);
    }

    // Register event keys

    this.registerKeyEvents();

    // Inital Simulation

    if(dynSimOptions.initSimIndex) {
        this.gotoSimulationIndex(dynSimOptions.initSimIndex);
    }

    else {
        this.gotoSimulationIndex(0);
    }

}