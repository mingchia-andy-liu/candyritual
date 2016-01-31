'use strict';

var Lava = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'lava', frame);
  this.scale.x = 6;
  this.scale.y = 4;
  this.frame = 21;

  // this.anchor.setTo(0.5, 0);	//tip of the sprite
  this.game.physics.arcade.enableBody(this);
  
  this.body.velocity.x = -200;
  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Lava.prototype = Object.create(Phaser.Sprite.prototype);
Lava.prototype.constructor = Lava;

Lava.prototype.update = function() {
  // write your prefab's specific update code here
  
};

Lava.prototype.stop = function() {
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
}

Lava.prototype.reset = function() {
	this.body.x = this.game.width + this.body.width;
}

module.exports = Lava;