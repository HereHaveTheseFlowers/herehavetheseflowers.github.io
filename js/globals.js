// !!!  CONSTANTS  !!!! //

/// TILES

const GLOB_interactionRange = 8;

const GLOB_exportRatio = 600;
const GLOB_tileSize = 16 * (GLOB_exportRatio / 100);
function Tiles(numberOfTiles) {
    return numberOfTiles * GLOB_tileSize
}
const GLOB_bgOffset = { x:  - Tiles(1), y: - Tiles(4) };

const Game = {
    state: "transition",
    debug: false
};

//////// NON - CONSTANTS ////////

let GLOB_movingSpeed = 3;

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


