let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
docReady()

class Xy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor() {
        this.body = [
            new Xy(100, 20),
            new Xy(120, 20),
            new Xy(140, 20)
        ]

        this.speed = new Xy(-1, 0)
    }

    clearSnake() {
        ctx.fillStyle = ''
        ctx.fillRect(this.body[0].x, this.body[0].y, 20, 20);
        ctx.fillStyle = 'white'
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, 20, 20);
        }
    }

// khởi tạo con rắn
    draw() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.body[0].x, this.body[0].y, 20, 20);
        ctx.fillStyle = 'orange'
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, 20, 20);
        }
    }

    headGame() {
        let head = this.body[0]
        if (head.x < 0) {
            head.x = 600;
        }
        if (head.x > 600) {
            head.x = 0
        }
        if (head.y < 0) {
            head.y = 600;
        }
        if (head.y > 600) {
            head.y = 0
        }

    }


// làm cho con rắn chuyển động
    move() {
        this.clearSnake()
        this.headGame()
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        this.body[0].x += this.speed.x * 20;
        this.body[0].y += this.speed.y * 20;
        this.draw()

    }


//check xem tọa độ phần đầu rắn và tọa độ hộp == nhau ko
//    đk đang ko nhận check phần này
    check(food) {
        let head = this.body[0]
        return food.x === head.x && food.y === head.y
    }


    grow() {

        this.clearSnake()
        let snakeLength = this.body.length
        console.log(snakeLength)
        let snakeX = this.body[snakeLength - 1].x - this.body[snakeLength - 2].x
        let snakeY = this.body[snakeLength - 1].y - this.body[snakeLength - 2].y
        let toado = new Xy(
            this.body[snakeLength - 1] + snakeX,
            this.body[snakeLength - 1] + snakeY
        )
        this.body.push(toado)
        this.draw()
    }

    checkover() {
        let tail = this.body;
        let snakeLength = this.body.length;
        console.log(tail[0].x + "hmmm")
        for (let i = 1; i < snakeLength - 1; i++) {
            if (tail[0].x === tail[i].x && tail[0].y === tail[i].y) {
                this.clearSnake()
                this.body = [
                    new Xy(100, 20),
                    new Xy(120, 20),
                    new Xy(140, 20)
                ]
                this.draw()
            }
        }
    }


}

//tạo thức ăn cho rắn
class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    cleasfood() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, 20, 20)
    }

    randomNumber() {
        let randomNumber = Math.floor(Math.random() * 600) + 1;
        return randomNumber
    }

    draw() {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, 20, 20)
    }

    spawn() {
        this.cleasfood()
        this.x = this.randomNumber()
        this.y = this.randomNumber()
        this.x = Math.floor(this.x / 20) * 20;
        this.y = Math.floor(this.y / 20) * 20;
        this.draw()
    }

}

let activity = ``;

function start() {
    activity = setInterval(() => {
        snake.move()
        if (snake.check(food)) {
            snake.grow()
            food.spawn()
        }
        snake.checkover()
    }, 200)
}

function stop() {
    clearInterval(activity)
}


//điều khiển rắn từ các phím
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            if (snake.speed.x === 1) {
                break
            }
            snake.speed = new Xy(-1, 0);
            break;
        case 39:
            if (snake.speed.x === -1) {
                break
            }
            snake.speed = new Xy(1, 0);
            break;
        case 38:
            if (snake.speed.y === 1) {
                break
            }
            snake.speed = new Xy(0, -1);
            break;
        case 40:
            if (snake.speed.y === -1) {
                break
            }
            snake.speed = new Xy(0, 1);
            break;

    }
}

function docReady() {
    window.addEventListener('keydown', moveSelection);
}


let snake = new Snake()
snake.move()
let food = new Food();
food.spawn()

