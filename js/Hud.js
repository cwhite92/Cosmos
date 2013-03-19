function Hud() {
    // Set the font used by the HUD
    window.ctx.font = '30px Tauri, sans-serif';

    // Health sprite
    this.healthSprite = new Image();
    this.healthSprite.src = 'img/health.png';

    // Wave sprite
    this.waveSprite = new Image();
    this.waveSprite.src = 'img/wave.png';
}

Hud.prototype.update = function() {

}

Hud.prototype.draw = function(playerHealth, wave) {
    // Draw health sprite
    window.ctx.drawImage(this.healthSprite, 0, 0, this.healthSprite.width, this.healthSprite.height, 20, window.height - 70, this.healthSprite.width, this.healthSprite.height);

    // Draw health value
    window.ctx.fillText(playerHealth, 80, window.height - 32);

    // Draw wave sprite
    window.ctx.drawImage(this.waveSprite, 0, 0, this.waveSprite.width, this.waveSprite.height, 300, window.height - 60, this.waveSprite.width, this.waveSprite.height);

    // Draw wave value
    window.ctx.fillText(wave, 410, window.height - 32);
}