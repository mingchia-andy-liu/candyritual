
'use strict';
var Char1 = require('../prefabs/Char1');
var Enemy = require('../prefabs/enemy');
var Ground = require('../prefabs/ground');
var Pipe = require('../prefabs/pipe');
var PipeGroup = require('../prefabs/pipeGroup');
var Scoreboard = require('../prefabs/scoreboard');
var Missile = require('../prefabs/traps/missile');
var Lazer = require('../prefabs/traps/lazer');
var Platform = require('../prefabs/platform');
var PlatformGroup = require('../prefabs/platformGroup');
var Lava = require('../prefabs/traps/lava.js')

var DEBUFF_TIMER = {
  lazerFireEvent: 8,
  missileFireEvent: 10,
  changePlayerControlEvent: { timer: 0,
    isNormal: true
  }
};


function Play() {
}
Play.prototype = {
  create: function() {
    // start the phaser arcade physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // give our world an initial gravity of 1200
    this.game.physics.arcade.gravity.y = 1200;

    // add the background sprite
    this.background = this.game.add.tileSprite(0,-50,840,420,'background');
    this.healthBar1 = this.game.add.sprite(0, 0, 'healthBar');
    this.healthBar2 = this.game.add.sprite(50, 0, 'healthBar');
    this.healthBar3 = this.game.add.sprite(100, 0, 'healthBar');

    // create and add a group to hold our pipeGroup prefabs
    this.pipes = this.game.add.group();
    this.platforms = this.game.add.group();

    // create and add a new Ground object
    this.ground = new Ground(this.game, 0, 350, 840, 420);
    this.game.add.existing(this.ground);

    // create and add a new Char1 object
    this.char1 = new Char1(this.game, 100, this.ground.y-25);
    this.game.add.existing(this.char1);

    this.setUpKeyListeners();

    //create and add new Enemy object
    this.enemy = new Enemy(this.game, 700, 200);
    this.game.add.existing(this.enemy);

    this.lava = new Lava(this.game, this.game.width, this.ground.body.y - 5);
    this.game.add.existing(this.lava);

    this.setUpEnemyKeyListeners();

    // add mouse/touch controls
    this.game.input.onDown.addOnce(this.startGame, this);

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);


    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);

    this.instructionGroup = this.game.add.group();
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);

    this.pipeGenerator = null;

    this.gameover = false;

    this.sounds = {
      pipeHitSound: this.game.add.audio('pipeHit'),
      groundHitSound: this.game.add.audio('groundHit'),
      scoreSound: this.game.add.audio('score')
    }

    // this.pipeHitSound = this.game.add.audio('pipeHit');
    // this.groundHitSound = this.game.add.audio('groundHit');
    // this.scoreSound = this.game.add.audio('score');


  },
  update: function() {
    // enable collisions between the char1 and the ground
    // this.game.physics.arcade.collide(this.char1, this.ground, this.deathHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.ground);
    this.game.physics.arcade.collide(this.char1, this.lazer, this.lazerHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.trap, this.damageHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.lava, this.deathHandler, null, this);

    if(!this.gameover) {
      // enable collisions between the char1 and each group in the pipes group
      this.pipes.forEach(function(pipeGroup) {
        this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.char1, pipeGroup);
      }, this);

      this.platforms.forEach(function(platformGroup) {
        this.game.physics.arcade.collide(this.char1, platformGroup);
      }, this);
    }

    if (this.char1.x < 20) {
      this.deathHandler();
    }

    // console.log(this.game.rnd.integerInRange(0,200)% 99 == 1);
    if ( this.lava.body.x < -192 && this.game.rnd.integerInRange(0,300)% 300 == 0) {
        console.log("in");
        this.lava.reset();
    }

  },
  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.char1.destroy();
    this.pipes.destroy();
    this.platforms.destroy();
    this.scoreboard.destroy();
  },
  startGame: function() {
    if(!this.char1.alive && !this.gameover) {
      this.char1.body.allowGravity = true;
      this.char1.alive = true;
      // add a timer
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      this.platformGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 20, this.generatePlatforms, this);
      this.platformGenerator.timer.start();

      this.instructionGroup.destroy();
    }
  },
  checkScore: function(pipeGroup) {
    if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.char1.world.x) {
      pipeGroup.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.sounds.scoreSound.play();
    }
  },
  damageHandler: function(char1, enemy) {
    this.updateHealth('DOWN');
    this.char1.takeDamage();
    enemy.kill();

    //TODO: Damage animation / sprite when taking damage

    if (this.char1.getHealth() <= 0) {
      this.deathHandler();
    }
  },
  updateHealth: function(value) {
    if (this.char1.getHealth() === 2 && value === 'UP') {
        this.healthBar3.visible = true;
    }

    if (this.char1.getHealth() === 2 && value === 'DOWN') {
        this.healthBar2.visible = false;
    }

    if (this.char1.getHealth() === 1 && value === 'UP') {
        this.healthBar2.visible = true;
    }

    if (this.char1.getHealth() === 1 && value === 'DOWN') {
        this.healthBar1.visible = false;
    }

    if (this.char1.getHealth() === 3 && value === 'DOWN') {
        this.healthBar3.visible = false;
    }
  },
  lazerHandler: function(char1, enemy) {
    if (enemy.isHarmful) {
      console.log(enemy.isHarmful);
      this.damageHandler(char1, enemy);
    } else {
      console.log("IS NOT HARMFUL");
    }
  },
  deathHandler: function(char1, enemy) {
    if(!this.gameover) {
      this.sounds.groundHitSound.play();
      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score);
      this.gameover = true;
      this.char1.kill();
      this.pipes.callAll('stop');
      this.platforms.callAll('stop');
      this.lava.stop();
      this.pipeGenerator.timer.stop();
      this.ground.stopScroll();
    }

  },
  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(0, 50);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
      // pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    // pipeGroup.reset(this.game.width, pipeY);
  },
  generateLazer: function() {
    if (!this.lazer || this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.lazerFireEvent) {
      console.log(this.game.time.totalElapsedSeconds());
      var lazerY = this.game.rnd.integerInRange(0, 500);
      // create and add a new lazer object
      this.lazer = new Lazer(this.game, this.game.width-25, lazerY);
      this.game.add.existing(this.lazer);
      DEBUFF_TIMER.lazerFireEvent = 8 + this.game.time.totalElapsedSeconds();
    }
  },
  generateMissile: function() {
    if (!this.missile || this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.missileFireEvent) {
        console.log("this total for missile: " + DEBUFF_TIMER.missileFireEvent);
        var missileY = this.game.rnd.integerInRange(0, 300);

        this.missile = new Missile(this.game, this.game.width+30, missileY);
        this.game.add.existing(this.missile);
        this.missile.shoot();
        DEBUFF_TIMER.missileFireEvent = 10 + this.game.time.totalElapsedSeconds();
    }
  },
  generatePlatforms: function() {
    var platformY = this.game.rnd.integerInRange(200, 300);
    var platformGroup = this.platforms.getFirstExists(false);
    if(!platformGroup) {
      platformGroup = new PlatformGroup(this.game, this.platforms);
    }
    platformGroup.reset(this.game.width, platformY);
  },
  changePlayerControl: function(){
    if (this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.changePlayerControlEvent.timer){
      DEBUFF_TIMER.changePlayerControlEvent.isNormal = !DEBUFF_TIMER.changePlayerControlEvent.isNormal;
      this.swapKeyListeners(DEBUFF_TIMER.changePlayerControlEvent.isNormal);
      DEBUFF_TIMER.changePlayerControlEvent.timer = 3 + this.game.time.totalElapsedSeconds();
    }
  },
  swapKeyListeners: function(bool) {
    console.log(bool);
  if (bool) {
    this.upKey.onDown.remove(this.char1.moveRight,this.char1);
    this.leftKey.onDown.remove(this.char1.moveUp,this.char1);
    this.rightKey.onDown.remove(this.char1.moveLeft,this.char1);
    this.upKey.onDown.add(this.char1.moveUp, this.char1);
    this.leftKey.onDown.add(this.char1.moveLeft, this.char1);
    this.rightKey.onDown.add(this.char1.moveRight, this.char1);
  } else {
    this.upKey.onDown.remove(this.char1.moveUp,this.char1);
    this.leftKey.onDown.remove(this.char1.moveLeft,this.char1);
    this.rightKey.onDown.remove(this.char1.moveRight,this.char1);
    this.upKey.onDown.add(this.char1.moveRight, this.char1);
    this.leftKey.onDown.add(this.char1.moveUp, this.char1);
    this.rightKey.onDown.add(this.char1.moveLeft, this.char1);
  }
},
  setUpKeyListeners: function() {
    // add keyboard controls
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.upKey.onDown.addOnce(this.startGame, this);
    this.upKey.onDown.add(this.char1.moveUp, this.char1);

    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.leftKey.onDown.add(this.char1.moveLeft, this.char1);

    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.rightKey.onDown.add(this.char1.moveRight, this.char1);

    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.downKey.onDown.add(this.char1.moveDown, this.char1);
  },
  setUpEnemyKeyListeners: function() {
    // add enemy keyboard controls
    this.enemyUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.enemyUpKey.onDown.add(this.enemy.moveUp, this.enemy);

    this.enemyLeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.enemyLeftKey.onDown.add(this.enemy.moveLeft, this.enemy);

    this.enemyRightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.enemyRightKey.onDown.add(this.enemy.moveRight, this.enemy);

    this.enemyDownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.enemyDownKey.onDown.add(this.enemy.moveDown, this.enemy);

    this.enemyGKey = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
    this.enemyGKey.onDown.add(this.generateLazer, this);

    this.shot = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
    this.shot.onDown.add(this.generateMissile, this);

    this.changePlayerControlKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    this.changePlayerControlKey.onDown.add(this.changePlayerControl, this);
  },
  randomLunchDebuff: function() {
    // add the all the random debuff here
    // create and add a new Trap object
    if (!this.trap || this.game.rnd.integerInRange(0,1)%1 == 0) {
        this.trap = new Trap(this.game, this.game.width+20, this.game.rnd.integerInRange(0,this.ground.y));
        this.game.add.existing(this.trap);
    }

  }

};

module.exports = Play;
