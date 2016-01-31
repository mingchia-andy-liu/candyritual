'use strict';

var Missile = require('./missile');

var MeteorGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  var gameWidth = this.game.width;
  this.rightMeteor = new Missile(this.game, gameWidth/4, 0, 0, "meteor");
  this.middleMeteor = new Missile(this.game, gameWidth/2, 0, 1, "meteor");
  this.leftMeteor = new Missile(this.game, gameWidth/4*3, 0, 1, "meteor");
  this.add(this.rightMeteor);
  this.add(this.middleMeteor);
  this.add(this.leftMeteor);

  this.setAll('body.velocity.x', -150);
  this.setAll('body.velocity.y', 150);
};

MeteorGroup.prototype = Object.create(Phaser.Group.prototype);
MeteorGroup.prototype.constructor = MeteorGroup;

MeteorGroup.prototype.update = function() {
    this.game.physics.arcade.collide(this.rightMeteor, this.ground);
    this.game.physics.arcade.collide(this.leftMeteor, this.ground);
    this.game.physics.arcade.collide(this.middleMeteor, this.ground);
};


MeteorGroup.prototype.reset = function(x, y) {
  this.rightMeteor.reset(x, 0);
  this.leftMeteor.reset(x/y*10, 0);
  this.middleMeteor.reset(x*y/2, 0);
  this.x = x/2;
  this.y = 0;
  this.setAll('body.velocity.x', -150);
  this.setAll('body.velocity.y', 150);
  this.hasScored = false;
  this.exists = true;
};


MeteorGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
  this.setAll('body.velocity.y', 0);
};

module.exports = MeteorGroup;