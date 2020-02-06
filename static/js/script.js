window.onload = function () {

function add_life_bar(live){
    const life_bar = document.createElement('div');
    life_bar.setAttribute('id', 'life_bar');

    for (let i=0; i<live; i++){
        let life = document.createElement('img');
        life.setAttribute('src', '/static/images/life_bar.png');
        life.setAttribute('id', 'life');
        life_bar.appendChild(life);
    }

    document.getElementById('background').appendChild(life_bar)
}

function add_score_bar(score) {
    const score_bar = document.createElement('div');
    score_bar.setAttribute('id', 'score_bar');
    score_bar.textContent = score;

    document.getElementById('background').appendChild(score_bar)
}

function speak_change(speak_card, game_data){
    let old_image = document.getElementById('speak').getAttribute('src');
    let index = speak_card.level1.indexOf(old_image);
    index++;
    if (index < speak_card.level1.length){
        document.getElementById('speak').setAttribute('src', speak_card.level1[index])
    }
    else if (index === speak_card.level1.length){
        document.getElementById('speak').removeEventListener('click', speak_change);
        document.getElementById('speak').addEventListener('click', function(){play(game_data)})
    }
}

function speak(speak_card, game_data){
    let speak = document.createElement('img');
    speak.setAttribute('id', 'speak');
    speak.setAttribute('src', speak_card.level1[0]);
    document.getElementById('playground').appendChild(speak);

    document.getElementById('speak').addEventListener('click', function(){speak_change(speak_card, game_data)});
}

function play(game_data) {
    document.getElementById('speak').style.display = 'none';
    document.getElementById('paddle').style.display = 'block';
    let playGround = document.getElementById('playground');
    let paddleWidth = 150;
    let paddleHeight = 10;
    let paddleX = (playGround.width-paddleWidth)/2;
    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 150;
    let brickHeight = 35;
    let playGroundWidth = document.getElementById('playground').clientWidth;
    let playGroundHeight = document.getElementById('playground').clientHeight;
    const heads = ['Gamorrean_head.png', 'Gran_head.png', 'Weequay_head.png'];

    let paddle = {
        left: 40,
        top: 93.2
    };

    let bricks = [
        { left: 81, top: 0, status:1},
        { left: 88, top: 10,status:1},
        { left: 94.5, top: 20, status:1 },
        { left: 61, top: 0, status:1 },
        { left: 68, top: 10,status:1 },
        { left: 75, top: 20,status:1 },
        { left: 41, top: 0, status:1 },
        { left: 48, top: 10, status:1 },
        { left: 55, top: 20, status:1 },
        { left: 21, top: 0, status:1},
        { left: 28, top: 10, status:1 },
        { left: 35, top: 20, status:1 },
        { left: 1, top: 0, status:1 },
        { left: 8, top: 10, status:1 },
        { left: 15, top: 20, status:1 },
    ];

    document.onmousemove = function (event) {
        if (event.clientX >= paddleWidth / 2 && event.clientX <= (playGroundWidth - paddleWidth / 2)){
            paddle.left = event.clientX - paddleWidth / 2;
        }
        else if (paddle.left < paddleWidth / 2){
            paddle.left = 0;
        }
        else if (paddle.left > playGroundWidth - paddleWidth / 2 || event.clientX > playGroundWidth){
            paddle.left = playGroundWidth - paddleWidth + 20;
        }
        drawPaddle()
    };

    function coordinate(element){
        return element.getBoundingClientRect();
    }

    function collisionDetection() {
        for (let brick = 0; brick < bricks.length; brick++) {
            if (
                ball.left >= bricks[brick].left &&
                ball.left <= (bricks[brick].left + 10) &&
                ball.top <= (bricks[brick].top + 10) &&
                ball.top >= bricks[brick].top
            ) {
                bricks.splice(brick, 1)
            }
        }
    }

    function getRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    function drawBricks(heads) {
        document.getElementById('bricks').innerHTML = "";
        for (let i = 0; i < bricks.length; i++) {
            let index = getRandom(0, heads.length);
            document.getElementById('bricks').innerHTML += `<div class='bricks' style='left:${bricks[i].left}%; top:${bricks[i].top}%' id="brick">
                <img src='/static/images/${heads[index]}' id="head" alt="head_image"></div>`;
        }
    }

    function drawPaddle() {
        document.getElementById('paddle').style.left = paddle.left + 'px';
        document.getElementById('paddle').style.top = paddle.top + '%';
    }

    let ball = document.createElement('div');
    ball.id = 'ball';
    document.querySelector('#playground').appendChild(ball);

    let ballX = 60;
    let ballY = 80;
    let ballRadius = 10;

    Object.assign(ball.style, {
        width: ballRadius * 2 + 'px',
        height: ballRadius * 2 + 'px',
        borderRadius: '50%',
        backgroundColor: 'orangered',
        position: 'absolute',
        left: ballX + '%',
        bottom: ballY + '%',
    });

    let direction = {dx: game_data.speed, dy: game_data.speed};

    let id = setInterval(move, 20);

    function move() {
        if ( ballX >= 100 - 2 * (ballRadius / playGroundWidth) * 100 || ballX <= 0 ) {
            direction.dx *= -1;
        }
        if (ballY >= 100 - 2 * (ballRadius / playGroundHeight) * 100 || ballY <= 0) {
            direction.dy *= -1;
        }

        if (ballY >= 110 || ballY <= -10 || ballX <= -10 || ballX >= 110) {
            clearInterval(id);
        } else {
            ballX += direction.dx;
            ballY += direction.dy;
            ball.style.left = ballX + '%';
            ball.style.bottom = ballY + '%';
        }
    }

    function draw(heads) {
        drawPaddle();
        drawBricks(heads);
        move();
        collisionDetection()
    }
    draw(heads);

}
