class Projectile {
  constructor(player) {
    this.img = document.getElementById("laserplayer");
    this.x = player.x;
    this.y = player.y;
    this.stav = true;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x + 30, this.y - 55);
  }

  movement() {
    if(this.stav) {
      this.y = this.y - 1;
    }
  }
}
