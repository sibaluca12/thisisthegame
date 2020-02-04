function level_add(new_level_id, old_level_id) {
    let level1 = document.createElement("div");
    level1.setAttribute('id', new_level_id);
    let old_page = document.getElementById(old_level_id);
    old_page.remove();
    let main_page = document.getElementById('background');
    main_page.appendChild(level1)
}

function main() {
    let main_page_id = 'playground';
    let level1_id = 'playground_level1';
    document.getElementById('start').addEventListener("click", function(){
        level_add(level1_id, main_page_id)});
    }

main();