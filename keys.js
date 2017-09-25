

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var action = process.argv[2];
var culture = process.argv.slice(3);

var client = new Twitter ({
  consumer_key: 'JQkxFDnj20ztY1GLxs4eR9sL2',
  consumer_secret: 'TMKyVDnjDX3D730ZFFNmHttm5zRku9xHRSRo4OXVkqerlU7Gjs',
  access_token_key: '910861037716590592-EVjSSJZdSWN2x5AhEPad616A4AsqXV1',
  access_token_secret: 'XjMgNq0oXebL5j4E4ekOz0A7jmDLrmfWRxjGxXMX1BYGA',
});

var params = {screen_name: 'Beer_BellyFlop'};


// Setting the default for movie-this
action === 'movie-this' && culture.length < 1 ? culture = '2001' : culture = culture;
// setting the default for spotify-this-song
action === 'spotify-this-song' && culture.length < 1 ? culture = 'skate or die' : culture = culture;

var tweets = function() {

	client.get('statuses/user_timeline/count=20', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log('You tweeted ' + tweets[i].text + 'on ' + tweets[i].created_at);
			}
		} else {

			console.log(error)
		}
})
};


var spotify = new Spotify({
  id: '0837330cefd64e4088e7d74b01fcea09',
  secret: '12a58765024b4aee9ad9aedff70acdc9'
});
 
var song = function() {

	spotify.search({ type: 'track', query: culture }, function(err, songData) {
		if (err) {
			return console.log('Error occurred: ' + err);
		};

		var result = songData.tracks.items[0];
		
		console.log('Artist: ' + result.artists[0].name); 
		console.log('Song Name: ' + result.name);
		console.log('Preview URL: ' + result.external_urls.spotify);
		console.log('Song appears this album: ' + result.album.name);
	});
};

var movie = function() {

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + culture, function (error, response, movieData) {
	if (error) {
		console.log('error:', error); 
		console.log('statusCode:', response && response.statusCode);
	}
	result = JSON.parse(movieData, null, 2);

	        console.log('Title: ' + result.Title)
			console.log('Year: ' + result.Year)
			console.log(result.Ratings[0].Source + " " + result.Ratings[0].Value)
			console.log(result.Ratings[1].Source + " " + result.Ratings[1].Value)
			console.log('Country: ' + result.Country)
			console.log('Languages: ' + result.Language)
			console.log('Plot Summary: ' + result.Plot)
			console.log('Starring: ' + result.Actors);
	})
};

var doThis = function() {

	fs.readFile('random.txt', 'utf8', function(err, data){

	if(err) {
		console.log(err)
	} else {

		input = data.slice(0);
		culture = data.slice(1);

		if (input === 'spotify-this-song') {

			song()
		} else if (input === 'movie-this') {

			movie()
		}

		console.log(input)
	}	
})};

	

exports.action = action;
exports.culture = culture;
exports.movie = movie;
exports.song = song;
exports.tweets = tweets;
exports.doThis = doThis;

