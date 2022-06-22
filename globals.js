// !!!  CONSTANTS  !!!! //

/// TILES

const GLOB_debug = false;

const GLOB_playerSpriteWidth = 384;
const GLOB_playerSpriteHeight = 96;

const GLOB_movingSpeed = 3;

const GLOB_interactionRange = 8;

const GLOB_exportRatio = 600;
const GLOB_tileSize = 16 * (GLOB_exportRatio / 100);
function Tiles(numberOfTiles) {
    return numberOfTiles * GLOB_tileSize
}
const GLOB_bgOffset = { x:  - Tiles(0), y: - Tiles(0) };


//////// NON - CONSTANTS ////////

let floorObjs = [];
let bgObjs = [];
let playerObjs = [];
let inventoryObjs = [];
let debugObjs = [];

let solidObjs = [];
let interactableObjs = [];
let itemsObjs = [];

let pickupTimer = 0;
const pickupTimerCap = 30;

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    e: {
        pressed: false
    },
    p: {
        pressed: false
    }
}


