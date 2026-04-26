AngryBirds.Game = function (game)
	{
	this.toastText = null;
	this.toastShadow = null;
	this.MAX_SPEED_SHOOT = null;
	this.SHOOT_FACTOR = null;
	this.KILL_DIFF = null;
	this.backgroundImage = null;
	this.blocksCollisionGroup = null;
	this.enemiesCollisionGroup = null;
	this.birdsCollisionGroup = null;
	this.countDeadEnemies = null;
	this.totalNumEnemies = null;
	this.isPreparingShot = null;
	this.isBirdReady = null;
	this.availableBirdsCounter = null;
	this.birds = null;
	this.poles = null;
	this.enemies = null;
	this.blocks = null;
	this.floor = null;
	this.floorGrassBack = null;
	this.floorGrassFront = null;
	this.pole = null;
	this.poleLeft = null;
	this.poleRight = null;
	this.poleLine1 = null;
	this.poleLine2 = null;
	this.bird = null;
	this.birdLauncher = null;
	this.scoreValue = null;
	this.gameWon = null;
	this.startX = null;
	this.swipeCheckingEnabled = null;
	this.audioPlayer = null;
	this.menuIcon = null;
	this.menuHandler = null;
	this.restartIcon = null;
	this.restartHandler = null;
	this.soundIcon = null;
	this.soundHandler = null;
	this.turnInProgress = null;
	this.currentLevel = null;

	// SCALING THE CANVAS SIZE FOR THE GAME
	function resizeF()
		{
		var scaleX = window.innerWidth / 782;
		var scaleY = window.innerHeight / 440;
		var scale = Math.min(scaleX, scaleY);
		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		game.scale.setUserScale(scale, scale);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
		}

	window.addEventListener("resize", resizeF);
	};

