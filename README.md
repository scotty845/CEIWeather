# CEIWeather
Node.js Express EJS CSS  Weather Underground API


Uses Node.js Express EJS CSS 

Server.js 
Node server utilizes Express.js and Routes 

/Routes/Weatherreporter
Routes to be utilized 

'/' to home.ejs  initial landing page with links to /about and /getmyweather 

'/about' to about.ejs brief description of project

'/getmyweather' to weather.ejs
calls server API which calls Weather Underground API 
to querry data to look up weather
in this example static query parameters are hard coded for
Philadelphia Pennsylvania USA

Weather Underground API returns current weather conditions for 
requested parameters 

Node.js renders data to EJS template pages styled with CSS and serves
them in the web browser 

/Views
holds ejs files
home.ejs
about.ejs
weather.ejs

/Public
css/css/styles
images/anchorone.png


/node_modules 
express module
ejs module

package.json
includes project depndncies 


Setup:
Can download to local folder
NPM Install
Browse to http://localhost:3000 will take you to home page with 
links for About and Fetch Yo Weather
Click on link Fetch Yo Weather to get Philadelphia Pennsylvania USA weather conditions
Or can type into browser url http://localhost:3000/getmyweather if you 
do not want to use link
