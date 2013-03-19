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
    this.hud = new Hud();
    this.player = new Player();
    this.enemies = [];
    this.gameOver = false;

    // Wave information
    this.wave = 1;

    // Fire game loop
    var self = this;
    this.ticker = setInterval(function() {
        self.tick();
    }, 1000 / 60);
}

// Main game loop
Cosmos.prototype.tick = function() {
    if(this.gameOver) {
        // Stop ticking
        clearInterval(this.ticker);

        // Show game over screen
        document.getElementById('gameOver').style.display = 'block';

        // Show player score
        document.getElementById('wave').innerHTML = this.wave;
    } else {
        // Clear the canvas for redrawing
        window.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Create a new wave if we have to
        if(this.enemies.length == 0) {
            // Create a number of enemies corresponding to the current wave
            for(var i = 0; i < this.wave * 10; i++) {
                this.enemies.push(new Enemy(Math.random() * window.width, Math.random() * window.height));
            }

            this.inPlay = true;
        }

        // Collision detection between bullets and enemies
        for(var i = 0; i < this.player.bullets.length; i++) {
            for(var j = 0; j < this.enemies.length; j++) {
                if(collides(this.player.bullets[i].x, this.player.bullets[i].y, 1, 1, this.enemies[j].x, this.enemies[j].y, 11, 11)) {
                    // There's a collision, decrease enemy health
                    if((this.enemies[j].health - this.player.power) < 0) {
                        // The enemy will die from this attack
                        this.enemies.splice(j, 1);
                    } else {
                        this.enemies[j].health -= this.player.power;
                    }
                    
                    // Also remove the bullet
                    this.player.bullets.splice(i, 1);
                }
            }
        }

        // Collision detection between player and enemies
        for(var i = 0; i < this.enemies.length; i++) {
            if(collides(this.player.x, this.player.y, 15, 15, this.enemies[i].x, this.enemies[i].y, 15, 15)) {
                // Reduce players health by what wave we're on
                if((this.player.health - (this.wave / 2)) < 0) {
                    // This will kill the player :(
                    this.player.health = 0;
                    this.gameOver = true;
                } else {
                    this.player.health -= (Math.ceil(this.wave / 2));
                }

                // Destroy the enemy
                this.enemies.splice(i, 1);
            }
        }

        // Check if all enemies are dead and increase the wave count if so
        if(this.enemies.length == 0) {
            this.wave++;
        }
        
        // Update things
        this.player.update();
        this.background.update(this.player.xv, this.player.yv);
        this.hud.update();
        for(var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(this.player.x, this.player.y);
        }

        // Then draw them
        this.background.draw();
        this.hud.draw(this.player.health, this.wave);
        this.player.draw();
        for(var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();
        }
    }
}