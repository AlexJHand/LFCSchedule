var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
    url = 'http://www.liverpoolfc.com/match/2017-18/first-team/fixtures-and-results';

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = {
                when: "",
                team1: "",
                team2: ""
            };

            $('.next-match').filter(function () {
                var data = $(this);
                when = data.find("p").first().text()

                when = when.trim();

                team1 = data.find("img").eq(0).attr("title");
                team2 = data.find("img").eq(1).attr("title");
                json.when = when;
                json.team1 = team1;
                json.team2 = team2;
            });
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('File successfully written - check your project directory for the output.json file.');
        });
    })



    res.send('Check your console.');
});

app.listen(8081);

console.log('The magic happens on port 8081');

exports = module.exports = app;