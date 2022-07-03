
mainCanvas.style.display = 'none';
const el = document.querySelector('.text');
const chat = new TextFlow(el);
mainCanvas.width = 1056;
mainCanvas.height = 672; 
const c = mainCanvas.getContext('2d');

/// IMAGE UPLOAD

// bg
const imageBG = CreateImage('bg');
const imageBG_home = CreateImage('bg', 'home');

// floor
const imagePool = CreateImage('pool');
const imageTreeHome = CreateImage('home');

//none
const imageIconInteract = CreateImage('IconInteract');
const imageIconPickup = CreateImage('IconPickup');

// debug
const imageGrid = CreateImage('grid');
const imageBorder = CreateImage('border');

////////////////////////
//// PLAYER AND ICONS //
////////////////////////
const playerDownImage = CreateImage('playerDown', 'player');
const playerUpImage = CreateImage('playerUp', 'player');
const playerLeftImage = CreateImage('playerLeft', 'player');
const playerRightImage = CreateImage('playerRight', 'player');
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
  location: "player",
  level: "home",
  animationFrameRate: 7,
});
let inventoryObj = false;

player.pickup = function(obj) {
  if(!obj.item)
    return false;
  if(inventoryObj) {
    obj.position = {
      x: player.position.x,
      y: player.position.y
    }
    obj.size = 1;
    obj.moveLocation("floor");
    obj.level = player.level
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
  image: "bg",
  location: "bg",
  level: "day1"
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
              y: GLOB_bgOffset.y
          },
          image: imageBorderCycles,
          location: "debug",
          solid: true,
          level: this.level
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + Tiles(i),
              y: GLOB_bgOffset.y + background.height - 40
          },
          image: imageBorderCycles2,
          location: "debug",
          solid: true,
          level: this.level
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x,
              y: GLOB_bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles3,
          location: "debug",
          solid: true,
          level: this.level
      });
      new Sprite({
          name: "border",
          position: {
              x: GLOB_bgOffset.x + background.width - Tiles(1),
              y: GLOB_bgOffset.y + Tiles(i)
          },
          image: imageBorderCycles4,
          location: "debug",
          solid: true,
          level: this.level
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
  location: "debug",
  level: "day1"
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
      x: GLOB_bgOffset.x + Tiles(14),
      y: GLOB_bgOffset.y + Tiles(1)
  },
  image: imagePool,
  frames: { max: 2 },
  animationFrameRate: 150,
  location: "floor",
  solid: true,
  interactable: true,
  level: "day1"
});

pool.interact = function(obj) {
  if(!inventoryObj)
    chat.setText('You can fill something with water.');
  else if(inventoryObj.name === "leaf") {
      chat.setText('You fill the leaf with a droplet of water.');
      inventoryObj.image = inventoryObj.sprites.droplet;
      inventoryObj.name = "leaf with a droplet of water";
    }
  else if(inventoryObj.name === "leaf with a droplet of water")
    chat.setText('You already have a droplet on your leaf!');
  else
    chat.setText('You cant fill that with water.');
}


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

const seed = new Sprite({
  name: "seed",
  position: {
      x: GLOB_bgOffset.x + Tiles(12),
      y: GLOB_bgOffset.y + Tiles(7)
  },
  image: "seed",
  solid: false,
  item: true,
  location: "floor",
  level: "day1"
});

PopulateAreaWith(Tiles(1), Tiles(6), Tiles(18), Tiles(13), items = {leafs: 9, rocks: 6, mushrooms: 15}, level = "day1")
