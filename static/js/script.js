

window.onload = function() {

    playGround = document.getElementById('playground')
    var paddleWidth = 175;
    var paddleHeight = 30;
    var paddleX = (playGround.width-paddleWidth)/2;

    var dx = 2;
    var dy = -2;
    let rightPressed = false;
    let leftPressed = false;
    var playGroundWidth = document.getElementById('bricks').clientWidth;
    var playGroundHeight = document.getElementById('bricks').clientHeight;
    var x = playGroundWidth/2;
    var y = playGroundHeight;




    let paddle = {
        left: 40,
        top: 93.2
    };

    let bricks = [
        { left: 81, top: 0 },
        { left: 81, top: 10 },
        { left: 81, top: 20 },
        { left: 81, top: 30 },
        { left: 61, top: 0 },
        { left: 61, top: 10 },
        { left: 61, top: 20 },
        { left: 61, top: 30 },
        { left: 41, top: 0 },
        { left: 41, top: 10 },
        { left: 41, top: 20 },
        { left: 41, top: 30 },
        { left: 21, top: 0},
        { left: 21, top: 10 },
        { left: 21, top: 20 },
        { left: 21, top: 30 },
        { left: 1, top: 0 },
        { left: 1, top: 10 },
        { left: 1, top: 20 },
        { left: 1, top: 30 }
    ];

    document.onkeydown = function(e) {
        let rightPressed;
        if (e.keyCode == 37) {
            if(paddle.left > 0 ) {
                paddle.left = paddle.left - 2;
            }


        }
            if (e.keyCode == 39) {
                if(paddle.left < 79.5) {
                    leftPressed = true;
                    paddle.left = paddle.left + 2;
                }


            }
            drawPaddle();

        }


    function collisionDetection() {
        for(var brick=0; brick < bricks.length; i++) {
            if(
                ball.left >= bricks[brick].left &&
                ball.left <= (bricks[brick].left + 10) &&
                ball.top <= (bricks[brick].top + 10) &&
                ball.top >= bricks[brick].top
            ) {
                bricks.splice(brick, 1)
            }
        }
    }


    function drawBricks() {
        document.getElementById('bricks').innerHTML = "";
        for(var i = 0 ; i < bricks.length ; i++ ) {
            document.getElementById('bricks').innerHTML += `<div class='bricks' style='left:${bricks[i].left}%; top:${bricks[i].top}%'></div>`;
        }

    }

    function drawPaddle() {
        document.getElementById('paddle').style.left = paddle.left + '%';
        document.getElementById('paddle').style.top = paddle.top + '%';

    }

    function main() {
        let ball = document.getElementById("ball");
        let ballX = 40;
        let ballY = 50;
        ball.style.left = ballX + '%';
        ball.style.bottom = ballY + '%';

        let dx = 1;
        let dy = 1;

        let id = setInterval(move, 20);

        function move() {
            if (ballX >= 100) {
                dx = -dx;
            }
            if (ballY >= 100) {
                dy = -dy;
            }
            if (ballX <= 0) {
                dx = -dx;
            }
            if (ballY <= 0) {
                dy = -dy;
            }

            if (ballY >= 110 || ballY <= -10 || ballX<=-10 || ballX >= 110) {
                clearInterval(id);
            } else {
                ballX += dx;
                ballY += dy;
                ball.style.left = ballX + '%';
                ball.style.bottom = ballY + '%';
            }
        }
    }

    function draw() {

        drawPaddle();
        drawBricks();
        main();


    }

    draw()

}

