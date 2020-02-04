function main() {
    myMove();
}

//     let ball = document.getElementById('ball');
//     ball.style.left = "400px";
//     ball.style.bottom = "250px";
//     let id = setInterval(moveRightUp(ball), 1000);
//
//     function moveRightUp(element) {
//         let {x, y} = getCoordinates(element);
//         if (x > 600) {
//             clearInterval(id)
//         } else {
//             let newY = y + 100;
//             let newX = x + 100;
//             element.style.left = newX + 'px';
//             element.style.bottom = newY + 'px';
//         }
//     }
// }

// function getCoordinates(element) {
//     let x = parseInt(element.style.left);
//     let y = parseInt(element.style.bottom);
//     return {x, y};
// }


function myMove() {
    let ball = document.getElementById("ball");
    let pos = 0;
    let id = setInterval(frame, 5);

    function frame() {
        if (pos === 350) {
            clearInterval(id);
        } else {
            pos++;
            ball.style.bottom = pos + 'px';
            ball.style.left = pos + 'px';
        }
    }
}


main();
