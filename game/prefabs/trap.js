'use strict';

var Trap = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);
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
  this.body.collideWorldBounds = true;


  // this.events.onKilled.add(this.onKilled, this);

  
  
};

Trap.prototype = Object.create(Phaser.Sprite.prototype);
Trap.prototype.constructor = Trap;

Trap.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the bird towards the ground by 2.5 degrees
  // this.angle += 100;
};

Trap.prototype.shoot = function(speed) {
  if(!!this.alive) {
    this.started = true;
    // this.flapSound.play();
    //cause our bird to "jump" upward
    this.body.velocity.x = speed;
    // rotate the bird to -40 degrees
    // this.game.add.tween(this).to({angle: -40}, 100).start();
  }
};

module.exports = Trap;

