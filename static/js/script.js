window.onload = function () {

    let playGround = document.getElementById('playground');
    let paddleWidth = 175;
    let paddleHeight = 30;
    let paddleX = (playGround.width - paddleWidth) / 2;
    let brickRowCount = 4;
    let brickColumnCount = 5;
    let brickWidth = 150;
    let brickHeight = 35;
    let rightPressed = false;
    let leftPressed = false;
    let playGroundWidth = document.getElementById('playground').clientWidth;
    let playGroundHeight = document.getElementById('playground').clientHeight;
    let x = playGroundWidth / 2;
    let y = playGroundHeight;


    let paddle = {
        left: 40,
        top: 93.2
    };

    let bricks = [
        {left: 81, top: 0, status: 1},
        {left: 81, top: 10, status: 1},
        {left: 81, top: 20, status: 1},
        {left: 81, top: 30, status: 1},
        {left: 61, top: 0, status: 1},
        {left: 61, top: 10, status: 1},
        {left: 61, top: 20, status: 1},
        {left: 61, top: 30, status: 1},
        {left: 41, top: 0, status: 1},
        {left: 41, top: 10, status: 1},
        {left: 41, top: 20, status: 1},
        {left: 41, top: 30, status: 1},
        {left: 21, top: 0, status: 1},
        {left: 21, top: 10, status: 1},
        {left: 21, top: 20, status: 1},
        {left: 21, top: 30, status: 1},
        {left: 1, top: 0, status: 1},
        {left: 1, top: 10, status: 1},
        {left: 1, top: 20, status: 1},
        {left: 1, top: 30, status: 1}
    ];

    document.onkeydown = function (e) {
        let rightPressed;
        if (e.code === 'ArrowLeft') {
            if (paddle.left > 0) {
                paddle.left = paddle.left - 2;
            }
        }
        if (e.code === 'ArrowRight') {
            if (paddle.left < 79.5) {
                leftPressed = true;
                paddle.left = paddle.left + 2;
            }
        }

        drawPaddle();
    };

    function drawBricks() {
        document.getElementById('bricks').innerHTML = "";
        for (let i = 0; i < bricks.length; i++) {
            document.getElementById('bricks').innerHTML += `<div class='bricks' style='left:${bricks[i].left}%; top:${bricks[i].top}%'></div>`;
        }
    }

    function drawPaddle() {
        document.getElementById('paddle').style.left = paddle.left + '%';
        document.getElementById('paddle').style.top = paddle.top + '%';

    }

    let ball = document.createElement('div');
    ball.id = 'ball';
    document.querySelector('#playground').appendChild(ball);

    let ballX = 60;
    let ballY = 20;
    let ballRadius = 40;
    let ballRadiusHorizontalPercentage =  (ballRadius / playGroundWidth) * 100;
    let ballRadiusVerticalPercentage =  (ballRadius / playGroundHeight) * 100;

    Object.assign(ball.style, {
        width: ballRadius * 2 + 'px',
        height: ballRadius * 2 + 'px',
        borderRadius: '50%',
        backgroundColor: 'orangered',
        position: 'absolute',
        left: ballX + '%',
        bottom: ballY + '%',
    });

    let direction = {dx: 1, dy: 1};

    let id = setInterval(move, 20);

    function collisionDetection() {
        let didItHit = false;
        for (let brick = 0; brick < bricks.length; brick++) {
            if (
                ballX + 2 * ballRadiusHorizontalPercentage >= bricks[brick].left &&
                ballX <= (bricks[brick].left + 18) &&
                ballY <= (100 - bricks[brick].top) &&
                ballY + 2 * ballRadiusVerticalPercentage >= 100 - bricks[brick].top - 8
            ) {
                bricks.splice(brick, 1);
                direction.dy *= -1;
            }
        }
        drawBricks();
        return didItHit;
    }

    function drawBall() {
        Object.assign(ball.style, {
            left: ballX + '%',
            bottom: ballY + '%'
        });
    }

    function move() {
        if (ballX >= 100 - 2 * ballRadiusHorizontalPercentage || ballX <= 0) {
            direction.dx *= -1;
        }
        if (ballY >= 100 - 2 * ballRadiusVerticalPercentage || ballY <= 0) {
            direction.dy *= -1;
        }
        collisionDetection();

        if (ballY >= 110 || ballY <= -10 || ballX <= -10 || ballX >= 110) {
            clearInterval(id);
        } else {
            ballX += direction.dx;
            ballY += direction.dy;
            drawBall();
        }
    }

    function draw() {
        drawPaddle();
        drawBricks();
        move();
        // collisionDetection()
    }

    draw()
};
