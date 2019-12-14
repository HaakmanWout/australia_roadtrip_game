document.addEventListener("click", function(event) {
    if (event.target.closest('#australian_soil') && posy >= 52.5) {
        force = std_force;
    }
});

var game_over = true;
var score = 0;

var std_force = 3;
var posy = 52.5;
var force = 0;
var demean = 0.1;

var score_text = document.getElementById("score");
var honda_crv = document.getElementById("honda_crv");
var enemies = document.getElementById("enemies");

var sydney = document.getElementById("sydney");
var canberra = document.getElementById("canberra");
var melbourne = document.getElementById("melbourne");

var enemy_list = [];

function calculate_force() {
    force = Math.max(force - demean, -std_force);
    
    posy = Math.min(52.5, posy - force);
}

function push_kangaroo(xpos) {
    enemy_list.push({enemy_name:"kangaroo", posx: xpos, posy: 55});
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
    honda_crv.style.transform = "translate3d(10vw, " + posy + "vh, 0)";

    enemies.innerHTML = "";
    for (var i = 0; i < enemy_list.length; i++) {
        enemy_list[i].posx -= 1;
        if (enemy_list[i].posx <= -20) {
            enemy_list[i].posx = 120;
        }
        enemies.innerHTML += "<div id=\"" + enemy_list[i].enemy_name + "\" class=\"" + i + "\" style=\"transform:translate3d(" + enemy_list[i].posx + "vw, " + enemy_list[i].posy + "vh, 0)\"></div>";

        var enemyBB = document.getElementsByClassName(i)[0].getBoundingClientRect();
        if (intersects(honda_crv.getBoundingClientRect(), enemyBB)) {
            game_over = true;
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

      enemy_list = [];
  
      push_kangaroo(120);
      push_kangaroo(200);
  }

  restart();

  var lastRender = 0
  window.requestAnimationFrame(loop)