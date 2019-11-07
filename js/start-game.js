const animationOnLoad = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,

    keys: {
        SPACE: 13
    },

    init: function () {
        this.canvas = document.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();
        this.setListeners();
    },

    start: function () {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear();
            this.drawAll();

            if (this.framesCounter > 1000) this.framesCounter = 0;
        }, 1000 / this.fps)
    },

    clear: function () {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    },

    reset: function () {
        this.background = new Background(this.ctx, "img/bg-start.png", this.width, this.height, 1);
    },

    drawAll: function () {
        this.background.draw();
        this.ctx.fillStyle = "#e4ddd3";
        this.ctx.font = '1em "Press Start 2P"'
        this.ctx.fillText("PRESS ENTER TO START", this.background.width * .5, this.background.height * .7)
    },

    setListeners: function () {
        console.log()
        document.addEventListener('keydown', (e) => {
            if (e.keyCode) {
                clearInterval(this.interval);

                setTimeout(() => {
                    if (typeof game.canvas === "undefined") {
                        game.init();
                    }
                }, 100)
            }
        })
    },

}