
function MakeShadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor) {
  c.shadowOffsetX = shadowOffsetX;
  c.shadowOffsetY = shadowOffsetY;
  c.shadowBlur = shadowBlur;
  c.shadowColor = shadowColor;
}

function CreateImage(imagename, folder = false, custom_path = false) {
  const output = new Image();
  if(custom_path)
    output.src = imagename;
  else {
    if(folder) {
      folder = folder + '/';
      output.src = './img/' + folder + imagename + '-' + GLOB_exportRatio + '.png';
    }
    else
      output.src = './img/' + imagename + '-' + GLOB_exportRatio + '.png';
  }
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
          c.fillRect(objOne.position.x + 30, objOne.position.y + 60 - GLOB_movingSpeed, objOne.width - 60, objOne.height - 60  + GLOB_movingSpeed)
          c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 >= objTwo.position.x) && 
                (objOne.position.y + 60 - GLOB_movingSpeed <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y + objOne.height >= objTwo.position.y);
      case 'East':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 30, objOne.position.y + 60, objOne.width - 60 + GLOB_movingSpeed, objOne.height - 60)
          c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 + GLOB_movingSpeed >= objTwo.position.x) && 
                (objOne.position.y + 60 <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height >= objTwo.position.y);
      case 'South':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 30, objOne.position.y + 60, objOne.width - 60, objOne.height - 60 + GLOB_movingSpeed)
          c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 >= objTwo.position.x) && 
                (objOne.position.y + 60 <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height + GLOB_movingSpeed >= objTwo.position.y);
      case 'West':
        if(GLOB_debug) {
          c.fillStyle = 'yellow'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x + 30 - GLOB_movingSpeed, objOne.position.y + 60, objOne.width - 60 + GLOB_movingSpeed, objOne.height - 60)
          c.globalAlpha = 1;
        }
        return  (objOne.position.x + 30 - GLOB_movingSpeed <= objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width - 30 >= objTwo.position.x) && 
                (objOne.position.y + 60 <= objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height >= objTwo.position.y);
      default:
        if(GLOB_debug) {
          c.fillStyle = 'red'
          c.globalAlpha = 0.01;
          c.fillRect(objOne.position.x, objOne.position.y, objOne.width, objOne.height)
          c.globalAlpha = 1;
        }
        return  (objOne.position.x < objTwo.position.x +  objTwo.width) && 
                (objOne.position.x +  objOne.width > objTwo.position.x) && 
                (objOne.position.y < objTwo.position.y +  objTwo.height) && 
                (objOne.position.y +  objOne.height > objTwo.position.y);
  }
}

function CollisionDetectionRange(objOne, objTwo, range) {
  if(GLOB_debug) {
    c.fillStyle = 'blue'
    c.globalAlpha = 0.1;
    c.fillRect(objOne.position.x - range , objOne.position.y - range , objOne.width + range*2, objOne.height + range*2)
    c.globalAlpha = 1;
  }
  return  (objOne.position.x - range < objTwo.position.x +  objTwo.width) && 
          (objOne.position.x +  objOne.width + range > objTwo.position.x) && 
          (objOne.position.y - range < objTwo.position.y +  objTwo.height) && 
          (objOne.position.y +  objOne.height + range > objTwo.position.y);
}

//// Handle player movement

