# phsim
PhSim is a library built by [@mjduniverse](https://mjduniverse.github.io/) that runs on top of Matter.js. PhSim allows one to easily create a physics simulation without much hassle. PhSim could be used to create games as well.

 
* [GitHub Repository](https://github.com/mjduniverse/phsim/)
* [Distribution Downloads](https://github.com/mjduniverse/phsim/tree/master/dist)
* [Readme](https://github.com/mjduniverse/phsim/blob/master/README.md)
* [Documentation](https://mjduniverse.github.io/phsim/docs/)

## Installation

PhSim requires the libaries [Matter.js](https://brm.io/matter-js/) and [poly-decomp](). Download them and then include them in your page. For example, if you put the files in a directory named `js`, then include these tags in the html page:

```

<script src="./js/decomp.min.js"></script>
<script src="./js/matter.min.js"></script>
<script src="./js/phsim.min.js"></script>

```


## Some of the features:


### Rendering

PhSim has a in-built renderer known as `PhRender`. It allows one to add gradients and sprites to objects.

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