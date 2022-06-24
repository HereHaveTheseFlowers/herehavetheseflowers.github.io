// !!!  CONSTANTS  !!!! //

/// TILES
const GLOB_debug = true;

const GLOB_movingSpeed = 3;

const GLOB_interactionRange = 8;

const GLOB_exportRatio = 600;
const GLOB_tileSize = 16 * (GLOB_exportRatio / 100);
function Tiles(numberOfTiles) {
    return numberOfTiles * GLOB_tileSize
}
const GLOB_bgOffset = { x:  - Tiles(5), y: - Tiles(1) };


//////// NON - CONSTANTS ////////

let floorObjs = [];
let bgObjs = [];
let playerObjs = [];
let inventoryObjs = [];
let debugObjs = [];
let upperObjs = [];

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


