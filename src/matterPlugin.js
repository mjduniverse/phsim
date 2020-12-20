const DynObject = require("./dynObject");
const PhSim = require("./phSim");

/**
 * Object that registers PhSim as a Matter.js plugin.
 * The modified matter.js object is stored in {@link Matter}
 * @namespace
 * 
 */

const matterPlugin = {

    name: "phsim",

    version: "0.1.0",

    /**
     * Installation function for plugin
     * @param {Matter} matter 
     */

    install: function(matter) {

        matter.after('Detector.collisions',function(){
            matterPlugin.Detector.collisions.call(this,arguments);
        });

        //matter.after('Body.create',function(options){
          //  matterPlugin.Body.init(options)
        //});

    },

    /**
     * Matter namespace for matter.js bodies.
     * @namespace
     */

    Body: {

        /**
         *  
         * @param {Object} body 
         */

        init: function(options) {
            if(options.plugin && options.plugin.dynObject) {

            }
        }

    },

    Bodies: {

        circle: function(x, y, radius, options) {
            
        },

        rectangle: function() {

        },

        fromVertices: function() {

        },

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

                var bodyA = this[i].bodyA;
                var bodyB = this[i].bodyB;

                if(bodyA.parent === bodyA) {
                    if(bodyA.plugin.dynObject instanceof DynObject) {
                        var c_classesA = PhSim.Query.getCollisionClasses(bodyA.plugin.dynObject);
                    }
                }
                
                else {
                    var c_classesA = PhSim.Query.getCollisionClasses(bodyA.parent.plugin.dynObject);
                }

                if(bodyB.parent === bodyB) {
                    if(bodyB.plugin.dynObject instanceof DynObject) {
                        var c_classesB = PhSim.Query.getCollisionClasses(bodyB.plugin.dynObject);
                    }    
                }

                else {
                    var c_classesB = PhSim.Query.getCollisionClasses(bodyB.parent.plugin.dynObject);                    
                }

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

PhSim.matterPlugin = matterPlugin;

Matter.Plugin.register(PhSim.matterPlugin); 