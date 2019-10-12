var keys = {};  // premenna na klavesy
var pocet = 1;  // pocet striel
var lives = 3;  // pocet zivotov
var timer;      // timer
var time2;      // druhy timer na gameover screen
var score = 0;  // skore
var stage = 0;  // premenna ktora sluzi na zvysovanie rychlosti nepriatelskych striel
var stage2 = 0; // premenna, ktora zobrazuje aktualny stage2
var probability = 2001;  // pravdepodobnost vystrelenia nepriatela

var stav = true;

var sound = 0;
var audio = new Audio("./sounds/laser1.mp3"); // premenne tykajuce sa audia
audio.volume = 1.0;
var audio2 = new Audio("./sounds/damaged.ogg");
audio2.volume = 0.2;
var audio3 = new Audio("./sounds/damaged2.mp3");
audio3.volume = 0.1;
var audio4 = new Audio("./sounds/powerup.mp3");
audio4.volume = 1.0;
var audio5 = new Audio("./sounds/background.mp3");
audio5.volume = 0.1;
audio5.loop = true;

var enemy = [];  // premenne suvisiace s vykreslovanim nepriatelov
var px = 23;
var py = 50;
var index = -1;


function update(background, ctx, player, enemy, projectiles, projectiles2, powerups) {
  background.draw(ctx);
  player.draw(ctx);
  player.move();
  for(i = 0; i < enemy.length; i++) {    // vykreslenie nepriatelov
    if(enemy[i].color == 1) {
      enemy[i].draw(ctx);
    } else if(enemy[i].color == 2) {
      enemy[i].draw2(ctx);
    } else if(enemy[i].color == 3) {
      enemy[i].draw3(ctx);
    } else if(enemy[i].color == 4) {
      enemy[i].draw4(ctx);
    } else if(enemy[i].color == 5) {
      enemy[i].draw5(ctx);
    }
  }

  ctx.fillStyle = "white";            // vykreslenie skore a zivotov
  ctx.font = "30px Impact"
  ctx.fillText(`Score: ${score}`, 750, 30);
  ctx.fillText(`Lives: ${lives}`, 50, 30);
  ctx.fillText(`Stage: ${stage2}`, 400, 30);

  if(keys[32]) {     // strely hraca
    if(projectiles.length < pocet) {
      projectiles.push(new Projectile(player));
      audio.play();
    }
  }

  for(i = 0; i < projectiles.length; i++) { // vykreslenie strely a pohyb
    projectiles[i].draw(ctx);
    projectiles[i].movement();
  }

  for(i = 0; i < enemy.length; i++) {   // strely nepriatelov
    var cislo = Math.floor(Math.random() * probability);
    if(cislo == 2) {
      projectiles2.push(new Projectile2(enemy[i], enemy[i].color));
    }
  }

  for(i = 0; i < projectiles2.length; i++) {    // vykreslenie striel nepriatelov
    if(projectiles2[i].color == 1) {
      projectiles2[i].draw(ctx);
      projectiles2[i].movement(0 + 0.05 * stage);
    } else if (projectiles2[i].color == 2) {
      projectiles2[i].draw2(ctx);
      projectiles2[i].movement(0.1 + 0.1 * stage);
    } else if (projectiles2[i].color == 3) {
      projectiles2[i].draw3(ctx);
      projectiles2[i].movement(0.2 + 0.1 * stage);
    } else if (projectiles2[i].color == 4) {
      projectiles2[i].draw4(ctx);
      projectiles2[i].movement(0.3 + 0.1 * stage);
    } else if (projectiles2[i].color == 5) {
      projectiles2[i].draw5(ctx);
      projectiles2[i].movement(0.4 + 0.1 * stage);
    }
  }

  for(i = 0; i < projectiles.length; i++) { // vymazanie strely ked je mimo obrazovky
    if(projectiles[i].y < 0) {
      projectiles.pop();
    }
  }

  for(i = 0; i < projectiles2.length; i++) { // vymazanie strely nepriatela ked je mimo obrazovky
    if(projectiles2[i].y > 700) {
      projectiles2.splice(i, 1);
    }
  }

  for(i = 0; i < projectiles.length; i++) {    // kolizie strely hraca a nepriatela
    for(j = 0; j < enemy.length; j++) {
      if(projectiles.length > 0) {
        if((projectiles[i].x + 30 > enemy[j].x) && (projectiles[i].x + 30 < enemy[j].x + 80) && (projectiles[i].y - 55 == enemy[j].y + 70)) {
          enemy[j].hp = enemy[j].hp - 50;
          audio3.play();
          if(enemy[j].hp == 0) {
            if(enemy[j].color == 1) {
              score = score + 10;
            } else if(enemy[j].color == 2) {
              score = score + 20;
            } else if(enemy[j].color == 3) {
              score = score + 30;
            } else if(enemy[j].color == 4) {
              score = score + 40;
            } else if(enemy[j].color == 5) {
              score = score + 50;
            }
            enemy.splice(j, 1);
          }
          projectiles.splice(i, 1);
        }
      }
    }
  }

  for(i = 0; i < projectiles2.length; i++) { // kolizie striel nepriatelov a hraca
    if(projectiles2.length > 0) {
      if(((projectiles2[i].x + 35) >= player.x) &&
        (projectiles2[i].x + 35 <= (player.x + 70)) &&
        (projectiles2[i].y + 115 >= player.y) &&
        (projectiles2[i].y + 115 <= player.y + 50)) {
        audio2.play();
        lives = lives - 1;
        projectiles2.splice(i, 1);
      }
    }
  }

  if(Math.floor(Math.random() * 10000) == 2) {  // pridanie powerupu do pola
    powerups.push(new Powerup(Math.floor(Math.random() * 870), -10));
  }

  for(i = 0; i < powerups.length; i++) { // vykreslenie powerupu do canvasu
    if(powerups.length > 0) {
      powerups[i].draw(ctx);
      powerups[i].movement();
    }
  }

  for(i = 0; i < powerups.length; i++) {  // kolizia powerupu s hracom
    if(powerups.length > 0) {
      if(((powerups[i].x) >= player.x) &&
        (powerups[i].x <= (player.x + 70)) &&
        (powerups[i].y + 21 >= player.y) &&
        (powerups[i].y + 21 <= player.y + 50)) {

        audio4.play();
        if(lives >= 5) {
          score = score + 100;
        } else {
          lives = lives + 1;
        }

        powerups.splice(i, 1);
      }
    }
  }

  if(lives == 0) { // ked sa hracovi minu zivoty
    clearInterval(timer);
    lives = 3;
    background.draw2(ctx);
    ctx.fillStyle = "black";
    ctx.fillText(`Your score was: ${score}`, 345, 460);
    ctx.fillText(`Press "Space" to continue`, 305, 490);
    timer2 = setInterval(gameOver, 2);
  }

  if(enemy.length == 0) {   // ked su vsetci nepriatelia porazeni
    if(stage2 == 7) {
      stage2 = 0;
      clearInterval(timer);
      lives = 3;
      background.draw3(ctx);
      ctx.fillStyle = "black";
      ctx.fillText(`Your score was: ${score}`, 345, 460);
      ctx.fillText(`Press "Space" to continue`, 305, 490);
      timer2 = setInterval(gameOver, 2);
    }

    px = 23;
    py = 50;
    index = -1;
    var luck;
    var health;
    for(i = 0; i < 21; i++) {
      luck = Math.floor(Math.random() * 5) + 1;
      index++;
      enemy.push(new Enemy(px + index*125, py, luck, luck * 50));  // namiesto 0 bude nahodne cislo
      if (i == 6 || i == 13) {
        py = py + 100;
        px = 23;
        index = -1;
      }
    }
    stage = stage + 0.5;
    stage2 = stage2 + 1;
    probability = probability - 250;
  }
}

