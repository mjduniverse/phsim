/**
 * Object that registers PhSim as a Matter.js plugin.
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
     * Detector patch for Matter.js.
     * 
     */

    Detector: {

        /**
         * Matter.Detector.collisions patch for Matter.js.
         * This modifies the function for checking collisions in Matter.js. 
         */

        collisions: function() {

            for(var i = 0; i < this.length; i++) {

                var c_classesA = PhSim.getCollisionClasses(this[i].bodyA.plugin.ph);
                var c_classesB = PhSim.getCollisionClasses(this[i].bodyB.plugin.ph);

                if(c_classesA.length > 0 && c_classesB.length > 0) {
                    if(!PhSim.intersectionExists(c_classesA,c_classesB)) {

                        this.splice(this.indexOf(this[i]),1);

                        // Reset index to zero to make sure all collisions
                        // that have no collision classes in common get removed

                        i = 0;
                    }
                }

            }
 
            //var c_classesA = PhSim.getCollisionClasses(broadphasePairs[0].plugin.ph);
            //var c_classesB = PhSim.getCollisionClasses(broadphasePairs[1].plugin.ph);

            /** 

                if(c_classesA.length > 0 && c_classesB.length > 0) {
                    if(PhSim.intersectionExists(c_classesA,c_classesB)) {
                        a.push(broadphasePairs[i]);
                    }
                }

                else {
                    a.push(broadphasePairs[i]);
                }

            }

            **/

            //return a;
        }
    }

}

// Register Plugin

Matter.Plugin.register(PhSim.matterPlugin);
Matter.use(PhSim.matterPlugin);