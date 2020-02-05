function main() {
    let ball = document.getElementById("ball");
    ball.style.left = "400px";
    ball.style.bottom = "250px";

    let id = setInterval(move, 5);
}

function getCoordinates(element) {
    let x = parseInt(element.style.left);
    let y = parseInt(element.style.bottom);
    return [x, y];
}

function move() {
    let x = getCoordinates(ball)[0];
    let y = getCoordinates(ball)[1];
    if (y === 350) {
        clearInterval(id);
    } else {
        x++;
        y++;
        ball.style.left = x + 'px';
        ball.style.bottom = y + 'px';
    }
}

main();
