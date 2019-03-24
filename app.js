
const express = require('express')
const app = express()
const request = require('request')
const port = 3000

// Public folder for assets
app.use(express.static('public'));

// Set view engine to ejs
app.set('view engine', 'ejs');

// Main page route
app.get('/', (req, res) => res.render('home'))

// about page route
app.get('/about', (req, res) => res.render('about'))

// results page route
app.get('/results', function(req, res) {
    var query = req.query.search;
    var year = req.query.year;
    var url = 'http://www.omdbapi.com/?apikey=1e829d0e&s=' + query + '&y=' + year;

    request(url, function(error, response, body) {
        var data = JSON.parse(body)

        res.render('results', {data: data});
    });
});

// Display message if page or route don't exist
app.get('*', (req, res) => res.send('Page NOT found!'))

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}!`))