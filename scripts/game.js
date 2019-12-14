document.addEventListener("click", function(){
    if (posy >= 52.5) {
        force = std_force;
    }
});

var std_force = 2.5;
var posy = 52.5;
var force = 0;
var demean = 0.1;

var honda_crv = document.getElementById("honda_crv");
var stats = document.getElementById("stats");

function calculateForce() {
    force = Math.max(force - demean, -std_force);
    
    posy = Math.min(52.5, posy - force);
}

function draw() {
    calculateForce();

    var hondaBB = honda_crv.getBoundingClientRect();
    
    stats.innerHTML = "Stats: " + Number((hondaBB.x).toFixed(2)) + ", " + Number((hondaBB.y).toFixed(2))
        + ", " + Number((hondaBB.width).toFixed(2)) + ", " + Number((hondaBB.height).toFixed(2));

    honda_crv.style.transform = "translate3d(25vh, " + posy +"vh, 0)";
}

function loop(timestamp) {
    var progress = timestamp - lastRender
  
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }

  var lastRender = 0
  window.requestAnimationFrame(loop)