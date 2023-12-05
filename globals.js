var X = 0, Y = 1, Z = 2, H = 3, P = 4;

// gl context
var gl;

// the canvas we're working with
var canvas;

var fish = [{ x: 5, y: 13, z: 0, v: 0.05, size: 0.1, type: 0, theta: 180, phi: 10 },
{ x: -15, y: 5, z: 0, v: 0.05, size: 0.1, type: 1, theta: -120, phi: 15 },
{ x: 20, y: 2, z: 0, v: 0.05, size: 0.1, type: 2, theta: 15, phi: 0 },
{ x: -35, y: 35, z: 0, v: 0.05, size: 0.1, type: 3, theta: 90, phi: 20 },
{ x: 30, y: 10, z: 2, v: 0.05, size: 0.1, type: 4, theta: 10, phi: 20 },
{ x: 45, y: 15, z: 2, v: 0.05, size: 0.1, type: 5, theta: 20, phi: 0 },
{ x: -35, y: 20, z: 2, v: 0.05, size: 0.1, type: 6, theta: -10, phi: 10 },
{ x: 20, y: 20, z: 2, v: 0.05, size: 0.1, type: 7, theta: 30, phi: 15 },
{ x: -40, y: 2, z: 2, v: 0.05, size: 0.1, type: 8, theta: 45, phi: 20 },
{ x: 12, y: 8, z: 0, v: 0.05, size: 0.1, type: 9, theta: -45, phi: 0 },
];

var fishselect = 0;
var nfish = fish.length;
var codfish_coeff = 0.4
var fish1_coeff = 0.4
var goldfish_coeff = 0.2
var orca_coeff = 0.2 
var dolphin_coeff = 0.3

var shaderProgram;
var light = 0;
var angle = 0;

// application var holder
var app = {};

// mesh holder
app.meshes = {};
// model holder
app.models = {};

// there is no need to have more than one texture holder because this model has a single texture image
app.textures = {};

// keyboard key ids
app.keys = { W: 87, A: 65, S: 83, D: 68 };
app.keys.pressed = {};
for (key in app.keys) {
  app.keys.pressed[app.keys[key]] = false;
}

// camera
app.camera = {};
app.cameramode = 0
app.camera.position = [0, 0.5, 4];
app.camera.inversePosition = vec3.create();
app.camera.heading = 0;
app.camera.pitch = 0;
app.camera.walkSpeed = 0.001;
app.camera.runSpeed = 0.002;
app.camera.speed = app.camera.walkSpeed;
app.camera.sensitivity = 10;
app.camera.disable = false;
app.camera.shake = false;
app.camera.shakeTimer = 0;
app.camera.shakeFrequency = 100;
app.camera.shakeAmplitude = 0.01;

app.elapsed = 0;
app.drawScene;
app.scenechange = false;

// room light
app.lightLocationStatic = [0, 2, 0];
app.lightVectorStatic = [0, -1, 0];
app.lightLocation = vec3.create();
app.lightVector = vec3.create();
app.ambientIntensity = 0.5;
app.diffuseIntensity = 2.0;
app.hasFlashlight = false;
app.mvMatrix = mat4.create();
app.mvMatrixStack = [];
app.pMatrix = mat4.create();

// animation references
app.lastTime = 0;
app.aquariumCollision = 3.5;

// animations
app.animate = false;
app.animations = {};
app.animations.currentAnimation = 0;

// walls
app.breakWalls = false;
app.wallScale = 1;

// turn around
app.animations.turnAroundTime = 1; // framelength in seconds
app.animations.turnAroundStartTime = 0;
