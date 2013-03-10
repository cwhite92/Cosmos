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
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;
    console.log(mouseState.x);
}

document.onmousedown = function(e) {
    switch(e.button) {
        case 0:
            mouseState.left = true;
            break;
        case 2:
            mouseState.right = true;
            break;
    }
}

document.onmouseup = function(e) {
    switch(e.button) {
        case 0:
            mouseState.left = false;
            break;
        case 2:
            mouseState.right = false;
            break;
    }
}