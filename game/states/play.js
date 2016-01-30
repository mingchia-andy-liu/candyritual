
'use strict';
var Bird = require('../prefabs/bird');
var Enemy = require('../prefabs/enemy');
var Ground = require('../prefabs/ground');
var Pipe = require('../prefabs/pipe');
var PipeGroup = require('../prefabs/pipeGroup');
var Scoreboard = require('../prefabs/scoreboard');
var Trap = require('../prefabs/trap');
var Lazer = require('../prefabs/traps/lazer');
var Platform = require('../prefabs/platform');
var PlatformGroup = require('../prefabs/platformGroup')

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
    this.healthBar = this.game.add.sprite(0, 0, 'healthBar');

    // create and add a group to hold our pipeGroup prefabs
    this.pipes = this.game.add.group();
    this.platforms = this.game.add.group();

    // create and add a new Ground object
    this.ground = new Ground(this.game, 0, 350, 840, 420);
    this.game.add.existing(this.ground);

    // create and add a new Bird object
    this.bird = new Bird(this.game, 100, this.ground.y-15);
    this.game.add.existing(this.bird);

    this.setUpKeyListerners();

    //create and add new Enemy object
    this.enemy = new Enemy(this.game, 700, 200);
    this.game.add.existing(this.enemy);
    this.setUpEnemyKeyListeners();

    // add mouse/touch controls
    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.onDown.add(this.bird.flap, this.bird);

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

    this.pipeHitSound = this.game.add.audio('pipeHit');
    this.groundHitSound = this.game.add.audio('groundHit');
    this.scoreSound = this.game.add.audio('score');

  },
  update: function() {
    // enable collisions between the bird and the ground
    // this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
    this.game.physics.arcade.collide(this.bird, this.ground);
    this.game.physics.arcade.collide(this.bird, this.lazer, this.lazerHandler, null, this);
    this.game.physics.arcade.collide(this.bird, this.trap, this.damageHandler, null, this);

    if(!this.gameover) {
      // enable collisions between the bird and each group in the pipes group
      this.pipes.forEach(function(pipeGroup) {
        this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.bird, pipeGroup);
      }, this);

      this.platforms.forEach(function(platformGroup) {
        this.game.physics.arcade.collide(this.bird, platformGroup);
      }, this);
    }

    if (this.bird.x < 20) {
      this.deathHandler();
    }



  },
  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
    this.scoreboard.destroy();
  },
  startGame: function() {
    if(!this.bird.alive && !this.gameover) {
      this.bird.body.allowGravity = true;
      this.bird.alive = true;
      // add a timer
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      this.platformGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.generatePlatforms, this);
      this.platformGenerator.timer.start();

      this.instructionGroup.destroy();
    }
  },
  checkScore: function(pipeGroup) {
    if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
      pipeGroup.hasScored = true;
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.scoreSound.play();
    }
  },
  damageHandler: function(bird, enemy) {
    this.bird.takeDamage();
    enemy.kill();

    //TODO: Damage animation / sprite when taking damage

    if (this.bird.getHealth() <= 0) {
        this.deathHandler();
    }
  },
  lazerHandler: function(bird, enemy) {
    if (enemy.isHarmful) {
      console.log(enemy.isHarmful);
      this.damageHandler(bird, enemy);
    } else {
      console.log("IS NOT HARMFUL");
    }
  },
  deathHandler: function(bird, enemy) {
    if(!this.gameover) {
      this.groundHitSound.play();
      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score);
      this.gameover = true;
      this.bird.kill();
      this.pipes.callAll('stop');
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
    var lazerY = this.game.rnd.integerInRange(0, 500);
    // create and add a new lazer object
    this.lazer = new Lazer(this.game, this.game.width-25, lazerY);
    this.game.add.existing(this.lazer);
  },
  generatePlatforms: function() {
    var platformY = this.game.rnd.integerInRange(100, 200);
    var platformGroup = this.platforms.getFirstExists(false);
    if(!platformGroup) {
      platformGroup = new PlatformGroup(this.game, this.platforms);
    }
    platformGroup.reset(this.game.width, platformY);
  },
  setUpKeyListerners: function() {
    // add keyboard controls
    this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.flapKey.onDown.addOnce(this.startGame, this);
    this.flapKey.onDown.add(this.bird.flap, this.bird);

    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.leftKey.onDown.add(this.bird.moveLeft, this.bird);

    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.rightKey.onDown.add(this.bird.moveRight, this.bird);

    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.downKey.onDown.add(this.bird.moveDown, this.bird);
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
  },
    generateTraps: function() {
    var trapY = this.game.rnd.integerInRange(-100, 100);
    // var trapGroup = this.traps.getFirstExists(false);
    // if(!trapGroup) {
    var trapGroup = new TrapGroup(this.game, this.traps, 3);
    // }
    // trapGroup.reset(this.game.width, trapY);


  },


};

module.exports = Play;
