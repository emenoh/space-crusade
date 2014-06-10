Game.Prefabs.Hero = function(game, x, y, target){
	// Super call to Phaser.sprite
	Phaser.Sprite.call(this, game, x, y, 'hero');

	// Target : pointer
	this.target = target;

	// Follow pointer
	this.follow = false;

	// Speed
	this.speed = 200;

	// Hero lives
	this.lives = 3;

	// Hero shot delay
	this.shotDelay = 300;

	// Number of bullets per shoot
	this.numBullets = 1;

	// Hero shiled
	this.shielded = false;
	this.timerShield;
	this.shield = this.game.add.sprite(0, 0, 'shield');
	this.shield.anchor.setTo(0.5, 0.5);
	this.shield.alpha = 0;

	// Min distance from pointer
	this.minDistance = 10;

	// Set sprite's anchor to the center
	this.anchor.setTo(0.5, 0.5);

	// Enable physics on this object
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
}

Game.Prefabs.Hero.prototype = Object.create(Phaser.Sprite.prototype);
Game.Prefabs.Hero.constructor = Game.Prefabs.Hero;

Game.Prefabs.Hero.prototype.update = function(){
	var distance, rotation;

	// Follow pointer
	if(this.follow){
		distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

		if(distance > this.minDistance){
			rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

			this.body.velocity.x = Math.cos(rotation) * this.speed * Math.min(distance / 120, 2);
			this.body.velocity.y = Math.sin(rotation) * this.speed * Math.min(distance / 120, 2);
		}else{
			this.body.velocity.setTo(0, 0);
		}
	}else{
		this.body.velocity.setTo(0, 0);
	}

	// Shield
	if(this.shielded){
		this.shield.x = this.x;
		this.shield.y = this.y;
	}
};

Game.Prefabs.Hero.prototype.enableShield = function(){
	this.shielded = true;
	this.timerShield = this.game.time.create(true);
	this.timerShield.add(Phaser.Timer.SECOND*2, this.disabledShield, this);
	this.timerShield.start();

	// Shield anim
	this.game.add.tween(this.shield).to({alpha:1}, 300, Phaser.Easing.Cubic.Out, true, 0);
};

Game.Prefabs.Hero.prototype.disabledShield = function(){
	// Shield anim
	this.game.add.tween(this.shield)
	.to({alpha:0}, 200, Phaser.Easing.Linear.NONE, true, 0, 6, true).onComplete.add(function(){
		this.shielded = false;
	}, this);
};

Game.Prefabs.Hero.prototype.die = function(){

};