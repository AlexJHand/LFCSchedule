//Requires
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const daylightJSON = require('./daylight-savings.json');
const britishSummerJSON = require('./british-summer-time.json');

// Port
const port = 4501;

// Classes
class JsonClass {
    constructor(when, team1, team2, competition) {
    this.when = when,
    this.team1 = team1,
    this.team2 = team2,
    this.competition = competition}
};

// function checkTimezones
checkTimezones = (gameDate, gameMonth, gameYear) => {
    let timeDifference = 0;
    gameDate = parseInt(gameDate);
    gameYear = parseInt(gameYear);
    console.log('gameDate', gameDate);
    console.log('gameMonth', gameMonth);
    console.log('gameYear', gameYear);

    const currentDaylight = daylightJSON.find(entry => entry.year === gameYear);
    console.log('currentDaylight', currentDaylight);

    const currentBritTime = britishSummerJSON.find(entry => entry.year === gameYear);
    console.log('currentBritTime', currentBritTime);

    if (gameMonth === 'March' && gameDate >= currentDaylight.startDay && gameDate < currentBritTime.startDay) {
        console.log('Daylight savings but not British Summer time');
        timeDifference = 7;
    } else if ((gameMonth === 'October' && gameDate >= currentBritTime.endDay) || (gameMonth === 'November' && gameDate < currentDaylight.endDay)) {
        console.log('Daylight savings but not British Summer time');
        timeDifference = 7;
    } else {
        console.log('Standard time difference.');
        timeDifference = 6
    }
    return timeDifference;
}


// function convertToCentralTime(liverpoolDateTime) {
convertToCentralTime = (liverpoolDateTime) => {
    let liverpoolSplit = liverpoolDateTime.split(" ");
    console.log('liverpoolSplit', liverpoolSplit);

    let liverpoolHours = liverpoolSplit.shift();
    console.log('liverpoolHours', liverpoolHours);
    console.log('liverpoolSplit', liverpoolSplit);

    let timeDifference = checkTimezones(liverpoolSplit[liverpoolSplit.length - 3],liverpoolSplit[liverpoolSplit.length - 2],liverpoolSplit[liverpoolSplit.length-1]);

    liverpoolHours = liverpoolHours.split(":");
    console.log('liverpoolHours', liverpoolHours);

    let convertedHours = parseInt(liverpoolHours) - timeDifference;
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

            // First Match
            $('.next-match').filter(function () {
                let data = $(this);
                when = data.find("p").first().text()

                when = when.trim();
                when = convertToCentralTime(when);

                team1 = data.find("img").eq(0).attr("title");
                team2 = data.find("img").eq(1).attr("title");
                competition = data.find(".comp-logo").eq(0).attr("title");
                
                let match1 = new JsonClass(when, team1, team2, competition);

                fs.writeFile('output.json', JSON.stringify(match1, null, 4), function (err) {
                    console.log('File successfully written - check your project directory for the output.json file.');
                });
            });

            // Second match
            $('.next-match').filter(function () {
                let data = $(this);
                when = data.find("p").first().text()

                when = when.trim();
                when = convertToCentralTime(when);

                team1 = data.find("img").eq(0).attr("title");
                team2 = data.find("img").eq(1).attr("title");
                competition = data.find(".comp-logo").eq(0).attr("title");

                let match1 = new JsonClass(when, team1, team2, competition);

                fs.writeFile('output.json', JSON.stringify(match1, null, 4), function (err) {
                    console.log('File successfully written - check your project directory for the output.json file.');
                });
            });
        }
    })
    res.send('Check your console.');
});

// Listener
app.listen(port, function () {
    console.log('Listening on port', port);
});

// Exports
exports = module.exports = app;