
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    // add the background sprite
    this.background = this.game.add.tileSprite(0,-42,840,420,'background');

    // add the ground sprite as a tile
    // and start scrolling in the negative x direction
    this.ground = this.game.add.tileSprite(0,this.game.height-45,840,420,'ground');
    this.ground.frame =2;
    this.ground.scale.x = 2;
    this.ground.scale.y = 3;
    this.ground.autoScroll(-100,0);

    /** STEP 1 **/
    // create a group to put the title assets in
    // so they can be manipulated as a whole
    this.titleGroup = this.game.add.group()

    /** STEP 2 **/
    // create the title sprite
    // and add it to the group
    this.title = this.add.sprite(this.game.width/2,100,'title');
    this.title.anchor.setTo(0.5,0.5);
    this.titleGroup.add(this.title);

    /** STEP 3 **/
    // create the char1 sprite
    // and add it to the title group
    this.char1 = this.add.sprite(100,this.ground.y-15,'char1');
    this.char1.scale.x = 2;
    this.char1.scale.y = 2;
    this.char1.anchor.setTo(0.5,0.5);
    this.titleGroup.add(this.char1);

    /** STEP 4 **/
    // add an animation to the char1
    // and begin the animation
    this.char1.animations.add('walk', [9,10], 10,true);
    this.char1.animations.play('walk');

    /** STEP 5 **/
    // Set the originating location of the group
    // this.titleGroup.x = 30;
    // this.titleGroup.y = 100;

    /** STEP 6 **/
    //  create an oscillating animation tween for the group
    // this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);
  },
  startClick: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  }
};

module.exports = Menu;
