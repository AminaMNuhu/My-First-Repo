//tilemap variables
let tilemap = [];
let numDown = 10;
let numAcross = 20;
let tileSize = 50;
let textures = [];
let bg;
let y = 0;




let graphicMap = [
//   0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4    
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 5
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 6
    [1, 1, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 7
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 9
]





let tileRules = [
    //   0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4    
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 5
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 6
    [1, 1, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], // 7
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]  // 9
]


//player variables
let player;
let playerSprite;
let xSpeed = 5;
let ySpeed = 10;
let jumpHeight = 100;
let playerSize = tileSize;


function preload() {


    textures[0] = loadImage("void.png");
    textures[1] = loadImage("brick.png");
    textures[2] = loadImage("void.png");
    textures[3] = loadImage("invisible_wall.png");


    playerSprite = loadImage("fishpixelart.png");
   
}


function setup() {
    bg = loadImage("underwater.png")
    createCanvas(1000, 500);


    let tileID = 0; // sets our tileID for the first tile we'll make


    //Creates all tiles
    for (let across = 0; across < numAcross; across++) {
        tilemap[across] = [];
        for (let down = 0; down < numDown; down++) {
            //Setting Texture For Tile
            let textureNum = graphicMap[down][across];
   
            //Initialising Tile
            tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID); // THIS LINE CREATES OUR NEW TILE!


            tileID++;
        }
    }
    //Tile creation finished


    player = new Player(playerSprite, 3, 4, tileSize, xSpeed, ySpeed, jumpHeight, tileSize, tileRules);
}


function draw() {
    background(bg);

    stroke(226, 204, 0);
    line(0, y, width, y);
   
    y++;
    if (y > height) {
      y = 0;
    }
   
    // Loops through all tiles each time draw() is called
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            tilemap[across][down].display(); // runs display() method for each tile!
            tilemap[across][down].debug(); // runs debug() method for each tile!
        }
    }
    // Finishes looping through all tiles within each draw() loop
   
}






function keyPressed() {
    if(!player.isJumping && player.isGrounded) {


        if(key === "") {
            player.isJumping = true;
            player.jumpTarget = player.yPos - player.jumpHeight;
        }
    }
}




class Player {
    constructor(sprite, startAcross, startDown, size, xSpeed, ySpeed, jumpHeight, tileSize, tileRules) {
        //Attach sprite to key in object
        this.sprite = sprite;


        //Store starting tile info. Later, we will use these to store the current tile the player is on.
        this.across = startAcross;
        this.down = startDown;
       
        //convert tile coordinates into pixel coordinates
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;


        //storing size and speed
        this.size = size;
        this.xSpeed = xSpeed;
        this.xSpeed = ySpeed;


        //Check rules/collisions for the tile the player wants to move to (target Tile)
        this.tileRules = tileRules;
        this.tileSize = tileSize;


        //some extra properties that we will use to control player movement below
        //what direction the player will travel in
        this.dirX = 0;
        this.dirY = 0;
       
        //booleans to set player y/jump state
        this.isJumping = false;
        this.isFalling = false;
        this.isGrounded = true;


        //Setting jump max height
        this.jumpHeight = jumpHeight;


        //Empty variable to store jumpTarget
        this.jumpTarget;


        //PLAYER COLLISION TRACKING


       //initialising X and Y variables
        this.playerTop;
        this.playerBottom;
        this.playerleft;
        this.playerRight;


        //initialisi ng corner coordinates objects
        this.topLeft = {};
        this.topRight = {};
        this.bottomLeft = {};
        this.bottomRight = {};


        //collision padding
        this.collisionXPadding = 10;
        this.collisionYPadding = 5;




    }
       






    display() {
        imageMode(CORNER);
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }


 
    debug() {
        //COLLISION BOX
        stroke(255,0,0); // red top
        line(this.topLeft.x, this.topLeft.y, this.topRight.x, this.topRight.y);
        stroke(34,139,34); // green bottom
        line(this.bottomLeft.x, this.bottomLeft.y, this.bottomRight.x, this.bottomRight.y);
        stroke(0,0,255); // blue left
        line(this.topLeft.x, this.topLeft.y, this.bottomLeft.x, this.bottomLeft.y);
        stroke(255,192,203); // pink right
        line(this.topRight.x, this.topRight.y, this.bottomRight.x, this.bottomRight.y);




    }


    update() {
        this.checkCorners();
        this.setXDirection();
        this.hasJumpTargetBeenReached();
        this.handleCollisions();
        this.checkCollisions();
        this.move();




        this.display();
        this.debug();


       
    }


