function initPointerLock() {
  gl.viewportWidth = canvas.width = window.innerWidth;
  gl.viewportHeight = canvas.height = window.innerHeight;
}

function cameraKeyDownHandler(e) {
  app.keys.pressed[e.which] = true;
  
  if (e.which === 16) {
    app.camera.speed = app.camera.runSpeed;
  }
  
  if (e.which === 88) {
    fishselect = (fishselect + 1) % nfish
  }

  if (e.which === 90) {
    fishselect = (fishselect - 1 + nfish) % nfish
  }

  if (e.which === 75) {
    if (fishselect > -1) {
      fish.splice(fishselect, 1);
    }
  }

}

function cameraKeyUpHandler(e) {
  app.keys.pressed[e.which] = false;
  if (e.which == 16) {
    app.camera.speed = app.camera.walkSpeed;
  }
}

function cameraShake() {
  app.camera.shakeTimer = app.camera.shakeTimer > Math.PI * 2 ? 0 : app.camera.shakeTimer + 0.01;
  app.camera.heading += app.camera.shakeAmplitude * Math.sin(app.camera.shakeTimer * app.camera.shakeFrequency);
  app.camera.pitch += app.camera.shakeAmplitude * Math.sin(app.camera.shakeTimer * app.camera.shakeFrequency);
}

function cameraMove() {
  var distance = app.elapsed * app.camera.speed;
  var camX = 0, camY = 0, camZ = 0;
  if (app.cameramode == 0) {
    var pitchFactor = 1;
    // forward
    if (app.keys.pressed[app.keys.W]) {
      camX += distance * Math.sin(degToRad(app.camera.heading)) * pitchFactor;
      camY += distance * Math.sin(degToRad(app.camera.pitch)) * pitchFactor * -1.0
      camZ += distance * Math.cos(degToRad(app.camera.heading)) * pitchFactor * -1.0;
    }
    // backward
    if (app.keys.pressed[app.keys.S]) {
      camX += distance * Math.sin(degToRad(app.camera.heading)) * pitchFactor * -1.0;
      camZ += distance * Math.cos(degToRad(app.camera.heading)) * pitchFactor;
      camY += distance * Math.sin(degToRad(app.camera.pitch)) * pitchFactor
    }
    // strafing right
    if (app.keys.pressed[app.keys.D]) {
      camX += distance * Math.cos(degToRad(app.camera.heading));
      camZ += distance * Math.sin(degToRad(app.camera.heading));
    }
    // strafing left
    if (app.keys.pressed[app.keys.A]) {
      camX += -distance * Math.cos(degToRad(app.camera.heading));
      camZ += -distance * Math.sin(degToRad(app.camera.heading));
    }

    if (camX > distance)
      camX = distance;
    if (camX < -distance)
      camX = -distance;
    if (camZ > distance)
      camZ = distance;
    if (camZ < -distance)
      camZ = -distance;

    app.camera.position[X] += camX;
    app.camera.position[Y] += camY;
    app.camera.position[Z] += camZ;
  }
  else if (app.cameramode == 1) {

    app.camera.position[X] = 0.5 + (fish[fishselect].x - fish[fishselect].x / 4) / 4;
    app.camera.position[Y] = 0.5 + fish[fishselect].y / 4;
    app.camera.position[Z] = 0.5 + (fish[fishselect].z - fish[fishselect].z / 4) / 4;
  }
  else if (app.cameramode == 2) {
    app.camera.position[X] = 15
    app.camera.position[Y] = 2;
    app.camera.position[Z] = 0;
  }

}
