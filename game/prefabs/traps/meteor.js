'use strict';

var Missile = require('./missile');

var MeteorGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.meteorSound = this.game.add.audio('meteor_sound');
  this.meteorSound.play();

  var gameWidth = this.game.width;
  this.meteor = new Missile(this.game, 0, 0, 0, "meteor");
  this.add(this.meteor);
  this.meteor.smoothed = false; // set all doesn't work
  this.setAll('sprite.smoothed', false);
  this.setAll('sprite.scale.y',4);
  this.setAll('sprite.scale.x', 4);
  this.setAll('body.velocity.x', -150);
  this.setAll('body.velocity.y', 150);
};

MeteorGroup.prototype = Object.create(Phaser.Group.prototype);
MeteorGroup.prototype.constructor = MeteorGroup;

MeteorGroup.prototype.update = function() {
};


MeteorGroup.prototype.reset = function(x, y) {
  this.meteorSound.play();
  this.meteor.reset(x, 0);
  this.x = x;
  this.y = 0;

  var gameWidth = this.game.width;
  var offSet = x%gameWidth/3 > 0 ? x%gameWidth/3 : 0;
  this.setAll('body.velocity.x', -150 - offSet);    // the futher right, bring it back
  this.setAll('body.velocity.y', 150 + offSet);
};


MeteorGroup.prototype.stop = function() {
  this.meteorSound.stop();
  this.setAll('body.velocity.x', 0);
  this.setAll('body.velocity.y', 0);
};

module.exports = MeteorGroup;
