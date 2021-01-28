Sprites can be added to PhSim dynamic objects using the ```sprite``` property.

### Patterns

One way of using images is to make an image have a pattern. Here is an example of a rectangle with a pattern:

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