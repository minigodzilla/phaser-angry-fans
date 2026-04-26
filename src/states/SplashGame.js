AngryBirds.SplashGame = function(){};

AngryBirds.SplashGame.prototype = {

	init: function()
		{
		},

	preload: function()
		{
		this.imageSplash = null;
		},

	create: function()
		{
		// SETTING THE BACKGROUND COLOR
		this.stage.backgroundColor = "#FFFFFF";

		// ADDING THE IMAGE SPLASH
		this.imageSplash = game.add.sprite(0, 0, "imageSplash");

		// WAITING 3000 MS
		game.time.events.add(3000, function()
			{
			// LOADING THE GAME MENU
			game.state.start("AngryBirds.Menu", Phaser.Plugin.StateTransition.Out.SlideLeft);
			});
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

	setSolvedLevels: function(newLevel)
		{
		try
			{
			var name = "solvedlevelsangrybirds";
			var value = newLevel;
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

	getSolvedLevels: function()
		{
		try
			{
			var name = "solvedlevelsangrybirds";
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");

			for(var i=0;i < ca.length;i++)
				{
				var c = ca[i];
				while (c.charAt(0)==" ")
					{
					c = c.substring(1,c.length);
					}
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
			}
		catch(err)
			{
			}

		return "0";
		}
	};

