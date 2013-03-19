function Enemy(x, y) {
    // Create the enemy sprites
    this.spriteGreen = new Image();
    this.spriteGreen.src = 'img/enemy-green.png';
    this.spriteOrange = new Image();
    this.spriteOrange.src = 'img/enemy-orange.png';
    this.spriteRed = new Image();
    this.spriteRed.src = 'img/enemy-red.png';

    // The enemies movement information
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.speed = 5;

    // The max health of the enemy
    this.health = 200;
}

Enemy.prototype.update = function(playerX, playerY) {
    // Calculate direction towards player
    var toPlayerX = playerX - this.x;
    var toPlayerY = playerY - this.y;

    // Normalize
    var toPlayerLength = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
    toPlayerX = toPlayerX / toPlayerLength;
    toPlayerY = toPlayerY / toPlayerLength;

    // Move towards the player, introducing some randomness
    this.x += toPlayerX * this.speed;
    this.y += toPlayerY * this.speed;

    // Rotate us to face the player
    this.rotation = Math.atan2(this.y - playerY, this.x - playerX) - 2.35;
}

Enemy.prototype.draw = function() {
    window.ctx.save();
    window.ctx.translate(this.x, this.y);
    window.ctx.rotate(this.rotation);

    // Draw a different sprite depending on health
    if(this.health > 120) {
        window.ctx.drawImage(this.spriteGreen, 0, 0, this.spriteGreen.width, this.spriteGreen.height, -this.spriteGreen.width/2, -this.spriteGreen.height/2, this.spriteGreen.width, this.spriteGreen.height);
    } else if(this.health > 60) {
        window.ctx.drawImage(this.spriteOrange, 0, 0, this.spriteOrange.width, this.spriteOrange.height, -this.spriteOrange.width/2, -this.spriteOrange.height/2, this.spriteOrange.width, this.spriteOrange.height);
    } else {
        window.ctx.drawImage(this.spriteRed, 0, 0, this.spriteRed.width, this.spriteRed.height, -this.spriteRed.width/2, -this.spriteRed.height/2, this.spriteRed.width, this.spriteRed.height);
    }
    window.ctx.restore();
}