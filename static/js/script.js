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

function game_start(difficult, game_data){
    set_life(difficult, game_data);
    new_level("/static/images/level1_background.jpg");
    add_life_bar(game_data.life);
    add_score_bar(game_data.score)
}

function difficulty(game_data) {
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
            game_start(element, game_data)
        })
    }
}

function main() {
    const game_data = {life:0, speed:0, score:0};
    document.getElementById('start').addEventListener("click", function(){
        difficulty(game_data)});

}

main();