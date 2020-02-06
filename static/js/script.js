window.onload = function () {
    const speak_card = {
        level1: ['/static/images/speaks/level1-1.png', '/static/images/speaks/level1-2.png', '/static/images/speaks/level1-3.png', '/static/images/speaks/level1-4.png', '/static/images/speaks/level1-5.png'],
        level2: ['/static/images/speaks/level2-1.png', '/static/images/speaks/level2-2.png', '/static/images/speaks/level2-3.png', '/static/images/speaks/level2-4.png', '/static/images/speaks/level2-5.png'],
        level3: ['/static/images/speaks/level3-1.png', '/static/images/speaks/level3-2.png', '/static/images/speaks/level3-3.png', '/static/images/speaks/level3-4.png', '/static/images/speaks/level3-5.png'],
        level4: ['/static/images/speaks/level4-1.png', '/static/images/speaks/level4-2.png', '/static/images/speaks/level4-3.png', '/static/images/speaks/level4-4.png', '/static/images/speaks/level4-5.png']
    };
    const game_data = {life:0, score:0, level:'level1', speed: 0.5};
    document.getElementById('sound').addEventListener('click', sound_off);
    document.getElementById('silence').addEventListener('click', sound_on);
    document.getElementById('paddle').style.display = 'none';
    document.getElementById('start').addEventListener('click', function(){difficult(game_data, speak_card)})
};

function sound_on(){
    let sound = document.getElementById('song');
    sound.play();
    sound.autoplay = true;
    sound.loop = true;
    sound.currentTime = 0;
    document.getElementById('sound').style.display = 'block';
    document.getElementById('silence').style.display = 'none';
}

function sound_off() {
    let sound = document.getElementById('song');
    sound.pause();
    sound.autoplay = false;
    document.getElementById('sound').style.display = 'none';
    document.getElementById('silence').style.display = 'block'
}

function difficult(game_data, speak_card){
    document.getElementById('start').remove();
    const difficult_buttons = document.createElement('div');
    difficult_buttons.setAttribute('id', 'difficult_button');

    let difficult = ['Easy', 'Medium', 'Mandalorian'];
    for (let element of difficult){
        let button = document.createElement('button');
        button.textContent = element;
        button.setAttribute('id', element);
        difficult_buttons.appendChild(button)}
    const background = document.getElementById('menu_button');
    background.appendChild(difficult_buttons);

    for (let element of difficult){
        document.getElementById(element).addEventListener('click', function(){
            game_start(element, game_data, speak_card)})
    }
}

function game_start(difficult, game_data, speak_card){
    set_life(difficult, game_data);
    new_level('/static/images/level1_background.jpg');
    add_life_bar(game_data.life);
    add_score_bar(game_data.score);
    speak(speak_card, game_data)

}

function set_life(difficult, game_data){
    if (difficult === 'Easy'){
        game_data.life = 5
    }
    else if (difficult === 'Medium'){
        game_data.life = 3
    }
    else {
        game_data.life = 1
    }
}

function new_level(new_background){
    document.getElementById('menu_button').remove();
    document.getElementById('playground').style.backgroundImage = `url('${new_background}')`;
    switch (new_background) {
        case '/static/images/level1_background.jpg':
            document.getElementById('song').setAttribute('src', '/static/audio/Face_to_Face.mp3');
            break;
        case '/static/images/level2_background.jpg':
            document.getElementById('song').setAttribute('src', '/static/audio/HammerTime.mp3');
            break;
        case '/static/images/level3_background.jpg':
            document.getElementById('song').setAttribute('src', '/static/audio/Back_for_Beskar.mp3');
            break;
        case '/static/images/level4_background.jpg':
            document.getElementById('song').setAttribute('src', '/static/audio/You_are_a_Mandalorian.mp3');
            break;
    }
}

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
    let brickWidth = 10;
    let brickHeight = 10;
    let rightPressed = false;
    let leftPressed = false;
    let playGroundWidth = document.getElementById('playground').clientWidth;
    let playGroundHeight = document.getElementById('playground').clientHeight;
    let heads = ['Gamorrean_head.png', 'Gran_head.png', 'Weequay_head.png'];

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

    function coordinate(element){
        return element.getBoundingClientRect();
    }

    function getRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    function drawBricks(heads) {
        document.getElementById('bricks').innerHTML = "";
        for (let i = 0; i < bricks.length; i++) {
            // let index = getRandom(0, heads.length);
            let index = 1;
            document.getElementById('bricks').innerHTML += `<div class='bricks' style='left:${bricks[i].left}%; top:${bricks[i].top}%'>
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
    let ballY = 20;
    let ballRadius = 40;
    let ballRadiusHorizontalPercentage = (ballRadius / playGroundWidth) * 100;
    let ballRadiusVerticalPercentage = (ballRadius / playGroundHeight) * 100;

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

    function collisionDetection() {
        for (let brick = 0; brick < bricks.length; brick++) {
            let currentBrickLeft = bricks[brick].left;
            let currentBrickTop = bricks[brick].top;
            if (
                ballX + 2 * ballRadiusHorizontalPercentage >= currentBrickLeft &&
                ballX <= currentBrickLeft + brickWidth &&
                ballY <= 100 - currentBrickTop &&
                ballY + 2 * ballRadiusVerticalPercentage >= 100 - currentBrickTop - brickHeight
            ) {
                if (ballY < 100 - currentBrickTop && ballY > 100 - currentBrickTop - brickHeight) {
                    direction.dx *= -1;
                } else {
                    direction.dy *= -1;
                }
                bricks.splice(brick, 1);
            }
        }
        drawBricks(heads);
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

    function draw(heads) {
        drawPaddle();
        drawBricks(heads);
        move();
    }
    draw(heads);

}