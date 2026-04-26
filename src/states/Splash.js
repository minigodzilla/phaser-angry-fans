AngryBirds.Splash = function(){};

AngryBirds.Splash.prototype = {

	init: function()
		{
		},

	preload: function()
		{
		this.imageLogoPart1 = null;
		this.imageLogoPart1Handler = null;
		this.imageLogoPart2 = null;
		this.imageLogoPart2Handler = null;
		},

	create: function()
		{
		// SETTING THE LOGO OFFSET
		var logoOffset = 20;

		// SETTING THE BACKGROUND COLOR
		this.stage.backgroundColor = "#FFFFFF";

		this.imageLogoPart1 = game.add.sprite(0, 0, "imageLogoPart1");
		this.imageLogoPart1.scale.x = 0.7;
		this.imageLogoPart1.scale.y = 0.7;
		this.imageLogoPart1.position.x = game.width / 2 - this.imageLogoPart1.width / 2;
		this.imageLogoPart1.position.y = game.height / 2 - this.imageLogoPart1.height / 2 - logoOffset;
		this.imageLogoPart1.alpha = 0;

		// ADDING THE LOGO
		this.imageLogoPart2 = game.add.sprite(0, 0, "imageLogoPart2");
		this.imageLogoPart2.scale.x = 0.7;
		this.imageLogoPart2.scale.y = 0.7;
		this.imageLogoPart2.position.x = game.width / 2 - this.imageLogoPart2.width / 2;
		this.imageLogoPart2.position.y = -this.imageLogoPart2.height + 75;

		// WAITING 500 MS
		game.time.events.add(500, function()
			{
			// FADING IN THE URL
			this.imageLogoPart1Handler = game.add.tween(game.state.states["AngryBirds.Splash"].imageLogoPart1).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true);
			});

		// WAITING 1500 MS
		game.time.events.add(1500, function()
			{
			// MOVING THE LOGO INTO THE SCENE
			game.add.tween(game.state.states["AngryBirds.Splash"].imageLogoPart2).to({y: game.height / 2 - game.state.states["AngryBirds.Splash"].imageLogoPart2.height / 2 - logoOffset}, 2000, Phaser.Easing.Quadratic.InOut, true).onComplete.add(function()
				{
				// WAITING 750 MS
				game.time.events.add(750, function()
					{
					// LOADING THE GAME DISCLAIMER
					game.state.start("AngryBirds.Disclaimer", Phaser.Plugin.StateTransition.Out.SlideLeft);
					});
				});
			});
		}
	};

