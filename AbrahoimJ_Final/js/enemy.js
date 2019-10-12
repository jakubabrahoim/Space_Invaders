class Enemy {
  constructor(x, y, farba, health) {
    this.enemy1 = document.getElementById("enemy1");
    this.enemy2 = document.getElementById("enemygreen");
    this.enemy3 = document.getElementById("enemyyellow");
    this.enemy4 = document.getElementById("enemyred");
    this.enemy5 = document.getElementById("enemypurple");
    this.x = x;
    this.y = y;
    this.hp = health;
    this.color = farba;
  }
  draw(ctx) {
    ctx.drawImage(this.enemy1, this.x, this.y, 80, 70);
  }
  draw2(ctx) {
    ctx.drawImage(this.enemy2, this.x, this.y, 80, 70);
  }
  draw3(ctx) {
    ctx.drawImage(this.enemy3, this.x, this.y, 80, 70);
  }
  draw4(ctx) {
    ctx.drawImage(this.enemy4, this.x, this.y, 80, 70);
  }
  draw5(ctx) {
    ctx.drawImage(this.enemy5, this.x, this.y, 80, 70);
  }
}
