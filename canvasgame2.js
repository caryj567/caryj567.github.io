var myGamePiece;
var myObstacles = [];
var myScore;
var begun = 0;
var paused = 0;

const SPEED_X_MAX = 3.5;
const SPEED_X_ACCEL = 3;
const SPEED_X_FRICTION = 0.05;
const SPEED_X_STOP_EPSILON = 0.9; //must be lower than SPEED_X_ACCEL!!!
const JUMP_ACCEL = -1.0; 
const JUMP_GRAVITY = 1.0;

function startGame() {
	if(begun)
		return;
    myGamePiece = new gameObj(30, 30, "red", 10, 120, "jumping");
    myGamePiece.gravity = 0.20;
    myScore = new gameObj("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
    begun = 1;
}


function pause()
{
	if(!begun)
		return;
		
	paused = !paused;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function gameObj(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.accelX = 0;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") 
        {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        else if (this.type == "player")
            ctx.drawImage(gfx_player, this.x, this.y, this.width, this.height);
        else if (this.type == "jumping")
            ctx.drawImage(gfx_jumping, this.x, this.y, this.width, this.height);
        else 
        {
            //ctx.fillStyle = color;
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(gfx_bricks, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
    
        this.speedX += this.accelX

        //Clip the X velocity to stop uncontrolled acceleration
        if(this.speedX > SPEED_X_MAX)
        	this.speedX = SPEED_X_MAX;
        else if(this.speedX < -SPEED_X_MAX)
        	this.speedX = -SPEED_X_MAX;
        	
        if (!this.accelX)
        {//not accelerating anywhere, apply friction
        	this.speedX += -this.speedX * SPEED_X_FRICTION;
        }        	

		//snap to a stop if going slow enough
		if(this.speedX < SPEED_X_STOP_EPSILON && this.speedX > -SPEED_X_STOP_EPSILON)
			this.speedX = 0;
        	
        this.x += this.speedX;
        
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) 
        {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.type = "player";
            in_air = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

	if(paused)
		return;
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) 
        {
        	if(!snd_death_played)
        	{
        		snd_death.play();
        		snd_death_played = 1;
        	}
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 80;
        maxGap = 250;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new gameObj(10, height, "green", x, 0));
        myObstacles.push(new gameObj(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
function sidestep(n)
{
	//myGamePiece.speedX = n;
	myGamePiece.accelX = n;
}


//AUDIO
var snd_jump = new Audio("./sounds/jump.wav");
var snd_death = new Audio("./sounds/death.wav");
var snd_jump_on = 0;
var snd_death_played = 0;

//GRAPHICS
var gfx_player = new Image();
var gfx_jumping = new Image();
var gfx_bricks = new Image();
//gfx_player.onload = //need to some flag to show if this is ready or not
gfx_player.src = "./gfx/mario.png";
gfx_jumping.src = "./gfx/jumping.png";
gfx_bricks.src = "./gfx/pole2.png";

var in_air = 1;


//USER INPUT
document.addEventListener('keydown', function(event)
{
	switch(event.key)
    {
    	case "ArrowUp":
    		if(in_air)
    			return;
    		accelerate(JUMP_ACCEL);
    		myGamePiece.type = "jumping";
    		if(!snd_jump_on)
    		{
    			snd_jump.play();
    			snd_jump_on = 1;	
    		}
    		break;
    	case "ArrowRight":
    		sidestep(SPEED_X_ACCEL);
    		break;
    	case "ArrowLeft":
    		sidestep(-SPEED_X_ACCEL);
    		break;
    	case "Enter":
    		alert("ENTER!");
    	case " ":
    		startGame();
    		break;
    }
});

document.addEventListener('keyup', function(event)
{
	switch(event.key)
    {
    	case "ArrowUp":
    		accelerate(JUMP_GRAVITY);
    		in_air = 1;
    		snd_jump_on = 0;
    		break;
    	case "ArrowRight":
    		sidestep(0);
    		break;
    	case "ArrowLeft":
    		sidestep(0);
    		break;
    	case "Enter":
    		alert("ENTER!");
    		break;
    }
});
