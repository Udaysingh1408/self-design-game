var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner,runnerImg,blast
var obstaclesGroup,obstacle1,obstacle2
var ground,groundImg,invisibleGround
var restart,GameOver
var score=0;


function preload()
{
runnerImg = loadAnimation('./images/running1.png','./images/running2.png','./images/running3.png')
blast = loadImage("./images/blast.png")

groundImg = loadImage('./images/road.png')

obstacle1 = loadImage("./images/obstacle1.png");
obstacle2 = loadImage("./images/obstacle2.png");
restartImg = loadImage("./images/restart.png");

}

function setup() {
	createCanvas(windowWidth,windowHeight);
 runner = createSprite(200,height-160)
 runner.addAnimation('runnerImg',runnerImg)
 runner.addImage('blast',blast)
 runner.scale = '0.2' 

 ground = createSprite(width/2,height-100)
 ground.addImage('groundImg',groundImg)
 ground.velocityX = -5

  
 restart = createSprite(300,140);
 restart.addImage(restartImg);
  
 restart.scale = 0.5;

 restart.visible = false;
  
 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;
  
 
 obstaclesGroup = new Group();
  
  score = 0;

  
}


function draw() {
  rectMode(CENTER);
  background(0);
  
  runner.velocityY = runner.velocityY+0.2
  runner.collide(ground)
  if(ground.x<0){
	ground.x = ground.width/2
}
  if(keyDown('space')){
	runner.velocityY = -2
  }
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
   // runner.collide(invisibleGround);
    spawnObstacles();
  
   /* if(obstaclesGroup.isTouching(runner)){
        gameState = END;
    }*/
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    
    //change the trex animation
    runner.changeImage('blast',blast);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
    
  drawSprites();
 
}
  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    
    runner.changeAnimation('runnerImg',runnerImg);
    
   
    
    score = 0;
    
  }



