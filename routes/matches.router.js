// Requires
const router = require('express').Router();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const daylightJSON = require('../daylight-savings.json');
const britishSummerJSON = require('../british-summer-time.json');

// Array of teams whose Wikipedia page doesn't redirect them with an '_FC' added to the url
// const teamExceptions = ['Borussia Dortmund', 'Bournemouth'];
const teamExceptions = [
    {name: 'Borussia Dortmund', replacement: 'Borussia Dortmund', useSecondImage: false},
    {name: 'Bournemouth', replacement: 'AFC Bournemouth', useSecondImage: false},
    {name: 'Brighton', replacement: 'Brighton & Hove Albion F.C.', useSecondImage: false},
    {name: 'Huddersfield Town', replacement: 'Huddersfield Town AFC', useSecondImage: true}
];

// Classes
class JsonClass {
    constructor(when, team1, team2, competition, objId) {
        this.when = when,
            this.team1 = team1,
            this.team2 = team2,
            this.competition = competition,
            this.objId = objId,
            this.team1Image = null
    }
};

class Images {
    constructor(imageUrl, objId) {
        this.imageUrl = imageUrl,
            this.objId = objId
    }
}

// function checkTimezones
checkTimezones = (gameDate, gameMonth, gameYear, timeZone) => {
    console.log('**************', timeZone);
    switch (timeZone) {
        case 'eastern':
            timeDifference = 5;
            break;
        case 'central':
            timeDifference = 6;
            break;
        case 'mountain':
            timeDifference = 7;
            break;
        case 'pacific':
            console.log('In pacific');
            timeDifference = 8;
            break;
        default:
            timeDifference = 6;
            break;
    }
    gameDate = parseInt(gameDate);
    gameYear = parseInt(gameYear);

    const currentDaylight = daylightJSON.find(entry => entry.year === gameYear);

    const currentBritTime = britishSummerJSON.find(entry => entry.year === gameYear);

    if (gameMonth === 'March' && gameDate >= currentDaylight.startDay && gameDate < currentBritTime.startDay) {
        console.log('Daylight savings but not British Summer time');
        // timeDifference = 7;
        timeDifference += 1;
    } else if ((gameMonth === 'October' && gameDate >= currentBritTime.endDay) || (gameMonth === 'November' && gameDate < currentDaylight.endDay)) {
        console.log('Daylight savings but not British Summer time');
        // timeDifference = 7;
        timeDifference += 1;
    } else {
        console.log('Standard time difference.');
    }
    return timeDifference;
}


