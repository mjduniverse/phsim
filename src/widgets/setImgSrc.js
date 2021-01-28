/**
 * Widget for changing image sources for sprites.
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} widget - Widget Object
 * @param {String} widget.src - New Source
 * @this PhSim
 */

function setImgSrc(dynObject,widget) {

    var f = function(){
        dynObject.sprite.src = widget.src;
    }

    this.createWFunction(dynObject,f,widget);
}

module.exports = setImgSrc;