// An object holding all of the currently pressed keys
var keyState = {};

document.onkeydown = function(e) {
    e = e || window.event;

    keyState[e.keyCode] = true;
}

document.onkeyup = function(e) {
    e = e || window.event;

    delete keyState[e.keyCode];
}

var mouseState = {
    x: 0,
    y: 0,
    left: false,
    right: false
};

document.onmousemove = function(e) {
    mouseState.x = e.x;
    mouseState.y = e.y;


}