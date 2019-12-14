document.addEventListener("click", function(){
    if (posy >= 52.5) {
        force = std_force;
    }
});

var std_force = 3;
var posy = 52.5;
var force = 0;
var demean = 0.1;

var honda_crv = document.getElementById("honda_crv");
var stats = document.getElementById("stats");
var enemies = document.getElementById("enemies");

var enemy_list = [];

function calculateForce() {
    force = Math.max(force - demean, -std_force);
    
    posy = Math.min(52.5, posy - force);
}

function pushKangaroo() {
    enemy_list.push({enemy_name:"kangaroo", posx: 120, posy: 52.5});
}

function draw() {
    calculateForce();

    var hondaBB = honda_crv.getBoundingClientRect();
    
    stats.innerHTML = "Stats: " + Number((hondaBB.x).toFixed(2)) + ", " + Number((hondaBB.y).toFixed(2))
        + ", " + Number((hondaBB.width).toFixed(2)) + ", " + Number((hondaBB.height).toFixed(2));

    honda_crv.style.transform = "translate3d(25vh, " + posy +"vh, 0)";

    enemies.innerHTML = "";
    for (var i = 0; i < enemy_list.length; i++) {
        enemy_list[i].posx -= 1;
        if (enemy_list[i].posx <= -20) {
            enemy_list[i].posx = 120;
        }
        enemies.innerHTML += "<div id=\"" + enemy_list[i].enemy_name + "\" style=\"transform:translate3d(" + enemy_list[i].posx + "vw, " + enemy_list[i].posy + "vh, 0)\"></div>";
    }
}

function loop(timestamp) {
    var progress = timestamp - lastRender
  
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }

  var lastRender = 0
  pushKangaroo()
  window.requestAnimationFrame(loop)