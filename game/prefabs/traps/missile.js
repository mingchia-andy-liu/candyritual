'use strict';

 var _type = "";

var Missile = function(game, x, y, frame, type) {
  _type = type;
  if (type === "missile") {
    Phaser.Sprite.call(this, game, x, y, 'missile', frame);
    this.scale.x = 2;
    this.scale.y = 2;
    this.angle += 180;
  }
  else {
    Phaser.Sprite.call(this, game, x, y, 'meteor', frame);
    this.scale.x = 8;
    this.scale.y = 8;
    this.animations.add('meteorFlames', [0, 1, 2], 3, true);
    this.animations.play('meteorFlames');
  }
  this.anchor.setTo(0.5, 0.5);


  // this.alive = false;
  // this.onGround = false;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;

  // this.events.onKilled.add(this.onKilled, this);

};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {


};

Missile.prototype.shoot = function() {
    if (_type === "missile") {
      this.body.velocity.x = -500;
      this.body.velocity.y = 0;
    } else {
      this.body.velocity.x = -300;
      this.body.velocity.y = -75;
    }
};

module.exports = Missile;
