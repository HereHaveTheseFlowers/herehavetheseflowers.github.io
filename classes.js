
class Sprite {
    constructor({name, position, image, frames = { max: 1 }, sprites, location = "none", solid = false, interactable = false, item = false, size = 1, animationFrameRate = 20, upperImage = false}) {
        this.spriteID = Math.floor(Math.random() * (10000 - 1) + 1)
        this.name = name
        this.position = position
        this.image = image
        if(upperImage) {
			this.upperImage = upperImage
		}
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.animationFrameRate = animationFrameRate
        this.sprites = sprites
        this.location = location;
        this.moving = true;
        switch(location) {
            case 'floor':
                floorObjs.push(this);
                break;
            case 'bg':
                bgObjs.push(this);
                break;
            case 'player':
                playerObjs.push(this);
                this.moving = true;
                break;
            case 'inventory':
                inventoryObjs.push(this);
                break;
            case 'debug':
                debugObjs.push(this);
                break;
			case 'upper':
				upperObjs.push(this);
				break;
        }
        if(solid)
            solidObjs.push(this);
        this.interactable = interactable
        if(interactable)
            interactableObjs.push(this);
        this.item = item
        if(item)
            itemsObjs.push(this);
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            this.postLoad();
        }
		if(this.upperImage) {
			const upperImageNew = CreateImage(this.upperImage);
			new Sprite({
				name: this.name + "_upper",
				position: {
					x: this.position.x,
					y: this.position.y - Tiles(1)
				},
				image: upperImageNew,
				location: "upper",
				solid: false
			});
		}
        this.size = size;
    }
    draw() {
        if(this.position.x + this.width < 0 || this.position.y + this.height < 0 || this.position.x > Tiles(11) || this.position.y >= Tiles(7))
            return;
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max / this.size,
            this.image.height / this.size
        );
        if(!this.moving) {
            this.frames.val = 0
            return;
        }
        if(this.frames.max > 1) this.frames.elapsed++;
        if(this.frames.elapsed % this.animationFrameRate === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0
        }
    }
    pickup = function () {
        console.log('not a player');
        return false;
    }
    interact= function () {
        console.log('not a player');
        return false;
    }
    moveLocation = function (newLoc) {
        switch(this.location) {
            case 'floor':
                floorObjs = floorObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'inventory':
                inventoryObjs = inventoryObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'bg':
                bgObjs = bgObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'debug':
                debugObjs = debugObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'player':
                playerObjs = playerObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
            case 'upper':
                upperObjs = upperObjs.filter((item) => item.spriteID !== this.spriteID);
                break;
        }
        switch(newLoc) {
            case 'floor':
                floorObjs.push(this);
                break;
            case 'inventory':
                inventoryObjs.push(this);
                break;
            case 'bg':
                bgObjs.push(this);
                break;
            case 'player':
                playerObjs.push(this);
                break;
            case 'debug':
                debugObjs.push(this);
                break;
            case 'upper':
                upperObjs.push(this);
                break;
        }
        this.location = newLoc;
    }
    postLoad = function () {
        return;
    }
}

