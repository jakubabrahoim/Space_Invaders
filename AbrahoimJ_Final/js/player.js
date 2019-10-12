class Player {
  constructor() {
    this.img = document.getElementById("player");
    this.x = canvas.width / 2 - 50;
    this.y = canvas.height - 100;
  }
  
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, 70, 50);
  }

  move() {
    if(keys[65] && this.x >= 0) {
      this.x = this.x - 1;
    }
    if(keys[68] && this.x + 70 < 900) {
      this.x = this.x + 1;
    }
  }
}
