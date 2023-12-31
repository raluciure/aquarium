function webGLStart(meshes) {
  app.meshes = meshes;
  canvas = document.getElementById("mycanvas");
  initGL(canvas);
  initShaders();
  initBuffers();
  initPointerLock();
  initTextures();

  document.onkeydown = cameraKeyDownHandler;
  document.onkeyup = cameraKeyUpHandler;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  tick();
}

window.onload = function () {
  OBJ.downloadMeshes({
    'room_walls': 'models/room_walls.obj',
    'room_ceiling': 'models/room_ceiling.obj',
    'room_floor': 'models/room_floor.obj',
    'room_wall_broken': 'models/room_wall_broken.obj',
    'room_wall_unbroken': 'models/room_wall_unbroken.obj',
    'fish1': 'models/goldfish.obj',
    'fish2': 'models/goldfish.obj',
    'fish3': 'models/goldfish.obj',
    'fish4': 'models/goldfish.obj',
    'fish5': 'models/goldfish.obj',
    'fish6': 'models/goldfish.obj',
    'fish7': 'models/goldfish.obj',
    'fish8': 'models/goldfish.obj',
    'fish9': 'models/goldfish.obj',
    'fish10': 'models/goldfish.obj',
  },
    webGLStart
  );
};

function animate() {
  app.timeNow = new Date().getTime();
  app.elapsed = app.timeNow - app.lastTime;
  if (app.lastTime != 0) {
    // animate stuff
    if (!app.camera.disable) {
      cameraMove();
    }
    if (app.camera.shake) {
      cameraShake();
    }
  }
  app.lastTime = app.timeNow;
}

function tick() {
  requestAnimFrame(tick);
  app.drawScene();
  animate();
}