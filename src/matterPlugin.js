const PhSim = require("./phSim");

/**
 * Reference to patched matter.js library.
 * @namespace
 * @memberof PhSim
 * @see {@link https://brm.io/matter-js/docs/}
 * 
 */

PhSim.Matter = {};

/**
 * Object that registers PhSim as a Matter.js plugin.
 * The modified matter.js object is stored in {@link PhSim.Matter}
 * @namespace
 * 
 */

PhSim.matterPlugin = {

    name: "phsim",

    version: "0.1.0",

    /**
     * Installation function for plugin
     * @param {Matter} matter 
     */

    install: function(matter) {
        PhSim.Matter = matter;

        matter.after('Detector.collisions',function(){
            PhSim.matterPlugin.Detector.collisions.call(this,arguments);
        });

    },

    /**
     * Matter namespace for matter.js bodies.
     * @namespace
     */

    Body: {

        create: function(options) {

        } 

    },

    /**
     * Detector patch for Matter.js.
     * 
     * 
     */

    Detector: {

        /**
         * Matter.Detector.collisions patch for Matter.js.
         * This modifies the function for checking collisions in Matter.js.
         * @function 
         */

        collisions: function() {

            for(var i = 0; i < this.length; i++) {

                var c_classesA = PhSim.Query.getCollisionClasses(this[i].bodyA.plugin.ph);
                var c_classesB = PhSim.Query.getCollisionClasses(this[i].bodyB.plugin.ph);

                if(c_classesA.length > 0 && c_classesB.length > 0) {
                    if(!PhSim.Query.intersectionExists(c_classesA,c_classesB)) {

                        this.splice(this.indexOf(this[i]),1);

                        // Reset index to zero to make sure all collisions
                        // that have no collision classes in common get removed

                        i = 0;
                    }
                }

            }

        }
    }

}

// Register Plugin

Matter.Plugin.register(PhSim.matterPlugin);
Matter.use(PhSim.matterPlugin);