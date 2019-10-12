class Powerup {
  constructor(x, y) {
    this.powerup1 = document.getElementById("powerup1");
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.drawImage(this.powerup1, this.x, this.y);
  }

  movement() {
    this.y = this.y + 0.5;
  }
}