function HandlePlayerMovement(dir) {
  let canmove = true;
  player.moving = true;
  switch(dir) {
    case 'North':
      player.image = player.sprites.up;
      for(let obj of solidObjs)
        if(IsInView(obj) && CollisionDetection(player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(player.position.y <= background.position.y + Tiles(3) || player.position.y > Tiles(3)) {
        for(let obj of playerObjs)
          obj.position.y -= GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.y += GLOB_movingSpeed;
      for(let obj of upperObjs)
        obj.position.y += GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.y += GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.y += GLOB_movingSpeed;
      break;
    case 'East':
      player.image = player.sprites.right;
      for(let obj of solidObjs)
        if(IsInView(obj) && CollisionDetection(player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(player.position.x >= background.width  + background.position.x - Tiles(6) ||  player.position.x < Tiles(5)) {
        for(let obj of playerObjs)
          obj.position.x += GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.x -= GLOB_movingSpeed;
      for(let obj of upperObjs)
        obj.position.x -= GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.x -= GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.x -= GLOB_movingSpeed;
      break;
    case 'South':
      player.image = player.sprites.down;
      for(let obj of solidObjs)
        if(IsInView(obj) && CollisionDetection(player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(player.position.y >= background.position.y + background.height - Tiles(4) || player.position.y < Tiles(3)) {
        for(let obj of playerObjs)
          obj.position.y += GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.y -= GLOB_movingSpeed;
      for(let obj of upperObjs)
        obj.position.y -= GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.y -= GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.y -= GLOB_movingSpeed;
      break;
    case 'West':
      player.image = player.sprites.left;
      for(let obj of solidObjs)
        if(IsInView(obj) && CollisionDetection(player, obj, dir)) canmove = false;
      if(!canmove)
        break;
      if(player.position.x <= background.position.x + Tiles(5) ||  player.position.x > Tiles(5)) {
        for(let obj of playerObjs)
          obj.position.x -= GLOB_movingSpeed;
        break;
      }
      for(let obj of floorObjs)
        obj.position.x += GLOB_movingSpeed;
      for(let obj of upperObjs)
        obj.position.x += GLOB_movingSpeed;
      for(let obj of bgObjs)
        obj.position.x += GLOB_movingSpeed;
      for(let obj of debugObjs)
        obj.position.x += GLOB_movingSpeed;
      break;
  }
}


function PickRand(...array) {
  for(let item of array) {
    if(Array.isArray(item))
      return item[Math.floor(Math.random()*item.length)];
    else
      return array[Math.floor(Math.random()*array.length)];
  }
}

function PopulateAreaWith(areaX, areaY, areaWidth, areaHeight, leafs = 0, rocks = 0, mushrooms = 0) {
  let locArray = [];
  for(let i = areaX; i < areaX + areaWidth;) {
    for(let j = areaY; j < areaY + areaHeight;) {
      locArray.push([i, j]);
      j += Tiles(1);
    }
    i += Tiles(1);
  }
  for(let i = 0; i < leafs; i++) {
    //name
    const objNumber = PickRand(1, 2, 3);
    //location
    const locIndex = Math.floor(Math.random()*locArray.length);
    const loc = locArray[locIndex];
    //clearing locArray
    locArray.splice(locIndex, 1)
    // creating an obj
    const imageDroplet = CreateImage('leaf' + objNumber + 'Droplet', 'leafs');
    const newObj = new Sprite({
      name: "leaf",
      position: {
        x: GLOB_bgOffset.x + loc[0],
        y: GLOB_bgOffset.y + loc[1]
      },
      image: 'leaf' + objNumber,
      location: "floor",
      item: true,
      sprites: {
        default: this.image,
        droplet: imageDroplet
      },
      folder: 'leafs'
    });
  }
  for(let i = 0; i < rocks; i++) {
    //name
    const objType = PickRand('Small', 'Medium', 'Large');
    const objNumber = PickRand(1, 2)
    //location
    let foundLoc = false;
    let foundLocTimer = 0;
    let locIndex = 0;
    let loc = 0;
    while (!foundLoc) {
      locIndex = Math.floor(Math.random()*locArray.length);
      loc = locArray[locIndex];
      if(objType === 'Small')
        foundLoc = true;
      if(objType === 'Medium')
        if(locArray.find(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]))
          foundLoc = true;
      if(objType === 'Large')
        if(locArray.find(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]) && locArray.find(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1]))
          foundLoc = true;
      if(foundLocTimer > locArray.length*5)
        foundLoc = 2; // failed to find a loc
      foundLocTimer++;
    }
    if(foundLoc === 2) break;

    // making sure no more obj will spawn nearby
    locArray.splice(locIndex, 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] - Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] + Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] - Tiles(1) && element[1] === loc[1]), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]), 1)
    if(objType === 'Medium' || objType === 'Large') {
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1] + Tiles(1)), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1] - Tiles(1)), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1]), 1)
    }
    if(objType === 'Large') {
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(3) && element[1] === loc[1]), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1] + Tiles(1)), 1)
      locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(2) && element[1] === loc[1] - Tiles(1)), 1)
    }

    // creating the obj
    const newObj = new Sprite({
      name: "rocks",
      position: {
          x: GLOB_bgOffset.x + loc[0],
          y: GLOB_bgOffset.y + loc[1]
      },
      image: 'rocks' + objType + objNumber,
      location: "floor",
      solid: true,
      upperImage: objType === 'Small' ? false : ('rocks' + objType + objNumber + 'upper'),
      folder: 'rocks'
    });
  }
  for(let i = 0; i < mushrooms; i++) {
    //name
    const objType = PickRand('Small', 'Medium', 'Large');
    const objColor = PickRand('Red', 'Brown');
    const objNumber = objColor === 'Brown' ? '1' : (PickRand(1, 2, 3));
    //location
    const locIndex = Math.floor(Math.random()*locArray.length);
    const loc = locArray[locIndex];
    //clearing locArray
    locArray.splice(locIndex, 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] - Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] && element[1] === loc[1] + Tiles(1)), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] - Tiles(1) && element[1] === loc[1]), 1)
    locArray.splice(locArray.findIndex(element => element[0] === loc[0] + Tiles(1) && element[1] === loc[1]), 1)
    // creating an obj
    const newObj = new Sprite({
      name: "mushroom",
      position: {
          x: GLOB_bgOffset.x + loc[0],
          y: GLOB_bgOffset.y + loc[1]
      },
      image: 'mushroom' + objColor + objType + objNumber,
      location: "floor",
      solid: objType === 'Small' ? false : true,
      upperImage: objType === 'Large' ? ('mushroom' + objColor +  objType + objNumber + 'upper') : false,
      folder: 'mushrooms',
      item: objType === 'Small' ? true : false
    });
  }
}

function IsInView(obj) {
  return !(obj.position.x + obj.width < 0 || obj.position.y + obj.height < 0 || obj.position.x > Tiles(11) || obj.position.y >= Tiles(7))
}
