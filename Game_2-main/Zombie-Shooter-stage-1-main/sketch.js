var bg,bgImg;
var player, shooterImg, shooter_shooting;
var asteroid1, asteroid2;
var ship1, ship2, ship3;
var backg;
var star1;
var enemy1, enemy2;
var zombieGroup;
var Star1, Star2;
var Stargroup;
var bullets = 16;
var bulletGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var gameState = "fight";
var score = 0
var life = 3
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  backg = loadImage("assets/StarrySky.png")
  bgImg = loadImage("assets/bg.jpeg")
  asteroid1 = loadImage("assets/Asteroid1.png")
  asteroid2 = loadImage("assets/Asteroid2.png")
  ship1 = loadImage("assets/Castle1.png")
  ship2 = loadImage("assets/Castle2.png")
  ship3 = loadImage("assets/Castle3.png")
  enemy1 = loadImage("assets/Enemy1.png")
  enemy2 = loadImage("assets/Enemy3.png")
  star1 = loadImage("assets/Star.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  
  
}

function setup() {

  createCanvas(windowWidth,windowHeight);

  

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2+40,20,20)
bg.addImage(backg)
bg.scale = 2
bg.velocityX = -3

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(ship3)
   player.scale = 0.7
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth - 150, 40,20,20);
   heart1.visible = false;
   heart1.addImage("heart1",heart1Img);
   heart1.scale = 0.4;

   heart2 = createSprite(displayWidth - 100, 40,20,20);
   heart2.visible = false;
   heart2.addImage("heart2",heart2Img);
   heart2.scale = 0.4;

   heart3 = createSprite(displayWidth - 150, 40,20,20);
   heart3.addImage("heart3",heart3Img);
   heart3.scale = 0.4;


   zombieGroup = new Group();
   Stargroup = new Group();
   bulletGroup = new Group();

}

function draw() {
  background(0); 

if(bg.x<100){
bg.x = width/2
}

if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    gameState = "lost"
    
  }
if(score===100){
  gameState = "Won"
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed


//player goes back to original standing image once we stop pressing the space bar


  if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1150,player.y-40,30,10)
    bullet.shapeColor = "blue"
    bullet.velocityX = 20
     bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    player.addImage(ship1)
    bullets = bullets-1
   }
   else if(keyWentUp("space")){
    player.addImage(ship3);
   }
   if(bullets==0){
    gameState = "bullet"
    
   }
   
   
   
   //destroy the zombie when bullet touches it
   if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){    
       
     if(zombieGroup[i].isTouching(bulletGroup)){
          zombieGroup[i].destroy()
          bulletGroup.destroyEach()
          score = score+1
        
          }
     }
   }
   
   
   //destroy zombie when player touches it
   if(zombieGroup.isTouching(player)){
    
   

   for(var i=0;i<zombieGroup.length;i++){    
       
    if(zombieGroup[i].isTouching(player)){
         zombieGroup[i].destroy()
         life = life-1
         }
   }
   }
   
   if(player. isTouching(Stargroup)){
     bullets = bullets+1
     Stargroup.destroyEach()
   }
   if(score%100 === 0){
     bg.velocityX -= 2
   }
  //calling the function to spawn zombies
  enemy();
  star();  
}
drawSprites();
textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-310,displayHeight/2-250)
text("Score = " + score,displayWidth-300,displayHeight/2-220)
text("Lives = " + life,displayWidth-300,displayHeight/2-280)




if(gameState == "lost"){
  textSize(100)
 fill("red")
 text("You Lost ",400,400)
 zombieGroup.destroyEach();
 player.destroy();


}


//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 textSize(100)
 fill("yellow")
 text("You Won ",400,400)
 zombieGroup.destroyEach();
 player.destroy();


}


//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 textSize(50)
 fill("yellow")
 text("You ran out of bullets!!!",470,410)
 zombieGroup.destroyEach();
 player.destroy();
 bulletGroup.destroyEach();


}

}
function enemy(){
  if(frameCount%100===0){
 
 
    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(700,1500),random(100,600),40,40)
 
 
    zombie.addImage(enemy2)
    zombie.scale = 0.3
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
    
  
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
 
 
 }
 function star(){
  if(frameCount%100===0){
 
 
    //giving random x and y positions for zombie to appear
    Star1 = createSprite(random(600,1200),random(100,600),40,40)
 
 
    Star1.addImage(star1)
    Star1.scale = 0.15
    Star1.velocityX = -3
    Star1.debug= false
    Star1.setCollider("rectangle",0,0,400,400)
  
    Star1.lifetime = 400
    Stargroup.add(Star1)
  }
 
 
 }
 