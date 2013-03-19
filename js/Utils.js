// Shamelessly recycled from http://stackoverflow.com/questions/8017541/javascript-canvas-collision-detection
function collides(x1, y1, w1, h1, x2, y2, w2, h2) {
    w2 += x2;
    w1 += x1;
    if (x2 > w1 || x1 > w2) return false;
    h2 += y2;
    h1 += y1;
    if (y2 > h1 || y1 > h2) return false;

    return true;
}

// Used to restart the game
function restart() {
    // Destroy cosmos
    delete window.cosmos;

    // Remove game over screen
    document.getElementById('gameOver').style.display = 'none';

    // Re-make the game
    window.cosmos = new Cosmos();
}

// Used to preload images before the game starts
function preload(images) {
    var preload = [];
    for(var i = 0; i < images.length; i++) {
        preload[i] = new Image();
        preload[i].src = images[i];
    }
}

function start() {
    document.getElementById('gameStart').style.display = 'none';
    window.cosmos = new Cosmos();
}