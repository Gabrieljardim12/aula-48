var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var balas = 70
var gameState = "Lutar"
var perdeu, ganhando, explosao;
var life = 3;
var score = 0;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  perdeu = loadSound("assets/lose.mp3")
  ganhando = loadSound("assets/win.mp3")
  explosao = loadSound("assets/explosion.mp3")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //AULA 2//criando sprites para representar vidas restantes
    heart1 = createSprite(displayWidth-150,40,20,20)
    heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //criando grupo de zumbis 
    zombieGroup = new Group();
  ballGroup = new Group();
  
}

function draw() {
  background(0); 
  
  if(gameState === "Lutar"){
    if(balas === 0){
      gameState = "sembalas"
      perdeu.play();
    }
    if(life === 3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
    }
    if(life === 2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
    }
    if(life === 1){
    
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
    }
    if(score === 100){
      gameState = "venceu"
      ganhando.play();
      
    }
    
    
    
    
  if(life === 0){
  gameState = "perdeu";
  }
  //movendo o jogador para cima e para baixo e tornando o jogo compat??vel com dispositivos m??veis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posi????o de tiro quando a tecla de espa??o for pressionada
if(keyWentDown("space")){
  
  ball = createSprite(displayWidth-1150, player.y - 30, 20, 10)
  ball.velocityX = 20
  ballGroup.add(ball);
  ball.depth = player.depth;
  player.depth = player.depth + 2;
  balas = balas - 1
  explosao.play();
  player.addImage(shooter_shooting)
  
 
}

//o jogador volta ?? imagem original quando pararmos de pressionar a barra de espa??o
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destrua o zumbi qunado o jogador tocar
  
   if(zombieGroup.isTouching(player)){
     
    for(var i = 0; i < zombieGroup.length; i ++){
       if(zombieGroup[i].isTouching(player)){
         zombieGroup[i].destroy()
         life = life -1;
       }
    }
   }
     if(zombieGroup.isTouching(ballGroup)){
     
    for(var i = 0; i < zombieGroup.length; i ++){
       if(zombieGroup[i].isTouching(ballGroup)){
         zombieGroup[i].destroy()
         score = score + 2;
       }
    }
     }
   
//chame a fun????o para gerar zumbis
enemy();
  }
drawSprites();
  
  textSize(20) 
  fill("white") 
  text("Balas = " + balas,displayWidth-210,displayHeight/2-250) 
  text("Pontua????o = " + score,displayWidth-200,displayHeight/2-220) 
  text("Vidas = " + life,displayWidth-200,displayHeight/2-280)
  
   if(gameState === "sembalas"){
    textSize(50);
  fill("yellow");
  text("voc?? n??o tem mais muni????o", 470, 410);
    player.destroy();
    ballGroup.destroyEach();
    zombieGroup.destroyEach();
    
  
  }
  else if(gameState === "perdeu"){
    textSize(50);
  fill("yellow");
  text("voc?? perdeu", 470, 410);
    player.destroy();
    zombieGroup.destroyEach();
  }
 else if(gameState === "venceu"){
    textSize(50);
  fill("yellow");
  text("voc?? ganhou", 470, 410);
    player.destroy();
    zombieGroup.destroyEach();
  }
}






//criando fun????o para gerar zumbis
function enemy(){
  if(frameCount % 50 === 0){
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;    
    zombie.velocityX = -3; 
    zombie.debug = true; 
    zombie.setCollider("rectangle",0,0,300,300);
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }

}
