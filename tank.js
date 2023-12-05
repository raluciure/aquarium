function drawaquarium() {
  var viewMatrix = mat4.create();
  mat4.identity(viewMatrix);
  var modelMatrix = mat4.create();
  mat4.identity(modelMatrix);

  roomCollisionCheck();
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.01, 1000.0, app.pMatrix);

  vec3.negate(app.camera.position, app.camera.inversePosition)

  mat4.identity(app.mvMatrix)
  // camera position and rotations
  mat4.rotate(viewMatrix, degToRad(app.camera.pitch), [1, 0, 0]);
  // account for pitch rotation and light down vector
  mat4.rotate(viewMatrix, degToRad(app.camera.heading), [0, 1, 0]);
  mat4.translate(viewMatrix, app.camera.inversePosition);

  gl.useProgram(shaderProgram);

  var normalMatrix = mat3.create();
  mat4.toInverseMat3(viewMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  mat3.multiplyVec3(normalMatrix, app.lightVectorStatic, app.lightVector)
  mat4.multiplyVec3(viewMatrix, app.lightLocationStatic, app.lightLocation)
  gl.uniform3fv(shaderProgram.lightLocation, [0, 2, 2]);
  gl.uniform3fv(shaderProgram.lightVector, app.lightVector);

  setUniforms();
  mvPushMatrix();
  mvPushMatrix();
  mat4.scale(modelMatrix, [2, 2, 2])
  mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
  drawObject(app.models.room_floor, 0);
  if (app.cameramode != 2) {
    drawObject(app.models.room_walls, 0);
    drawObject(app.models.room_ceiling, 0);
  }
  mvPopMatrix();

  mvPushMatrix();
  mat4.scale(modelMatrix, [0.01, 0.01, 0.01]);
  mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
  mat4.scale(modelMatrix, [100, 100, 100]);
  mvPopMatrix();

  mvPushMatrix();
  mat4.scale(modelMatrix, [0.01, 0.01, 0.01]);
  mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
  mat4.translate(modelMatrix, [4, 0, 4]);
  mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
  mat4.scale(modelMatrix, [100, 100, 100]);
  mvPopMatrix();

  mvPushMatrix();
  mat4.scale(modelMatrix, [0.01, 0.01, 0.01]);
  mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
  mat4.translate(modelMatrix, [2, 0, 4]);
  mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
  mat4.scale(modelMatrix, [100, 100, 100]);
  mvPopMatrix();

  for (let i of fish) {
    if (i.type != -1) {
      mvPushMatrix();
      mat4.identity(modelMatrix);
      mat4.scale(modelMatrix, [2, 2, 2])
      i.y += i.v * Math.sin(degToRad(i.phi))
      i.x += i.v * Math.cos(degToRad(i.phi)) * Math.cos(degToRad(i.theta))
      i.z += i.v * Math.cos(degToRad(i.phi)) * Math.sin(degToRad(i.theta))

      if (i.phi > 30) {
        i.phi = 30
      }

      if (i.phi < -30) {
        i.phi = -30
      }

      var dirchangespeed = 1
      if (Math.abs(i.x) >= 8 || Math.abs(i.z) >= 8) {
        i.theta -= dirchangespeed
      }

      if (i.y >= 5) {
        i.phi -= dirchangespeed / 2
      }
      if (i.y < 3.5) {
        i.phi += dirchangespeed / 2
      }
      if (i.size < 0.1) {
        i.size += 0.00002
      }

      gl.uniform3fv(shaderProgram.lightSpecularColor, lightIntesity(0.05, 0.0, 0.0, 0.01));
      if (i.type == 0) {
        mat4.scale(modelMatrix, [fish1_coeff * i.size, fish1_coeff * i.size, fish1_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish1, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 1) {
        mat4.scale(modelMatrix, [codfish_coeff * i.size, codfish_coeff * i.size, codfish_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish2, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 2) {
        mat4.scale(modelMatrix, [goldfish_coeff * i.size, goldfish_coeff * i.size, goldfish_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish3, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 3) {
        mat4.scale(modelMatrix, [orca_coeff * i.size, orca_coeff * i.size, orca_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish4, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 4) {
        mat4.scale(modelMatrix, [dolphin_coeff * i.size, dolphin_coeff * i.size, dolphin_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish5, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 5) {
        mat4.scale(modelMatrix, [dolphin_coeff * i.size, dolphin_coeff * i.size, dolphin_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish6, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 6) {
        mat4.scale(modelMatrix, [dolphin_coeff * i.size, dolphin_coeff * i.size, dolphin_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish7, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 7) {
        mat4.scale(modelMatrix, [dolphin_coeff * i.size, dolphin_coeff * i.size, dolphin_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish8, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 8) {
        mat4.scale(modelMatrix, [dolphin_coeff * i.size, dolphin_coeff * i.size, dolphin_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish9, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      else if (i.type == 9) {
        mat4.scale(modelMatrix, [dolphin_coeff * i.size, dolphin_coeff * i.size, dolphin_coeff * i.size]);
        mat4.translate(modelMatrix, [i.x, i.y, i.z]);
        mat4.rotate(modelMatrix, degToRad(90 - i.theta), [0, 1, 0]);
        mat4.rotate(modelMatrix, degToRad(-i.phi), [1, 0, 0]);
        app.mvMatrix = mat4.identity();
        mat4.multiply(viewMatrix, modelMatrix, app.mvMatrix)
        drawObject(app.models.fish10, 100, [0.0, 0.0, 0.0, 0.0]);
      }
      mvPopMatrix();
    }
  }

  mvPushMatrix();
  mat4.translate(app.mvMatrix, [0, 2, 0]);
  gl.uniform3fv(shaderProgram.ambientColorUniform, lightIntesity(2.0, 1, 1, 1));
  drawObject(app.models.skylight, 0, [0.53, 0.81, 0.98, 1.0]);
  gl.uniform3fv(shaderProgram.ambientColorUniform, lightIntesity(app.ambientIntensity, 0.3, 0.3, 0.3));
  mvPopMatrix();

  mvPopMatrix();

  // use the particle shaders
  if (app.animate) {
    app.animations.currentAnimation();
  }
}

function roomCollisionCheck() {
  if (app.camera.position[X] > app.aquariumCollision) {
    app.camera.position[X] = app.aquariumCollision
  }
  if (app.camera.position[X] < -app.aquariumCollision) {
    app.camera.position[X] = -app.aquariumCollision
  }
  if (app.camera.position[Z] > app.aquariumCollision) {
    app.camera.position[Z] = app.aquariumCollision
  }
  if (app.camera.position[Z] < -app.aquariumCollision) {
    app.camera.position[Z] = -app.aquariumCollision
  }
}

app.drawScene = drawaquarium;


