class Player {
    constructor(ctx, posX, gameHeight, img) {
        this.ctx = ctx;
        this.posX = posX;
        this.posY = gameHeight - gameHeight * 0.7;
        this.width = gameHeight * 0.6;
        this.height = gameHeight * 0.6;

        this.img = new Image();
        this.img.src = img;

        // Num of frames in the sprite
        this.framesX = 6;
        this.framesY = 5;

        // Actual position in the sprite
        this.framesIX = 0;
        this.framesIY = 0;
    }

    draw() {
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
    }

    animate(framesCounter) {

        if (framesCounter % 10 === 0) {
            this.framesIX++;
            (this.framesIX > 5) && (this.framesIX = 0);
        }
    }

    dance(framesCounter) {        
        if (framesCounter % 10 === 0) {
            this.framesIX++;

            if ((this.framesY > 1) && (this.framesIX > 5)) {
                this.framesIY++;
                this.framesIX = 0;

                if (this.framesIX === 6) {
                    this.framesIX = 0;
                }

                if (this.framesIY === 5) {
                    this.framesIY = 0;
                }

                if(this.framesIY <= 2){
                    this.framesIY = 2
                }
            }
        }
    }
}