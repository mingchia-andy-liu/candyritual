'use strict';

var Enemy = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'enemy', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.x = 2;
  this.scale.y = 2;
  this.animations.add('float', [0,1], 2, true);
  this.animations.play('float');
  this.smoothed = false;
  // this.animations.add('angry', [4,5,6], 10, true);

  this.name = 'enemy';

  // enable physics on the enemy
  // and disable gravity on the enemy
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = true;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    // this.body.velocity.x = 0;
    // this.body.velocity.y = 0;
};

Enemy.prototype.moveUp = function() {
    this.body.velocity.y = -100;
};

Enemy.prototype.moveLeft = function() {
    this.body.velocity.x = -100;
};

Enemy.prototype.moveRight = function() {
    this.body.velocity.x = 100;
};

Enemy.prototype.moveDown = function() {
    this.body.velocity.y = 100;
};

Enemy.prototype.revived = function() {
};


module.exports = Enemy;