AngryBirds.Game.prototype = {

	init: function()
		{
		this.toastText = null;
		this.toastShadow = null;
		this.MAX_SPEED_SHOOT = 1000;
		this.SHOOT_FACTOR = 8;
		this.KILL_DIFF = 8;
		this.backgroundImage = null;
		this.blocksCollisionGroup = null;
		this.enemiesCollisionGroup = null;
		this.birdsCollisionGroup = null;
		this.countDeadEnemies = 0;
		this.totalNumEnemies = 0;
		this.isPreparingShot = false;
		this.isBirdReady = false;
		this.availableBirdsCounter = 0;
		this.birds = null;
		this.poles = null;
		this.enemies = null;
		this.blocks = null;
		this.floor = null;
		this.floorGrassBack = null;
		this.floorGrassFront = null;
		this.pole = null;
		this.poleLeft = null;
		this.poleRight = null;
		this.poleLine1 = null;
		this.poleLine2 = null;
		this.bird = null;
		this.birdLauncher = null;
		this.scoreValue = 0;
		this.gameWon = false;
		this.startX = 0;
		this.swipeCheckingEnabled = false;
		this.audioPlayer = null;
		this.menuIcon = null;
		this.menuHandler = null;
		this.restartIcon = null;
		this.restartHandler = null;
		this.soundIcon = null;
		this.soundHandler = null;
		this.turnInProgress = false;
		this.currentLevel = null;
		},

	create: function()
		{
		// SETTING THE WORLD BOUNDS
		game.world.setBounds(0, 0, game.width * 2, game.height);

		// GETTING THE CURRENT LEVEL FOR LATER USE
		this.currentLevel = GAME_LEVEL_SELECTED;

		// STARTING THE PHYSICS SYSTEM
		this.game.physics.startSystem(Phaser.Physics.P2JS);

		// SETTING THE GRAVITY
		this.game.physics.p2.gravity.y = 300;

		// PREVENTING MINIMAL FRICTIONS AND MINIMAL MOVEMENTS BETWEEN BLOCKS
		this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
		this.game.physics.p2.world.setGlobalStiffness(100000);

		// SETTING THE COLLISION GROUPS
		this.blocksCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.enemiesCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.birdsCollisionGroup = this.game.physics.p2.createCollisionGroup();

		// ADDING THE BACKGROUND
		this.backgroundImage = this.add.tileSprite(0, 0, this.game.world.width * 2, this.game.world.height, "imageGameBackground");

		// CREATING THE BIRDS GROUP
		this.birds = this.add.group();

		// CREATING THE POLES GROUP
		this.poles = this.add.group();

		// CREATING THE ENEMIES GROUP
		this.enemies = this.add.group();
		this.enemies.enableBody = true;
		this.enemies.physicsBodyType = Phaser.Physics.P2JS;

		// CREATING THE BLOCKS GROUP
		this.blocks = this.add.group();
		this.blocks.enableBody = true;
		this.blocks.physicsBodyType = Phaser.Physics.P2JS;

		// ADDING THE FLOOR
		this.floor = this.add.tileSprite(this.game.world.width / 2, this.game.world.height - 24, this.game.world.width * 3, 48, "imageGameFloor");
		this.blocks.add(this.floor);
		this.floor.body.setCollisionGroup(this.blocksCollisionGroup);
		this.floor.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.birdsCollisionGroup]);
		this.floor.body.static = true;

		// ADDING THE FLOOR GRASS BACK LAYER
		this.floorGrassBack = this.add.tileSprite(-3, this.game.world.height - 65, this.game.world.width * 3, this.game.world.height - 418, "imageGameGrassBack");

		// ADDING THE FLOOR GRASS FRONT FRONT
		this.floorGrassFront = this.add.tileSprite(-3, this.game.world.height - 60, this.game.world.width * 3, this.game.world.height - 420, "imageGameGrassFront");

		// ADDING THE POLE
		this.pole = this.add.sprite(180, 300, "imageGamePole");
		this.pole.anchor.setTo(0.5, 0);
		this.pole.alpha = 0;
		this.poleRight = this.add.sprite(180, 294, "imageGamePoleRight");
		this.poleRight.width = this.poleRight.width * 0.5;
		this.poleRight.height = this.poleRight.height * 0.5;
		this.poleLeft = this.add.sprite(166, 291, "imageGamePoleLeft");
		this.poleLeft.width = this.poleLeft.width * 0.5;
		this.poleLeft.height = this.poleLeft.height * 0.5;

		// ADDING THE MENU ICON
		this.menuIcon = this.add.sprite(5, 5, "imageGameMenu");
		this.menuIcon.alpha = 0.5;
		this.menuIcon.fixedToCamera = true;

		// ADDING THE MENU ICON HANDLER
		this.menuHandler = game.add.graphics();
		this.menuHandler.beginFill(0x000000, 0);
		this.menuHandler.drawRect(5, 5, 60, 60, 10);
		this.menuHandler.fixedToCamera = true;
		this.menuHandler.inputEnabled = true;
		this.menuHandler.events.onInputUp.add(function(){this.goBackToLevelSelector()},this);

		// ADDING THE RESTART ICON
		this.restartIcon = this.add.sprite(70, 5, "imageGameRestart");
		this.restartIcon.alpha = 0.5;
		this.restartIcon.fixedToCamera = true;

		// ADDING THE RESTART HANDLER
		this.restartHandler = game.add.graphics();
		this.restartHandler.beginFill(0x000000, 0);
		this.restartHandler.drawRect(70, 5, 60, 60, 10);
		this.restartHandler.fixedToCamera = true;
		this.restartHandler.inputEnabled = true;
		this.restartHandler.events.onInputUp.add(function(){this.restartGame(true)},this);

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// ADDING THE SOUND ON ICON
			this.soundIcon = this.add.sprite(135, 5, "imageGameSoundOn");
			this.soundIcon.alpha = 0.5;
			this.soundIcon.fixedToCamera = true;
			}
			else
			{
			// ADDING THE SOUND OFF ICON
			this.soundIcon = this.add.sprite(135, 5, "imageGameSoundOff");
			this.soundIcon.alpha = 0.5;
			this.soundIcon.fixedToCamera = true;
			}

		// ADDING THE SOUND ICON HANDLER
		this.soundHandler = game.add.graphics();
		this.soundHandler.beginFill(0x000000, 0);
		this.soundHandler.drawRect(135, 5, 60, 60, 10);
		this.soundHandler.fixedToCamera = true;
		this.soundHandler.inputEnabled = true;
		this.soundHandler.events.onInputUp.add(function(){this.toggleSound()},this);

		// ADDING THE BIRD LAUNCHER
		this.birdLauncher = game.add.graphics(0, 0);
		this.birdLauncher.beginFill(0x000000,0);
		this.birdLauncher.drawRect(145, 265, 75, 75);
		this.birdLauncher.inputEnabled = true;
		this.birdLauncher.events.onInputDown.add(function()
			{
			// CHECKING IF THE BIRD IS READY TO BE THROWN
			if (this.isBirdReady==true && this.bird.body==null)
				{
				// CHECKING IF THE SOUND IS ENABLED AND IF THE SHOT IS ABOUT THE BE PREPARED
				if (GAME_SOUND_ENABLED==true && this.isPreparingShot==false)
					{
					// LOADING THE AUDIO SLINGSHOT
					this.audioPlayer = this.add.audio("audioSlingshot");

					// SETTING THE AUDIO SLINGSHOT VOLUME
					this.audioPlayer.volume = 1;

					// SETTING THAT THE AUDIO SLINGSHOT WON'T BE LOOPING
					this.audioPlayer.loop = false;

					// PLAYING THE AUDIO SLINGSHOT
					this.audioPlayer.play();
					}

				// SETTING THAT THE USER IS PREPARING THE SHOT
				this.isPreparingShot = true;
				}
			},this);

		// PREPARING THE SHOT WHEN THE USER CLICKS OR TAPS ON THE SCREEN
		this.game.input.onDown.add(function()
			{
			// CHECKING IF THE SWIPE CHECKING ISN'T ENABLED
			if (this.swipeCheckingEnabled==false)
				{
				// GETTING THE FIRST FINGER/MOUSE POSITION
				this.startX = this.game.input.activePointer.position.x;

				// SETTING THAT THE SWIPE CHECKING IS ENABLED
				this.swipeCheckingEnabled = true;
				}
			}, this);

		// SETTING THAT WILL HAPPEN WHEN THE USER STOPS TOUCHING THE SCREEN OR MOUSE UP
		this.game.input.onUp.add(function()
			{
			// SETTING THAT THE SWIPE CHECKING IS DISABLED
			this.swipeCheckingEnabled = false;
			}, this);

		// LOADING THE LEVEL INFO
		this.loadLevel();

		// ADDING A BIRD
		this.addBird();

		// LOOPING ALL THE ENEMIES
		for (var i=0;i<this.enemies.children.length;i++)
			{
			// ADDING THE ENEMY ANIMATIONS
			this.enemies.children[i].animations.add("stand", [1, 2, 0]);
			this.enemies.children[i].animations.add("win", [2]);

			// PLAYING THE ENEMY STAND ANIMATION
			this.enemies.children[i].animations.play("stand", 0.5, true);
			}

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// LOADING THE INTRO MUSIC
			MUSIC_PLAYER = this.add.audio("audioBackground");

			// SETTING THE INTRO MUSIC VOLUME
			MUSIC_PLAYER.volume = 1;

			// SETTING THAT THE INTRO MUSIC WILL BE LOOPING
			MUSIC_PLAYER.loop = true;

			// PLAYING THE INTRO MUSIC
			MUSIC_PLAYER.play();
			}

		// WAITING 200 MS
		game.time.events.add(200, function()
			{
			// PAUSING THE PHYSICS
			game.physics.p2.pause();
			});
		},

	update: function()
		{
		// CHECKING IF THE WORLD CAMERA CAN BE MOVED
		if (this.input.activePointer.isDown==true && this.isPreparingShot==false)
			{
			// GETTING THE CURRENT FINGER/MOUSE X POSITION
			var endX = this.game.input.activePointer.position.x;

			// GETTING THE DISTANCE
			var distX = this.startX-endX;

			// CHECKING IF THERE WAS A LEFT SWIPE
			if(distX>10)
				{
				// SETTING THAT THE SWIPE CHECKING IS DISABLED
				this.swipeCheckingEnabled = false;

				// UPDATING THE FIRST FINGER/MOUSE POSITION
				this.startX = endX + 5;

				// MOVING THE WORLD CAMERA TO THE LEFT
				game.camera.x = game.camera.x + 12;
				}

			// CHECKING IF THERE WAS A RIGHT SWIPE
			else if (distX<-10)
				{
				// SETTING THAT THE SWIPE CHECKING IS DISABLED
				this.swipeCheckingEnabled = false;

				// UPDATING THE FIRST FINGER/MOUSE POSITION
				this.startX = endX - 5;

				// MOVING THE WORLD CAMERA TO THE RIGHT
				game.camera.x = game.camera.x - 12;
				}
			}

		// CHECKING IF THE USER IS PREPARING THE SHOT AND THAT THE BIRD WAS NOT THROWN YET
		if (this.isPreparingShot==true && this.bird.body==null)
			{
			// SETTING THE FLOOR AND POLE LIMIT VALUES
			var minY = 170;
			var maxY = 370;
			var minX = 24;
			var maxX = 180;
			var currentX = maxX;
			var currentY = maxY;

			// CHECKING IF THE Y POINTER VALUE IS OVER THE FLOOR
			if (this.game.input.activePointer.position.y<maxY)
				{
				// USING THE Y POINTER VALUE
				currentY = this.game.input.activePointer.position.y;
				}

			// CHECKING IF THE Y POINTER BELOW THE MINIUM
			if (this.game.input.activePointer.position.y<minY)
				{
				// USING THE Y POINTER VALUE
				currentY = minY;
				}

			// CHECKING IF THE X POINTER VALUE IS BEFORE THE POLE
			if (this.game.input.activePointer.position.x+game.camera.x<maxX)
				{
				// USING THE X POINTER VALUE
				currentX = this.game.input.activePointer.position.x + game.camera.x;
				}

			// CHECKING IF THE X POINTER VALUE IS OFF THE SCREEN
			if (this.game.input.activePointer.position.x+game.camera.x<minX)
				{
				// USING THE X POINTER VALUE
				currentX = minX;
				}

			// CHECKING IF THE BIRD WILL OVERLAP THE POLE
			if (currentX>maxX-18 && currentY>320)
				{
				// RELOCATING THE BIRD TO PREVENT OVERLAPPING
				currentY = 320;
				}

			// MAKING THE BIRD FOLLOW USER INPUT POINTER
			this.bird.x = currentX;
			this.bird.y = currentY;

			// CHECKING IF THE FIRST LINE FOR THE POLE EXISTS
			if (this.poleLine1!=null)
				{
				// DESTROYING THE FIRST LINE FOR THE POLE
				this.poleLine1.destroy();
				}

			// CHECKING IF THE SECOND LINE FOR THE POLE EXISTS
			if (this.poleLine2!=null)
				{
				// DESTROYING THE SECOND LINE FOR THE POLE
				this.poleLine2.destroy();
				}

			// DRAWING THE FIRST LINE FOR THE POLE
			this.poleLine1 = game.add.graphics(0, 0);
			this.poleLine1.lineStyle(6, 0x301708);
			this.poleLine1.moveTo(this.pole.position.x - 10,this.pole.position.y + 9);
			if (currentY<250 && currentX>90){this.poleLine1.lineTo(currentX - this.bird.width / 2 + 14, currentY - 11);}
			else if (currentY<250 && currentX<=90){this.poleLine1.lineTo(currentX - this.bird.width / 2 + 7, currentY - 4);}
			else if (currentY>350 && currentX>=95){this.poleLine1.lineTo(currentX - this.bird.width / 2 + 21, currentY + 21);}
			else {this.poleLine1.lineTo(currentX - this.bird.width / 2 + 7, currentY + 9);}

			// DRAWING THE SECOND LINE FOR THE POLE
			this.poleLine2 = game.add.graphics(0, 0);
			this.poleLine2.lineStyle(6, 0x301708);
			this.poleLine2.moveTo(this.pole.position.x + 15,this.pole.position.y + 9);
			if (currentY<250 && currentX>90){this.poleLine2.lineTo(currentX - this.bird.width / 2 + 14, currentY - 11);}
			else if (currentY<250 && currentX<=90){this.poleLine2.lineTo(currentX - this.bird.width / 2 + 7, currentY - 4);}
			else if (currentY>350 && currentX>=95){this.poleLine2.lineTo(currentX - this.bird.width / 2 + 21, currentY + 21);}
			else {this.poleLine2.lineTo(currentX - this.bird.width / 2 + 7, currentY + 9);}
			this.poles.add(this.poleLine2);

			// BRINGING THE LEFT SIDE OF THE POLE TO THE TOP
			this.game.world.bringToTop(this.poleLeft);

			// BRINGING THE MENU ICON TO THE TOP
			this.game.world.bringToTop(this.menuIcon);

			// BRINGING THE RESTART ICON TO THE TOP
			this.game.world.bringToTop(this.restartIcon);

			// BRINGING THE SOUND ICON TO THE TOP
			this.game.world.bringToTop(this.soundIcon);

			// GETTING THE DISTANCE BETWEEN THE BIRD AND THE POLE
			var distance = Phaser.Point.distance(this.bird.position, this.pole.position);

			// CHECKING IF THE USER STOPPED TAPPING OR CLICKING THE SCREEN
			if(this.game.input.activePointer.isUp==true)
				{
				// SETTING THAT THE USER IS NOT PREPARING THE SHOT
				this.isPreparingShot = false;

				// THROWING THE BIRD
				this.throwBird();
				}
			}

		// CREATING A VARIABLE TO KNOW IF THE GAME IS MOTION
		var gameInMotion = false;

		// LOOPING ALL THE ENEMIES
		for (var i=0;i<this.enemies.children.length;i++)
			{
			// CHECKING IF THE ENEMY IS IN MOVEMENT AND THAT WASN'T KILLED
			if (Math.abs(this.enemies.children[i].body.velocity.x) + Math.abs(this.enemies.children[i].body.velocity.y) > 0.8 && this.enemies.children[i].alpha==1)
				{
				// SETTING THAT THE GAME IS MOTION
				gameInMotion = true;
				}
			}

		// LOOPING ALL THE BLOCKS
		for (var i=0;i<this.blocks.children.length;i++)
			{
			// CHECKING IF THE BLOCK IS IN MOVEMENT
			if (Math.abs(this.blocks.children[i].body.velocity.x) + Math.abs(this.blocks.children[i].body.velocity.y) > 0.8)
				{
				// SETTING THAT THE GAME IS MOTION
				gameInMotion = true;
				}
			}

		// CHECKING IF THE BIRD IS IN MOVEMENT
		if (this.bird.body!=null)
			{
			// CHECKING IF THE BIRD IS NOT MOVING ANYMORE OR IF IT'S OUT OF THE SCREEN
			if ((Math.abs(this.bird.body.velocity.x) + Math.abs(this.bird.body.velocity.y) < 0.2 && this.bird.alpha==1) || (this.bird.position.x>game.world.width + 30 && this.bird.alpha==1))
				{
				// FLAGGING THE BIRD
				this.bird.alpha = 0.99;

				// WAITING 1000 MS
				game.time.events.add(1000, function()
					{
					// KILLING THE BIRD
					game.state.states["AngryBirds.Game"].killBird();
					});
				}
			}

		// CHECKING IF THE GAME IS NOT IN MOTION, THAT THE BIRD WAS ALREADY KILLED AND THAT THE TURN IS IN PROGRESS
		if (gameInMotion==false && this.bird.alpha<0.5 && this.turnInProgress==true)
			{
			// SETTING THAT THE GAME IS NO LONGER IN PROGRESS
			this.turnInProgress = false;

			// PAUSING THE PHYSICS
			game.physics.p2.pause();

			// WAITING 1000 MS
			game.time.events.add(1000, function()
				{
				// ENDING THE TURN
				game.state.states["AngryBirds.Game"].endTurn();
				});
			}
		},

	hitEnemy: function(bodyA, bodyB, shapeA, shapeB, equation)
		{
		// GETTING THE HIT VELOCITY
		var velocityDiff = Phaser.Point.distance(new Phaser.Point(equation[0].bodyA.velocity[0], equation[0].bodyA.velocity[1]), new Phaser.Point(equation[0].bodyB.velocity[0], equation[0].bodyB.velocity[1]));

		// CHECKING IF THE VELOCITY IS ENOUGH TO KILL THE ENEMY
		if (velocityDiff > game.state.states["AngryBirds.Game"].KILL_DIFF)
			{
			// PLACING THE EXPLOSION SPRITE WHERE ENEMY IS LOCATED
			this.explosion.position.x = this.position.x - 24;
			this.explosion.position.y = this.position.y - 24;

			// FLAGGING THE ENEMY
			this.alpha = 0.99;

			// KILLING THE ENEMY
			this.kill();

			// PLAYING THE EXPLOSION ANIMATION
			this.explosion.animations.play("explosion", 10, false);

			// SHOWING THE EXPLOSION SPRITE
			this.explosion.visible = true;

			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// LOADING THE AUDIO EXPLOSION
				game.state.states["AngryBirds.Game"].audioPlayer = game.state.states["AngryBirds.Game"].add.audio("audioExplosion");

				// SETTING THE AUDIO EXPLOSION VOLUME
				game.state.states["AngryBirds.Game"].audioPlayer.volume = 1;

				// SETTING THAT THE AUDIO EXPLOSION WON'T BE LOOPING
				game.state.states["AngryBirds.Game"].audioPlayer.loop = false;

				// PLAYING THE AUDIO EXPLOSION
				game.state.states["AngryBirds.Game"].audioPlayer.play();
				}

			// UPDATING THE DEAD COUNT
			game.state.states["AngryBirds.Game"].updateDeadCount();
			}
		},

	restartGame: function(useCurrentLevel)
		{
		// CHECKING IF THE LEVEL MUST BE RESTARTED
		if (useCurrentLevel==true)
			{
			// RESTORING THE CURRENT LEVEL
			GAME_LEVEL_SELECTED = this.currentLevel;
			}

		// CHECKING IF THERE IS AN AUDIO PLAYER CREATED
		if (this.audioPlayer!=null)
			{
			// PAUSING THE AUDIO PLAYER
			this.audioPlayer.pause();
			}

		// CHECKING IF THERE IS A MUSIC PLAYER CREATED
		if (MUSIC_PLAYER!=null)
			{
			// PAUSING THE MUSIC PLAYER
			MUSIC_PLAYER.pause();
			}

		// RESTARTING THE STATE
		this.state.restart();
		},

	loadLevel: function()
		{
		// LOADING THE LEVEL DATA
		this.levelData = JSON.parse(this.game.cache.getText("level" + GAME_LEVEL_SELECTED));

		// LOADING AND CREATING ALL THE BLOCKS AND ENEMIES
		this.levelData.blocks.forEach(function(block){this.createBlock(block)},this);
		this.levelData.enemies.forEach(function(enemy){this.createEnemy(enemy)},this);

		// RESTORING THE DEFAULT LEVEL VALUES
		this.countDeadEnemies = 0;
		this.totalNumEnemies = this.levelData.enemies.length;
		this.availableBirdsCounter = 3;
		},

	createBlock: function(data)
		{
		// CREATING THE BLOCK
		var block = new Phaser.Sprite(this.game, data.x, data.y, data.asset);

		// ADDING THE BLOCK TO THE BLOCKS GROUP
		this.blocks.add(block);

		// SETTING THE BLOCK MASS
		block.body.mass = data.mass;

		// SETTING THE COLLISION GROUP
		block.body.setCollisionGroup(this.blocksCollisionGroup);

		// SETTING THAT THE BLOCK WILL COLLIDE WITH ENEMIES, BIRDS AND OTHER BLOCKS
		block.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.birdsCollisionGroup]);

		// RETURNING THE BLOCK
		return block;
		},

	createEnemy: function(data)
		{
		// CREATING THE BLOCK
		var enemy = new Phaser.Sprite(this.game, data.x, data.y, data.asset);

		// ADDING THE ENEMY TO THE ENEMIES GROUP
		this.enemies.add(enemy);

		// SETTING THE COLLISION GROUP
		enemy.body.setCollisionGroup(this.enemiesCollisionGroup);

		// SETTING THAT THE BLOCK WILL COLLIDE WITH BIRD, BLOCKS AND OTHER ENEMIES
		enemy.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.birdsCollisionGroup]);

		// CALLING THE HITENEMY FUNCTION WHEN ENEMIES HIT SOMETHING
		enemy.body.onBeginContact.add(this.hitEnemy, enemy);

		// ADDING THE EXPLOSION SPRITE
		enemy.explosion = game.add.sprite(420, 307, "imageGameExplosion");
		enemy.explosionAnimation = enemy.explosion.animations.add("explosion", [0, 1, 2, 3, 4]);
		enemy.explosionAnimation.onComplete.add(function()
			{
			// HIDING THE EXPLOSION SPRITE
			enemy.explosion.visible = false;
			}, enemy);
		enemy.explosion.visible = false;

		// RETURNING THE ENEMY
		return enemy;
		},

	addBird: function()
		{
		// ADDING A BIRD TO THE STARTING POSITION
		this.bird = this.add.sprite(this.pole.x, this.pole.y, "imageGameBird");
		this.bird.anchor.setTo(0.5);

		// CREATING A REFERENCE TO THE CURRENT BIRD
		var _this = this.bird;

		// ADDING THE EXPLOSION SPRITE
		this.bird.explosion = game.add.sprite(420, 307, "imageGameExplosion");
		this.bird.explosionAnimation = this.bird.explosion.animations.add("explosion", [0, 1, 2, 3, 4]);
		this.bird.explosionAnimation.onComplete.add(function()
			{
			// HIDING THE EXPLOSION SPRITE
			_this.explosion.visible = false;
			}, _this);
		this.bird.explosion.visible = false;

		// SETTING THAT THE BIRD IS READY
		this.isBirdReady = true;

		// TEMPORARILY REMOVING ALL THE AVAILABLE BIRDS
		this.birds.removeAll();

		// LOOPING ALL THE AVAILABLE BIRDS
		for (var i = this.availableBirdsCounter - 2; i > -1; i--)
			{
			// ADDING THE BIRD
			this.birds.create(90 - i * 70, 347, "imageGameBird");
			}

		// MAKING THE CAMERA TO NOT FOLLOW THE BIRD
		game.camera.follow(null);

		// MOVING SMOOTHLY THE CAMERA TO THE INITIAL POSITION
		game.add.tween(game.camera).to({x: 0}, 300, Phaser.Easing.Linear.None, true);

		// BRINGING THE LEFT SIDE OF THE POLE TO THE TOP
		this.game.world.bringToTop(this.poleLeft);
		},

	throwBird: function()
		{
		// CHECKING IF THE FIRST LINE FOR THE POLE EXISTS
		if (this.poleLine1!=null)
			{
			// DESTROYING THE FIRST LINE FOR THE POLE
			this.poleLine1.destroy();
			}

		// CHECKING IF THE SECOND LINE FOR THE POLE EXISTS
		if (this.poleLine2!=null)
			{
			// DESTROYING THE SECOND LINE FOR THE POLE
			this.poleLine2.destroy();
			}

		// RESUMING THE PHYSICS
		game.physics.p2.resume();

		// SETTING THAT THE TURN IS IN PROGRESS
		this.turnInProgress = true;

		// ENABLING PHYSICS TO THE BIRD
		this.game.physics.p2.enable(this.bird);

		// SETTING THE COLLISION GROUP
		this.bird.body.setCollisionGroup(this.birdsCollisionGroup);

		// SETTING THAT THE BIRD WILL COLLIDE WITH BLOCKS, ENEMIES AND OTHER BIRDS
		this.bird.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.birdsCollisionGroup]);

		// CALCULATING THE DIFFERENCE BETWEEN THE CURRENT POSITION AND TOP OF POLE
		var diff = Phaser.Point.subtract(this.pole.position, this.bird.position);

		// FIXING A THROWING WITHOUT POWER
		if(diff.x<=1){diff.x=7}

		// SETTING THE BIRD VELOCITY ACCORDING THE DIFFERENCE VECTOR
		this.bird.body.velocity.x = Math.abs(diff.x * this.SHOOT_FACTOR)/(diff.x * this.SHOOT_FACTOR) * Math.min(Math.abs(diff.x * this.SHOOT_FACTOR), this.MAX_SPEED_SHOOT);
		this.bird.body.velocity.y = Math.abs(diff.y * this.SHOOT_FACTOR)/(diff.y * this.SHOOT_FACTOR) * Math.min(Math.abs(diff.y * this.SHOOT_FACTOR), this.MAX_SPEED_SHOOT);

		// MAKING THE CAMERA TO FOLLOW THE BIRD
		game.camera.follow(this.bird);

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// LOADING THE AUDIO FLY
			this.audioPlayer = this.add.audio("audioFly");

			// SETTING THE AUDIO FLY VOLUME
			this.audioPlayer.volume = 1;

			// SETTING THAT THE AUDIO FLY WON'T BE LOOPING
			this.audioPlayer.loop = false;

			// PLAYING THE AUDIO FLY
			this.audioPlayer.play();
			}
		},

	updateDeadCount: function()
		{
		// UPDATING THE DEAD ENEMIES COUNTER
		this.countDeadEnemies = this.countDeadEnemies + 1;

		// CHECKING IF ALL THE ENEMIES ARE DEAD
		if (this.countDeadEnemies == this.totalNumEnemies)
			{
			// SETTING THAT THE USER WON THE GAME
			this.gameWon = true;

			// MAKING THE CAMERA TO NOT FOLLOW THE BIRD
			game.camera.follow(null);

			// SHOWING THE 'YOU WIN' TOAST
			this.showToast(STRING_YOUWIN);

			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// LOADING THE AUDIO YOU WIN
				this.audioPlayer = this.add.audio("audioYouWin");

				// SETTING THE AUDIO YOU WIN VOLUME
				this.audioPlayer.volume = 1;

				// SETTING THAT THE AUDIO YOU WIN WON'T BE LOOPING
				this.audioPlayer.loop = false;

				// PLAYING THE AUDIO YOU WIN
				this.audioPlayer.play();
				}

			// CHECKING IF THE NEXT LEVEL EXISTS
			if (game.state.states["AngryBirds.Game"].nextLevelExists()==true)
				{
				// CHECKING IF THE CURRENT LEVEL AS SOLVED MUST BE SAVED
				if (parseInt(game.state.states["AngryBirds.SplashGame"].getSolvedLevels())<parseInt(GAME_LEVEL_SELECTED))
					{
					// SAVING THE CURRENT LEVEL AS SOLVED
					game.state.states["AngryBirds.SplashGame"].setSolvedLevels(GAME_LEVEL_SELECTED);
					}

				// UPDATING THE SELECTED LEVEL NUMBER
				GAME_LEVEL_SELECTED = "" + (parseInt(GAME_LEVEL_SELECTED) + 1);

				// WAITING 5000 MS
				game.time.events.add(5000, function()
					{
					// RESTARTING THE GAME
					game.state.states["AngryBirds.Game"].restartGame(false);
					});
				}
				else
				{
				// SAVING THE CURRENT LEVEL AS SOLVED
				game.state.states["AngryBirds.SplashGame"].setSolvedLevels(GAME_LEVEL_SELECTED);

				// WAITING 5000 MS
				game.time.events.add(5000, function()
					{
					// REMOVING THE TOAST MESSAGE
					game.state.states["AngryBirds.Game"].toastShadow.destroy();
					game.state.states["AngryBirds.Game"].toastText.destroy();

					// GOING BACK TO THE LEVEL SELECTOR
					game.state.states["AngryBirds.Game"].goBackToLevelSelector();
					});
				}
			}
		},

	killBird: function()
		{
		// UPDATING THE AVAILABLE BIRDS COUNTER
		this.availableBirdsCounter = this.availableBirdsCounter - 1;

		// MAKING THE CAMERA TO NOT FOLLOW THE BIRD
		game.camera.follow(null);

		// PLACING THE EXPLOSION SPRITE WHERE ENEMY IS LOCATED
		this.bird.explosion.position.x = this.bird.position.x - 24;
		this.bird.explosion.position.y = this.bird.position.y - 24;

		// KILLING THE BIRD
		this.bird.kill();

		// PLAYING THE EXPLOSION ANIMATION
		this.bird.explosion.animations.play("explosion", 10, false);

		// SHOWING THE EXPLOSION SPRITE
		this.bird.explosion.visible = true;

		// FLAGGING THE BIRD AFTER THE EXPLOSION
		this.bird.alpha = 0.49;

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// LOADING THE AUDIO EXPLOSION
			this.audioPlayer = this.add.audio("audioExplosion");

			// SETTING THE AUDIO EXPLOSION VOLUME
			this.audioPlayer.volume = 1;

			// SETTING THAT THE AUDIO EXPLOSION WON'T BE LOOPING
			this.audioPlayer.loop = false;

			// PLAYING THE AUDIO EXPLOSION
			this.audioPlayer.play();
			}
		},

	endTurn: function()
		{
		// CHECKING IF THERE ARE BIRDS AVIABLE
		if (this.availableBirdsCounter > 0)
			{
			// CHECKING IF THE USER DIDN'T WIN THE GAME
			if (this.gameWon==false)
				{
				// ADDING A BIRD
				this.addBird();
				}
			}
		else
			{
			// CHECKING IF THE USER DIDN'T WIN THE GAME
			if (this.gameWon==false)
				{
				// MAKING THE CAMERA TO NOT FOLLOW THE BIRD
				game.camera.follow(null);

				// SHOWING THE 'YOU LOSE' TOAST
				this.showToast(STRING_YOULOSE);

				// LOOPING ALL THE ENEMIES
				for (var i=0;i<this.enemies.children.length;i++)
					{
					// PLAYING THE ENEMY WIN ANIMATION
					this.enemies.children[i].animations.play("win", 3, false);
					}

				// CHECKING IF THE SOUND IS ENABLED
				if (GAME_SOUND_ENABLED==true)
					{
					// LOADING THE AUDIO YOU LOSE
					this.audioPlayer = this.add.audio("audioYouLose");

					// SETTING THE AUDIO YOU LOSE VOLUME
					this.audioPlayer.volume = 1;

					// SETTING THAT THE AUDIO YOU LOSE WON'T BE LOOPING
					this.audioPlayer.loop = false;

					// PLAYING THE AUDIO YOU LOSE
					this.audioPlayer.play();
					}

				// WAITING 5000 MS
				game.time.events.add(5000, function()
					{
					// RESTARTING THE GAME
					game.state.states["AngryBirds.Game"].restartGame(false);
					});
				}
			}
		},

	toggleSound: function()
		{
		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// DISABLING THE SOUND
			GAME_SOUND_ENABLED = false;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", false);

			// SHOWING THE SOUND DISABLED IMAGES
			this.soundIcon.loadTexture("imageGameSoundOff");

			// CHECKING IF THERE IS AN AUDIO PLAYER CREATED
			if (this.audioPlayer!=null)
				{
				// PAUSING THE AUDIO PLAYER
				this.audioPlayer.pause();
				}

			// CHECKING IF THERE IS A MUSIC PLAYER CREATED
			if (MUSIC_PLAYER!=null)
				{
				// PAUSING THE MUSIC PLAYER
				MUSIC_PLAYER.pause();

				// DESTROYING THE MUSIC PLAYER
				MUSIC_PLAYER.destroy();
				}
			}
			else
			{
			// ENABLING THE SOUND
			GAME_SOUND_ENABLED = true;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", true);

			// SHOWING THE SOUND ENABLED IMAGES
			this.soundIcon.loadTexture("imageGameSoundOn")

			// CHECKING IF THERE IS A MUSIC PLAYER CREATED
			if (MUSIC_PLAYER!=null)
				{
				// PAUSING THE MUSIC PLAYER
				MUSIC_PLAYER.pause();

				// DESTROYING THE MUSIC PLAYER
				MUSIC_PLAYER.destroy();
				}

			// LOADING THE INTRO MUSIC
			MUSIC_PLAYER = this.add.audio("audioBackground");

			// SETTING THE INTRO MUSIC VOLUME
			MUSIC_PLAYER.volume = 1;

			// SETTING THAT THE INTRO MUSIC WILL BE LOOPING
			MUSIC_PLAYER.loop = true;

			// PLAYING THE INTRO MUSIC
			MUSIC_PLAYER.play();
			}
		},

	nextLevelExists: function()
		{
		// GETTING THE NEXT LEVEL KEY
		var nextLevel = "level" + (parseInt(GAME_LEVEL_SELECTED) + 1);

		// RETURNING IF THE NEXT LEVEL EXISTS
		return game.cache.checkTextKey(nextLevel);
		},

	goBackToLevelSelector: function()
		{
		// CHECKING IF THERE IS AN AUDIO PLAYER CREATED
		if (this.audioPlayer!=null)
			{
			// PAUSING THE AUDIO PLAYER
			this.audioPlayer.pause();
			}

		// CHECKING IF THERE IS A MUSIC PLAYER CREATED
		if (MUSIC_PLAYER!=null)
			{
			// PAUSING THE MUSIC PLAYER
			MUSIC_PLAYER.pause();
			}

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// LOADING THE INTRO MUSIC
			MUSIC_PLAYER = game.state.states["AngryBirds.SplashGame"].add.audio("audioIntro");

			// SETTING THE INTRO MUSIC VOLUME
			MUSIC_PLAYER.volume = 1;

			// SETTING THAT THE INTRO MUSIC WILL BE LOOPING
			MUSIC_PLAYER.loop = true;

			// PLAYING THE INTRO MUSIC
			MUSIC_PLAYER.play();
			}

		// LOADING THE LEVEL SELECTOR
		game.state.start("AngryBirds.LevelSelector", Phaser.Plugin.StateTransition.Out.SlideRight);
		},

	setBooleanSetting: function(settingName, settingValue)
		{
		try
			{
			var name = "angrybirds" + settingName;
			var value = String(settingValue);
			var days = 999;
			var expires = "";
			if (days)
				{
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString() + "; SameSite=Lax";
				}
			document.cookie = name + "=" + (value || "")  + expires + "; Secure; path=/";
			}
			catch(err)
			{
			}
		},

	showToast: function(myText)
		{
		// CREATING THE TOAST SHADOW
		this.toastShadow = game.add.graphics();
		this.toastShadow.beginFill(0x000000, 0.3);
		this.toastShadow.fixedToCamera = true;
		this.toastShadow.alpha = 0;

		// CREATING THE TOAST TEXT
		this.toastText = game.add.bitmapText(0, 0, "AngryBirdsFont", myText, 34.5);
		this.toastText.height = 38.5;
		this.toastText.position.x = game.width / 2 - this.toastText.width / 2;
		this.toastText.position.y = 15;
		this.toastText.fixedToCamera = true;
		this.toastText.alpha = 0;

		// DRAWING THE TOAST SHADOW
		this.toastShadow.drawRoundedRect(game.width / 2 - this.toastText.width / 2 - 10, 10, this.toastText.width + 20, 54, 10);

		// FADING IN THE TOAST SHADOW
		game.add.tween(this.toastShadow).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true);

		// FADING IN THE TOAST TEST
		game.add.tween(this.toastText).to({alpha: 1}, 300, Phaser.Easing.Linear.None, true);
		}
	};

// SETTING THE DEFAULT RENDERER MODE
var rendererMode = Phaser.WEBGL;

// CHECKING IF THE WEBGL RENDERER MODE IS NOT AVAILABLE
if (isWebGLAvailable()==false)
	{
	// CHANGING THE RENDERER MODE
	rendererMode = Phaser.CANVAS;
	}

