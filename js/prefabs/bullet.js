Game.Prefabs.Bullet = function(game, x, y){
	// Super call to Phaser.sprite
	Phaser.Sprite.call(this, game, x, y, 'bullet');

	// Centered anchor
	this.anchor.setTo(0.5, 0.5);

	// Kill when out of world
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;

	// Enable physics
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
}

Game.Prefabs.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Game.Prefabs.Bullet.constructor = Game.Prefabs.Bullet;

Game.Prefabs.Bullet.prototype.update = function(){
	this.body.velocity.x = 300;
};