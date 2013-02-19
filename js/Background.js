function Background() {
    // The number of stars we want drawn on screen
    this.maxStars = 50;

    // Array to hold all of our stars
    this.stars = [];

    // The buffer is the amount of space we reserve to the right of the viewport to add new stars once some move off screen
    this.buffer = 3;

    // Start with stars filling the entire viewport
    while(this.stars.length < this.maxStars) {
        this.stars.push({x: Math.random() * window.width, y: Math.random() * window.height, radius: Math.random() * 2});
    }
}

Background.prototype.update = function() {
    // Remove any stars that are off screen
    for(var i = 0; i < this.stars.length; i++) {
        if(this.stars[i].x < 0) {
            // Splice from array
            this.stars.splice(i, 1);
        }
    }

    // Add stars in the buffer until we reach maxStars
    while(this.stars.length < this.maxStars) {
        this.stars.push({x: window.width + this.buffer, y: Math.random() * window.height, radius: Math.random() * 2});
    }

    // Move all the stars relative to their size so we get a parallax effect
    for(var i = 0; i < this.stars.length; i++) {
        this.stars[i].x -= this.stars[i].radius;
    }
}

Background.prototype.draw = function() {
    // Draw all the stars
    for(var i = 0; i < this.stars.length; i++) {
        window.ctx.beginPath(); 
        window.ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].radius, 0, 360, false);
        window.ctx.fillStyle = 'white';
        window.ctx.fill();
    }
}