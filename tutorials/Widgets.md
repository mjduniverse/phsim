Widgets extend the functionality of PhSim objects. These are stored as functions in the {@link PhSim.Widgets} namespace and it can be extended.

Widgets are activated using the {@link PhSim#extractWidget} function.

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