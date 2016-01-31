'use strict';

var Firstaid = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'firstaid', frame);
  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;  
};

Firstaid.prototype = Object.create(Phaser.Sprite.prototype);
Firstaid.prototype.constructor = Firstaid;
Firstaid.prototype.update = function() {
};

module.exports = Firstaid;

