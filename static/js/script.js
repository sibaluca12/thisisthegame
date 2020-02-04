

window.onload = function() {

    playGround = document.getElementById('playground')
    var paddleWidth = 175;
    var paddleHeight = 30;
    var paddleX = (playGround.width-paddleWidth)/2;
    var x = playGround.width/2;
    var y = playGround.height - 30;
    var dx = 2;
    var dy = -2;
    let rightPressed = false;
    let leftPressed = false;


    let paddle = {
        left: 25,
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
                paddle.left = paddle.left - 0.5;
                console.log(playGround.width);
            }


        }
            if (e.keyCode == 39) {
                if(paddle.left < 80) {
                    leftPressed = true;
                    paddle.left = paddle.left + 0.5;
                }


            }
            drawPaddle();
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



    function draw() {
        drawPaddle()
        drawBricks()

    }

    draw()

}

