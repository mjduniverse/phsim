/*** 
 * 
 * 
 * Object Widgets
 * 
 * 
****/

PhSim.Widgets = {}

PhSim.Widgets.Velocity = function() {
	this.velocity = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

//PhSim.Widgets.VelocityKey.desc = "VelocityKey is a widget that allows the user to change the velocity of a physical object by some key."

PhSim.Widgets.Force = function() {
	this.trigger = null;
	this.force = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

PhSim.Widgets.Position = function() {
	this.trigger = null;
	this.position = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

PhSim.Widgets.Translate = function() {
	this.trigger = null;
	this.translate = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

PhSim.Widgets.Clone = function() {
	this.trigger = null;
	this.timeCloner = true;
	this.time = null;
	this.clone = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
	this.copyWidgets = true;
	this.maxN = null;
}

PhSim.Widgets.DeleteSelf = function() {
	this.deleteSelf = true;
	this.trigger = null;
}

PhSim.Widgets.PointInWidgetsReturn = function() {
	this.widget = null;
	this.point = null;
	this.pointInWidgetsReturn = true;
}

PhSim.Widgets.Draggable = function() {
	this.draggable = true;
}

PhSim.Widgets.Coin = function() {
	this.coin = true;
}

PhSim.Widgets.Hazard = function() {
	this.hazard = true;
}

PhSim.Widgets.Health = function() {
	this.health = true;
}

PhSim.Widgets.Elevator = function() {
	
	this.pointA = {
		x: null,
		y: null,
	}

	this.pointB = {
		x: null,
		y: null,
	}

	this.elevator = true;

}

PhSim.Widgets.TransformCameraByObj = function() {
	this.transformCameraByObj = true;
}

PhSim.Widgets.TransformWithCamera = function() {
	this.transformWithCamera = true;
}

PhSim.Widgets.KeyboardControls = function() {
	this.up = null;
	this.down = null;
	this.left = null;
	this.right = null;
	this.keyboardControls = true;
}

PhSim.Widgets.SimpleEvent = function() {
	this.simpleEvent = true;
	this.trigger = null;
	this.action = null;
	this.args = []
}

PhSim.Widgets.InputBox = function() {
	this.trigger = null;
	this.text = null;
	this.buttonTxt = null;
	this.name = null;
	this.inputBox = true;
}

PhSim.Widgets.Alert = function() {
	this.buttonTxt = null;
	this.name = null;
	this.text = null;
	this.name = null;
	this.alert = true;
}


PhSim.Widgets.SimpleEvent.actionStruct = [
	"deleteSelf",
	"addScore",
	"subtractScore",
	"explodeSelf",
	"endGame",
	"goto"
]

// Connection Widget

PhSim.Widgets.Connection = function() {
	
	this.objectA = {
		"L": null,
		"O": null
	};

	this.objectB = {
		"L": null,
		"O": null
	};

	this.connection = true;
}

// 

// Composite Widget

PhSim.Widgets.Composite = function() {
	this.objUniverse = [];
	this.composite = true;
}

// Rotation Widget

PhSim.Widgets.Rotation = function() {
	this.trigger = null;
	this.rotation = true;
	this.key = null;
	this.cycle = null;
	this.circularConstraintRotation = null;
}

// Rotation Widget

PhSim.Widgets.SetAngle = function() {
	this.trigger = null;
	this.setAngle = true;
	this.key = null;
	this.cycle = null;
	this.circularConstraintRotation = null;
}

// Disable Rotation Widget

PhSim.Widgets.NoRotation = function() {
	this.noRotation = true;
}

// RectText Widget

PhSim.Widgets.RectText = function() {
	this.content = "";
	this.font = "";
	this.margin = 0;
	this.size = null;
	this.borderSize = 0;
	this.fill = "#000000";
	this.rectText = true;
	this.lineWidth = null;
	this.borderColor = null;
}

PhSim.Widgets.NumVar = function() {
	this.name = null;
	this.value = null;
	this.numVar = true;
}

PhSim.Widgets.SetNumVar = function() {
	this.value;
	this.name = null;
	this.trigger = null;
	this.setNumVar = true;
}

PhSim.Widgets.SetColor = function() {
	this.color = null;
	this.trigger = null;
	this.setColor = true;
}

PhSim.Widgets.SetBorderColor = function() {
	this.color = null;
	this.trigger = null;
	this.setBorderColor = true;
}

PhSim.Widgets.SetLineWidth = function() {
	this.lineWidth = null;
	this.trigger = null;
	this.setLineWidth = true;
}

PhSim.Widgets.Game = function() {
	this.life = null;
	this.goal = null;
	this.score = null;
	this.game = true;
}

PhSim.Widgets.PlayAudio = function() {
	this.trigger = null;
	this.src = null;
	this.playAudio = true;
}

PhSim.Widgets.RectText.valueStruc = {
	content: "",
	textAlign: ["start","end","left","right","center"],
	textBaseLine: ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"],
	direction: ["ltr","rtl"],
	font: ""
}

PhSim.Widgets.ObjLink_a = function() {
	this.trigger = null;

	this.target = {
		"L": 0,
		"O": 0
	};

	this.objLink_a = true;
}

PhSim.Widgets.ToggleLock = function() {
	this.toggleLock = true;
	this.trigger = null;
}

PhSim.Widgets.CircularConstraint = function() {
	this.x = 30;
	this.y = 30;
	this.circularConstraint = true;
}

PhSim.Widgets.RectText.alignStruct = [
	"left",
	"right",
	"center",
]

/*

Constraint types

*/

PhSim.Constraints = {
    Static: {}
}

PhSim.Constraints.Static.SingleObjectConstraint = function() {
	this.damping = 0,
	this.relativeEndPoint = new Vector();
	this.point = new Vector();
	this.object =  null;
	this.SingleObjectConstraint = true;
}

PhSim.Constraints.Static.DoubleObjectConstraint = function(rel1,rel2) {
	this.doubleObjectConstraint = true
}

PhSim.Constraints.Static.Constraint = function() {
	this.objectA = null;
	this.objectB = null;
	this.pointA = null;
	this.pointB = null;
	this.constraint = true;
}

