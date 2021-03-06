window.onload = function () {
    menu()
};

function menu(){
    const speak_card = {
        level1: ['/static/images/speaks/level1-1.png', '/static/images/speaks/level1-2.png', '/static/images/speaks/level1-3.png', '/static/images/speaks/level1-4.png', '/static/images/speaks/level1-5.png'],
        level2: ['/static/images/speaks/level2-1.png', '/static/images/speaks/level2-2.png', '/static/images/speaks/level2-3.png', '/static/images/speaks/level2-4.png', '/static/images/speaks/level2-5.png'],
        level3: ['/static/images/speaks/level3-1.png', '/static/images/speaks/level3-2.png', '/static/images/speaks/level3-3.png', '/static/images/speaks/level3-4.png', '/static/images/speaks/level3-5.png'],
        level4: ['/static/images/speaks/level4-1.png', '/static/images/speaks/level4-2.png', '/static/images/speaks/level4-3.png', '/static/images/speaks/level4-4.png', '/static/images/speaks/level4-5.png']
    };
    const game_data = {life:0, score:0, level:'level1', speed: 0.5, point: 0, move: true};
    document.getElementById('sound').addEventListener('click', sound_off);
    document.getElementById('silence').addEventListener('click', sound_on);
    document.getElementById('paddle').style.display = 'none';
    document.getElementById('start').addEventListener('click', function () {
        difficult(game_data, speak_card)
    })
}

