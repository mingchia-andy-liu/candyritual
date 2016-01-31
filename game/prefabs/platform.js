'use strict';

var Platform = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'platform', frame);
  this.anchor.setTo(0.5, 0.5);

  this.scale.x = 15;
  this.scale.y = 1;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
};

module.exports = Platform;
