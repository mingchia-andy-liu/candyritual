'use strict';

 var _type = "";

var Missile = function(game, x, y, frame, type) {
  _type = type;
  if (type === "missile") {
    Phaser.Sprite.call(this, game, x, y, 'missile', frame);
    this.game.physics.arcade.enableBody(this);
    this.scale.x = 2;
    this.scale.y = 2;
    this.angle += 180;
    this.missileSound = this.game.add.audio('missile_launch');
  }
  else {  // this should be/can only be meteor
    Phaser.Sprite.call(this, game, x, y, 'meteor', frame);
    this.game.physics.arcade.enableBody(this);
    this.scale.x = 8;
    this.scale.y = 8;
    this.animations.add('meteorFlames', [0, 1, 2], 3, true);
    this.animations.play('meteorFlames');
    this.body.immovable = true;

  }
  this.anchor.setTo(0.5, 0.5);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;
};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {
};

Missile.prototype.shoot = function() {
    if (_type === "missile") {
      this.body.velocity.x = -500;
      this.body.velocity.y = 0;
      this.missileSound.play();
    } else {
      this.body.velocity.x = -300;
      this.body.velocity.y = -75;
    }
};

module.exports = Missile;
