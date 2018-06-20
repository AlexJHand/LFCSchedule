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

class Images {
    constructor(match, team1Image, team2Image) {
        this.match = match,
        this.team1Image = team1Image,
        this.team2Image = team2Image
    }
}

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

// getMatchImages(matches) 

router.get('/', function (req, res) {
    url = 'http://www.liverpoolfc.com/match/2017-18/first-team/fixtures-and-results';
    let matches = []

    request(url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            // Match info
            $('.next-match').filter(function () {
                let data = $(this);
                // let matches = []

                match1When = data.find("p").first().text()

                match1When = match1When.trim();
                match1When = convertToCentralTime(match1When);

                match1Team1 = data.find("img").eq(0).attr("title");
                match1Team2 = data.find("img").eq(1).attr("title");
                
                if (data.find(".comp-logo").eq(0).attr("title")) {
                    match1Competition = data.find(".comp-logo").eq(0).attr("title");
                } else {
                    match1Competition = data.find("span").eq(1).text();
                    console.log("match1Competition", match1Competition);
                }
                
                match1ObjId = 0;

                match2When = data.find("p").last().text();

                match2When = match2When.trim();
                match2When = convertToCentralTime(match2When);

                match2Team1 = data.find("img").eq(2).attr("title");
                match2Team2 = data.find("img").eq(3).attr("title");
                if (data.find(".comp-logo").eq(1).attr("title")) {
                    match2Competition = data.find(".comp-logo").eq(1).attr("title");
                } else {
                    match2Competition = data.find("span").eq(3).text();
                    console.log("match1Competition", match2Competition);
                }
                
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
});

// router.get('/images', function (req, res) {
router.get('/images', function (req, res) {
    let team = req.query.team
    console.log("In images.", team);
    let images = [];
    
    // for (let i = 0; i <= matches.length; i++) {
        // if (i < matches.length) {
            
        let tempMatchTeam1 = team.replace(' ', '_');
        let matchTeam1Url = 'https://en.wikipedia.org/wiki/' + tempMatchTeam1 + '_FC';
        console.log('match1Team1Url', matchTeam1Url);
        
        // let tempMatchTeam2 = matches[i].team2.replace(' ', '_');
        // let matchTeam2Url = 'https://en.wikipedia.org/wiki/' + tempMatchTeam2 + '_FC';
        // console.log('match2Team1Url', matchTeam2Url);

        let match1Image = "";
        // let match2Image = "";

        request(matchTeam1Url, function (error, response, html) {
            if (!error) {
                let $ = cheerio.load(html);
                
                // Match info
                $('.infobox').filter(function () {
                    let data = $(this);

                    let tempMatch1Image = data.find("img").eq(0).attr("src");
                    match1Image = "https:" + tempMatch1Image;
                })
                console.log("match1Image", match1Image);
                res.send(match1Image)
                // console.log("matches loop", matches);
            } else {
                res.sendStatus(201);
            }
        });

        // request(matchTeam2Url, function (error, response, html) {
        //     if (!error) {
        //         let $ = cheerio.load(html);

        //         // Match info
        //         $('.infobox').filter(function () {
        //             let data = $(this);

        //             let tempMatch2Image = data.find("img").eq(0).attr("src");
        //             match2Image = "https:" + tempMatch2Image;
        //         })
        //         console.log("match2Image", match2Image);
        //         // console.log("matches loop", matches);
        //     } else {
        //         res.sendStatus(201);
        //     }
        // });
        // console.log("Matches after request -->", match1Image, match2Image);
        // let thisMatch = new Images(i, match1Image, match2Image);
        // console.log("thisMatch", thisMatch);
    // } 
    // res.send(match1Image)
// }
})

// Exports 
module.exports = router;