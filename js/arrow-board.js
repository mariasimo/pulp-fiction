class ArrowBoard {
    constructor(ctx, name, img, bgHeight){
        this.ctx = ctx;
        this.name = name;
        this.img = new Image();
        this.img.src = img;
        this.width = 64;
        this.height = 64;
        this.posX = 0
        this.posY = bgHeight/24
    }

    draw(){
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }
}
