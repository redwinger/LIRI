var keys = require('./keys.js');


if (keys.action == "spotify-this-song") { 

	keys.song() 

} else if (keys.action == "movie-this") {

	keys.movie()

} else if (keys.action == "my-tweets") {

	keys.tweets() 

} else {

	console.log('invalid command');
};

