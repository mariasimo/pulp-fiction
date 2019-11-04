const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    arrowCounter: 0, //Number of el in arr arrowboard

    keys: {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        LEFT_KEY: 37,
        RIGHT_KEY: 39
    },

    score: 0,

    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    init: function () {
        this.canvas = document.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.start();
    },

    start: function () {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;

            this.clear();
            this.drawAll();
            this.setListeners();
            this.moveAll();
            this.clearArrows();

            // This module is also related to speed & difficulty
            if (this.framesCounter % this.randomInt(60, 100) === 0) {
                this.createArrows();
            }

            if (this.framesCounter > 1000) this.framesCounter = 0;
        }, 1000 / this.fps)
    },

    // order matters
    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);

        // arrow board
        // can i do it all with just an array fill with undefines and then mapping?
        this.arrowBoard = [
            new ArrowBoard(this.ctx, 'Arrow Right', 'img/arrow-right.png', this.background.height),
            new ArrowBoard(this.ctx, 'Arrow Top', 'img/arrow-top.png', this.background.height),
            new ArrowBoard(this.ctx, 'Arrow Bottom', 'img/arrow-bottom.png', this.background.height),
            new ArrowBoard(this.ctx, 'Arrow Left', 'img/arrow-left.png', this.background.height),
        ];

        this.arrowBoard.map(arrow => {
            arrow.posX = (this.background.width - (arrow.width + 16) * this.arrowCounter) - arrow.posY;
            this.arrowCounter++;
        });

        this.arrows = []

        // Players
        this.mia = new Player(this.ctx, this.width / 2 - 256, this.height, 'img/mia-idle.png', 1);
        this.vincent = new Player(this.ctx, this.width / 2, this.height, 'img/vincent-sprite.png', 5);
    },

    clear: function () {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    },

    drawAll: function () {
        this.background.draw();
        this.mia.draw(this.framesCounter);
        this.vincent.draw(this.framesCounter);
        this.arrowBoard.forEach(arrow => {
            arrow.draw()
        });
        //for each arrow, call draw method
        this.arrows.forEach(arrow => {
            arrow.draw()
        });
    },

    moveAll: function () {
        //for each arrow, call move method
        this.arrows.forEach(arrow => {
            arrow.move()
        });
        //this is also, where players' dance method is called
    },

    createArrows: function () {
        this.arrows.push(new Arrow(this.ctx, this.background.height, this.arrowBoard))
    },

    clearArrows: function () {
        this.arrows = this.arrows.filter(arrow => (arrow.posY > -arrow.height))
    },


    setListeners: function () {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY:
                    console.log("Top arrow");
                    
                    let arr = this.arrows.filter(arr => arr.name === "Arrow Top")
                    console.log(arr)
                    
                    break;
                case this.keys.DOWN_KEY:
                    console.log("Down arrow")
                    break;
                case this.keys.LEFT_KEY:
                    console.log("Left arrow")
                    break;
                case this.keys.RIGHT_KEY:
                    console.log("Right arrow")
                    break;
            }
        })
    }


    // to be reviewed
    // resize: function () {
    //     this.clear();
    //     this.width = window.innerWidth;
    //     this.height = window.innerHeight;
    //     this.background.height = game.height;
    //     this.background.width = game.background.height * 16 / 9
    // }


    
}