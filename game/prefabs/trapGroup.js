'use strict';

var Trap = require('./trap');
var _traps = [];

var TrapGroup = function(game, parent, number) {

  Phaser.Group.call(this, game, parent);

  for (var i = 0; i < number; i++) {
    var temp = new Trap(this.game, this.game.width, this.game.height/2+10, i%3);
    _traps[i] = temp;
    this.add(temp);
  }

  this.hasScored = false;
  this.shot();
  // this.setAll('body.velocity.x', -200);
};

TrapGroup.prototype = Object.create(Phaser.Group.prototype);
TrapGroup.prototype.constructor = TrapGroup;

TrapGroup.prototype.update = function() {
  // this.checkWorldBounds(); 
};

TrapGroup.prototype.checkWorldBounds = function() {
  if(!this.topPipe.inWorld) {
    this.exists = false;
  }
};

TrapGroup.prototype.reset = function(x, y) {
  // for (var trap in _traps){
  //   trap.reset(this.game.width,0);
  // }
  // this.x = x;
  // this.y = y;
  // this.setAll('body.velocity.x', -200);
  // this.hasScored = false;
  // this.exists = true;


};

TrapGroup.prototype.shot = function() {
  for (var i = 0 ; i < _traps.length; i++) {
    _traps[i].body.velocity.x = -1000;
  }
}


TrapGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = TrapGroup;