'use strict';

var Char1 = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'char1', frame);
  this.scale.x = 2;
  this.scale.y = 2;
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('walk', [9,10], 10,true);
  this.animations.play('walk');
  // this.animations.add('duck', [3], 10, true);


  this.flapSound = this.game.add.audio('flap');

  this.name = 'char1';
  this.alive = false;
  this.health = 3;

  // enable physics on the char1
  // and disable gravity on the char1
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.body.collideWorldBounds = true;


  this.events.onKilled.add(this.onKilled, this);



};

Char1.prototype = Object.create(Phaser.Sprite.prototype);
Char1.prototype.constructor = Char1;

Char1.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the Char1 towards the ground by 2.5 degrees
  if(!this.alive) {
    this.body.velocity.x = 0;
  }
};

Char1.prototype.moveUp = function() {
  if(!!this.alive && this.body.touching.down) {
    this.body.velocity.y = -600;
  }
};

Char1.prototype.moveLeft = function() {
  if (!!this.alive) {
    this.body.velocity.x = -200;
  }
};

Char1.prototype.moveRight = function() {
  if (!!this.alive) {
    this.body.velocity.x = 200;
  }
};

Char1.prototype.moveDown = function() {
  if (!!this.alive) {
    // this.animations.play('duck');
  }
};

Char1.prototype.revived = function() {
};

Char1.prototype.takeDamage = function() {
  this.health--;
};

Char1.prototype.getHealth = function() {
  return this.health;
}

Char1.prototype.gainHealth = function() {
  if (this.health < 3)
    this.health++;
}

Char1.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  var duration = 90 / this.y * 300;
  this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('killed');
  console.log('alive:', this.alive);
};

module.exports = Char1;
