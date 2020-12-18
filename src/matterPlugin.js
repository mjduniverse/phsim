const DynObject = require("./dynObject");
const PhSim = require("./phSim");

PhSim.MatterPluginObj = function(dynObject) {
    this.dynObject = dynObject
}

/**
 * Reference to patched matter.js library.
 * @namespace
 * @memberof PhSim
 * @see {@link https://brm.io/matter-js/docs/}
 * 
 */

PhSim.Matter = {};

/**
 * The `matter-skinmesh` plugin for matter.js.
 * @author Mjduniverse
 * @namespace
 */

const MatterSkinmesh = {

    name: "matter-skinmesh",

    version: "0.1.0",


    install: function(matter) {
        
        matter.before("Bodies.fromVertices",function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea){
            MatterSkinmesh.Bodies.fromVertices.apply(this,arguments);
        });
    },

    Bodies: {

        /**
         * @function
         * @param {*} x 
         * @param {*} y 
         * @param {Array[]} vertexSets 
         * @param {*} options 
         * @param {*} flagInternal 
         * @param {*} removeCollinear 
         * @param {*} minimumArea 
         */

        fromVertices: function(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea) {
            
            if(!Array.isArray(vertexSets[0])) {
                vertexSets = [vertexSets];
            }

            // Array holding matter skinmeshes.

            var matterSkinmesh = [];

            for(var i = 0; i < vertexSets.length; i++) {

                // A single matter skinmesh

                var a = [];

                for(var j = 0; j < vertexSets[i].length; i++) {
                    
                }
            }
            
        }
    }


}



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

        //matter.after('Body.create',function(){
          //  PhSim.matterPlugin.Body(body)
        //})

    },

    /**
     * Matter namespace for matter.js bodies.
     * @namespace
     */

    Body: {

        /**
         *  
         * @param {Object'} body 
         */

        //init: function(body) {
          //  body.plugin.phsim = body.plugin.phsim || new DynObject({

            //});
        //}

    },

    Bodies: {

        circle: function() {

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
                    var c_classesA = PhSim.Query.getCollisionClasses(bodyA.plugin.phsim.dynObject);
                }
                
                else {
                    var c_classesA = PhSim.Query.getCollisionClasses(bodyA.parent.plugin.phsim.dynObject);
                }

                if(bodyB.parent === bodyB) {
                    var c_classesB = PhSim.Query.getCollisionClasses(bodyB.plugin.phsim.dynObject);
                }

                else {
                    var c_classesB = PhSim.Query.getCollisionClasses(bodyB.parent.plugin.phsim.dynObject);                    
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

Matter.Plugin.register(PhSim.matterPlugin); 