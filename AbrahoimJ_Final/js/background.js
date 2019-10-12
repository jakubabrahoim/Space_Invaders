class Background {
  constructor() {
    this.img = document.getElementById("background");
    this.img2 = document.getElementById("gover");
    this.img3 = document.getElementById("win");
  }

  draw(ctx) {
    ctx.drawImage(this.img,0,0, 900, 700);
  }
  draw2(ctx) {
    ctx.drawImage(this.img2, 250, 130);
  }
  draw3(ctx) {
    ctx.drawImage(this.img3, 250, 130);
  }
}
