

window.onload = function() {


    let paddle = {
        left: 500,
        top: 500
    };

    document.onkeydown = function(e) {
            if (e.keyCode == 37) {
                console.log('something')
                paddle.left = paddle.left - 20;

            }
            if (e.keyCode == 39) {
                paddle.left = paddle.left + 20;
                console.log('something else')
            }
            drawPaddle();
        }


    function drawPaddle() {
        document.getElementById('paddle').style.left = paddle.left + 'px';
        document.getElementById('paddle').style.top = paddle.top + 'px';

    }



    function draw() {
        drawPaddle()
    }

    draw()
}

