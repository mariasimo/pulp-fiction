class Arrow {
    constructor(ctx, bgHeight, arrowBoard) {
        this.ctx = ctx;
        this.width = 64;
        this.height = 64;

        // Map arrows array and the position from the correspondent
        // arrow in the arrow board
        this.posY = bgHeight;

        this.vy = 10; // Game difficulty

        this.arrowBoard = arrowBoard;
        this.name = this.selectName();
        this.posX = this.selectPosX();

        this.img = new Image();
        this.img.src = this.selectImg();
    }

    draw() {
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posY -= this.vy;
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    selectName() {
        let names = [
            "Arrow Left", "Arrow Top", "Arrow Bottom", "Arrow Right"
        ]
        return names[this.randomInt(0, names.length - 1)]
    }

    selectImg() {
        switch (this.name) {
            case "Arrow Left":
                return "img/fill-arrow-left.png"
                break;
            case "Arrow Top":
                return "img/fill-arrow-top.png"
                break;
            case "Arrow Bottom":
                return "img/fill-arrow-bottom.png"
                break;
            case "Arrow Right":
                return "img/fill-arrow-right.png"
                break;
        }

    }

    selectPosX() {
        let arrow = this.arrowBoard.filter(arr => arr.name == this.name)
        return arrow[0].posX;
    }
}





// class ArrowLeft extends Arrow {
//     constructor(ctx, bgHeight, arrowBoard) {
//         super(ctx, bgHeight);
//         this.img.src = "img/fill-arrow-left.png"
//         this.name = "Arrow Left";

//         let arrowLeft = arrowBoard.filter(arr => arr.name == "Arrow Left")
//         this.posX = arrowLeft[0].posX;
//     }
// }
