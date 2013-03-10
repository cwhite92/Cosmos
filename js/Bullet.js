function Bullet(x, y, rotation) {
    // The bullets x and y co-ordinates
    this.x = x;
    this.y = y;

    // The direction the bullet is moving
    this.direction = -rotation + 2.35;

    // The speed the bullet is moving
    this.speed = 10;
}

Bullet.prototype.update = function() {
    // Move the bullet forward
    this.x += Math.sin(this.direction) * this.speed;
    this.y += Math.cos(this.direction) * this.speed;
}

Bullet.prototype.draw = function() {
    window.ctx.beginPath(); 
    window.ctx.arc(this.x, this.y, 1, 0, 360, false);
    window.ctx.fillStyle = 'white';
    window.ctx.fill();
}