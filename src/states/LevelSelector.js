AngryBirds.LevelSelector = function(){};

AngryBirds.LevelSelector.prototype = {

	init: function()
		{
		this.levelSelectorBackgroundImage = null;
		this.levelSelectorLeftImage = null;
		this.levelSelectorRightImage = null;
		this.levelSelectorGoBackImage = null;
		this.levelSelectorGoBackImageHandler = null;
		},

	create: function()
		{
		// ADDING THE BACKGROUND
		this.levelSelectorBackgroundImage = this.add.sprite(0, 0, "imageLevelSelectorBackground");

		// ADDING THE LEFT IMAGE
		this.levelSelectorLeftImage = this.add.sprite(0, 0, "imageLevelSelectorLeftImage");
		this.levelSelectorLeftImage.position.y = game.height - this.levelSelectorLeftImage.height;

		// ADDING THE RIGHT IMAGE
		this.levelSelectorRightImage = this.add.sprite(0, 0, "imageLevelSelectorRightImage");
		this.levelSelectorRightImage.position.x = game.width - this.levelSelectorRightImage.width;
		this.levelSelectorRightImage.position.y = game.height - this.levelSelectorRightImage.height;

		// GETTING ALL THE SOLVED LEVELS
		var solvedLevels = parseInt(game.state.states["AngryBirds.SplashGame"].getSolvedLevels());

		// ADDING LEVEL BUTTONS FROM 1 TO 5
		this.createLevelButton(50,   50,  "1", solvedLevels);
		this.createLevelButton(200,  50,  "2", solvedLevels);
		this.createLevelButton(350,  50,  "3", solvedLevels);
		this.createLevelButton(500,  50,  "4", solvedLevels);
		this.createLevelButton(650,  50,  "5", solvedLevels);

		// ADDING LEVEL BUTTONS FROM 6 TO 10
		this.createLevelButton(50,  150,  "6", solvedLevels);
		this.createLevelButton(200, 150,  "7", solvedLevels);
		this.createLevelButton(350, 150,  "8", solvedLevels);
		this.createLevelButton(500, 150,  "9", solvedLevels);
		this.createLevelButton(650, 150, "10", solvedLevels);

		// ADDING LEVEL BUTTONS FROM 11 TO 15
		this.createLevelButton(50,  250, "11", solvedLevels);
		this.createLevelButton(200, 250, "12", solvedLevels);
		this.createLevelButton(350, 250, "13", solvedLevels);
		this.createLevelButton(500, 250, "14", solvedLevels);
		this.createLevelButton(650, 250, "15", solvedLevels);

		// ADDING THE GO BACK IMAGE
		this.levelSelectorGoBackImage = this.add.sprite(10, 370, "imageLevelSelectorGoBack");

		// ADDING THE GO BACK HANDLER
		this.levelSelectorGoBackImageHandler = game.add.graphics();
		this.levelSelectorGoBackImageHandler.beginFill(0x000000, 0);
		this.levelSelectorGoBackImageHandler.drawRect(0, 360, 90, 90, 10);
		this.levelSelectorGoBackImageHandler.inputEnabled = true;
		this.levelSelectorGoBackImageHandler.events.onInputUp.add(function()
			{
			// LOADING THE GAME MENU
			game.state.start("AngryBirds.Menu", Phaser.Plugin.StateTransition.Out.SlideRight);
			},this);
		},

	createLevelButton: function(x, y, levelNumber, solvedLevels)
		{
		// GETTING THE CURRENT LEVEL KEY
		var nextLevel = "level" + (parseInt(levelNumber));

		// CHECKING IF THE LEVEL IS BLOCKED OR DOESN'T EXISTS AS A TEXT KEY
		if (solvedLevels+1<levelNumber || game.cache.checkTextKey(nextLevel)==false)
			{
			// ADDING THE LEVEL BLOCKED IMAGE
			this.add.sprite(x, y, "imageLevelSelectorBlocked");
			}
			else
			{
			// ADDING THE LEVEL IMAGE
			var levelSelectorLevelImage = this.add.sprite(x, y, "imageLevelSelectorLevel");

			// ADDING THE LEVEL LABEL
			var levelSelectorLevelNumber = game.add.bitmapText(0, 0, "AngryBirdsFont", levelNumber, 35);
			levelSelectorLevelNumber.position.x = levelSelectorLevelImage.position.x + levelSelectorLevelImage.width / 2 - levelSelectorLevelNumber.width / 2;
			levelSelectorLevelNumber.position.y = levelSelectorLevelImage.position.y + levelSelectorLevelImage.height / 2 - levelSelectorLevelNumber.height / 2 - 13;

			// ADDING THE LEVEL HANDLER
			var levelSelectorLevelHandler = game.add.graphics();
			levelSelectorLevelHandler.beginFill(0x000000, 0);
			levelSelectorLevelHandler.drawRect(levelSelectorLevelImage.position.x, levelSelectorLevelImage.position.y, levelSelectorLevelImage.width, levelSelectorLevelImage.height, 10);
			levelSelectorLevelHandler.inputEnabled = true;
			levelSelectorLevelHandler.events.onInputUp.add(function(){this.startLevel(levelNumber)},this);

			// ADDING THREE STARS BECAUSE IT'S A SOLVED LEVEL
			if (levelNumber<=solvedLevels)
				{
				// ADDING THE THREE STARS IMAGE
				var levelSelectorLevelCompleted = this.add.sprite(x, y, "imageLevelSelectorCompleted");
				levelSelectorLevelCompleted.position.x = levelSelectorLevelImage.position.x + levelSelectorLevelImage.width / 2 - levelSelectorLevelCompleted.width / 2 - 1;
				levelSelectorLevelCompleted.position.y = levelSelectorLevelImage.position.y + levelSelectorLevelImage.height - levelSelectorLevelCompleted.height - 1;
				}
			}
		},

	startLevel: function(levelNumber)
		{
		// SETTING THE SELECTED LEVEL NUMBER
		GAME_LEVEL_SELECTED = levelNumber;

		// CHECKING IF THERE IS A MUSIC PLAYER
		if (MUSIC_PLAYER!=null)
			{
			// STOPPING THE INTRO MUSIC
			MUSIC_PLAYER.stop();
			}

		// CHECKING IF THE USER SELECTED THE FIRST LEVEL
		if (levelNumber=="1")
			{
			// LOADING THE EPISODE INTRO
			game.state.start("AngryBirds.EpisodeIntro", Phaser.Plugin.StateTransition.Out.SlideLeft);
			}
			else
			{
			// LOADING THE GAME
			game.state.start("AngryBirds.Game", Phaser.Plugin.StateTransition.Out.SlideLeft);
			}
		}
	};

