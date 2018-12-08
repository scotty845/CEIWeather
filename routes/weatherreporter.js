var express = require('express')
var router = express.Router()
var https = require('http');




// define the home page route
router.get('/', function (req, res) {
  
   res.render('home');
  
  
})

// define the about page route
router.get('/about', function (req, res) {
  
   res.render('about');
  
  
})

// define the API to get weather from weather underground API page route this is being done by URL and https.request with given parameters, City:Philadelphia, State: Pennsylvania, Country:US, 
router.get('/getmyweather', function (req, response) {
	
	
//query the current temperature and conditions in Philadelphia, PA. 
 var queryCity = 'Philadelphia';
 var queryState = 'Pennsylvania';
 var queryCountry = 'US'

 // URI Encoding all city/state/country provided as request params 
  var uriEncodedCity = encodeURIComponent(queryCity);
  var uriEncodedState = encodeURIComponent(queryState);
  var uriEncodedCountry = encodeURIComponent(queryCountry);

  //formatted URL for weather underground API using https.request method 
  var url = '/api/ee62a0ac3c9b57ba/conditions/q/' + uriEncodedCountry + 
            '/' + uriEncodedState + '/' + uriEncodedCity + '.json';

  //define object to be passed as http request
  //path will be options city, state, country i.e. Philadelphia
  var options = {
    hostname: 'api.wunderground.com',
    path: url,
    method: 'GET'
  };

  console.log("The URL Option is " + url);

//API call to Weather Underground Service
  var req = https.request(options, function(res) {
    console.log("city: %s,%s status: %d", queryCity, queryState, res.statusCode);

    // make sure the response data is complete
    // some API call (account) has more data than other type of accounts
    var responseData = ""
    res.on('data', function(data) { responseData += data; 
	
	
	
	});
	
    res.on('end', function() {
      console.log("Response from Wunderground API: " + responseData); 
      // JSON object that holds the response data from the API call
	  
	
      var result; 
        try {
          result = JSON.parse(responseData);
        } catch (err) {
          console.log("getWeathers(): Failed to parse result! " + err);
          result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
          res.statusCode = 500;
          response.end(JSON.stringify(result));
        }
        if (result) {
          if (result.current_observation != null) {
            // JSON response has current_observation attribute, 
            // weather data was successfully received.
            // success code statusCode 200 and successText 
			res.statusCode = 200;
			var statusText = 'I Just Called The Weather Underground Service';
			
			//define a formatted object response_object you can pass in conditions to res.render and to EJS template in views folder 
			var response_obj = {
				imagewu: result.current_observation.image.url,
				linkwu: result.current_observation.image.link,
				location: result.current_observation.observation_location.full,
				time: result.current_observation.observation_time,
				temp: result.current_observation.temperature_string,
				feelslike: result.current_observation.feelslike_string,
				wind: result.current_observation.wind_string,
				weather: result.current_observation.weather,
			}
			
			
			response.render("weather", {weather: response_obj, status_code: res.statusCode, status_text:statusText});
            //res.end(JSON.stringify(result.current_observation));
          } else {
            // Invalid city and state, return the suggestion
            // to client with 404 status code.
            res.statusCode = 404;
            res.end(JSON.stringify(result));
          }
        }
    });
  });
  req.end();

  
   //res.render('weather');
   
        
   
  
})


module.exports = router