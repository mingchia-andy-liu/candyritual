'use strict';

var Firstaid = require('./firstaid');

var FirstaidGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.oFirstaid = new Firstaid(this.game,  0, 100);
  this.add(this.oFirstaid);

  this.setAll('body.velocity.x', -200);
};

FirstaidGroup.prototype = Object.create(Phaser.Group.prototype);
FirstaidGroup.prototype.constructor = FirstaidGroup;

FirstaidGroup.prototype.update = function() {
};


FirstaidGroup.prototype.reset = function(x, y) {
  console.log("FIRST AID RESET");
  this.oFirstaid.reset(0, y);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -100);
  this.hasScored = false;
  this.exists = true;
};


FirstaidGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = FirstaidGroup;