function sound_on() {
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

function difficult(game_data, speak_card) {
    document.getElementById('start').remove();
    const difficult_buttons = document.createElement('div');
    difficult_buttons.setAttribute('id', 'difficult_button');

    let difficult = ['Easy', 'Medium', 'Mandalorian'];
    for (let element of difficult) {
        let button = document.createElement('button');
        button.textContent = element;
        button.setAttribute('id', element);
        difficult_buttons.appendChild(button)
    }
    const background = document.getElementById('menu_button');
    background.appendChild(difficult_buttons);

    for (let element of difficult) {
        document.getElementById(element).addEventListener('click', function () {
            game_start(element, game_data, speak_card)
        })
    }
}

function game_start(difficult, game_data, speak_card) {
    set_life(difficult, game_data);
    new_level('/static/images/level1_background.jpg');
    add_life_bar(game_data.life);
    add_score_bar(game_data.score);
    speak(speak_card, game_data)

}

function set_life(difficult, game_data){
    if (difficult === 'Easy'){
        game_data.life = 5;
        game_data.speed = 0.5;
        game_data.point = 1
    }
    else if (difficult === 'Medium'){
        game_data.life = 3;
        game_data.speed = 0.7;
        game_data.point = 3
    }
    else {
        game_data.life = 1;
        game_data.speed = 1;
        game_data.point = 5
    }
}

function new_level(new_background) {
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

function add_life_bar(live) {
    const life_bar = document.createElement('div');
    life_bar.setAttribute('id', 'life_bar');

    for (let i = 0; i < live; i++) {
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

function speak_change(speak_card, game_data) {
    let old_image = document.getElementById('speak').getAttribute('src');
    let index = speak_card.level1.indexOf(old_image);
    index++;
    if (index < speak_card.level1.length) {
        document.getElementById('speak').setAttribute('src', speak_card.level1[index])
    } else if (index === speak_card.level1.length) {
        document.getElementById('speak').removeEventListener('click', speak_change);
        document.getElementById('speak').addEventListener('click', function () {
            play(game_data)
        })
    }
}

function speak(speak_card, game_data) {
    let speak = document.createElement('img');
    speak.setAttribute('id', 'speak');
    speak.setAttribute('src', speak_card.level1[0]);
    document.getElementById('playground').appendChild(speak);

    document.getElementById('speak').addEventListener('click', function () {
        speak_change(speak_card, game_data)
    });
}

function play(game_data) {
    document.getElementById('speak').style.display = 'none';
    document.getElementById('paddle').style.display = 'block';
    let playGround = document.getElementById('playground');
    let paddleWidth = 130;
    let paddleHeight = 10;
    let brickWidth = 10;
    let brickHeight = 10;
    let leftPressed = false;
    let playGroundWidth = document.getElementById('playground').clientWidth;
    let playGroundHeight = document.getElementById('playground').clientHeight;
    let heads = ['Gamorrean_head.png', 'Gran_head.png', 'Weequay_head.png'];

    let paddle = {
        left: 40,
        top: 93.2
    };

    let bricks = [
        { left: 80, top: 0, status:1},
        { left: 85, top: 15,status:1},
        { left: 90, top: 30, status:1 },
        { left: 60, top: 0, status:1 },
        { left: 65, top: 15,status:1 },
        { left: 70, top: 30,status:1 },
        { left: 40, top: 0, status:1 },
        { left: 45, top: 15, status:1 },
        { left: 50, top: 30, status:1 },
        { left: 20, top: 0, status:1},
        { left: 25, top: 15, status:1 },
        { left: 30, top: 30, status:1 },
        { left: 0, top: 0, status:1 },
        { left: 5, top: 15, status:1 },
        { left: 10, top: 30, status:1 },
    ];

    document.onmousemove = function (event) {
        if (event.clientX >= paddleWidth / 2 && event.clientX <= (playGroundWidth - paddleWidth / 2)) {
            paddle.left = event.clientX - paddleWidth / 2;
        } else if (paddle.left < paddleWidth / 2) {
            paddle.left = 0;
        } else if (paddle.left > playGroundWidth - paddleWidth / 2 || event.clientX > playGroundWidth) {
            paddle.left = playGroundWidth - paddleWidth;
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

    function coordinate(element) {
        return element.getBoundingClientRect();
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    function drawBricks() {
        document.getElementById('bricks').innerHTML = "";
        for (let i = 0; i < bricks.length; i++) {
            document.getElementById('bricks').innerHTML += `<div class='bricks' style='left:${bricks[i].left}%; top:${bricks[i].top}%' id="brick${i}"></div>`;
        }
    }

    function add_head(){
        let index = getRandom(0, heads.length);
        return `/static/images/${heads[index]}`;
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
    let ballRadius = 10;
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
            let rightOfTheBallX = ballX + 2 * ballRadiusHorizontalPercentage;
            let topOfTheBallY = ballY + 2 * ballRadiusVerticalPercentage;
            let topOfCurrentBrickY = 100 - currentBrickTop;
            let bottomOfCurrentBrickY = topOfCurrentBrickY - brickHeight;
            if (
                rightOfTheBallX >= currentBrickLeft &&
                ballX <= currentBrickLeft + brickWidth &&
                ballY <= topOfCurrentBrickY &&
                topOfTheBallY >= bottomOfCurrentBrickY
            ) {
                if (ballY < topOfCurrentBrickY - 2 && topOfTheBallY > bottomOfCurrentBrickY + 2) {
                    direction.dx *= -1;
                } else {
                    direction.dy *= -1;
                }
                bricks.splice(brick, 1);
                game_data.score += game_data.point;
                document.getElementById('score_bar').textContent = game_data.score
            }
        }
        drawBricks();
    }

    function drawBall() {
        Object.assign(ball.style, {
            left: ballX + '%',
            bottom: ballY + '%'
        });
    }

    function paddleCollision() {
        let paddleWidthPercentage = (paddleWidth / playGroundWidth) * 100;
        let bottomOfPaddleY = 100 - paddle.top;
        let leftOfPaddleX = (paddle.left / playGroundWidth) * 100;
        if(ballX + ballRadiusHorizontalPercentage >= leftOfPaddleX  &&
            ballX <= leftOfPaddleX + paddleWidthPercentage  &&
            ballY <= bottomOfPaddleY
    ) {
           direction.dy *= -1;

        }

    }

    function reset_board(){
        document.getElementById('life').remove();
        document.getElementById('life_bar').remove();
        document.getElementById('score_bar').remove();
        document.getElementById('playground').remove();
        document.getElementById('song').setAttribute('src', '/static/audio/The_Mandalorian%20-%20Soundtrack.mp3');
        for (let i = 0; i < bricks.length; i++){
            document.getElementById(`brick${i}`).remove()
        }
    }

    function back_to_menu(){
        reset_board();
        let play_ground = document.createElement('div');
        play_ground.id = 'playground';

        let paddle = document.createElement('div');
        paddle.id = 'paddle';
        paddle.classList.add('paddle');
        play_ground.appendChild(paddle);

        let bricks = document.createElement('div');
        bricks.id = 'bricks';
        play_ground.appendChild(bricks);

        let menu_button = document.createElement('div');
        menu_button.id = 'menu_button';

        let start_button = document.createElement('button');
        start_button.id = 'start';
        start_button.value = 'START';

        menu_button.appendChild(start_button);
        play_ground.appendChild(menu_button);
        document.getElementById('background').appendChild(play_ground);
        document.getElementById('playground').style.backgroundImage = '/static/images/menu_background.jpg';
        menu()
    }

    function death(){
        let death = document.createElement('div');
        death.id = 'death';
        death.textContent = 'MISSION FAIL';
        let ballCoord = coordinate(document.getElementById('ball'));
        let paddleCoord = coordinate(document.getElementById('paddle'));
        if (ballCoord.y >= paddleCoord.y + 10) {
            game_data.life -= 1;
            add_life_bar(game_data.life);
            ballX = 60;
            ballY = 20;
            direction.dy *= -1;
            if (game_data.life === 0) {
                game_data.move = false;
                document.getElementById('playground').appendChild(death);
                setTimeout(back_to_menu, 3000)
            }
        }
    }

    function move() {
        if (game_data.move) {
            if (ballX >= 100 - 2 * ballRadiusHorizontalPercentage || ballX <= 0) {
                direction.dx *= -1;
            }
            if (ballY >= 100 - 2 * ballRadiusVerticalPercentage || ballY <= 0) {
                direction.dy *= -1;
            }
            collisionDetection();
            death();
            paddleCollision();

            if (ballY >= 110 || ballY <= -10 || ballX <= -10 || ballX >= 110) {
                clearInterval(id);
            } else {
                ballX += direction.dx;
                ballY += direction.dy;
                drawBall();
            }
        }
    }

    function draw() {
        drawPaddle();
        drawBricks();
        move();
    }
    draw();

}