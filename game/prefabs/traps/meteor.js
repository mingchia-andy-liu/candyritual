'use strict';

var Missile = require('./missile');

var MeteorGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  var gameWidth = this.game.width;
  this.rightMeteor = new Missile(this.game, 0, 0, 0, "meteor");
  this.add(this.rightMeteor);
  this.rightMeteor.smoothed = false;
  this.setAll('sprite.smoothed', false);
  this.setAll('sprite.scale.y',4);
  this.setAll('sprite.scale.x', 4);
  this.setAll('body.velocity.x', -150);
  this.setAll('body.velocity.y', 150);
};

MeteorGroup.prototype = Object.create(Phaser.Group.prototype);
MeteorGroup.prototype.constructor = MeteorGroup;

MeteorGroup.prototype.update = function() {
    this.game.physics.arcade.collide(this.rightMeteor, this.ground);
};


MeteorGroup.prototype.reset = function(x, y) {
  this.rightMeteor.reset(x, 0);
  this.x = x;
  this.y = 0;
  
  var gameWidth = this.game.width;
  var offSet = x%gameWidth/3 > 0 ? x%gameWidth/3 : 0;
  this.setAll('body.velocity.x', -150 - offSet);    // the futher right, bring it back
  this.setAll('body.velocity.y', 150 + offSet);
  this.hasScored = false;
  this.exists = true;
};


MeteorGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
  this.setAll('body.velocity.y', 0);
};

module.exports = MeteorGroup;
