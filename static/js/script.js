function new_level(new_background) {
    const old_page = document.getElementById('playground');
    old_page.remove();

    const level1 = document.createElement("div");
    level1.setAttribute('id', 'playground');

    const main_page = document.getElementById('background');
    main_page.appendChild(level1);

    document.getElementById('playground').style.backgroundImage = `url('${new_background}')`;
}

function set_life(difficult, game_data) {
    if (difficult === 'Easy'){
        game_data.life = 5
    }
    else if (difficult === 'Medium'){
        game_data.life = 3
    }
    else{
        game_data.life = 1
    }
}

function add_life_bar(live){
    const life_bar = document.createElement('div');
    life_bar.setAttribute('id', 'life_bar');
    life_bar.style.position = 'absolute';
    life_bar.style.top = '22%';
    life_bar.style.left = '20px';
    life_bar.style.backgroundColor = 'white';
    life_bar.style.width = '150px';
    life_bar.style.height = '30px';

    for (let i=0; i<live; i++){
        let life = document.createElement("img");
        life.setAttribute('src', '/static/images/life_bar.png');
        life.style.width = "30px";
        life.style.height = "30px";
        life_bar.appendChild(life);
    }

    const ground = document.getElementById('background');
    ground.appendChild(life_bar)
}

function add_score_bar(score) {
    const score_bar = document.createElement('div');
    score_bar.setAttribute('id', 'score_bar');
    score_bar.style.position = 'absolute';
    score_bar.style.top = "22%";
    score_bar.style.left = '50.5%';
    score_bar.style.backgroundColor = 'white';
    score_bar.style.width = '150px';
    score_bar.style.height ='30px';
    score_bar.textContent = score;
    score_bar.style.textAlign = 'right';
    score_bar.style.fontSize = '20px';

    const ground = document.getElementById('background');
    ground.appendChild(score_bar);

}

function game_play(game_data, speak_card){
    let speak = document.getElementById('speak');
    let level1 = ["/static/images/speaks/level1-1.png", "/static/images/speaks/level1-2.png", "/static/images/speaks/level1-3.png", "/static/images/speaks/level1-4.png", "/static/images/speaks/level1-5.png"];
    speak.setAttribute('src', level1[0]);
    speak.style.display = 'block';
    for (let i = 0; i < level1.length; i++){
        setInterval(function () {
            speak.setAttribute('src', level1[i]);
        }, 2000);
    }
}

function speak(){
    let speak = document.createElement('img');
    speak.setAttribute('id', 'speak');
    speak.style.position = 'absolute';
    speak.style.width = '60%';
    speak.style.height = '60%';
    speak.style.top = '20%';
    speak.style.left = '20%';
    speak.style.display = 'none';

    let ground = document.getElementById('playground');
    ground.appendChild(speak)
}

function game_start(difficult, game_data, speak_card){
    set_life(difficult, game_data);
    new_level("/static/images/level1_background.jpg");
    add_life_bar(game_data.life);
    add_score_bar(game_data.score);
    speak();
    game_play(game_data, speak_card)
}

function difficulty(game_data) {
    const speak_cards = {
        level1: ["/static/images/speaks/level1-1.png", "/static/images/speaks/level1-2.png", "/static/images/speaks/level1-3.png", "/static/images/speaks/level1-4.png", "/static/images/speaks/level1-5.png"],
        level2: ["/static/images/speaks/level2-1.png", "/static/images/speaks/level2-2.png", "/static/images/speaks/level2-3.png", "/static/images/speaks/level2-4.png", "/static/images/speaks/level2-5.png"],
        level3: ["/static/images/speaks/level3-1.png", "/static/images/speaks/level3-2.png", "/static/images/speaks/level3-3.png", "/static/images/speaks/level3-4.png", "/static/images/speaks/level3-5.png"],
        level4: ["/static/images/speaks/level4-1.png", "/static/images/speaks/level4-2.png", "/static/images/speaks/level4-3.png", "/static/images/speaks/level4-4.png", "/static/images/speaks/level4-5.png"]};
    const old_buttons = document.getElementsByTagName('button');
    for (let i=0; i<old_buttons.length; i++){
        old_buttons[i].remove()
    }
    const difficult_buttons = document.createElement("ul");
    difficult_buttons.setAttribute('id', 'difficult_button');

    let difficult = ['Easy', 'Medium', 'Mandalorian'];
    for (let element of difficult) {
        let button = document.createElement('button');
        button.textContent = element;
        button.setAttribute('id', element);
        difficult_buttons.appendChild(button);}

    const background = document.getElementById('menu_button');
    background.appendChild(difficult_buttons);

    for (let element of difficult) {
        document.getElementById(element).addEventListener('click', function(){
            game_start(element, game_data, speak_cards)
        })
    }
}

function main() {
    const game_data = {life:0, speed:0, score:0, level:'level1'};
    document.getElementById('start').addEventListener("click", function(){
        difficulty(game_data)});

}

main();