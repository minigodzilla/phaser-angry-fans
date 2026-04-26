AngryBirds.EpisodeIntro = function(){};

AngryBirds.EpisodeIntro.prototype = {

	init: function()
		{
		},

	preload: function()
		{
		this.imageSplash = null;
		this.buttonNext = null;
		},

	create: function()
		{
		// SETTING THE BACKGROUND COLOR
		this.stage.backgroundColor = "#000000";

		// ADDING THE EPISODE INTRO MUSIC
		MUSIC_PLAYER = this.add.audio("audioEpisodeIntro");

		// ADDING THE IMAGE SPLASH
		this.imageSplash = game.add.sprite(0, 0, "imageEpisodeIntro");

		// ADDING THE NEXT BUTTON
		this.buttonNext = this.add.sprite(game.width - 75, game.height - 70, "imageGameNext");
		this.buttonNext.inputEnabled = true;
		this.buttonNext.events.onInputUp.add(function()
			{
			// CHECKING IF THERE IS A EPISODE INTRO MUSIC PLAYER
			if (MUSIC_PLAYER!=null)
				{
				// STOPPING THE EPISODE INTRO MUSIC PLAYER
				MUSIC_PLAYER.stop();
				}

			// LOADING THE GAME WHEN THE ANIMATION IT'S DONE
			game.state.start("AngryBirds.Game", Phaser.Plugin.StateTransition.Out.SlideLeft);
			},this);

		// WAITING 500 MS
		game.time.events.add(500, function()
			{
			// CHECKING IF THE SOUND IS ENABLED
			if (GAME_SOUND_ENABLED==true)
				{
				// CHECKING IF THERE IS A MUSIC PLAYER
				if (MUSIC_PLAYER!=null)
					{
					// STOPPING THE INTRO MUSIC
					MUSIC_PLAYER.stop();
					}

				// SETTING THE EPISODE INTRO MUSIC VOLUME
				MUSIC_PLAYER.volume = 1;

				// SETTING THAT THE EPISODE INTRO MUSIC WILL BE LOOPING
				MUSIC_PLAYER.loop = false;

				// PLAYING THE EPISODE INTRO MUSIC
				MUSIC_PLAYER.play();
				}

			// WAITING 2000 MS
			game.time.events.add(2000, function()
				{
				// MOVING SMOOTHLY THE CAMERA TO THE END OF THE IMAGE
				game.add.tween(game.state.states["AngryBirds.EpisodeIntro"].imageSplash.position).to({x: -(game.state.states["AngryBirds.EpisodeIntro"].imageSplash.width - game.width)}, 12000, Phaser.Easing.Linear.None, true).onComplete.add(function()
					{
					// WAITING 1000 MS
					game.time.events.add(1000, function()
						{
						// CHECKING IF THERE IS A EPISODE INTRO MUSIC PLAYER
						if (MUSIC_PLAYER!=null)
							{
							// STOPPING THE EPISODE INTRO MUSIC PLAYER
							MUSIC_PLAYER.stop();
							}

						// LOADING THE GAME WHEN THE ANIMATION IT'S DONE
						game.state.start("AngryBirds.Game", Phaser.Plugin.StateTransition.Out.SlideLeft);
						});
					});
				});
			});
		},
	};

