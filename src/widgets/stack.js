/**
 * 
 * @param {DynSimObject} o 
 * 
 * @param {Object} w -  Widget Options
 * 
 * @param {Number} w.rows -  Widget Rows
 * @param {Number} w.rowDist - Distance between two adjacent objects in a row 
 * 
 * @param {Number} w.columns - Columns
 * @param {Number} w.colDist - Distance between two adjecent objects in the column
 * 
 * @this {PhSim}
 *  
 */

PhSim.Widgets.stack = function(o,w) {

    var a = [];

    for(var i = 1; i <= w.rows; i++) {

        var new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: w.rowDist * i,
            y: 0
        });

        a.push(new_o);

    }


    for(var i = 1; i <= w.columns; i++) {

        var new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: 0,
            y: w.colDist * i
        });

        a.push(new_o);

    }
}