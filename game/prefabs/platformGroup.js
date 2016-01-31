'use strict';

var Platform = require('./platform');

var PlatformGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.topPlatform = new Platform(this.game, 320, 0, 0);
  this.bottomPlatform = new Platform(this.game,  0, 100, 1);
  this.add(this.topPlatform);
  this.add(this.bottomPlatform);

  this.setAll('body.velocity.x', -150);
};

PlatformGroup.prototype = Object.create(Phaser.Group.prototype);
PlatformGroup.prototype.constructor = PlatformGroup;

PlatformGroup.prototype.update = function() {
};


PlatformGroup.prototype.reset = function(x, y) {
  this.bottomPlatform.reset(0, y);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -150);
  this.hasScored = false;
  this.exists = true;
};


PlatformGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = PlatformGroup;
