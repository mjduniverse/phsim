Sprites can be added to PhSim objects using the ```sprite``` property.

### Patterns

One way of using images is to make an image have a pattern. If ```sprite``` is an object, then ```sprite.repeat === true``` implies that the sprite will be repeated as a pattern. Here is an example of a rectangle with a pattern:

```
{
    shape: "rectangle",
    x: 118,
    y: 248,
    w: 525,
    h: 230,
    cycle: 0,
    strokeStyle: "#000000",
    lineWidth: "4",
    fillStyle: "#333333",
    sprite: {
        src: "https://raw.githubusercontent.com/mjduniverse/phsim/a872b8fdfe3dbe96d7599e665346b673f50317fa/tutorials/img/checker-black-grey.svg",
        repeat: true
    }
}
```


### Size Rules
There are rules for determining the width and height of a sprite since ```0.2.0-alpha```:

Let ```sprite``` be a sprite object. Then:

* If ```sprite.w``` and ```sprite.h``` are undefined, then the dimensions of the sprite are defined by the original image's dimensions.

* If ```sprite.w``` is a number and ```sprite.h``` is undefined, then the height of the sprite is set proportional to ```sprite.w```.

* If ```sprite.h``` is a number and ```sprite.w``` is undefined, then the height of the sprite is set proportional to ```sprite.h```.

* If ```sprite.h``` is a number and ```sprite.w``` is undefined, then the height of the sprite is set proportional to ```sprite.h```.

* If ```sprite.w``` and ```sprite.h``` are numbers, then the width and height of the sprite is set by those numbers.

* If ```sprite.fit``` is true, then the width is set to being the same as the width of the parent object's bounding rectangle.