const scoreBoard = {
    ctx: undefined,
    score: undefined,
    width: undefined,
    height: undefined,

    init: function (ctx, score, bgWidth, bgHeight) {
        this.ctx = ctx;
        this.score = score;
        this.width = bgHeight/24;
        this.height = bgWidth/24;
        this.posX = 0;
        this.posY = bgHeight / 24
    },

    draw: function (score) {
        this.ctx.lineWidth = "4";
        this.ctx.strokeStyle = "#e4ddd3";
        this.ctx.strokeRect(this.width, this.height, 100, 20)
    }
}