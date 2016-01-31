'use strict';

var blinkingTimer;

var Indicator = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'arrows', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.y = 4;
  this.scale.x = 4;
  this.smoothed = false;
  this.animations.add('rotates', [4, 5, 6, 7], 4, true);
  this.animations.play('rotates');


  // enable physics on the lazer
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.alpha = 0;
};

Indicator.prototype = Object.create(Phaser.Sprite.prototype);
Indicator.prototype.constructor = Indicator;

Indicator.prototype.update = function() {
};

Indicator.prototype.blinking = function() {
  this.tweenTint(this, 0, 0xffffff, 100);
};

Indicator.prototype.appear = function() {
  this.game.add.tween(this).to({alpha: 1}, 0.1, "Linear", true);
  blinkingTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.2, this.blinking, this);
  blinkingTimer.timer.start();
};

Indicator.prototype.disappear = function() {
  this.game.add.tween(this).to({alpha: 0}, 0.1, "Linear", true);
  blinkingTimer.timer.stop();
};

Indicator.prototype.tweenTint = function(obj, startColor, endColor, time) {
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


module.exports = Indicator;
