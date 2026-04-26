AngryBirds.Menu = function(){};

AngryBirds.Menu.prototype = {

	init: function()
		{
		},

	preload: function()
		{
		this.menuBackgroundImage = null;
		this.menuFloor = null;
		this.menuFloorGrassBack = null;
		this.menuFloorGrassFront = null;
		this.menuTitle = null;
		this.menuPlay = null;
		this.menuPlayText = null;
		this.menuPlayHandler = null;
		this.menuSoundIcon = null;
		this.menuSoundHandler = null;
		},

	create: function()
		{
		// ADDING THE BACKGROUND
		this.menuBackgroundImage = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "imageGameBackground");

		// ADDING THE FLOOR
		this.menuFloor = this.add.tileSprite(0, this.game.world.height - 48, this.game.world.width, 48, "imageGameFloor");

		// ADDING THE FLOOR GRASS BACK LAYER
		this.menuFloorGrassBack = this.add.tileSprite(0, this.game.world.height - 65, this.game.world.width, this.game.world.height - 418, "imageGameGrassBack");

		// ADDING THE FLOOR GRASS FRONT FRONT
		this.menuFloorGrassFront = this.add.tileSprite(0, this.game.world.height - 60, this.game.world.width, this.game.world.height - 420, "imageGameGrassFront");

		// ADDING THE GAME TITLE
		this.menuTitle = this.add.sprite(0, 25, "imageMenuTitle");
		this.menuTitle.position.x = game.width / 2 - this.menuTitle.width / 2;

		// ADDING THE PLAY BUTTON
		this.menuPlay = this.add.sprite(0, 155, "imageMenuPlay");
		this.menuPlay.position.x = game.width / 2 - this.menuPlay.width / 2;

		// ADDING THE PLAY BUTTON TEXT
		this.menuPlayText = game.add.bitmapText(0, 250, "AngryBirdsFontLight", STRING_PLAY, 40);
		this.menuPlayText.width = STRING_PLAYWIDTH;
		this.menuPlayText.position.x = Math.floor(game.width / 2 - this.menuPlayText.width / 2 - 1);
		this.menuPlayText.position.y = Math.floor(game.height / 2 - this.menuPlayText.height / 2 + 48);
		this.menuPlayText.fixedToCamera = true;

		// ADDING THE PLAY BUTTON HANDLER
		this.menuPlayHandler = game.add.graphics();
		this.menuPlayHandler.beginFill(0x000000, 0);
		this.menuPlayHandler.drawRect(309, 232, 163, 85, 10);
		this.menuPlayHandler.inputEnabled = true;
		this.menuPlayHandler.events.onInputUp.add(function()
			{
			// LOADING THE LEVEL SELECTOR
			game.state.start("AngryBirds.LevelSelector", Phaser.Plugin.StateTransition.Out.SlideLeft);
			},this);

		// CHECKING IF THE SOUND IS ENABLED
		if (GAME_SOUND_ENABLED==true)
			{
			// ADDING THE SOUND ON ICON
			this.menuSoundIcon = this.add.sprite(15, 365, "imageMenuSoundOn");
			}
			else
			{
			// ADDING THE SOUND OFF ICON
			this.menuSoundIcon = this.add.sprite(15, 365, "imageMenuSoundOff");
			}

		// ADDING THE SOUND ICON HANDLER
		this.menuSoundHandler = game.add.graphics();
		this.menuSoundHandler.beginFill(0x000000, 0);
		this.menuSoundHandler.drawRect(0, 350, 100, 100, 10);
		this.menuSoundHandler.inputEnabled = true;
		this.menuSoundHandler.events.onInputUp.add(function(){this.toggleSound()},this);
		},

	update: function()
		{
		// MOVING THE BACKGROUND
		this.menuFloor.tilePosition.x = this.menuFloor.tilePosition.x - 0.5;
		this.menuFloorGrassBack.tilePosition.x = this.menuFloorGrassBack.tilePosition.x - 0.5;
		this.menuFloorGrassFront.tilePosition.x = this.menuFloorGrassFront.tilePosition.x - 0.5;
		this.menuBackgroundImage.tilePosition.x = this.menuBackgroundImage.tilePosition.x - 0.15;
		},

	getBooleanSetting: function(settingName)
		{
		try
			{
			var name = "angrybirds" + settingName;
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");

			for(var i=0;i < ca.length;i++)
				{
				var c = ca[i];
				while (c.charAt(0)==" ")
					{
					c = c.substring(1,c.length);
					}
				if (c.indexOf(nameEQ) == 0)
					{
					if (c.substring(nameEQ.length,c.length)=="true")
						{
						return true;
						}
						else
						{
						return false;
						}
					}
				}
			}
		catch(err)
			{
			}

		return true;
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
			this.menuSoundIcon.loadTexture("imageMenuSoundOff");

			// CHECKING IF THERE IS A MUSIC PLAYER
			if (MUSIC_PLAYER!=null)
				{
				// STOPPING THE INTRO MUSIC
				MUSIC_PLAYER.stop();
				}
			}
			else
			{
			// ENABLING THE SOUND
			GAME_SOUND_ENABLED = true;

			// SAVING THE SOUND PREFERENCE
			this.setBooleanSetting("GAME_SOUND_ENABLED", true);

			// SHOWING THE SOUND ENABLED IMAGES
			this.menuSoundIcon.loadTexture("imageMenuSoundOn")

			// CHECKING IF THE MUSIC PLAYER IS CREATED
			if (MUSIC_PLAYER!=null)
				{
				// PAUSING THE BACKGROUND MUSIC
				MUSIC_PLAYER.pause();
				}

			// LOADING THE INTRO MUSIC
			MUSIC_PLAYER = game.state.states["AngryBirds.SplashGame"].add.audio("audioIntro");

			// SETTING THE INTRO MUSIC VOLUME
			MUSIC_PLAYER.volume = 1;

			// SETTING THAT THE INTRO MUSIC WILL BE LOOPING
			MUSIC_PLAYER.loop = true;

			// PLAYING THE INTRO MUSIC
			MUSIC_PLAYER.play();
			}
		}
	};

