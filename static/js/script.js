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

main();
