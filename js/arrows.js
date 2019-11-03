class Arrow {
    constructor(ctx, img, bgHeight) {
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = img;
        this.width = 64;
        this.height = 64;
        this.name = "Arrow Left"

        // Map arrows array and the position from the correspondent
        // arrow in the arrow board
        this.posX = 50;
        this.posY = bgHeight;

        this.vy = 10; // Game difficulty
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posY -= this.vy;
    }
}

// class ArrowTop extends Arrow {
//     constructor(ctx, arrowBoardX) {
//         super(ctx, arrowBoardX);
//         this.name = "Arrow Top"
//     }
// }
