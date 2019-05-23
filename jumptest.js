var myGamePiece;
var timenum;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(50, 50, "red", 30, 430);
    ground = new component(1080,20,"green",0,480);
    roof = new component(1080,20,"green",0,0);
    leftPortal = new component(20,500,"blue",0,0);
    rightPortal = new component(20,500, "blue",1060,0,);
    
    platforms = [ 
        new component(225,10,"images/platform.png",500,200,"image"),
        //new component(225,10,"images/platform.png",300,400,"image")
]
  timenum = platforms.length;                           
}


var myGameArea = {

    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

 

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;   
    this.speedX = 0;
    this.speedY = 0; 
    this.gravity = 0.00;
    this.gravitySpeed = 0;   
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;            
        this.y += this.speedY += this.gravitySpeed;         
    } 
    this.newPose = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}



var frameno = 0;
var x = 1;
var bad = 0;
var vad = 0;
var jumps = 2;
var z = 1;
var timer = 0;
var m = 1;
var timerTwo = 0;
var y = 1;
var jumpAudio = new Audio();
jumpAudio.src = "audio/jumpAudio.mp3"




function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;   
for(i = 0; i < platforms.length; i++){  
    solidPlat = platforms[i];     
if (z == 2) {
        timer += 1; 
        solidPlat.x += 2;                  
            if (timer == 50) {                
                timer = 0;
                z = 1; 
                solidPlat.x -= 4;
    }                                        
    } 
else if (z == 1) { 
            timer += 1;
            solidPlat.x -= 2;
    if (timer == 50) {        
        timer = 0;
        z = 2;  
        solidPlat.x += 4;
    }
}
    

if ( myGamePiece.x + myGamePiece.width > solidPlat.x &&
        myGamePiece.x < solidPlat.x + solidPlat.width &&
        myGamePiece.y + myGamePiece.height  > solidPlat.y &&
        myGamePiece.y <= solidPlat.y) {
            jumps = 3;
            myGamePiece.gravity = 0.00;
            myGamePiece.gravitySpeed = 0;                 
            myGamePiece.y = solidPlat.y - myGamePiece.height;
            if (myGameArea.keys && myGameArea.keys[37]) {
                if (z == 1) {
                    myGamePiece.speedX -= 5
                }
                else if (z == 2) {
                  myGamePiece.speedX -= 5
                }
                                                            
            }
            else if (z == 2) {
                myGamePiece.speedX += 1            
                }             
            else if (z == 1) {
                myGamePiece.speedX -= 1               
                }         
                            
        
        if (myGameArea.keys && myGameArea.keys[39]) {
            if (z == 1) {
                    myGamePiece.speedX += 5
                }
                else if (z == 2) {
                  myGamePiece.speedX += 5
                }                                        
    }
    else if (z == 2) {
        myGamePiece.speedX += 1            
        }             
    else if (z == 1) {
        myGamePiece.speedX -= 1               
        }    
}

else if (myGameArea.keys && myGameArea.keys[37]) {
    myGamePiece.speedX -= 5; 
}  
else if (myGameArea.keys && myGameArea.keys[39]) {
    myGamePiece.speedX += 5; 
}     
}  
    if ( x == 2 ) {
        frameno += 1;
}      
	 if (frameno == 20) {
         x = 1;
         frameno = 0;
    }  
        if (myGameArea.keys && myGameArea.keys[32] && x == 1 && jumps >= 2) {
           
            jumpAudio.play();
    myGamePiece.speedY = -200; 
        jumps -= 1;
        x = 2;
    myGamePiece.gravity = 0.00;
    myGamePiece.gravitySpeed = 0;
    myGamePiece.gravity += 0.05;
    myGamePiece.gravitySpeed = 2;
        }
        


         
           

         
  

    


    if (myGamePiece.x <= 20) {
            myGamePiece.x += 1039;
       }
    if (myGamePiece.x >= 1060) {
            myGamePiece.x -= 1039;
       }    
       
       if (myGamePiece.y >= 450) {
            myGamePiece.y = 450; 
        }
           if (myGamePiece.y <= 449 && myGamePiece.y >= -30) {
    myGamePiece.gravity += 0.05;
    myGamePiece.gravitySpeed = 2;
        }
               if (myGamePiece.y + myGamePiece.height >= ground.y) {
    myGamePiece.gravity = 0.00;
    myGamePiece.gravitySpeed = 0;  
    jumps = 2;
        }
    
    if (myGamePiece.y <= 20) {
            myGamePiece.y = 20;
        }
    



// solidPlat = new component(100 width ,10 height ,"yellow",500 x,300 y,); 
// myGamePiece = new component(30 wdith, 30 height , "red", 30 x, 450 y);



    myGamePiece.newPos();    
    myGamePiece.update();
    ground.newPose();
    ground.update();
    roof.newPose();
    roof.update();
    for(i = 0; i < platforms.length; i++){
        solidPlat = platforms[i];
        solidPlat.update();
        solidPlat.newPose();
    }
    leftPortal.newPose();
    leftPortal.update();
    rightPortal.newPose();
    rightPortal.update();
    console.log(myGamePiece.speedX)
}
