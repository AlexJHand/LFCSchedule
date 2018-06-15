// Requires
const router = require('express').Router();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const daylightJSON = require('../daylight-savings.json');
const britishSummerJSON = require('../british-summer-time.json');

// Classes
class JsonClass {
    constructor(when, team1, team2, competition, objId) {
        this.when = when,
            this.team1 = team1,
            this.team2 = team2,
            this.competition = competition,
            this.objId = objId
    }
};

// function checkTimezones
checkTimezones = (gameDate, gameMonth, gameYear) => {
    let timeDifference = 0;
    gameDate = parseInt(gameDate);
    gameYear = parseInt(gameYear);

    const currentDaylight = daylightJSON.find(entry => entry.year === gameYear);

    const currentBritTime = britishSummerJSON.find(entry => entry.year === gameYear);

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

    let liverpoolHours = liverpoolSplit.shift();

    let timeDifference = checkTimezones(liverpoolSplit[liverpoolSplit.length - 3], liverpoolSplit[liverpoolSplit.length - 2], liverpoolSplit[liverpoolSplit.length - 1]);

    liverpoolHours = liverpoolHours.split(":");

    let convertedHours = parseInt(liverpoolHours) - timeDifference;
    convertedHours = convertedHours.toString();

    liverpoolHours[0] = convertedHours;

    let convertedTime = liverpoolHours.join(':');

    let convertedTimeArray = [convertedTime];

    for (let i = 0; i < liverpoolSplit.length; i++) {
        convertedTimeArray.push(liverpoolSplit[i]);
    }

    let centralTimeGameTime = convertedTimeArray.join(" ");

    return centralTimeGameTime;
}

router.get('/', function (req, res) {
    url = 'http://www.liverpoolfc.com/match/2017-18/first-team/fixtures-and-results';

    request(url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            // Match info
            $('.next-match').filter(function () {
                let data = $(this);
                let matches = []

                match1When = data.find("p").first().text()

                match1When = match1When.trim();
                match1When = convertToCentralTime(match1When);

                match1Team1 = data.find("img").eq(0).attr("title");
                match1Team2 = data.find("img").eq(1).attr("title");
                match1Competition = data.find(".comp-logo").eq(0).attr("title");
                match1ObjId = 0;

                match2When = data.find("p").last().text();

                match2When = match2When.trim();
                match2When = convertToCentralTime(match2When);

                match2Team1 = data.find("img").eq(2).attr("title");
                match2Team2 = data.find("img").eq(3).attr("title");
                match2Competition = data.find(".comp-logo").eq(1).attr("title");
                match2ObjId = 1;

                let match1 = new JsonClass(match1When, match1Team1, match1Team2, match1Competition, match1ObjId);
                let match2 = new JsonClass(match2When, match2Team1, match2Team2, match2Competition, match2ObjId);
                matches.push(match1, match2);

                fs.writeFile('output.json', JSON.stringify(matches, null, 4), function (err) {
                    console.log('File successfully written - check your project directory for the output.json file.');
                });

                res.send(matches);
            });
        } else {
            res.sendStatus(201);
        }
    })

    // res.send(matches);
});

// Exports 
module.exports = router;