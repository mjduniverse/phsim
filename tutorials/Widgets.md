<script src="https://cdn.jsdelivr.net/npm/poly-decomp@0.3.0/build/decomp.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/matter-js@0.14.2/build/matter.min.js"></script>
<script src="../dist/phsim.js"></script>

Widgets extend the functionality of PhSim objects. These are stored as functions in the {@link PhSim.Widgets} namespace and it can be extended.

Widgets are activated using the {@link PhSim#extractWidget} function.

Here is an example of a simualtion using widgets:


```
var o = {
    "objUniverse": [
        {
            "shape": "rectangle",
            "x": 45.571428571428555,
            "y": 161.14285714285714,
            "w": 60,
            "h": 57,
            "cycle": 0,
            "strokeStyle": "#000000",
            "lineWidth": "4",
            "fillStyle": "#333333",
            "widgets": [
                {
                    "type": "setColor",
                    "trigger": "key",
                    "key": "a",
                    "color": "#b40000"
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 45.571428571428555,
            "y": 108.14285714285714,
            "w": 216,
            "h": 36,
            "cycle": 0,
            "strokeStyle": "transparent",
            "lineWidth": "4",
            "fillStyle": "transparent",
            "widgets": [
                {
                    "type": "rectText",
                    "font": "Arial",
                    "content": "Press \"a\".",
                    "fill": "#000000",
                    "borderColor": "#3f0000",
                    "size": 16
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 261.57142857142856,
            "y": 162.39285714285714,
            "w": 60,
            "h": 57,
            "cycle": 0,
            "strokeStyle": "#000000",
            "lineWidth": "4",
            "fillStyle": "#333333",
            "widgets": [
                {
                    "type": "setColor",
                    "trigger": "time",
                    "key": "a",
                    "color": "#b40000",
                    "time": 3000
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 240.57142857142856,
            "y": 107.39285714285714,
            "w": 216,
            "h": 36,
            "cycle": 0,
            "strokeStyle": "transparent",
            "lineWidth": "4",
            "fillStyle": "transparent",
            "widgets": [
                {
                    "type": "rectText",
                    "font": "Arial",
                    "content": "Wait 3 seconds",
                    "fill": "#000000",
                    "borderColor": "#3f0000",
                    "size": 16
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 472.57142857142856,
            "y": 166.3928571428571,
            "w": 60,
            "h": 57,
            "cycle": 0.0035211122086378807,
            "strokeStyle": "#000000",
            "lineWidth": "4",
            "fillStyle": "#333333",
            "widgets": [
                {
                    "type": "setColor",
                    "trigger": "objclick",
                    "key": "a",
                    "color": "#b40000",
                    "time": 3000
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 464.57142857142856,
            "y": 113.39285714285714,
            "w": 216,
            "h": 36,
            "cycle": 0,
            "strokeStyle": "transparent",
            "lineWidth": "4",
            "fillStyle": "transparent",
            "widgets": [
                {
                    "type": "rectText",
                    "font": "Arial",
                    "content": "Click me!",
                    "fill": "#000000",
                    "borderColor": "#3f0000",
                    "size": 16
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 209.57142857142856,
            "y": 20.14285714285714,
            "w": 724,
            "h": 43,
            "cycle": 0,
            "strokeStyle": "transparent",
            "lineWidth": "4",
            "fillStyle": "transparent",
            "widgets": [
                {
                    "type": "rectText",
                    "font": "Arial",
                    "name": "",
                    "fill": "#000000",
                    "borderColor": "transparent",
                    "content": "Follow instructions to change color of objects",
                    "size": 20
                }
            ],
            "locked": true
        },
        {
            "shape": "rectangle",
            "x": 669,
            "y": 165.5,
            "w": 60,
            "h": 57,
            "cycle": 0,
            "strokeStyle": "#000000",
            "lineWidth": "4",
            "fillStyle": "#333333",
            "widgets": [
                {
                    "type": "setColor",
                    "trigger": "objlink",
                    "key": "a",
                    "color": "#b40000",
                    "time": 3000
                }
            ],
            "locked": true,
            "name": "object_4"
        },
        {
            "shape": "rectangle",
            "x": 24,
            "y": 575,
            "w": 757,
            "h": -20,
            "cycle": 0,
            "strokeStyle": "#000000",
            "lineWidth": "4",
            "fillStyle": "#00ff00",
            "locked": true,
            "name": "green_rectangle",
            "sensorClass": "class_1"
        },
        {
            "shape": "circle",
            "x": 403,
            "y": 374,
            "radius": 35.90264614203248,
            "cycle": 1.346085158380254,
            "name": "blue_circle",
            "strokeStyle": "#000000",
            "lineWidth": "4",
            "fillStyle": "#0000ff",
            "sensorClass": "class_1",
            "widgets": [
                {
                    "type": "objLink",
                    "target": {
                        "L": 0,
                        "O": 7
                    },
                    "trigger": "sensor"
                }
            ]
        },
        {
            "shape": "rectangle",
            "x": 642,
            "y": 108,
            "w": 216,
            "h": 36,
            "cycle": 0,
            "strokeStyle": "transparent",
            "lineWidth": "4",
            "fillStyle": "transparent",
            "widgets": [
                {
                    "type": "rectText",
                    "font": "Arial",
                    "content": "(Watch blue ball)",
                    "fill": "#000000",
                    "borderColor": "#3f0000",
                    "size": 16
                }
            ],
            "locked": true
        }
    ],
    "name": "Untitled Layer",

    "world": {
        "grav": 1,
        "bg": "#0077ff",
        "border": null,
        "unit": 1
}

var phSim = new PhSim(o);

```

Which can be tested here:

<div style="border: 1px solid #aaa;" id="simulation-1"></div>

<span class="btn btn-default" style="float: right; margin-top: 10px;"  id="play-simulation-1">Play</span>

<script>

(function() {

    var o = {
        "objUniverse": [
            {
                "shape": "rectangle",
                "x": 45.571428571428555,
                "y": 161.14285714285714,
                "w": 60,
                "h": 57,
                "cycle": 0,
                "strokeStyle": "#000000",
                "lineWidth": "4",
                "fillStyle": "#333333",
                "widgets": [
                    {
                        "type": "setColor",
                        "trigger": "key",
                        "key": "a",
                        "color": "#b40000"
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 45.571428571428555,
                "y": 108.14285714285714,
                "w": 216,
                "h": 36,
                "cycle": 0,
                "strokeStyle": "transparent",
                "lineWidth": "4",
                "fillStyle": "transparent",
                "widgets": [
                    {
                        "type": "rectText",
                        "font": "Arial",
                        "content": "Press \"a\".",
                        "fill": "#000000",
                        "borderColor": "#3f0000",
                        "size": 16
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 261.57142857142856,
                "y": 162.39285714285714,
                "w": 60,
                "h": 57,
                "cycle": 0,
                "strokeStyle": "#000000",
                "lineWidth": "4",
                "fillStyle": "#333333",
                "widgets": [
                    {
                        "type": "setColor",
                        "trigger": "time",
                        "key": "a",
                        "color": "#b40000",
                        "time": 3000
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 240.57142857142856,
                "y": 107.39285714285714,
                "w": 216,
                "h": 36,
                "cycle": 0,
                "strokeStyle": "transparent",
                "lineWidth": "4",
                "fillStyle": "transparent",
                "widgets": [
                    {
                        "type": "rectText",
                        "font": "Arial",
                        "content": "Wait 3 seconds",
                        "fill": "#000000",
                        "borderColor": "#3f0000",
                        "size": 16
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 472.57142857142856,
                "y": 166.3928571428571,
                "w": 60,
                "h": 57,
                "cycle": 0.0035211122086378807,
                "strokeStyle": "#000000",
                "lineWidth": "4",
                "fillStyle": "#333333",
                "widgets": [
                    {
                        "type": "setColor",
                        "trigger": "objclick",
                        "key": "a",
                        "color": "#b40000",
                        "time": 3000
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 464.57142857142856,
                "y": 113.39285714285714,
                "w": 216,
                "h": 36,
                "cycle": 0,
                "strokeStyle": "transparent",
                "lineWidth": "4",
                "fillStyle": "transparent",
                "widgets": [
                    {
                        "type": "rectText",
                        "font": "Arial",
                        "content": "Click me!",
                        "fill": "#000000",
                        "borderColor": "#3f0000",
                        "size": 16
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 209.57142857142856,
                "y": 20.14285714285714,
                "w": 724,
                "h": 43,
                "cycle": 0,
                "strokeStyle": "transparent",
                "lineWidth": "4",
                "fillStyle": "transparent",
                "widgets": [
                    {
                        "type": "rectText",
                        "font": "Arial",
                        "name": "",
                        "fill": "#000000",
                        "borderColor": "transparent",
                        "content": "Follow instructions to change color of objects",
                        "size": 20
                    }
                ],
                "locked": true
            },
            {
                "shape": "rectangle",
                "x": 669,
                "y": 165.5,
                "w": 60,
                "h": 57,
                "cycle": 0,
                "strokeStyle": "#000000",
                "lineWidth": "4",
                "fillStyle": "#333333",
                "widgets": [
                    {
                        "type": "setColor",
                        "trigger": "objlink",
                        "key": "a",
                        "color": "#b40000",
                        "time": 3000
                    }
                ],
                "locked": true,
                "name": "object_4"
            },
            {
                "shape": "rectangle",
                "x": 24,
                "y": 575,
                "w": 757,
                "h": -20,
                "cycle": 0,
                "strokeStyle": "#000000",
                "lineWidth": "4",
                "fillStyle": "#00ff00",
                "locked": true,
                "name": "green_rectangle",
                "sensorClass": "class_1"
            },
            {
                "shape": "circle",
                "x": 403,
                "y": 374,
                "radius": 35.90264614203248,
                "cycle": 1.346085158380254,
                "name": "blue_circle",
                "strokeStyle": "#000000",
                "lineWidth": "4",
                "fillStyle": "#0000ff",
                "sensorClass": "class_1",
                "widgets": [
                    {
                        "type": "objLink",
                        "target": {
                            "L": 0,
                            "O": 7
                        },
                        "trigger": "sensor"
                    }
                ]
            },
            {
                "shape": "rectangle",
                "x": 642,
                "y": 108,
                "w": 216,
                "h": 36,
                "cycle": 0,
                "strokeStyle": "transparent",
                "lineWidth": "4",
                "fillStyle": "transparent",
                "widgets": [
                    {
                        "type": "rectText",
                        "font": "Arial",
                        "content": "(Watch blue ball)",
                        "fill": "#000000",
                        "borderColor": "#3f0000",
                        "size": 16
                    }
                ],
                "locked": true
            }
        ],

        "world": {
            "grav": 1,
            "bg": "#0077ff",
            "border": null,
            "unit": 1
        }

    }

    var phSim = new PhSim(o);

    // HTML elements

    var played = false

    document.querySelector("#simulation-1").appendChild(phSim.container);

    document.querySelector("#play-simulation-1").addEventListener("click",function(){

        if(played) {
            phSim.gotoSimulationIndex(0);
        }

        else {
            phSim.play();
            played = true;
        }

    })


})();

</script>



## Adding widgets to a Dynamic Object

Here is an example of a static polygon with the velocity widget:

```
{
    "verts": [
        {
            "x": 149,
            "y": 50
        },
        {
            "x": 518,
            "y": 95
        },
        {
            "x": 368,
            "y": 286
        },
        {
            "x": 141,
            "y": 163
        }
    ],
    "shape": "polygon",
    "strokeStyle": "#000000",
    "lineWidth": "4",
    "fillStyle": "#333333",
    "label": "Untitled Object",
    "density": 0.001,
    "widgets": [
        {
            "type": "velocity",
            "vector": {
                "x": 10,
                "y": 10
            },
            "trigger": "key",
            "key": "a"
        }
    ]
}

```

First, let us make some observations. The `type` property tells us the name of the widget. Now, some widgets utilize the `wFunction` API. The `velocity` widget is one of these widgets. 

The `trigger` property tells us that what will make the dynamic object go. In this case, the `trigger` property is set to `"key"`, which means that pressing a certain key will make the object go at a certain velocity. In this case, it is the letter `a`.

The static property can be used to create a dynamic object. Here is an example of a PhSim simulation:

```

// New simulation instance

var phSim = new PhSim();

// Static Object

var staticObj = {
    "verts": [
        {
            "x": 149,
            "y": 50
        },
        {
            "x": 518,
            "y": 95
        },
        {
            "x": 368,
            "y": 286
        },
        {
            "x": 141,
            "y": 163
        }
    ],
    "shape": "polygon",
    "strokeStyle": "#000000",
    "lineWidth": "4",
    "fillStyle": "#333333",
    "label": "Untitled Object",
    "density": 0.001,
    "widgets": [
        {
            "type": "velocity",
            "vector": {
                "x": 10,
                "y": 10
            },
            "trigger": "key",
            "key": "a"
        }
    ]
}

// Dynamic Object

var dynObject = new PhSim.DynObject(staticObj);

phSim.addObject(dynObject);

phSim.play();

```

In this simulation, whenever the `a` key is pressed, the dynamic object has its velocity set to 10 in the x direction and 10 in the y direction.

## Built In Widgets

Many widgets are in-built. These can be found in the {@link PhSim.Widgets} namespace. Here are some of them:

### Game Widgets

These widgets work on a PhSim simulation if the {@link PhSim#lclGame} property is defined using the {@link PhSim.Game.Options} object.

* {@link PhSim.Widgets.coin}
* {@link PhSim.Widgets.hazard}
* {@link PhSim.Widgets.endGame}
* {@link PhSim.Widgets.health}

### Motion Widgets

These are widgets that make dynamic objects move.

* {@link PhSim.Widgets.velocity}
* {@link PhSim.Widgets.force}
* {@link PhSim.Widgets.position}
* {@link PhSim.Widgets.translate}

### 