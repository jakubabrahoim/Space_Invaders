class Projectile2 {
  constructor(enemy, farba) {
    this.x = enemy.x;
    this.y = enemy.y;
    this.p1 = document.getElementById("laserblue");
    this.p2 = document.getElementById("lasergreen");
    this.p3 = document.getElementById("laseryellow");
    this.p4 = document.getElementById("laserred");
    this.p5 = document.getElementById("laserpurple");
    this.stav = true;
    this.color = farba;
  }

  draw(ctx) {
    ctx.drawImage(this.p1, this.x + 35, this.y + 70);
  }
  draw2(ctx) {
    ctx.drawImage(this.p2, this.x + 35, this.y + 70);
  }
  draw3(ctx) {
    ctx.drawImage(this.p3, this.x + 35, this.y + 70);
  }
  draw4(ctx) {
    ctx.drawImage(this.p4, this.x + 35, this.y + 70);
  }
  draw5(ctx) {
    ctx.drawImage(this.p5, this.x + 35, this.y + 70);
  }

  movement(scale) {
    if(this.stav) {
      this.y = this.y + 1 + scale;
    }
  }
}
