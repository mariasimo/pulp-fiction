class Modal {
    constructor(ctx, img, width, height){
        this.ctx = ctx;
        this.width = width/2;
        this.height = height/2;

        this.image  = new Image();
        this.image.src = img;

        this.posX = (width - this.width) / 2;
        this.posY = 0;
    }

    draw (){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    animate() {}
}