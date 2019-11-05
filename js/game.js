const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    arrowCounter: 0, //Number of el in arr arrowboard
    score: 0,

    keys: {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        LEFT_KEY: 37,
        RIGHT_KEY: 39
    },

    arrows: [],

    textIndex: 0,


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
        this.setListeners(this.scoreBoard);
    },

    start: function () {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;

            this.clear();
            this.nextLevel();

            this.drawAll();
            this.moveAll();
            this.clearArrows();
            this.clearMessages();

            // This module is also related to speed & difficulty
            if (this.framesCounter % this.randomInt(40, 100) === 0) {
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

        // Position arrows
        this.arrowBoard.map(arrow => {
            arrow.posX = this.background.width + (this.width - this.background.width) / 2 - (arrow.width + 16) * this.arrowCounter - arrow.width * 2;
            this.arrowCounter++;
        });

        // Players
        this.mia = new Player(this.ctx, this.width / 2 - this.width * 0.2, this.height, 'img/mia-idle.png', 1, this.keys, this.arrowBoard);
        this.vincent = new Player(this.ctx, (this.width / 2 - this.width * 0.05), this.height, 'img/vincent-sprite.png', 5, this.keys, this.arrowBoard
        );

        scoreBoard.init(this.ctx, this.width, this.background.width, this.background.height)

        // Messages
        this.messages = [];
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

        this.messages.forEach(message => {
            message.draw();
            message.fadeOut();
        })

        scoreBoard.draw(this.score);
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

    createMessage: function () {
        this.messages.push(new Message(this.ctx, this.textIndex, this.arrowBoard, this.randomInt(100, 200), 100, 100));
    },

    clearMessages: function () {
        this.messages = this.messages.filter(message => (message.alpha > 0))
    },


    setListeners: function () {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Top").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.scoring(this.distance);
                    })
                    break;
                case this.keys.DOWN_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Bottom").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.scoring(this.distance);
                    })
                    break;
                case this.keys.LEFT_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Left").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.scoring(this.distance);
                    })
                    break;
                case this.keys.RIGHT_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Right").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.scoring(this.distance);
                    })
                    break;
            }
        })
    },

    scoring: function (distance) {
        let arrowHeight = this.arrowBoard[0].height

        switch (true) {
            case (distance < arrowHeight * 0.1):
                this.calculateScore(+3, 0);
                break;
            case (distance < arrowHeight * 0.25):
                this.calculateScore(2, 1)
                break;
            case ((distance > arrowHeight * 0.25) && (distance < arrowHeight * 0.5)):
                this.calculateScore(+1, 2);
                break;
            case (distance > arrowHeight * 0.5):
                this.calculateScore(-5, 3);
                break;
        }
    },

    calculateScore: function (number, textIndex) {
        this.score += number;
        scoreBoard.scoreWidth += this.score;
        this.textIndex = textIndex;
        this.createMessage();
        return this.score;
    },

    nextLevel: function () {
        // end of level
        if (scoreBoard.scoreWidth >= scoreBoard.width) {
            this.arrows = [];
            this.messages = [];
            scoreBoard.scoreWidth = scoreBoard.width;
            clearInterval(this.interval);
            alert("Level completed");
        } else if (scoreBoard.scoreWidth <= 0) {
            scoreBoard.scoreWidth = 0;
            scoreBoard.draw();
            this.gameOver()
        }

        // increment difficulty
        // start new level
        // this.init();
    },

    gameOver: function () {
        this.arrows = [];
        this.messages = [];
        clearInterval(this.interval);
        alert("You suck");
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