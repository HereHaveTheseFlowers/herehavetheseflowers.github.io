
mainCanvas.style.display = 'none';
const el = document.querySelector('.text');
const chat = new TextFlow(el);
mainCanvas.width = 1056;
mainCanvas.height = 672; 
const c = mainCanvas.getContext('2d');

/// IMAGE UPLOAD

const playerDownImage = CreateImage('playerDown');
const playerUpImage = CreateImage('playerUp');
const playerLeftImage = CreateImage('playerLeft');
const playerRightImage = CreateImage('playerRight');

const imageBG = CreateImage('bg2');
const imageGrid = CreateImage('grid');
const imageBorder = CreateImage('border');

const imagePool = CreateImage('pool');
const imageRocks1 = CreateImage('rocks1');
const imageRocks2 = CreateImage('rocks2');

const imageLeaf = CreateImage('leaf');
const imageLeafDroplet = CreateImage('leafDroplet');

const imageSeed = CreateImage('seed');

const imageIconInteract = CreateImage('IconInteract');
const imageIconPickup = CreateImage('IconPickup');

////////////////////////
//// PLAYER AND ICONS //
////////////////////////
const player = new Sprite({
  name: "player",
  position: {
    x: Tiles(5),
    y: Tiles(3)
    //x: mainCanvas.width / 2 - GLOB_playerSpriteWidth / 4 / 2, //SEARCHING FOR CENTER MANUALLY
    //y: mainCanvas.height / 2 -  GLOB_playerSpriteHeight / 2
  },
  image: playerDownImage,
  frames: { max: 4 },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    right: playerRightImage,
    left: playerLeftImage
  },
  location: "player"
});
let inventoryObj = false;

player.pickup = function(obj) {
  if(!obj.item || !CollisionDetection(player, obj))
    return false;
  if(inventoryObj) {
    obj.position = {
      x: player.position.x,
      y: player.position.y
    }
    obj.size = 1;
    obj.moveLocation("floor");
    chat.setText("You placed a " + obj.name + ' on the ground.')
    inventoryObj = false;
  }
  else {
    inventoryObj = obj;
    obj.size = 1.5;
    obj.moveLocation("inventory");
    chat.setText("You picked up a " + obj.name + '.')
  }
}

player.interact = function(obj) {
  if(!obj || !CollisionDetectionRange(player, obj, GLOB_interactionRange))
    return false;
  obj.interact(player)
}

const iconInteract = new Sprite({
  name: "IconInteract",
  frames: { max: 6 },
  position: {
    x: Tiles(5),
    y: Tiles(2)
  },
  animationFrameRate: 50,
  image: imageIconInteract
});

const iconPickup= new Sprite({
  name: "iconPickup",
  frames: { max: 6 },
  position: {
    x: 0,
    y: 0
  },
  animationFrameRate: 50,
  image: imageIconPickup
});
////////////////////////
//// BG AND DEBUG   ////
////////////////////////

const background = new Sprite({
  name: "background",
  position: {
      x: GLOB_bgOffset.x,
      y: GLOB_bgOffset.y
  },
  image: imageBG,
  location: "bg"
});

background.postLoad = function() {
  if(this.name === "background") {
    for(let i = 0; i < background.width / GLOB_tileSize; i++) {
      const imageBorderCycles = CreateImage('border');
      const imageBorderCycles2 = CreateImage('border');
      const imageBorderCycles3 = CreateImage('border');
      const imageBorderCycles4 = CreateImage('border');
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + Tiles(i),
              y: GLOB_bgOffset.y - Tiles(1)
          },
          image: imageBorderCycles,
          location: "debug",
          solid: true
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + Tiles(i),
              y: GLOB_bgOffset.y + background.height
          },
          image: imageBorderCycles2,
          location: "debug",
          solid: true
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x - Tiles(1),
              y: GLOB_bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles3,
          location: "debug",
          solid: true
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + background.width,
              y: GLOB_bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles4,
          location: "debug",
          solid: true
      });
    }
  }
}

const grid = new Sprite({
  name: "grid",
  position: {
      x: GLOB_bgOffset.x,
      y: GLOB_bgOffset.y
  },
  image: imageGrid,
  location: "debug"
});

/* use this for creating invisible borders
const border = new Sprite({
  name: "border",
  position: {
      x: GLOB_bgOffset.x + Tiles(2),
      y: GLOB_bgOffset.y + Tiles(2)
  },
  image: imageBorder,
  location: "debug",
  solid: true
});
*/

////////////////////////
//// FLOOR NON-ITEMS////
////////////////////////

const pool = new Sprite({
  name: "pool",
  position: {
      x: GLOB_bgOffset.x + Tiles(5),
      y: GLOB_bgOffset.y + Tiles(6)
  },
  image: imagePool,
  frames: { max: 2 },
  animationFrameRate: 150,
  location: "floor",
  solid: true,
  interactable: true
});

pool.interact = function(obj) {
  if(inventoryObj === leaf) {
    if(inventoryObj.image === leaf.sprites.droplet)
      chat.setText('You already have a droplet on your leaf!');
    else {
      chat.setText('You fill the leaf with a droplet of water.');
      leaf.image = leaf.sprites.droplet;
    }
  }
  else
    chat.setText('You can fill something with water.');
}

const rocks1 = new Sprite({
  name: "rocks1",
  position: {
      x: GLOB_bgOffset.x + Tiles(6),
      y: GLOB_bgOffset.y + Tiles(2)
  },
  image: imageRocks1,
  location: "floor",
  solid: true,
  upperImage: "rocks1upper"
});

const rocks2 = new Sprite({
  name: "rocks2",
  position: {
      x: GLOB_bgOffset.x + Tiles(12),
      y: GLOB_bgOffset.y + Tiles(2)
  },
  image: imageRocks2,
  location: "floor",
  solid: true,
  upperImage: "rocks2upper"
});


/* Example on how to generate multiple objects automatically
for(let b = 0; b < 10; b++) {
  const image1 = CreateImage('rocks1');
  new Sprite({
    name: "rocks1",
    position: {
        x: GLOB_bgOffset.x + Tiles(b*3),
        y: GLOB_bgOffset.y + 1
    },
    image: image1,
    location: "floor",
    solid: true
  });
}
*/

////////////////////////
//// FLOOR ITEMS    ////
////////////////////////

const leaf = new Sprite({
  name: "leaf",
  position: {
      x: GLOB_bgOffset.x + Tiles(9),
      y: GLOB_bgOffset.y + Tiles(4)
  },
  image: imageLeaf,
  solid: false,
  item: true,
  location: "floor",
  sprites: {
    default: imageLeaf,
    droplet: imageLeafDroplet
  }
});

const seed = new Sprite({
  name: "seed",
  position: {
      x: GLOB_bgOffset.x + Tiles(8),
      y: GLOB_bgOffset.y + Tiles(4)
  },
  image: imageSeed,
  solid: false,
  item: true,
  location: "floor"
});
