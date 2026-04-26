// CREATING THE GAME INSTANCE
var config = {width: 782, height: 440, renderer: rendererMode, parent: "content", disableVisibilityChange: false};
var game = new Phaser.Game(config);

// CREATING THE STATES
game.state.add("AngryBirds.Preloader", AngryBirds.Preloader);
game.state.add("AngryBirds.Splash", AngryBirds.Splash);
game.state.add("AngryBirds.Disclaimer", AngryBirds.Disclaimer);
game.state.add("AngryBirds.SplashGame", AngryBirds.SplashGame);
game.state.add("AngryBirds.Menu", AngryBirds.Menu);
game.state.add("AngryBirds.LevelSelector", AngryBirds.LevelSelector);
game.state.add("AngryBirds.EpisodeIntro", AngryBirds.EpisodeIntro);
game.state.add("AngryBirds.Game", AngryBirds.Game);

// STARTING THE GAME PRELOADER
game.state.start("AngryBirds.Preloader");