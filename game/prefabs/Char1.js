'use strict';

var Missile = require('./traps/missile');
var Lava = require('./traps/lava');
var Lazer = require('./traps/lazer');

var blinkingTimer;

var Char1 = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'char1', frame);
  this.scale.x = 2;
  this.scale.y = 2;
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('walk', [9,10], 10,true);
  this.animations.play('walk');
  // this.animations.add('duck', [3], 10, true);

  this.name = 'char1';
  this.alive = false;
  this.health = 3;
  this.isInvincible = false;

  this.jumpSound = this.game.add.audio('jump');
  this.lazerSound = this.game.add.audio('lazer_hit');
  this.lavaSound = this.game.add.audio('lava_hit');
  this.missileSound = this.game.add.audio('missile_hit');

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

  if(!this.alive) {
    this.body.velocity.x = 0;
  }
};

Char1.prototype.moveUp = function() {
  if(!!this.alive && this.body.touching.down) {
    this.body.velocity.y = -600;
    this.jumpSound.play();
  }
};

Char1.prototype.moveLeft = function() {
  if (!!this.alive) {
    this.body.velocity.x = -250;
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

Char1.prototype.takeDamage = function(enemy) {
  if (enemy instanceof Missile) {
    if (enemy.key === "missile") {
      this.missileSound.play();
    } else {
      //add meteor hit sound
    }
  }

  if (enemy instanceof Lava) {
    this.lavaSound.play();
  }

  if (enemy instanceof Lazer) {
    this.lazerSound.play();
  }

  this.health--;

  this.isInvincable = true;
  blinkingTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.blinking, this);
  blinkingTimer.timer.start();
  this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setNotInvincible, this);
};

Char1.prototype.getHealth = function() {
  return this.health;
};

Char1.prototype.gainHealth = function() {
  if (this.health < 3)
    this.health++;
}

Char1.prototype.blinking = function() {
  this.tweenTint(this, 0, 0xffffff, 100);
};

Char1.prototype.setNotInvincible = function() {
  console.log("inside set to not invincible");
  this.isInvincible = false;
  blinkingTimer.timer.stop();
};

Char1.prototype.setInvincible = function() {
  this.isInvincible = true;
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

Char1.prototype.tweenTint = function(obj, startColor, endColor, time) {
  // create an object to tween with our step value at 0
  var colorBlend = {step: 0};
  // create the tween on this object and tween its step property to 100
  var colorTween = this.game.add.tween(colorBlend).to({step: 100}, time);
  // run the interpolateColor function every time the tween updates, feeding it the
  // updated value of our tween each time, and set the result as our tint
  colorTween.onUpdateCallback(function() {
    obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
  });        // set the object to the start color straight away
  obj.tint = startColor;            // start the tween
  colorTween.start();
}



module.exports = Char1;
