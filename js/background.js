class Background {
    constructor(ctx, img, width, height, framesX) {
        this.ctx = ctx;
        this.height = height;
        this.width = this.height * 16 / 9;

        this.img = new Image();
        this.img.src = img;

        this.posX = (width - this.width) / 2;
        this.posY = 0;

        // Num of frames in the sprite
        this.framesX = framesX;
        this.framesY = 1;

        // Actual position in the sprite
        this.framesIX = 0;
        this.framesIY = 0;
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.img,
            this.framesIX * Math.floor(this.img.width / this.framesX),
            this.framesIY * Math.floor(this.img.height / this.framesY),
            Math.floor(this.img.width / this.framesX),
            Math.floor(this.img.height / this.framesY),
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        if (this.framesX > 1) {
            this.animate(framesCounter);
        }
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.framesIX++;            
            (this.framesIX >= this.framesX) && (this.framesIX = 0);
        }
    }
}