function isMobileDevice(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}

// GETTING THE USER LANGUAGE
var userLanguage = window.navigator.userLanguage || window.navigator.language;

var STRING_PLAY = "";
var STRING_PLAYWIDTH = "";
var STRING_YOUWIN = "";
var STRING_YOULOSE = "";
var STRING_DISCLAIMER1 = "";
var STRING_DISCLAIMER2 = "";
var STRING_DISCLAIMER3 = "";
var STRING_DISCLAIMER4 = "";
var STRING_DISCLAIMER5 = "";
var STRING_DISCLAIMER6 = "";
var STRING_DISCLAIMER7 = "";
var STRING_DISCLAIMER8_DESKTOP = "";
var STRING_DISCLAIMER8_MOBILE = "";
var STRING_SCORE = "";

// CHECKING THE USER LANGUAGE
if (userLanguage.substring(0,2)=="es")
	{
	STRING_PLAY = "JUGAR";
	STRING_PLAYWIDTH = 130;
	STRING_YOUWIN = "BIEN HECHO!";
	STRING_YOULOSE = "Vuelve a intentarlo!";
	STRING_DISCLAIMER1 = "DESCARGO DE RESPONSABILIDAD";
	STRING_DISCLAIMER2 = "Los recursos de Angry Birds";
	STRING_DISCLAIMER3 = "(im" + String.fromCharCode(225) + "genes, fuentes, m" + String.fromCharCode(250) + "sica y sonidos)";
	STRING_DISCLAIMER4 = "se proporcionan UNICAMENTE con fines";
	STRING_DISCLAIMER5 = "educativos. Esta demostraci" + String.fromCharCode(243) + "n no est" + String.fromCharCode(225);
	STRING_DISCLAIMER6 = "afiliada ni respaldada por sus respectivos";
	STRING_DISCLAIMER7 = "titulares de derechos de autor.";
	STRING_DISCLAIMER8_DESKTOP = "Haga click para continuar";
	STRING_DISCLAIMER8_MOBILE = "Presione para continuar";
	STRING_SCORE = "PUNTOS";
	}
	else
	{
	STRING_PLAY = "PLAY";
	STRING_PLAYWIDTH = 108;
	STRING_YOUWIN = "WELL DONE!";
	STRING_YOULOSE = "Try it again!"
	STRING_DISCLAIMER1 = "DISCLAIMER";
	STRING_DISCLAIMER2 = "The Angry Birds resources";
	STRING_DISCLAIMER3 = "(images, fonts, music and sounds)";
	STRING_DISCLAIMER4 = "are provided for educational purposes ONLY.";
	STRING_DISCLAIMER5 = "This demo is not affiliated with";
	STRING_DISCLAIMER6 = "or endorsed by their respective";
	STRING_DISCLAIMER7 = "copyright holders.";
	STRING_DISCLAIMER8_DESKTOP = "Click to continue";
	STRING_DISCLAIMER8_MOBILE = "Tap to continue";
	STRING_SCORE = "SCORE";
	}

var GAME_SOUND_ENABLED = true;
var GAME_LEVEL_SELECTED = "";

var MUSIC_PLAYER = null;

var AngryBirds = {};

