const DynObject = require("./dynObject");
const PhSim = require(".");

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = require("matter-js");
}

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
                var c_classesA;
                var c_classesB;

                if( (bodyA.parent === bodyA && bodyA.plugin.dynObject.noCollision) || (bodyB.parent === bodyB && bodyB.plugin.dynObject.noCollision) ) {
                    this.splice(this.indexOf(this[i]),1);
                }

                if(bodyA.parent === bodyA) {
                    if(bodyA.plugin.dynObject instanceof DynObject) {
                        c_classesA = PhSim.Query.getCollisionClasses(bodyA.plugin.dynObject);
                    }
                }
                
                else {
                    c_classesA = PhSim.Query.getCollisionClasses(bodyA.parent.plugin.dynObject);
                }

                if(bodyB.parent === bodyB) {
                    if(bodyB.plugin.dynObject instanceof DynObject) {
                        c_classesB = PhSim.Query.getCollisionClasses(bodyB.plugin.dynObject);
                    }    
                }

                else {
                    c_classesB = PhSim.Query.getCollisionClasses(bodyB.parent.plugin.dynObject);                    
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