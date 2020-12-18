Widget Functions (`wFunctions`) are an important part of PhSim. They are used to simplify the process of creating widgets.

## Creating wFunctions

Take following code for example:

```

var phSim = new PhSim();

var f = function() {
    alert("The key \"h\" has been pressed.");
};

var options = {
    trigger: "key",
    key: "h"
}

var wFunction = phSim.createWFunction(phSim,f,options);

```

This creates a wFunction that executes whenever the `h` key is pressed.

## Properties of a wFunction

A wFunction has the properties `_ref` and `_options`. The former is a reference to a number if the trigger is a time trigger. Otherwise, it is a reference to a function that wraps the wFunction.

The later property `_options` describes the options that were passed when creating the wFunction.

## Triggers

* `key` - The key trigger executes the wFunction whenever a certain key is pressed.
* `sensor` -  The sensor trigger executes whenever the trigger object collides with another object that shares at least one sensor class.
* `sensor_global` -  Executes wFunction whenever two objects of the same sensor class collide.
* `update` - Executes whenever there is a simulation update.
* `objclick`
* `objclick_global`
* `objmousedown`
* `objmousedown_global`
* `firstslupdate`
* `objmouseup`
* `objmouseup_global`
* `objlink`
* `afterslchange`
* `time`