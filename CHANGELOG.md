## 0.2.0-alpha (Unreleased)

* Optimized mouse events in such a way that they are faster.

* Added `PhSim.prototype.getCollidingMatterBodies` function.

* Fixing bug that makes objLink widget not work when simulation is reloaded.

* Added ESLint to deveolpment dependencies.

* Merged `./src/audio.js` and `./src/audioToggle.js`.

* Made `PhSim.Game.Widgets` a mixin with `PhSim.Widgets`.

* Fixed a bug that makes sprites not appear if they have only width and height.

* Moving constraint widget to its own file.

* Adding constraint widget to Widgets namespace.

* Changed name of first argument in `PhSim.Widgets.wFunction`.

* Fixing platformer-1.html demo.

* Making `0` default value for `firstCycle` property of `DynObjects`.

* Making rectangle vertices function work with undefined rectangle angles.

* Making `play`,`toggle`,`pause`,`exitSl` and `exit` methods of the `PhSim` object return Promises when they are sucessfully executed

* Adding image support to `addSprite` function of `spriteImgObj`.

* Adding `onwfunctionerror` event.

* Added `PhSim.Vector.vectorToArray` function for applying the law of cosines to vectors.

* Added `PhSim.Vector.dotProduct` function for calculating dot products.

## 0.1.0-alpha (2020-12-27)
Inital Release