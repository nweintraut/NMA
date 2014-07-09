var censor = require("censorify")
console.log(censor.getCensoredWords());
console.log(censor.censor("Some very sad, bad and and text."));
censor.addCensoredWord("gloomy");
console.log(censor.getCensoredWords());
console.log(censor.censor("A very gloomy day"));