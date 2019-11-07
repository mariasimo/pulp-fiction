const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 20,
    framesCounter: 0,
    arrowCounter: 0, //Number of el in arr arrowboard
    score: 0,
    dance: undefined,
    keys: {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
        Y_LETTER: 89,
        N_LETTER: 78,
    },
    arrows: [],
    messages: [],
    textIndex: 0,
    level: 0,
    increaseDifficulty: 1,
    isKeyboardInitialized : false,

    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    init: function () {
        this.canvas = document.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth * 0.75
        this.height = window.innerHeight * 0.75;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.arrowCounter = 0;
        // this.level = 0;
        this.textIndex = 0;
        this.score = 0;
        this.start();
        if (!this.isKeyboardInitialized) {
            this.isKeyboardInitialized = true;
            this.setListeners(this.scoreBoard);
        }
    },

    start: function () {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;

            this.clear();
            this.drawAll();
            this.clearMessages();

            this.moveAll();
            this.clearArrows();

            // This module is also related to speed & difficulty
            if (this.framesCounter % this.randomInt(40, 100) === 0) {
                this.createArrows();
            }

            if (this.framesCounter > 1000) this.framesCounter = 0;

            this.winOrLose();


        }, 1000 / this.fps)
    },

    // order matters
    reset: function () {
        this.background = new Background(this.ctx, "img/bg-1.png", this.width, this.height, 1);
        this.nextLevel = new Background(this.ctx, "img/next-level.png", this.width, this.height, 2);

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
        this.mia = new Player(this.ctx, (this.width / 2 - this.width * 0.2), this.height, 'img/mia.png');
        this.vincent = new Player(this.ctx, (this.width / 2 - this.width * 0.05), this.height, 'img/vincent-sprite.png');

        scoreBoard.init(this.ctx, this.width, this.background.width, this.background.height, this.level)

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
            //message.fadeOut();
        })

        scoreBoard.draw(this.score);
    },

    moveAll: function () {
        this.arrows.forEach(arrow => {
            arrow.move()
        });

        // if countdown has finished
        this.mia.dance(this.framesCounter)

        if (this.dance === "dance") {
            this.vincent.dance(this.framesCounter);

        } else {

            this.vincent.framesIY = 0;
            this.vincent.animate(this.framesCounter);
        }
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
        this.messages = this.messages.filter(message => message.posY > 0);
    },

    setListeners: function() {
        document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Top").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.calculateScoreBasedOnDistance(this.distance);
                    })
                    break;
                case this.keys.DOWN_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Bottom").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.calculateScoreBasedOnDistance(this.distance);
                    })
                    break;
                case this.keys.LEFT_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Left").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.calculateScoreBasedOnDistance(this.distance);
                    })
                    break;
                case this.keys.RIGHT_KEY:
                    this.arrows.filter(arr => arr.name === "Arrow Right").forEach(arr => {
                        this.distance = arr.posY - this.arrowBoard[0].posY;
                        this.calculateScoreBasedOnDistance(this.distance);
                    })
                    break;
            }
        })
    },

    _calculateScore : function (number, textIndex) {
        this.createMessage();
        this.score = number - this.increaseDifficulty;

        if (number > 0) {
            this.score *= 2;
        }

        scoreBoard.scoreWidth += this.score
        this.textIndex = textIndex;

        return this.score;
    },



    calculateScoreBasedOnDistance: function (distance) {
        let arrowHeight = this.arrowBoard[0].height
        let newScore = 0

        switch (true) {
            case (distance < arrowHeight * 0.1):
                newScore = this._calculateScore(6, 0);
                return this.dance = "dance";
                break;
            case (distance < arrowHeight * 0.25):
                newScore = this._calculateScore(3, 1);
                return this.dance = "dance";
                break;
            case ((distance > arrowHeight * 0.25) && (distance < arrowHeight * 0.5)):
                newScore = this._calculateScore(1, 2);
                return this.dance = "dance";
                break;
            case (distance > arrowHeight * 0.5):
                newScore = this._calculateScore(-5, 3);
                return this.dance = "stop";
                break;
        }
    },

    winOrLose: function () {
        // end of level
        if (scoreBoard.scoreWidth >= scoreBoard.width) {
            this.newLevel();
        } else if (scoreBoard.scoreWidth <= 0) {
            this.gameOver()
        }
    },

    newLevel: function () {
        this.nextLevel.draw();
        this.nextLevel.animate(this.framesCounter);

        this.arrows = [];
        this.messages = [];
        scoreBoard.scoreWidth = 0;
        scoreBoard.draw();

        this.level++;
        this.fps += 5;
        this.increaseDifficulty++;

        clearInterval(this.interval);

        setTimeout(() => {
            game.clear();
            game.init();
        }, 2000)
    },


    gameOver: function () {

        let _listenTryAgain = () => {
            document.addEventListener('keydown', (e) => {
                switch (e.keyCode) {
                    case this.keys.Y_LETTER:
                        setTimeout(() => {
                            game.clear();
                            this.level = 0;
                            game.init();

                        }, 200)
                        break;

                    case this.keys.N_LETTER:
                        setTimeout(() => {
                            game.clear();
                            animationOnLoad.init();
                        }, 200)
                        break;
                }
            })
        }

        this.arrows = [];
        this.messages = [];
        scoreBoard.scoreWidth = 0;
        scoreBoard.draw();

        this.ctx.fillStyle = "#141b26"
        this.ctx.fillRect(0, 0, this.width, this.height)

        this.ctx.fillStyle = "#e4ddd3";
        this.ctx.font = '1em "Press Start 2P"'

        if (this.level > 3) {
            this.ctx.fillText("WOW. YOU REALLY SUCK AT THIS", this.background.width * .25, this.background.height * .4)
            this.ctx.fillText("YOUR BOSS MARCELLUS WON'T BE HAPPY", this.background.width * .25, this.background.height * .45)
            this.ctx.fillText("Wanna try again? Y/N", this.background.width * .25, this.background.height * .6)

        } else {
            this.ctx.fillText("WELL, IT SEEMS YOU CAN'T KEEP UP WITH MIA", this.background.width * .25, this.background.height * .4)
            this.ctx.fillText("BUT THEN, WHO CAN?", this.background.width * .25, this.background.height * .45)
            this.ctx.fillText("Wanna try again? Y/N", this.background.width * .25, this.background.height * .6)
        }

        _listenTryAgain();
        clearInterval(this.interval);
    }
}