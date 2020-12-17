console.log("Buidling widget types...");

const TypeDefGen = require("./typeDefGen");

const widgets = [

    new TypeDefGen.Type("Velocity","WFunctionOptions",[
        new TypeDefGen.Property("Boolean","velocity","Boolean for enabling the velocity widget"),
        new TypeDefGen.Property("Vector","vector","Velocity vector")    
    ]),

    new TypeDefGen.Type("Force","WFunctionOptions",[
        new TypeDefGen.Property("Boolean","force","Boolean for enabling the force widget"),
        new TypeDefGen.Property("Vector","vector","Force vector")    
    ]),

    new TypeDefGen.Type("Position","WFunctionOptions",[
        new TypeDefGen.Property("Boolean","position","Boolean for enabling the position widget"),
        new TypeDefGen.Property("Vector","vector","Position vector")    
    ]),

    new TypeDefGen.Type("Translate","WFunctionOptions",[
        new TypeDefGen.Property("Boolean","translate","Boolean for enabling the translation widget"),
        new TypeDefGen.Property("Vector","vector","Translation vector")    
    ]),

    new TypeDefGen.Type("DeleteSelf","WFunctionOptions",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the force widget"),
    ]),

    new TypeDefGen.Type("Draggable","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the force widget"),
    ]),

    new TypeDefGen.Type("Coin","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the coin widget"),
    ]),

    new TypeDefGen.Type("Hazard","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the hazard widget"),
    ]),

    new TypeDefGen.Type("Health","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the health widget"),
    ]),

    new TypeDefGen.Type("Elevator","Object",[
        new TypeDefGen.Property("Boolean","elevator","Boolean for enabling the elevator widget"),
        new TypeDefGen.Property("Vector","pointA","First point"),
        new TypeDefGen.Property("Vector","pointB","Second point"),
    ]),

    new TypeDefGen.Type("TransformCameraByObject","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the hazard widget"),
    ]),

    new TypeDefGen.Type("TransformWithCamera","Object",[
        new TypeDefGen.Property("Boolean","transformWithCamera","Boolean for determining the object moves with the camera"),
    ]),

    new TypeDefGen.Type("KeyboardControls","Object",[
        new TypeDefGen.Property("Number","up","Up velocity"),
        new TypeDefGen.Property("Number","down","Down velocity"),
        new TypeDefGen.Property("Number","left","Left velocity"),
        new TypeDefGen.Property("Number","right","Right velocity"),
        new TypeDefGen.Property("Boolean","keyboardControls","Boolean for enabling keyboard controls widget"),
    ]),

    new TypeDefGen.Type("Alert","Object",[
        new TypeDefGen.Property("String","buttonTxt","Button Text"),
        new TypeDefGen.Property("String","name","Alert Name"),
        new TypeDefGen.Property("String","text","Text Message"),
        new TypeDefGen.Property("Boolean","alert","Boolean for enabling alert"),
    ]),

    new TypeDefGen.Type("Connection","Object",[
        new TypeDefGen.Property("LOAddress","objectA","First Object"),
        new TypeDefGen.Property("LOAddress","objectB","Second Object"),
        new TypeDefGen.Property("Boolean","connection","Right velocity"),
    ]),

    new TypeDefGen.Type("SetAngle","WFunctionOptions",[
        new TypeDefGen.Property("Number","cycle","Angle"),
        new TypeDefGen.Property("Boolean","circularConstraintRotation","Down velocity"),
        new TypeDefGen.Property("Boolean","rotation","Right velocity"),
    ]),

    new TypeDefGen.Type("Rotation","WFunctionOptions",[
        new TypeDefGen.Property("Number","cycle","Angle"),
        new TypeDefGen.Property("Boolean","circularConstraintRotation","Down velocity"),
        new TypeDefGen.Property("Boolean","rotation","Right velocity"),
    ]),

    new TypeDefGen.Type("NoRotation","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the no rotation widget"),
    ]),

    new TypeDefGen.Type("RectText","Object",[
        new TypeDefGen.Property("String","content","Rectangular Text Content"),
        new TypeDefGen.Property("String","font","Rectangular Text Font"),
        new TypeDefGen.Property("Number","margin","Text Margin"),
        new TypeDefGen.Property("Number","size","Text Margin"),
        new TypeDefGen.Property("Number","bordersize","Text Margin"),
        new TypeDefGen.Property("String","fill","Text Fill"),
        new TypeDefGen.Property("Boolean","rectText","Content"),
        new TypeDefGen.Property("String","lineWidth","Text Line Width"),

    ]),

    new TypeDefGen.Type("NumVar","Object",[
        new TypeDefGen.Property("String","name"),
        new TypeDefGen.Property("Number","value"),
        new TypeDefGen.Property("Boolean","numVar")
    ]),

    new TypeDefGen.Type("SetNumVar","wFunctionObjects",[
        new TypeDefGen.Property("String","name"),
        new TypeDefGen.Property("Number","value"),
        new TypeDefGen.Property("Boolean","SetNumVar")
    ]),

    new TypeDefGen.Type("SetColor","wFunctionObjects",[
        new TypeDefGen.Property("String","color"),
        new TypeDefGen.Property("Boolean","setColor")
    ]),

    new TypeDefGen.Type("SetBorderColor","wFunctionObjects",[
        new TypeDefGen.Property("String","color"),
        new TypeDefGen.Property("Boolean","setBorderColor")
    ]),

    new TypeDefGen.Type("SetLineWidth","wFunctionObjects",[
        new TypeDefGen.Property("Number","lineWidth"),
        new TypeDefGen.Property("Boolean","setLineWidth")
    ]),

    new TypeDefGen.Type("PlayAudio","wFunctionObjects",[
        new TypeDefGen.Property("String","src"),
        new TypeDefGen.Property("Boolean","playAudio")
    ]),  
    
    new TypeDefGen.Type("ObjLink_a","wFunctionObjects",[
        new TypeDefGen.Property("LOAddress","target"),
        new TypeDefGen.Property("Boolean","objLink_a")
    ]),  

    new TypeDefGen.Type("Game","Object",[
        new TypeDefGen.Property("Number","life"),
        new TypeDefGen.Property("Number","goal"),
        new TypeDefGen.Property("Number","score"),
        new TypeDefGen.Property("Boolean","game")
    ]),

    new TypeDefGen.Type("DeleteSelf","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the coin widget"),
    ]),

    new TypeDefGen.Type("ToggleLock","Object",[
        new TypeDefGen.Property("Boolean","toggleLock","Boolean for enabling the coin widget"),
    ]),

    new TypeDefGen.Type("CircularConstraint","Object",[
        new TypeDefGen.Property("Boolean","circularConstraint","Boolean for enabling the circular constraint widget"),
        new TypeDefGen.Property("Number","x","Boolean for enabling the circular constraint widget"),
        new TypeDefGen.Property("Number","y","Boolean for enabling the circular constraint widget"),
    ]),

    new TypeDefGen.Type("DeleteSelf","Object",[
        new TypeDefGen.Property("Boolean","deleteSelf","Boolean for enabling the self-deletion widget"),
    ]),

    new TypeDefGen.Type("ToggleSemiLock","WFunctionOptions",[
        new TypeDefGen.Property("Boolean","toggleSemiLock","Boolean for enabling the toggle semi-lock widget"),
    ]),

    new TypeDefGen.Type("WFunction","WFunctionOptions",[
        new TypeDefGen.Property("Function|String","function","WFunction widget"),
        new TypeDefGen.Property("Boolean","wFunction","Boolean for enabling wFunction widget.")
    ])
]

var typeDefGen = new TypeDefGen(widgets);

typeDefGen.boolKeyAssignment = "PhSim.boolKey";
typeDefGen.boolKeyAssignment_lc = "PhSim.boolKey_lc";

typeDefGen.buildFile(__dirname + "/widgetTypes.js");