    checkCorners() {
        // X and Y variables
         this.playerLeft = this.xPos + this.collisionXPadding;
         this.playerRight = this.xPos + this.tileSize - 1 - this.collisionXPadding;
         this.playerTop = this.yPos + this.collisionYPadding;
         this.playerBottom = this.yPos + this.tileSize - 1;

        
       
        //corner coordinate objects
         this.topLeft = {
            x: this.playerleft,
            y: this.playerTop
         }
         this.topRight = {
            x: this.playerRight,
            y: this.playerTop
         }
         this.bottomLeft = {
            x: this.playerleft,
            y: this.playerBottom
         }
         this.bottomRight = {
            x: this.playerRight,
            y: this.playerBottom
         }
    }


    hasJumpTargetBeenReached() {
        if (this.yPos === this.jumpTarget) {


            this.isJumping = false;
            this.isFalling = true;
        }
        
    }
    


    setYDirection() {
        if (this.isGrounded) {
            this.dirY = 0;
        }


        if (this.isJumping) {
            this.dirY = -1;
        }


        if (this.isFalling) {
            this.dirY = 1;
        }
    }


    isOverlappingCollisionTile(pointX, pointY) {
        let tileX = Math.floor(pointX / this.tileSize);
        let tileY = Math.floor(pointY / this.tileSize);


        return this.tileRules[tileY][tileX] != 0;
    }


    isOverlappingCollisionTile() {
        let tileX = Math.floor(pointX / this.tileSize);
        let tileY = Math.floor(pointY / this.tileSize);


        return this.tileRules[tileY][tileX] === 1;
    }


    setXDirection() {
        if (keyIsDown("65")) { //a
            this.dirX = -1; //left
        }


        if (keyIsDown("68")) { //d
            this.dirX = 1; //left
        }


        if(!keyIsDown("65") && !keyIsDown("68")) { //no key
            this.dirX = 0; //stop
        }
        
    }

    


    CreateCollisions(velX, velY) {
        if (this.isOverlappingColliderTile(this.topLeft.x + velX, this.topLeft.y + velY) ||
            this.isOverlappingColliderTile(this.bottomLeft.x + velX, this.bottomLeft + velY) ||
            this.isOverlappingColliderTile(this.topRight.x + velX, this.topRight.y + velY) ||
            this.isOverlappingColliderTile(this.bottomRight.x + velX, this.bottomRight + velY)) {


                return true;
            } else {
                return false;
            }
    }


    handleCollisions() {
        this.setYDirection();


        let velX = this.dirX * this.xSpeed;
        let xelY = this.dirY * this.ySpeed;  


        if (this.checkCollisions(velX, 0)) {


            this.dirX = 0;
            velX = this.dirX * this.xSpeed;
        }


        if (this.isOverlappingCollisionTile(this.topLeft.x, this.topLeft.Y + velY) ||
        this.isOverlappingCollisionTile(this.topRight.x, this.topRight.y +velY)) {


            this.isJumping = false;
            this.isFalling = true;


            this.setYDirection();
            velY = this.dirY * this.ySpeed;
        }


        if(this.isOverLappingGroundTile(this.bottomRight.x, this.bottomRight.y) ||
           this.isOverLappingGroundTile(this.bottomLeft.x, this.bottomLeft.y)) {


            this.yPos -= this.ySpeed;
           }


        if (this.isOverlappingGroundTile(this.bottomLeft.x, this.bottomLeft.y + 1) ||
            this.isOverlappingGroundTile(this.bottomRight.x, this.bottomRight.y + 1)) {


                this.isGrounded = true;
                this.isFalling = false;


                this.setYDirection();
                velY = this.dirY * this.ySpeed;
            } else {


                this.isGrounded = false;


                if(!this.isJumping) {
                    this.isFalling = true;
                }


             this.setYDirection();
             velY = this.dirY * this.ySpeed;
        }
       
        this.setYDirection();
 
    }


    move() {
        this.yPos += this.ySpeed * this.dirY;
        this.xPos += this.xSpeed * this.dirX;
    }










}


class Tile {
    constructor(texture, across, down, tileSize, tileID) {
        this.texture = texture;
        this.across = across; // new values!
        this.down = down; // new values!
        this.xPos = across * tileSize; // pixel value generated from across
        this.yPos = down * tileSize; // pixel value generated from down
        this.tileSize = tileSize;
        this.tileID = tileID;
    }


    display() {
        //Displays the texture of instance of NPC class
        noStroke();
        image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize)
    }






    
    debug() {
        //TILE
        stroke(245);
        noFill();
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);






        

        //LABEL
        noStroke();
        fill(255);
        textAlign(LEFT, TOP);
       
        text(this.tileID, this.xPos, this.yPos);
    } 


    
}
