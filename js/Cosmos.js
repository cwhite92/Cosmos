function Cosmos() {
    // Grab the canvas 2d context and make it global
    this.canvas = document.getElementById('cosmos');
    window.ctx = this.canvas.getContext('2d');

    // Get the viewport width and height and make them global
    var elem = (document.compatMode === "CSS1Compat") ? document.documentElement : document.body;
    window.height = elem.clientHeight;
    window.width = elem.clientWidth;

    // Set dimentions of the canvas element
    this.canvas.height = window.height;
    this.canvas.width = window.width;

    // Game objects
    this.background = new Background();
    this.player = new Player();

    // Fire game loop
    var self = this;
    this.ticker = setInterval(function() {
        self.tick();
    }, 1000 / 60);
}

// Main game loop
Cosmos.prototype.tick = function() {
    // Clear the canvas for redrawing
    window.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update things
    this.background.update();
    this.player.update();

    // Then draw them
    this.background.draw();
    this.player.draw();
}