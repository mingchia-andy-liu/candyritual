'use strict';

var Missile = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('shot');
  this.animations.play('flap', 12, true);

  this.name = 'trap';
  // this.alive = false;
  // this.onGround = false;

  // enable physics on the bird
  // and disable gravity on the bird
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;

  // this.events.onKilled.add(this.onKilled, this);
  
};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the bird towards the ground by 2.5 degrees
  this.angle += 100;

};

Missile.prototype.shoot = function() {
    this.body.velocity.x = -500;
};

module.exports = Missile;

