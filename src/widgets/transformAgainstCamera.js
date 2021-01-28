/**
 * Widget to transform object by camera.
 * @param {Object} dynObject 
 * @this PhSim
 */

function transformAgainstCamera(o) {
    this.camera.transformingObjects.push(o)
}

module.exports = transformAgainstCamera;