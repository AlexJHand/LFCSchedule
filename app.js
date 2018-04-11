const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

// function convertToCentralTime(liverpoolDateTime) {
convertToCentralTime = (liverpoolDateTime) => {
    let liverpoolSplit = liverpoolDateTime.split(" ");
    console.log('liverpoolSplit', liverpoolSplit);

    let liverpoolHours = liverpoolSplit.shift();
    console.log('liverpoolHours', liverpoolHours);
    console.log('liverpoolSplit', liverpoolSplit);

    liverpoolHours = liverpoolHours.split(":");
    console.log('liverpoolHours', liverpoolHours);

    let convertedHours = parseInt(liverpoolHours) - 6;
    convertedHours = convertedHours.toString();
    console.log('convertedHours', convertedHours);
    
    liverpoolHours[0] = convertedHours;
    console.log('liverpoolHours', liverpoolHours);
    
    let convertedTime = liverpoolHours.join(':');
    console.log('convertedTime', convertedTime);

    let convertedTimeArray = [convertedTime];
    console.log('convertedTimeArray', convertedTimeArray);

    for (let i = 0; i < liverpoolSplit.length; i++) {
        convertedTimeArray.push(liverpoolSplit[i]);
    }
    console.log('convertedTimeArray', convertedTimeArray);

    let centralTimeGameTime = convertedTimeArray.join(" ");
    console.log('centralTimeGameTime', centralTimeGameTime);

    return centralTimeGameTime;
}

app.get('/scrape', function (req, res) {
    url = 'http://www.liverpoolfc.com/match/2017-18/first-team/fixtures-and-results';

    request(url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);
            let title, release, rating;
            let json = {
                when: "",
                team1: "",
                team2: "",
                competition: ""
            };

            $('.next-match').filter(function () {
                let data = $(this);
                when = data.find("p").first().text()

                when = when.trim();
                when = convertToCentralTime(when);

                team1 = data.find("img").eq(0).attr("title");
                team2 = data.find("img").eq(1).attr("title");
                competition = data.find(".comp-logo").eq(0).attr("title");
                json.when = when;
                json.team1 = team1;
                json.team2 = team2;
                json.competition = competition;
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