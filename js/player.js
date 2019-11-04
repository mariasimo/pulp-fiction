class Player {
    constructor(ctx, posX, gameHeight, img, framesY) {
        this.ctx = ctx;
        this.posX = posX;
        this.posY = gameHeight - 256 - 100;
        this.width = 256;
        this.height = 256;

        this.img = new Image();
        this.img.src = img;

        // Num of frames in the sprite
        this.framesX = 6;
        this.framesY = framesY;

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

        this.animate(framesCounter);
    }

    animate(framesCounter) {

        if (framesCounter % 10 === 0) {
            this.framesIX++;

            // Waiting animation meme
            if ((this.framesY > 1) && (this.framesIX > 5)) {
                this.framesIY++;
                this.framesIX = 0;

                if (this.framesIX === 6) {
                    this.framesIX = 0;
                }

                if (this.framesIY === 5) {
                    this.framesIY = 0;
                }
            }
            (this.framesIX > 5) && (this.framesIX = 0);
        }
    }

    dance() { }
}