'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  this.flapSound = this.game.add.audio('flap');

  this.name = 'bird';
  this.alive = false;
  this.health = 3;

  // enable physics on the bird
  // and disable gravity on the bird
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.body.collideWorldBounds = true;


  this.events.onKilled.add(this.onKilled, this);



};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the bird towards the ground by 2.5 degrees
  if(this.angle < 90 && this.alive) {
    this.angle += 2.5;
  }

  if(!this.alive) {
    this.body.velocity.x = 0;
  }
};

Bird.prototype.moveUp = function() {
  if(!!this.alive && this.body.touching.down) {
    this.body.velocity.y = -600;
  }
};

Bird.prototype.moveLeft = function() {
  if (!!this.alive) {
    this.body.velocity.x = -200;
  }
};

Bird.prototype.moveRight = function() {
  if (!!this.alive) {
    this.body.velocity.x = 200;
  }
};

Bird.prototype.revived = function() {
};

Bird.prototype.takeDamage = function() {
  this.health--;
};

Bird.prototype.getHealth = function() {
  return this.health;
}

Bird.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  var duration = 90 / this.y * 300;
  this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('killed');
  console.log('alive:', this.alive);
};

module.exports = Bird;
