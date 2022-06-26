function drawObjects() {
  /// DRAWING BG and Floor 
  for(let obj of bgObjs)
      obj.draw();
  for(let obj of floorObjs)
    if(!obj.item)
      obj.draw()
  c.save();
  MakeShadow(6, -3, 12, 'rgba(0,20,0,0.20)');
  for(let obj of floorObjs)
    if(obj.item)
      obj.draw();
  /// DRAWING PLAYER
  for(let obj of inventoryObjs)
    if(player.image === player.sprites.up) {
      obj.position = {
        x: player.position.x + Tiles(1) / 6,
        y: player.position.y + 20
      }
      obj.draw();
    }

  for(let obj of playerObjs)
    obj.draw();
  
  for(let obj of inventoryObjs) {
    if(player.image === player.sprites.left) {
      obj.position = {
        x: player.position.x + Tiles(1) / 6 - 20,
        y: player.position.y + Tiles(1) / 3 + 8
      }
      obj.draw();
    }
    else if(player.image === player.sprites.right) {
      obj.position = {
        x: player.position.x + Tiles(1) / 6 + 20,
        y: player.position.y + Tiles(1) / 3 + 8
      }
      obj.draw();
    }
    else if(player.image === player.sprites.down) {
      obj.position = {
        x: player.position.x + Tiles(1) / 6,
        y: player.position.y + Tiles(1) / 3 + 8
      }
      obj.draw();
    }
  }
  c.restore();
  for(let obj of upperObjs)
    obj.draw();
  /// INTERACT W/ OBJECTS
  for(let obj of interactableObjs) {
    if(IsInView(obj) && CollisionDetectionRange(player, obj, GLOB_interactionRange)) {
      c.globalAlpha = 0.8;
      iconInteract.position = {
          x: player.position.x,
          y: player.position.y - 75
        }
      iconInteract.draw();
      c.globalAlpha = 1;
      break;
    }
  }
  if(!inventoryObj) {
    for(let obj of itemsObjs)
      if(IsInView(obj) && obj.location === "floor" && CollisionDetection(player, obj)) {
        c.globalAlpha = 0.8;
        iconPickup.position = {
          x: obj.position.x,
          y: obj.position.y - 75
        }
        iconPickup.draw();
        c.globalAlpha = 1;
        break;
      }
  }
  else {
  /// PUT DOWN ITEMS
    if(keys.p.pressed && pickupTimer > pickupTimerCap) {
      player.pickup(inventoryObj);
      pickupTimer = 0;
    }
  }
  if(GLOB_debug)
    for(let obj of debugObjs)
        obj.draw();
}

  /// ANIMATE
let drawTimer = 0;
let GameSpeed = 1;
let timer = 0;
let startTime = new Date().getTime();
let endTime = 0;
let arrayFrames = [0, 0, 0, 0, 0];

function checkFrames () {
  if(timer === 0) {
    endTime = new Date().getTime();
    timer = 60;
    let frames60 = (endTime - startTime) / GameSpeed + 1
    arrayFrames.unshift(frames60);
    arrayFrames = [arrayFrames[0], arrayFrames[1], arrayFrames[2], arrayFrames[3], arrayFrames[4]]
    if(GLOB_movingSpeed === 3 && arrayFrames[0] > 400 && arrayFrames[1] > 400 && arrayFrames[2]  > 400 && arrayFrames[3]  > 400 && arrayFrames[4]  > 400) {
      GameSpeed = 1;
      GLOB_movingSpeed = 4;
      console.log(arrayFrames);
      console.log(timer + ` frames took: ${frames60}ms`);
      console.log('Setting GameSpeed as ' + GameSpeed)
      console.log('Setting MovingSpeed as ' + GLOB_movingSpeed)
    }
    else if(GameSpeed === 2 && arrayFrames[0] < 400 && arrayFrames[1] < 400 && arrayFrames[2]  < 400 && arrayFrames[3]  < 400 && arrayFrames[4]  < 400) {
      GameSpeed = 1;
      GLOB_movingSpeed = 3;
      console.log(arrayFrames);
      console.log(timer + ` frames took: ${frames60}ms`);
      console.log('Setting GameSpeed as ' + GameSpeed)
      console.log('Setting MovingSpeed as ' + GLOB_movingSpeed)
    } 
    else if(GLOB_movingSpeed === 4 && arrayFrames[0] > 450 && arrayFrames[1] > 450 && arrayFrames[2]  > 450 && arrayFrames[3]  > 450 && arrayFrames[4]  > 450) {
      GameSpeed = 1;
      GLOB_movingSpeed = 5;
      console.log(arrayFrames);
      console.log(timer + ` frames took: ${frames60}ms`);
      console.log('Setting GameSpeed as ' + GameSpeed)
      console.log('Setting MovingSpeed as ' + GLOB_movingSpeed)
    }
    else if(GLOB_movingSpeed === 5 && arrayFrames[0] > 500 && arrayFrames[1] > 450 && arrayFrames[2]  > 500 && arrayFrames[3]  > 500 && arrayFrames[4]  > 500) {
      GameSpeed = 1;
      GLOB_movingSpeed = 6;
      console.log(arrayFrames);
      console.log(timer + ` frames took: ${frames60}ms`);
      console.log('Setting GameSpeed as ' + GameSpeed)
      console.log('Setting MovingSpeed as ' + GLOB_movingSpeed)
    }
    startTime = new Date().getTime();
  }
  else {
    timer--;
  }
}

function animate() { 
  window.requestAnimationFrame(animate);
  checkFrames();
  if(drawTimer >= GameSpeed) {
    drawTimer = 0;
    drawObjects();
  }
  else {
    drawTimer++
  }
  /// PLAYER MOVEMENT
  player.moving = false;
  if(keys.w.pressed)
    HandlePlayerMovement("North");
  if(keys.d.pressed)
    HandlePlayerMovement("East");
  if(keys.s.pressed)
    HandlePlayerMovement("South");
  if(keys.a.pressed)
    HandlePlayerMovement("West");
  /// PICKUP ITEMS
  if(pickupTimer <= pickupTimerCap)
    pickupTimer++;
  if(!inventoryObj) {
    for(let obj of itemsObjs)
      if(IsInView(obj) && obj.location === "floor" && CollisionDetection(player, obj)) {
        if(keys.p.pressed && pickupTimer > pickupTimerCap) {
          player.pickup(obj);
          pickupTimer = 0;
          break;
        }
      }
  }
  for(let obj of interactableObjs) {
    if(IsInView(obj) && CollisionDetectionRange(player, obj, GLOB_interactionRange)) {
      if(keys.e.pressed && pickupTimer > pickupTimerCap) {
          player.interact(obj);
          pickupTimer = 0;
          break;
      }
    }
  }
}

  