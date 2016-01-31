'use strict';

var Reward = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'reward', frame);
  // this.anchor.setTo(0.5, 0.5);

  this.scale.x = 2;
  this.scale.y = 2;
  this.smoothed = false;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;
  // this.body.immovable = true;
};

Reward.prototype = Object.create(Phaser.Sprite.prototype);
Reward.prototype.constructor = Reward;

Reward.prototype.update = function() {
};

module.exports = Reward;
