
function MakeShadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor) {
  c.shadowOffsetX = shadowOffsetX;
  c.shadowOffsetY = shadowOffsetY;
  c.shadowBlur = shadowBlur;
  c.shadowColor = shadowColor;
}

function CreateImage(imagename, custom_path = false) {
    const output = new Image();
    if(custom_path)
        output.src = imagename;
    else
        output.src = './img/' + imagename + '-' + GLOB_exportRatio + '.png';
    return output;
}

/// OBJ COLLISION

function CollisionDetection (objOne, objTwo, dir = "none") {
    //    west: (objOne.position.x < objTwo.position.x +  objTwo.width),
    //    east:(objOne.position.x + objOne.width > objTwo.position.x),
    //    north: (objOne.position.y < objTwo.position.y +  objTwo.height),
    //    south: (objOne.position.y +  objOne.height > objTwo.position.y),
    //    overall: false

    // output: (objOne.position.x < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width > objTwo.position.x) && (objOne.position.y < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height > objTwo.position.y)

  switch(dir) {
      case 'North':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 30, objOne.position.y + 10, objOne.width - 60, objOne.height - 12)
          c.globalAlpha = 1;
        }
        return (objOne.position.x + 30 < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width - 30 > objTwo.position.x) && (objOne.position.y + 10 < objTwo.position.y +  objTwo.height) && (objOne.position.y - 2 +  objOne.height > objTwo.position.y)
      case 'East':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 32, objOne.position.y + 12, objOne.width - 60, objOne.height - 12)
          c.globalAlpha = 1;
        }
        return (objOne.position.x + 32 < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width - 28 > objTwo.position.x) && (objOne.position.y + 12 < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height > objTwo.position.y)
      case 'South':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 30, objOne.position.y + 12, objOne.width - 60, objOne.height - 10)
          c.globalAlpha = 1;
        }
        return (objOne.position.x + 30 < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width - 30 > objTwo.position.x) && (objOne.position.y + 12 < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height + 2 > objTwo.position.y)
      case 'West':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 28, objOne.position.y + 12, objOne.width - 60, objOne.height - 12)
          c.globalAlpha = 1;
        }
        return (objOne.position.x + 28 < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width - 32 > objTwo.position.x) && (objOne.position.y + 12 < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height > objTwo.position.y)
      default:
        if(GLOB_debug) {
          c.fillStyle = 'red'
          c.globalAlpha = 0.1;
          c.fillRect(objOne.position.x, objOne.position.y, objOne.width, objOne.height)
          c.globalAlpha = 1;
        }
        return (objOne.position.x < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width > objTwo.position.x) && (objOne.position.y < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height > objTwo.position.y)
  }
}

function CollisionDetectionRange(objOne, objTwo, range) {
  if(GLOB_debug) {
    c.fillStyle = 'blue'
    c.globalAlpha = 0.1;
    c.fillRect(objOne.position.x - range , objOne.position.y - range , objOne.width + range*2, objOne.height + range*2)
    c.globalAlpha = 1;
  }
  return (objOne.position.x - range < objTwo.position.x +  objTwo.width) && (objOne.position.x +  objOne.width + range > objTwo.position.x) && (objOne.position.y - range < objTwo.position.y +  objTwo.height) && (objOne.position.y +  objOne.height + range > objTwo.position.y)
}

//// Handle player movement

function HandlePlayerMovement(dir) {
  let canmove = true;
  player.moving = true;
  switch(dir) {
    case 'North':
      player.image = player.sprites.up;
      for(let obj of solidObjs)
        if(CollisionDetection(player, obj, dir, 2)) canmove = false;
      if(!canmove)
        break;
      if(player.position.y <= background.position.y + Tiles(3) || player.position.y > Tiles(3)) {
        for(let obj of playerObjs)
          obj.position.y -= GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.y += GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.y += GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.y += GLOB_movingSpeed;
      break;
    case 'East':
      player.image = player.sprites.right;
      for(let obj of solidObjs)
        if(CollisionDetection(player, obj, dir, 2)) canmove = false;
      if(!canmove)
        break;
      if(player.position.x >= background.width  + background.position.x - Tiles(6) ||  player.position.x < Tiles(5)) {
        for(let obj of playerObjs)
          obj.position.x += GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.x -= GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.x -= GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.x -= GLOB_movingSpeed;
      break;
    case 'South':
      player.image = player.sprites.down;
      for(let obj of solidObjs)
        if(CollisionDetection(player, obj, dir, 2)) canmove = false;
      if(!canmove)
        break;
      if(player.position.y >= background.position.y + background.height - Tiles(4) || player.position.y < Tiles(3)) {
        for(let obj of playerObjs)
          obj.position.y += GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.y -= GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.y -= GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.y -= GLOB_movingSpeed;
      break;
    case 'West':
      player.image = player.sprites.left;
      for(let obj of solidObjs)
        if(CollisionDetection(player, obj, dir, 2)) canmove = false;
      if(!canmove)
        break;
      if(player.position.x <= background.position.x + Tiles(5) ||  player.position.x > Tiles(5)) {
        for(let obj of playerObjs)
          obj.position.x -= GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.x += GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.x += GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.x += GLOB_movingSpeed;
      break;
  }
}
