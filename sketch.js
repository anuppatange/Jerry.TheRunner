var invisibleGround;
var cheeseGroup, cheeseImage,cheese;
var current1Image,current1;
var current2Image,current2;
var fireImage, fire;
var hammerImage,hammer;
var heartImage,heart;
var jerryImage,jerry;
var restartImage, restart;
var rocketImage,rocket;
var standImage,stand;
var tortoiseImage, tortoise;
var wheel1Image, wheel1;
var whhel2Image, wheel2;
var wheel3Image, wheel3;
var gameOver,gameOverImage;
var obstaclesGroup,obstacles;
var backgroundImg,ground;
var score=0;
var survivaltime=0;
var PLAY = 1;
var END= 0;
var gameState=PLAY;

 function preload(){
   jerryImage = loadImage("Images/jerry.png");
   cheeseImage = loadImage("Images/cheese.png"); 
   current1Image = loadImage("Images/current1.png");
   current2Image = loadImage("Images/current2.png"); 
   fireImage = loadImage("Images/fire.png");
   heartImage = loadImage("Images/heart.png");
   restartImage = loadImage("Images/restart.png");
   rocketImage = loadImage("Images/rocket.png");
   standImage = loadImage("Images/stand.png");
   tortoiseImage = loadImage("Images/tortoise.png");
   wheel1Image = loadImage("Images/wheel1.png");
   wheel2Image = loadImage("Images/wheel2.png");
   wheel3Image = loadImage("Images/wheel3.png");
   hammerImage = loadImage("Images/hammer.png");
   gameOverImage=loadImage("Images/gameOver.png");
   backgroundImg = loadImage("Images/back.jpg");
 }

 function setup() {
   createCanvas(600, 400);
   ground = createSprite(200,180,400,20);
   ground.addImage(backgroundImg);
   ground.x = ground.width /2;
   ground.scale=1.3;

   jerry = createSprite(50,350,20,50);
   jerry.addImage(jerryImage);
   jerry.scale = 0.2;
  

   // ground.velocityX = -(6+3*score/100);
  
   invisibleGround = createSprite(300,390,600,10);
   invisibleGround.visible = false;
  
   cheeseGroup = new Group();
   obstaclesGroup = new Group();
  
   score = 0;
  
   gameOver = createSprite(300,180);
   restart = createSprite(300,300);
  
   gameOver.addImage(gameOverImage);
   gameOver.scale = 1;
  
   restart.addImage(restartImage);
   restart.scale = 0.5;
  
   gameOver.visible = false;
   restart.visible = false;
 }

 function draw() {
   background( 180);

   if(gameState === PLAY){
        survivaltime = survivaltime + Math.round(getFrameRate()/60);
  
        if(jerry.isTouching(cheeseGroup)){
          score=score+1;
          cheeseGroup.destroyEach();
        }

        if(keyDown("space")) {
        jerry.velocityY = -10;
        }
  
        jerry.velocityY = jerry.velocityY + 0.8
  
        if (ground.x < 0){
        ground.x = ground.width/2;
        }
  
        jerry.collide(invisibleGround);
        spawnCheese();
        spawnObstacles();
        ground.velocityX = -(6+3*score/100);
//     //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(jerry)){
       gameState = END;
    }
   }
  
  else if(gameState === END) {
     gameOver.visible = true;
     restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
     jerry.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cheeseGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cheeseGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();

  fill("black");
  textSize(25);
  text("survivalTime: "+ survivaltime, 200,50);

  fill("black");
  textSize(25);
  text("Score: "+ score, 500,50);
}
  


 function spawnCheese() {
    //write code here to spawn the cheese
    if (frameCount % 150 === 0) {
    cheese= createSprite(600,120,40,10);
    cheese.y = Math.round(random(80,120));
    cheese.addImage(cheeseImage);
    cheese.scale = 0.3;
    cheese.velocityX = -3;
    
    //assign lifetime to the variable
    cheese.lifetime = 200;
    
    //adjust the depth
    cheese.depth = jerry.depth;
    jerry.depth =  jerry.depth + 1;
    
    //add each cheese to the group
    cheeseGroup.add(cheese);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,365,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,10));
    switch(rand) {
      case 1: obstacle.addImage(current1Image);
              break;
      case 2: obstacle.addImage(current2Image);
              break;
      case 3: obstacle.addImage(fireImage);
              break;
      case 4: obstacle.addImage(rocketImage);
              break;
      case 5: obstacle.addImage(standImage);
              break;
      case 6: obstacle.addImage(tortoiseImage);
              break;
      case 7: obstacle.addImage(hammerImage);
              break;     
      case 8: obstacle.addImage(wheel1Image);
              break;   
      case 9: obstacle.addImage(wheel2Image);
              break;     
      case 10: obstacle.addImage(wheel3Image);
              break;       
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cheeseGroup.destroyEach();
  score=0;
}