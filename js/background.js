class Background {
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = height*16/9;
        this.height = height;

        // this.width = height*16/9;
        // this.height = 600;
        this.image  = new Image();
        this.image.src = 'img/bg.png';

        this.posX = (width - this.width) / 2;
        this.posY = 0;
    }

    draw (){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
}