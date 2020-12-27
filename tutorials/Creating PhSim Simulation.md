<script src="https://cdn.jsdelivr.net/npm/poly-decomp@0.3.0/build/decomp.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/matter-js@0.14.2/build/matter.min.js"></script>
<script src="../dist/phsim.js"></script>

Creating a PhSim simulation requires some steps.

## The Constructor

The first step in creating a PhSim simulation is understanding what the {@link PhSim} constructor does. The PhSim constructor accepts one argument that is optional: the `dynSimOptions` argument. 

Here are the possible options:

### A static simulation object

A static simulation object is an object that has the property `simulations` such that it is an array of layers. In addition to that, it could possess an array of simulation specfic widgets.

Here is an example of a static simulation object that contains three rectangles that fall:

```

var o = {
    "layers": [
        {
            "objUniverse": [
                {
                    "shape": "rectangle",
                    "x": 71,
                    "y": 98,
                    "w": 142,
                    "h": 119,
                    "cycle": 0,
                    "strokeStyle": "#000000",
                    "lineWidth": 4,
                    "fillStyle": "#333333"
                },
                {
                    "shape": "rectangle",
                    "x": 596,
                    "y": 109,
                    "w": 174,
                    "h": 134,
                    "cycle": 0,
                    "strokeStyle": "#000000",
                    "lineWidth": 4,
                    "fillStyle": "#333333"
                },
                {
                    "shape": "rectangle",
                    "x": 266,
                    "y": 334,
                    "w": 254,
                    "h": 149,
                    "cycle": 0,
                    "strokeStyle": "#000000",
                    "lineWidth": 4,
                    "fillStyle": "#333333"
                }
            ],
            "name": "Untitled Layer"
        }
    ],
    "world": {
        "grav": 1,
        "bg": "white",
        "border": null,
        "unit": 1
    },
    "simulation": true,
    "widgets": [],
    "name": "Untitled simulation"
}

var phSim = new PhSim(o);

```

Which is used for the following simulation:

<div style="border: 1px solid #aaa;" id="simulation-1"></div>

<span class="btn btn-default" style="float: right; margin-top: 10px;" id="play-simulation-1">Play</span>

Note: The play button uses the [PhSim.prototype.play]{@link PhSim#play} function.

<script>

    (function() {
        var o = {
            "layers": [
                {
                    "objUniverse": [
                        {
                            "shape": "rectangle",
                            "x": 71,
                            "y": 98,
                            "w": 142,
                            "h": 119,
                            "cycle": 0,
                            "strokeStyle": "#000000",
                            "lineWidth": 4,
                            "fillStyle": "#333333"
                        },
                        {
                            "shape": "rectangle",
                            "x": 596,
                            "y": 109,
                            "w": 174,
                            "h": 134,
                            "cycle": 0,
                            "strokeStyle": "#000000",
                            "lineWidth": 4,
                            "fillStyle": "#333333"
                        },
                        {
                            "shape": "rectangle",
                            "x": 266,
                            "y": 334,
                            "w": 254,
                            "h": 149,
                            "cycle": 0,
                            "strokeStyle": "#000000",
                            "lineWidth": 4,
                            "fillStyle": "#333333"
                        }
                    ],
                    "name": "Untitled Layer"
                }
            ],
            "world": {
                "grav": 1,
                "bg": "white",
                "border": null,
                "unit": 1
            },
            "simulation": true,
            "widgets": [],
            "name": "Untitled simulation"
        }

        var phSim = new PhSim(o);

        // Play buttons and simulation containers

        var played = false;

        document.querySelector("#simulation-1").appendChild(phSim.container);

        document.querySelector("#play-simulation-1").addEventListener("click",function(){
            
            if(played) {
                phSim.gotoSimulationIndex(0);
            }

            else {
                phSim.play();
                played = true;
            }
        });

    })();

</script>

### A layer

A layer is an object that contains a property named `objUniverse` such that it is an array of PhSim objects. These can be used as an argument in the constructor. Here is an example of a simulation consisting of a single layer that contains two objects: a green square that moves and a locked platform:

```

var o = {
    "objUniverse": [

        // Platform

        {
            "shape": "rectangle",
            "x": 25,
            "y": 528,
            "w": 749,
            "h": 47,
            "cycle": 0,
            "strokeStyle": "#0000ff",
            "lineWidth": 4,
            "fillStyle": "#333333",
            "locked": true
        },

        // Green rectangle

        {
            "shape": "rectangle",
            "x": 367,
            "y": 231,
            "w": 91,
            "h": 93,
            "cycle": 0,
            "strokeStyle": "#000000",
            "lineWidth": 4,
            "fillStyle": "#33cf33",
            "widgets": [
                {
                    "type": "keyboardControls",
                    "up": 10,
                    "down": 10,
                    "left": 10,
                    "right": 10
                }
            ]
        }
    ],
    "name": "Untitled Layer"
};

var phSim = new PhSim(o);

```

Which creates the following:


<div style="border: 1px solid #aaa;" id="simulation-2"></div>

<span class="btn btn-default" style="float: right; margin-top: 10px;" id="play-simulation-2">Play</span>

<script>
    (function(){

        var o = {
            "objUniverse": [

                // Platform

                {
                    "shape": "rectangle",
                    "x": 25,
                    "y": 528,
                    "w": 749,
                    "h": 47,
                    "cycle": 0,
                    "strokeStyle": "#0000ff",
                    "lineWidth": 4,
                    "fillStyle": "#333333",
                    "locked": true
                },

                // Green rectangle

                {
                    "shape": "rectangle",
                    "x": 367,
                    "y": 231,
                    "w": 91,
                    "h": 93,
                    "cycle": 0,
                    "strokeStyle": "#000000",
                    "lineWidth": 4,
                    "fillStyle": "#33cf33",
                    "widgets": [
                        {
                            "type": "keyboardControls",
                            "up": 10,
                            "down": 10,
                            "left": 10,
                            "right": 10
                        }
                    ]
                }
            ],
            "name": "Untitled Layer"
        };

        var phSim = new PhSim(o);

        var played = false;

        document.querySelector("#simulation-2").appendChild(phSim.container);

        document.querySelector("#play-simulation-2").addEventListener("click",function(){
            
            if(played) {
                phSim.gotoSimulationIndex(0);
            }

            else {
                phSim.play();
                played = true;
            }
        });

    })();

</script>

### A composite simulation object

A composite PhSim simulation is a simulation that consists of multiple simulations, as the name suggests.

The object consists of an array named `simulations`, which is an array of static simulation objects.

### An array

An array of objects can be accepted.

### None

As said before, the argument is optional. It is not needed.