// function convertToCentralTime(liverpoolDateTime) {
convertToCentralTime = (liverpoolDateTime, timeZone) => {
    let liverpoolSplit = liverpoolDateTime.split(" ");

    let liverpoolHours = liverpoolSplit.shift();

    let timeDifference = checkTimezones(liverpoolSplit[liverpoolSplit.length - 3], liverpoolSplit[liverpoolSplit.length - 2], liverpoolSplit[liverpoolSplit.length - 1], timeZone);
    console.log('*************** timeDifference', timeDifference);

    liverpoolHours = liverpoolHours.split(":");

    let convertedHours = parseInt(liverpoolHours) - timeDifference;

    let meridiem = '';
    if (convertedHours >= 12) {
        if (convertedHours > 12) {
            convertedHours -= 12;
        }
        meridiem = "PM";
    } else {
        meridiem = "AM";
    }

    liverpoolSplit.unshift(meridiem);

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
    let timeZone = req.query.timeZone
    console.log('IN GET', timeZone);
    url = 'http://www.liverpoolfc.com/match/2017-18/first-team/fixtures-and-results';
    let matches = []

    request(url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            // Match info
            $('.next-match').filter(function () {
                let data = $(this);

                match1When = data.find("p").first().text()

                match1When = match1When.trim();
                match1When = convertToCentralTime(match1When, timeZone);

                match1Team1 = data.find("img").eq(0).attr("title");
                match1Team2 = data.find("img").eq(1).attr("title");
                
                match1CompLogo = null;

                if (data.find("div").eq(2).attr("class") === "comp-logo") {
                    match1Competition = data.find(".comp-logo").eq(0).attr("title");
                    match1CompLogo = true;
                    console.log('---> comp-logo');
                } else {
                    match1Competition = data.find("span").eq(1).text();
                    match1CompLogo = false;
                    console.log('---> not comp-logo');
                }
                
                match1ObjId = 0;

                match2When = data.find("p").last().text();

                match2When = match2When.trim();
                match2When = convertToCentralTime(match2When, timeZone);

                match2Team1 = data.find("img").eq(2).attr("title");
                match2Team2 = data.find("img").eq(3).attr("title");

                if (match1CompLogo === true) {
                    if (data.find("div").eq(5).attr("class") === "comp-logo") {
                        match2Competition = data.find(".comp-logo").eq(1).attr("title");
                        console.log('---> comp-logo');
                    } else {
                        match2Competition = data.find("span").eq(2).text();
                        console.log('---> not comp-logo');
                    }
                } else {
                    if (data.find("div").eq(4).attr("class") === "comp-logo") {
                        match2Competition = data.find(".comp-logo").eq(1).attr("title");
                        console.log('---> comp-logo');
                    } else {
                        match2Competition = data.find("span").eq(3).text();
                        console.log('---> not comp-logo');
                    }
                }
                
                
                match2ObjId = 1;

                let match1 = new JsonClass(match1When, match1Team1, match1Team2, match1Competition, match1ObjId);
                let match2 = new JsonClass(match2When, match2Team1, match2Team2, match2Competition, match2ObjId);

                console.log('**************', match2);

                matches.push(match1, match2);

                res.send(matches);
            });
        } else {
            res.sendStatus(201);
        }
    })
});

router.get('/images', function (req, res) {
    let team = req.query.team;
    let imageKey = req.query.key;
    console.log("In images.", team);

    let exception = false;
    let secondImage = false;
    for (let i = 0; i < teamExceptions.length; i++) {
        if (teamExceptions[i].name === team) {
            team = teamExceptions[i].replacement;
            exception = true;
            console.log('exception', exception);
            if (teamExceptions[i].useSecondImage === true) {
                secondImage = true;
            }
            break;
        }   
    }

    let tempMatchTeam1 = team.replace(' ', '_');
    let matchTeam1Url = 'https://en.wikipedia.org/wiki/' + tempMatchTeam1;

    if (exception === true) {
        // matchTeam1Url = 
        console.log('match1Team1Url', matchTeam1Url);
    } else if (team.slice(-2) === 'FC') {
        console.log('match1Team1Url', matchTeam1Url);
    } else {
        matchTeam1Url += '_FC';
        console.log('match1Team1Url', matchTeam1Url);
    }

    let match1Image = "";

    request(matchTeam1Url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);
            let bodyContentBold = "";
            $('#noarticletext').filter(function() {

                bodyContentBold = $(this);
                let notFoundText = bodyContentBold.find("b").eq(1).text();
                console.log('bodyContentBold--->', notFoundText);

                if (notFoundText === "Wikipedia does not have an article with this exact name.") {
                    console.log("In bodyContentBold");
                }
            })
            // Match info
            $('#bodyContent').filter(function () {
                let data = $(this);
                let tempMatch1Image = '';

                if (secondImage) {
                    tempMatch1Image = data.find("img").eq(1).attr("src");
                } else {
                    tempMatch1Image = data.find("img").eq(0).attr("src");
                }
                match1Image = "https:" + tempMatch1Image;
            })
            imageObj = new Images(match1Image, imageKey);
            console.log("imageObj", imageObj);
            res.send(imageObj)
        } else {
            res.sendStatus(201);
        }
    });
})

// Exports 
module.exports = router;