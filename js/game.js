const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    arrowCounter: 0,

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
            this.moveAll();
            this.clearArrows();

            // console.log(this.arrows.map(a => a.name));

            // This module is also related to speed & difficulty
            if (this.framesCounter % 100 === 0) this.createArrows();

            if (this.framesCounter > 1000) this.framesCounter = 0;
        }, 1000 / this.fps)
    },

    // order matters
    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.mia = new Player(this.ctx, this.width / 2 - 256, this.height, 'img/mia-idle.png', 1);
        this.vincent = new Player(this.ctx, this.width / 2, this.height, 'img/vincent-sprite.png', 5);

        // arrow board
        // can i do it all with just an array fill with undefines and then mapping?
        this.arrowBoard = [
            new ArrowBoard(this.ctx, 'Arrow Left', 'img/arrow-left.png', this.background.height),
            new ArrowBoard(this.ctx, 'Arrow Bottom', 'img/arrow-bottom.png', this.background.height),
            new ArrowBoard(this.ctx, 'Arrow Top', 'img/arrow-top.png', this.background.height),
            new ArrowBoard(this.ctx, 'Arrow Right', 'img/arrow-right.png', this.background.height),
        ];
        this.arrowBoard.map(arrow => {
            arrow.posX = (this.background.width - (arrow.width + 16) * this.arrowCounter) + arrow.width;
            this.arrowCounter++;
        });

        this.arrows = []
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
        this.arrows.push(new Arrow(this.ctx, 'img/fill-arrow-right.png', this.background.height))

        this.arrows.filter(arrow => arrow.name = "Arrow Left").map(arrowLeft => {
            arrowLeft.posX = this.arrowBoard[0].posX;
        })
    },

    clearArrows: function () {
        this.arrows = this.arrows.filter(arrow => (arrow.posY > -arrow.height))
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