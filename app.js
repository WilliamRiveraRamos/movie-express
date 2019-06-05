
const express = require('express');
const request = require('request');
const app = express();
require('dotenv').config()

var http = require('http').Server(app);

// Public folder for assets
app.use(express.static('public'));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Main page route
app.get('/', (req, res) => res.render('home'));

// about page route
app.get('/about', (req, res) => res.render('about'));

// results page route
app.get('/results', function(req, res) {
    const omdb = process.env.APIKEY;
    var query = req.query.search;
    var year = req.query.year;
    var url = 'http://www.omdbapi.com/?apikey='+omdb+'&s=' + query + '&y=' + year;

    request(url, function(error, response, body) {
        var data = JSON.parse(body)

        res.render('results', {data: data});
    });
});

// Display message if page or route don't exist
app.get('*', (req, res) => res.send('Page NOT found!'));

// Start Server
http.listen(process.env.PORT || 3000, function(){
    console.log('listening on', http.address().port);
  });
