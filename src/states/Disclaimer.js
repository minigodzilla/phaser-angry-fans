AngryBirds.Disclaimer = function(){};

AngryBirds.Disclaimer.prototype = {

	init: function()
		{
		this.line1 = null;
		this.line2 = null;
		this.line3 = null;
		this.line4 = null;
		this.line4Accent = null;
		this.line5 = null;
		this.line6 = null;
		this.line7 = null;
		this.line8 = null;
		this.marginY = 20;
		this.clickTimestamp = null;
		this.clickPositionX = null;
		this.clickPositionY = null;
		},

	create: function()
		{
		// SETTING THE BACKGROUND COLOR
		this.stage.backgroundColor = "#000000";

		// ADDING THE DISCLAIMER LINE 1
		this.line1 = game.add.bitmapText(0, this.marginY + 20, "ArialBlackWhite", STRING_DISCLAIMER1, 20);
		this.line1.height = 25;
		this.line1.tint = 0xFF0000;
		this.line1.position.x = game.width / 2 - this.line1.width / 2;

		// ADDING THE DISCLAIMER LINE 2
		this.line2 = game.add.bitmapText(0, this.marginY + 90, "ArialBlackWhite", STRING_DISCLAIMER2, 20);
		this.line2.height = 25;
		this.line2.position.x = game.width / 2 - this.line2.width / 2;

		// ADDING THE DISCLAIMER LINE 3
		this.line3 = game.add.bitmapText(0, this.marginY + 130, "ArialBlackWhite", STRING_DISCLAIMER3, 20);
		this.line3.height = 25;
		this.line3.position.x = game.width / 2 - this.line3.width / 2;

		// ADDING THE DISCLAIMER LINE 4
		this.line4 = game.add.bitmapText(0, this.marginY + 170, "ArialBlackWhite", STRING_DISCLAIMER4, 20);
		this.line4.height = 25;
		this.line4.position.x = game.width / 2 - this.line4.width / 2;

		// CHECKING THE USER LANGUAGE IS RUNNING THE GAME IN SPANISH
		if (userLanguage.substring(0,2)=="es")
			{
			// ADDING A SPANISH ACCENT TO AN SPECIFIC WORD IN THE DISCLAIMER LINE 4
			this.line4Accent = game.add.bitmapText(0, this.line4.position.y - 5, "ArialBlackWhite", "´", 20);
			this.line4Accent.height = 24;
			this.line4Accent.position.x = this.line4.position.x + 190;
			}

		// ADDING THE DISCLAIMER LINE 5
		this.line5 = game.add.bitmapText(0, this.marginY + 210, "ArialBlackWhite", STRING_DISCLAIMER5, 20);
		this.line5.height = 25;
		this.line5.position.x = game.width / 2 - this.line5.width / 2;

		// ADDING THE DISCLAIMER LINE 6
		this.line6 = game.add.bitmapText(0, this.marginY + 250, "ArialBlackWhite", STRING_DISCLAIMER6, 20);
		this.line6.height = 25;
		this.line6.position.x = game.width / 2 - this.line6.width / 2;

		// ADDING THE DISCLAIMER LINE 7
		this.line7 = game.add.bitmapText(0, this.marginY + 290, "ArialBlackWhite", STRING_DISCLAIMER7, 20);
		this.line7.height = 25;
		this.line7.position.x = game.width / 2 - this.line7.width / 2;

		// CHECKING IF IT IS A MOBILE DEVICE
		if (isMobileDevice()==true)
			{
			// ADDING THE DISCLAIMER LINE 8 FOR MOBILE DEVICES
			this.line8 = game.add.bitmapText(0, this.marginY + 360, "ArialBlackWhite", STRING_DISCLAIMER8_MOBILE, 20);
			this.line8.height = 25;
			this.line8.tint = 0x228B22;
			this.line8.position.x = game.width / 2 - this.line8.width / 2;
			}
			else
			{
			// ADDING THE DISCLAIMER LINE 8 FOR DESKTOP DEVICES
			this.line8 = game.add.bitmapText(0, this.marginY + 360, "ArialBlackWhite", STRING_DISCLAIMER8_DESKTOP, 20);
			this.line8.height = 25;
			this.line8.tint = 0x228B22;
			this.line8.position.x = game.width / 2 - this.line8.width / 2;
			}

		// SETTING THAT WILL HAPPEN WHEN THE USER STARTS TOUCHING THE SCREEN OR MOUSE DOWN
		this.game.input.onDown.add(function()
			{
			// CHECKING IF THERE ISN'T A CLICK TIMESTAMP VALUE
			if (this.clickTimestamp==null)
				{
				// SETTING THE CLICK TIMESTAMP VALUE
				this.clickTimestamp = this.getCurrentTime();

				// SETTING THE INITIAL MOUSE OR FINGER POSITION
				this.clickPositionX = this.game.input.activePointer.position.x;
				this.clickPositionY = this.game.input.activePointer.position.y;
				}
			}, this);

		// SETTING THAT WILL HAPPEN WHEN THE USER STOPS TOUCHING THE SCREEN OR MOUSE UP
		this.game.input.onUp.add(function()
			{
			// REJECTING ANY SLIDE AND LONG PRESS EVENT - BUGFIX FOR SAFARI ON IOS FOR ENABLING THE AUDIO CONTEXT
			if (Math.abs(this.game.input.activePointer.position.x-this.clickPositionX)>=25){this.clickTimestamp=null;return;}
			if (Math.abs(this.game.input.activePointer.position.y-this.clickPositionY)>=25){this.clickTimestamp=null;return;}
			if (this.getCurrentTime()-this.clickTimestamp>=500){this.clickTimestamp=null;return;}

			// GETTING THE SOUND PREFERENCE
			GAME_SOUND_ENABLED = this.getBooleanSetting("GAME_SOUND_ENABLED");

			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// ADDING THE INTRO MUSIC
				MUSIC_PLAYER = this.add.audio("audioIntro");

				// SETTING THE INTRO MUSIC VOLUME
				MUSIC_PLAYER.volume = 1;

				// SETTING THAT THE INTRO MUSIC WILL BE LOOPING
				MUSIC_PLAYER.loop = true;

				// PLAYING THE INTRO MUSIC
				MUSIC_PLAYER.play();
				}

			// LOADING THE GAME SPLASH
			game.state.start("AngryBirds.SplashGame", Phaser.Plugin.StateTransition.Out.SlideLeft);
			}, this);
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

	getCurrentTime: function()
		{
		return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
		}
	};