function gameOver() {
  if(keys[32]) {
    clearInterval(timer2);
    stav = true;
    game();
  }
}

function game() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.addEventListener('mousedown', mouseDown);

  var home = document.getElementById("menu");
  var cont = document.getElementById("controls");
  var volumeon = document.getElementById("on");
  var volumeoff = document.getElementById("off");
  ctx.drawImage(home, 0, 0);

  function mouseDown(event) {
    x = event.pageX - canvas.offsetLeft;
    y = event.pageY - canvas.offsetTop;
    audio5.play();

    if(x >= 329 && x <= (329 + 242) && y >= 472 && y <= (472 + 69)) { // vykreslenie obrazovky s ovladanim
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(cont, 0, 0);
      stav = false;
    }
    if(x >= 10 && x <= (10 + 128) && y >= 15 && y <= (15 + 40)) { // vykreslenie hlavnej obrazovky
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(home, 0, 0);
      stav = true;
    }
    if(x >= 856 && x <= 900 && y >= 0 && y <= 43) { // vypnutie / zapnutie zvuku
      if(sound % 2 == 0) {
        ctx.drawImage(volumeoff, 857, 1, 42, 42);
        audio.volume = 0.0;
        audio2.volume = 0.0;
        audio3.volume = 0.0;
        audio4.volume = 0.0;
        audio5.volume = 0.0;
      }
      else {
        ctx.drawImage(volumeon, 857, 1, 42, 42);
        audio.volume = 1.0;
        audio2.volume = 0.2;
        audio3.volume = 0.1;
        audio4.volume = 1.0;
        audio5.volume = 0.1;
      }
      sound++;
    }
    if(x >= 329 && x <= (329 + 242) && y >= 359 && y <= (359 + 69) && stav == true) { // kliknutie na play
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stav = false;

      var background = new Background();
      var player = new Player();
      var projectiles = [];
      var projectiles2 = [];
      var powerups = [];

      px = 23;
      py = 50;
      index = -1;
      for(i = 0; i < 21; i++) {   // pridanie nepriatelov do pola
        index++;
        enemy.push(new Enemy(px + index*125, py, 1, 50));
        if (i == 6 || i == 13) {
          py = py + 100;
          px = 23;
          index = -1;
        }
      }

      timer = setInterval(update, 2, background, ctx, player, enemy, projectiles, projectiles2, powerups);
    }
  }
}

window.onload = function() {
  game();
}
window.onkeydown = function(event) {   // onkeyup a onkeydown funkcie som vzal z kodu pana Kapca
  keys[event.keyCode] = true;
}
window.onkeyup = function(event) {
  keys[event.keyCode] = false;
}
