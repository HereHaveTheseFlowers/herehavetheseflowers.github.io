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
    if(GLOB_movingSpeed > 3 && arrayFrames[0] < 400 && arrayFrames[1] < 400 && arrayFrames[2]  < 400 && arrayFrames[3]  < 400 && arrayFrames[4]  < 400) {
      GLOB_movingSpeed--;
      console.log(arrayFrames);
      console.log(timer + ` frames took: ${frames60}ms`);
      console.log('Setting MovingSpeed as ' + GLOB_movingSpeed)
    } 
    else if(GLOB_movingSpeed < 6 && arrayFrames[0] > 400 && arrayFrames[1] > 400 && arrayFrames[2]  > 400 && arrayFrames[3]  > 400 && arrayFrames[4]  > 400) {
      GLOB_movingSpeed++;
      console.log(arrayFrames);
      console.log(timer + ` frames took: ${frames60}ms`);
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
    for(let level of levels)
      if(level.active) level.draw();
  }
  else {
    drawTimer++
  }
  /// PLAYER MOVEMENT
  player.moving = false;
  if(Game.state !== "normal") return;
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
      if(obj.level === player.level && IsInView(obj) && obj.location === "floor" && CollisionDetection(player, obj)) {
        if(keys.p.pressed && pickupTimer > pickupTimerCap) {
          player.pickup(obj);
          pickupTimer = 0;
          break;
        }
      }
  }
  for(let obj of interactableObjs) {
    if(obj.level === player.level && IsInView(obj) && CollisionDetectionRange(player, obj, GLOB_interactionRange)) {
      if(keys.e.pressed && pickupTimer > pickupTimerCap) {
          player.interact(obj);
          pickupTimer = 0;
          break;
      }
    }
  }
}

  