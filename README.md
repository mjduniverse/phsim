# phsim
PhSim (which stands for "Physics Simulator") is a library built by [@mjduniverse](https://mjduniverse.github.io/) that runs on top of Matter.js. PhSim allows one to easily create a physics simulation without much hassle. PhSim could be used to create games as well..

 
* [GitHub Repository](https://github.com/mjduniverse/phsim/)
* [Distribution Downloads](https://github.com/mjduniverse/phsim/tree/master/dist)
* [Readme](https://github.com/mjduniverse/phsim/blob/master/README.md)
* [Documentation](https://mjduniverse.github.io/phsim/docs/)

## Demos

To get a clearer picture of what PhSim is and what it does, I have provided you demos. Here is an example of a PhSim simulation's code:

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

phSim.play();

```

To see it in action, you can view the demo here (it is the ): https://mjduniverse.github.io/phsim/docs/tutorial-Creating%20PhSim%20Simulation.html

## Installation

PhSim requires the libaries [Matter.js](https://brm.io/matter-js/) and [poly-decomp](). Download them and then include them in your page. After doing that, look for a [release](https://github.com/mjduniverse/phsim/releases) to download. However, you could also download the [bleeding edge build](https://github.com/mjduniverse/phsim/tree/master/dist), which might be unstable.


After downloading it, you should include it into your desired HTML file. If you put the files in a directory named `js`, then include these tags in the html page:

```

<script src="./js/decomp.min.js"></script>
<script src="./js/matter.min.js"></script>
<script src="./js/phsim.min.js"></script>

```

If you are using PhSim in a project, including `phsim.js` instead might make it easier to develop, as it retains the JSDoc comments and the code is not minified.

In addition, the latest stable build is avaliable as an NPM module: https://www.npmjs.com/package/phsim. One can install PhSim by executing `npm install phsim` if they have NPM installed on their computer.

## Some of the features:


### Rendering

PhSim has a in-built renderer known as `PhRender`. It allows one to add gradients and sprites to objects. Sprites are stored in a catche object called `PhSim.Sprites.spriteImgObj`. 

### Widgets

A widget is something that extends the functionality of widgets and simulations. There are widgets that make objects undergo various forms of motion. The [PhSim.Widgets](https://mjduniverse.github.io/phsim/docs/PhSim.Widgets.html) namespace contains the built in widgets of the library. Here are some widgets that are built into the library:


* __Constraints:__ Constraints make objects constrained to an object or a point. They can be added using the `constraint` widget.

* __Circular Constraints:__ Circular Constraints can be added using the [circularConstraints widget](https://mjduniverse.github.io/phsim/docs/PhSim.Widgets.html#.circularConstraint__anchor)

* __Motion Widgets:__ Various forms of motion, such as rotation, velocity, position change, accelration, force and more can be triggered by widgets.</li>

* __Audio:__ Audio can be played using the [playAudio]() widget.

* __wFunctions:__ Special functions known as wFunctions that allow one to deal with events and time in an easier way.

* __Draggable Objects:__: Objects tcan be dragged by the mouse using the [`draggable`](https://mjduniverse.github.io/phsim/docs/PhSim.Widgets.html#.draggable) widget</li>

### Making games

One can create basic games on PhSim using the [PhSim.Game](https://mjduniverse.github.io/phsim/docs/PhSim.Game.html) object. The library provides widgets that make objects act as [coins](https://mjduniverse.github.io/phsim/docs/PhSim.Widgets.html#.coin__anchor), [health](https://mjduniverse.github.io/phsim/docs/PhSim.Widgets.html#.health__anchor) and [hazards](https://mjduniverse.github.io/phsim/docs/PhSim.Widgets.html#.hazard__anchor). However, one can build their own game engine if they do not like the in built one. 