'use strict';

var Lazer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'lazer', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.y = 50;
  this.scale.x = 2;

  // enable physics on the lazer
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.body.velocity.x = -75;
  this.isHarmful = true;

  this.time = this.game.time.create(false);
  this.time.start();
  this.count = 0;
  this.time.loop(2000, this.activate, this);
};

Lazer.prototype = Object.create(Phaser.Sprite.prototype);
Lazer.prototype.constructor = Lazer;

Lazer.prototype.update = function() {
  this.checkWorldBounds();
};

Lazer.prototype.checkWorldBounds = function() {
  if(this.body.x <15) {
    this.kill();
    this.time.stop();
  }
};

Lazer.prototype.activate = function() {
  //Start timer
  console.log(this.count);
  this.count++
  if (this.count % 2 == 0 ) {
    this.appear();
  } else {
    this.disappear();
  }
};

Lazer.prototype.appear = function() {
  this.game.add.tween(this).to({alpha: 1}, 200, "Linear", true);
  this.isHarmful = true;
  this.canCollide(this.isHarmful);
};

Lazer.prototype.canCollide = function(bool) {
  this.body.checkCollision.up = bool;
  this.body.checkCollision.down = bool;
  this.body.checkCollision.left = bool;
  this.body.checkCollision.right = bool;
};

Lazer.prototype.disappear = function() {
  this.game.add.tween(this).to({alpha: 0}, 200, "Linear", true);
  this.isHarmful = false;
  this.canCollide(this.isHarmful);
};

Lazer.prototype.revived = function() {
};

module.exports = Lazer;
