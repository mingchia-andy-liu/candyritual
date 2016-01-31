'use strict';

var Reward = require('./reward');

var RewardGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.topReward = new Reward(this.game, 320, 0, 6);
  this.bottomReward = new Reward(this.game,  0, 100, 6);
  this.add(this.topReward);
  this.add(this.bottomReward)
  this.setAll('body.velocity.x', -150);
};

RewardGroup.prototype = Object.create(Phaser.Group.prototype);
RewardGroup.prototype.constructor = RewardGroup;

RewardGroup.prototype.update = function() {
};


RewardGroup.prototype.reset = function(x, y) {
  this.bottomReward.reset(0, y);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -150);
  this.hasScored = false;
  this.exists = true;
};

RewardGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = RewardGroup;
