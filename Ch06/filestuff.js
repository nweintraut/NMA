var fs = require('fs');
var Path = require('path');
function WalkDirs(dirPath) {
	console.log(dirPath);
	fs.readdir(dirPath, function(err, entries){
		if (err) {
			console.log(err);
		} else {
			for (var index in entries) {
				var fullPath = Path.join(dirPath, entries[index]);
				(function(fullPath) {
					fs.stat(fullPath, function(err, stats){
						if (err) {
							console.log(err);
						} else {
							if (stats && stats.isFile()){
								console.log(fullPath);
							} else if (stats && stats.isDirectory()) {
								WalkDirs(fullPath);
							}
						}
					});
				})(fullPath);
			}
		}
	});
}
WalkDirs("../");