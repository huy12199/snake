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
            new Xy(100, 5),
            new Xy(120, 5),
            new Xy(140, 5)
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


// làm cho con rắn chuyển động
    move() {
        this.clearSnake()
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
        if (food.y === head.y) {
            console.log("y")
        }
        if (food.x === head.x) {
            console.log("x")
        }

        console.log(head.y + "head")
        console.log(food.y + "food")
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
        let randomNumber = Math.floor(Math.random() * 500) + 1;
        randomNumber -= randomNumber % 20
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
        this.draw()
    }

}

setInterval(() => {
    snake.move()
    if (snake.check(food) === true) {
        snake.grow()
        food.spawn()
    }
}, 200)


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

