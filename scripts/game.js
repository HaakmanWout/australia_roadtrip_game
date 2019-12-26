document.addEventListener("click", function(event) {
    if (posy >= 52.5) {
        force = std_force;
    }
});

document.addEventListener("touchstart", function(event) {
    if (posy >= 52.5) {
        force = std_force;
    }
    if (game_over) {
        restart();
    }
});

document.body.onkeyup = function(event){
    if (event.keyCode == 32) {
        if (posy >= 52.5) {
            force = std_force;
        }
        
        if (game_over) {
            restart();
        }
    }
}

var game_over = true;
var score = 0;

var std_force = 2.75;
var posy = 52.5;
var force = 0;
var demean = 0.1;

var score_text = document.getElementById("score");
var game_state_text = document.getElementById("game_state");

var honda_crv = document.getElementById("honda_crv");
var enemies = document.getElementById("enemies");

var sydney = document.getElementById("sydney");
var canberra = document.getElementById("canberra");
var melbourne = document.getElementById("melbourne");

var animated_elements = document.getElementsByClassName("animated");

var enemy_list = [];

function calculate_force() {
    force = Math.max(force - demean, -std_force);
    
    posy = Math.min(52.5, posy - force);
}

function push_kangaroo(xpos) {
    enemy_list.push({enemy_name:"kangaroo", posx: xpos, posy: 60});
}

function intersects(rect1, rect2) {
    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom)
}

function draw() {
    calculate_force();
    score += 1;

    score_text.innerHTML = "Score: " + score;
    honda_crv.style.transform = "translate3d(5vw, " + posy + "vh, 0)";

    sydney.style.transform = "translate3d(" + (-score / 6) + "vw, 0, 0)";
    canberra.style.transform = "translate3d(" + (350 - score / 4) + "vw, 0, 0)";
    melbourne.style.transform = "translate3d(" + (750 - score / 4) + "vw, 0, 0)";

    enemies.innerHTML = "";
    for (var i = 0; i < enemy_list.length; i++) {
        enemy_list[i].posx -= 1.8;
        if (enemy_list[i].posx <= -20) {
            enemy_list[i].posx = 300;
        }
        enemies.innerHTML += "<div id=\"" + enemy_list[i].enemy_name + "\" class=\"" + i + "\" style=\"transform:translate3d(" + enemy_list[i].posx + "vh, " + enemy_list[i].posy + "vh, 0)\"></div>";

        var enemyBB = document.getElementsByClassName(i)[0].getBoundingClientRect();
        if (intersects(honda_crv.getBoundingClientRect(), enemyBB)) {
            game_over = true;
            game_state_text.innerHTML = "GAME OVER";
            game_state_text.style.color = "red";

            for (var i = 0; i < animated_elements.length; i++) {
                animated_elements[i].style.webkitAnimationPlayState = 'paused';
            }
        }
    }

    if (score == 3000) {
        game_over = true;
        game_state_text.innerHTML = "YOU WON THE GAME!<br>WELCOME IN MELBOURNE";
        game_state_text.style.color = "white";

        for (var i = 0; i < animated_elements.length; i++) {
            animated_elements[i].style.webkitAnimationPlayState = 'paused';
        }
    }
}

function loop(timestamp) {
    var progress = timestamp - lastRender
  
    if (!game_over) {
        draw()
    }
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
}

function restart() {
    game_over = false;
    score = 0;
    force = 0;

    enemy_list = [];

    game_state_text.innerHTML = "";
  
    push_kangaroo(300);
    push_kangaroo(450);

    for (var i = 0; i < animated_elements.length; i++) {
        animated_elements[i].style.webkitAnimationPlayState = 'running';
    }
}

restart();

var lastRender = 0
window.requestAnimationFrame(loop)