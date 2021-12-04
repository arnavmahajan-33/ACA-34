
var bg, backgroundImg;
var score = 0

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  iron = createSprite(450,400,400,10);
  iron.addImage(ironImage);
  iron.scale = 0.3;
  iron.debug = true;
  iron.setCollider("rectangle",100,0,200,400)

  ground =createSprite(200,585,900,10)
  ground.visible=false;

  stoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
}

function draw() {
  bg.velocityY=4
  if (bg.y > 500){
    bg.y=bg.width/4;
  }

  if(keyDown("right")){
    iron.velocityX = +4;    
  }

  if(keyDown("left")){
    iron.velocityX = -4;    
  }
 
  if(keyDown("up")){
    iron.velocityY = -9;    
  }

    iron.velocityY = iron.velocityY + 0.5
    iron.collide(ground)

    generateStones();
  for(var i=0 ; i< (stoneGroup).length ;i++){
      var temp = (stoneGroup).get(i);

      if(temp.isTouching(iron)){
          iron.collide(temp);
      }
  }

  generateDiamonds();
    for(var i = 0 ; i< (diamondGroup).length ;i++){
        var temp = (diamondGroup).get(i) ;
        
        if (temp.isTouching(iron)) {
          score++;
          temp.destroy();
          temp=null;
          }            
        }

  generateSpikes();
    for(var i=0 ; i< (spikeGroup).length ;i++){
      var temp = (spikeGroup).get(i);

      if(temp.isTouching(iron)){
          score = score -5;
          temp.destroy()
      }
  }
    
drawSprites();

textSize(20);
fill("yellow");
text("Diamonds Collected: "+ score ,400,50);
}

function generateStones(){
  if(frameCount % 70 === 0){
      var stone = createSprite(1200,120,40,10);
      stone.x = random(50,450);
      stone.addImage(stoneImage);
      stone.scale = 0.8;
      stone.velocityY = +5;

      stone.lifetime = 250;
      stoneGroup.add(stone);
  }
}

function generateDiamonds() {
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200,120,40,10);
    diamond.x = random(80,350);
    diamond.addImage(diamondImage);
    diamond.scale = 0.4;
    diamond.velocityY = +3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
    }
  }

function generateSpikes(){
  if(frameCount % 90 === 0) {
    var spike = createSprite(1200,120,40,10);
    spike.x = random(50,450);
    spike.addImage(spikeImage);
    spike.scale = 0.8;
    spike.velocityY = +5;

    spike.lifetime = 250;
    spikeGroup.add(spike);
  }
}