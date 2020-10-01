/*** 
 * 
 * 
 * Object Widgets
 * 
 * 
****/

var Widgets = {}

Widgets.Velocity = function() {
	this.velocity = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

//Widgets.VelocityKey.desc = "VelocityKey is a widget that allows the user to change the velocity of a physical object by some key."

Widgets.Force = function() {
	this.trigger = null;
	this.force = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

Widgets.Position = function() {
	this.trigger = null;
	this.position = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

Widgets.Translate = function() {
	this.trigger = null;
	this.translate = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
}

Widgets.Clone = function() {
	this.trigger = null;
	this.timeCloner = true;
	this.time = null;
	this.clone = true;
	this.key = null;
	this.vector = new PhSim.Objects.Vector(null,null);
	this.copyWidgets = true;
	this.maxN = null;
}

Widgets.DeleteSelf = function() {
	this.deleteSelf = true;
	this.trigger = null;
}

Widgets.PointInWidgetsReturn = function() {
	this.widget = null;
	this.point = null;
	this.pointInWidgetsReturn = true;
}

Widgets.Draggable = function() {
	this.draggable = true;
}

Widgets.Coin = function() {
	this.coin = true;
}

Widgets.Hazard = function() {
	this.hazard = true;
}

Widgets.Health = function() {
	this.health = true;
}

Widgets.Elevator = function() {
	
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

Widgets.TransformCameraByObj = function() {
	this.transformCameraByObj = true;
}

Widgets.TransformWithCamera = function() {
	this.transformWithCamera = true;
}

Widgets.KeyboardControls = function() {
	this.up = null;
	this.down = null;
	this.left = null;
	this.right = null;
	this.keyboardControls = true;
}

Widgets.SimpleEvent = function() {
	this.simpleEvent = true;
	this.trigger = null;
	this.action = null;
	this.args = []
}

Widgets.InputBox = function() {
	this.trigger = null;
	this.text = null;
	this.buttonTxt = null;
	this.name = null;
	this.inputBox = true;
}

Widgets.Alert = function() {
	this.buttonTxt = null;
	this.name = null;
	this.text = null;
	this.name = null;
	this.alert = true;
}


Widgets.SimpleEvent.actionStruct = [
	"deleteSelf",
	"addScore",
	"subtractScore",
	"explodeSelf",
	"endGame",
	"goto"
]

// Connection Widget

Widgets.Connection = function() {
	
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

Widgets.Composite = function() {
	this.objUniverse = [];
	this.composite = true;
}

// Rotation Widget

Widgets.Rotation = function() {
	this.trigger = null;
	this.rotation = true;
	this.key = null;
	this.cycle = null;
	this.circularConstraintRotation = null;
}

// Rotation Widget

Widgets.SetAngle = function() {
	this.trigger = null;
	this.setAngle = true;
	this.key = null;
	this.cycle = null;
	this.circularConstraintRotation = null;
}

// Disable Rotation Widget

Widgets.NoRotation = function() {
	this.noRotation = true;
}

// RectText Widget

Widgets.RectText = function() {
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

Widgets.NumVar = function() {
	this.name = null;
	this.value = null;
	this.numVar = true;
}

Widgets.SetNumVar = function() {
	this.value;
	this.name = null;
	this.trigger = null;
	this.setNumVar = true;
}

Widgets.SetColor = function() {
	this.color = null;
	this.trigger = null;
	this.setColor = true;
}

Widgets.SetBorderColor = function() {
	this.color = null;
	this.trigger = null;
	this.setBorderColor = true;
}

Widgets.SetLineWidth = function() {
	this.lineWidth = null;
	this.trigger = null;
	this.setLineWidth = true;
}

Widgets.Game = function() {
	this.life = null;
	this.goal = null;
	this.score = null;
	this.game = true;
}

Widgets.PlayAudio = function() {
	this.trigger = null;
	this.src = null;
	this.playAudio = true;
}

Widgets.RectText.valueStruc = {
	content: "",
	textAlign: ["start","end","left","right","center"],
	textBaseLine: ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"],
	direction: ["ltr","rtl"],
	font: ""
}

Widgets.ObjLink_a = function() {
	this.trigger = null;

	this.target = {
		"L": 0,
		"O": 0
	};

	this.objLink_a = true;
}

Widgets.ToggleLock = function() {
	this.toggleLock = true;
	this.trigger = null;
}

Widgets.CircularConstraint = function() {
	this.x = 30;
	this.y = 30;
	this.circularConstraint = true;
}

Widgets.RectText.alignStruct = [
	"left",
	"right",
	"center",
]

export default Widgets;