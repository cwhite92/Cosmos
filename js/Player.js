function Player() {
    // Create the player sprite
    this.sprite = new Image();
    this.sprite.src = 'http://i.imgur.com/h3flWtQ.png';

    // This array holds all of the bullets fired by the player
    this.bullets = [];

    // Track the players position
    this.x = window.width / 2;
    this.y = window.height / 2;

    // Properties that control the players position and speed
    this.xv = 0;
    this.yv = 0;
    this.friction = 0.9;

    // The player sprite rotation, used to face it towards the cursor
    this.rotation = 0;
}

Player.prototype.update = function() {
    // Gradually make the players velocity 0
    this.xv *= this.friction;
    this.yv *= this.friction;

    // Update player position based on velocity
    this.x += this.xv;
    this.y += this.yv;

    // Update velocity based on keyboard inputs
    if(keyState[87]) {
        this.yv -= 0.75;
    }
    if(keyState[65]) {
        this.xv -= 0.75;
    }
    if(keyState[83]) {
        this.yv += 0.75;
    }
    if(keyState[68]) {
        this.xv += 0.75;
    }

    // Check if the player has gone out of bounds and move them back if they have
    if(this.x < this.sprite.width / 2) this.x = this.sprite.width / 2;
    if(this.x > window.width - this.sprite.width) this.x = window.width - this.sprite.width;
    if(this.y < this.sprite.height / 2) this.y = this.sprite.height / 2;
    if(this.y > window.height - this.sprite.height) this.y = window.height - this.sprite.height;
    
    // Rotate the player to face the mouse cursor (- 2.35 because the sprite starts out 135 degrees off center)
    this.rotation = Math.atan2(this.y - mouseState.y, this.x - mouseState.x) - 2.35;

    // If left mouse is pressed fire a bullet, settings its co-ordinates and direction to the same as the player
    if(mouseState.left) {
        console.log(this.rotation);
        this.bullets.push(new Bullet(this.x, this.y, this.rotation));
    }

    // Update and draw bullets
    for(var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update();
        this.bullets[i].draw();
    }
}

Player.prototype.draw = function() {
    window.ctx.save();
    window.ctx.translate(this.x, this.y);
    window.ctx.rotate(this.rotation);
    window.ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height, -this.sprite.width/2, -this.sprite.height/2, this.sprite.width, this.sprite.height);
    window.ctx.restore();
}