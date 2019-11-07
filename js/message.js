class Message {
    constructor(ctx, textIndex, arrowBoard, posY, width, height) {
        this.ctx = ctx;
        this.posX = this.randomInt(arrowBoard[0].posX, arrowBoard[3].posX)-200;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.alpha = 1.0;   // full opacity
        this.texts = [
            'Perfect',
            'Great',
            'Good enough',
            'Not even close'
        ],
        this.message = this.texts[textIndex].toString().toUpperCase()
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    draw() {
        this.ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        this.ctx.font = '1em "Press Start 2P"'
        this.ctx.fillText(this.message, this.posX, this.posY)
        this.posY--;
    }

    fadeOut() {
        this.interval = setInterval( () => {
            this.alpha = this.alpha - 0.015; // decrease opacity (fade out)
            this.posY--;
            if (this.alpha < 0) {
                clearInterval(this.interval)
            }
        }, 1000);
    }
}