// // Requires
const router = require('express').Router();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

class GoalsClass {
    constructor(rank, name, team, nationality, goals) {
        this.rank = rank,
        this.name = name,
        this.team = team,
        this.nationality = nationality,
        this.goals = goals
    }
}

class AssistsClass {
    constructor(rank, name, team, nationality, assists) {
        this.rank = rank,
        this.name = name,
        this.team = team,
        this.nationality = nationality,
        this.assists = assists
    }
}

class CleanSheetsClass {
    constructor(rank, name, team, nationality, cleanSheets) {
        this.rank = rank,
        this.name = name,
        this.team = team,
        this.nationality = nationality,
        this.cleanSheets = cleanSheets
    }
}

const teamSwitch = (team) => ({
    "ARS": "Arsenal",
    "BOU": "Bournemouth",
    "BHA": "Brighton and Hove Albion",
    "BUR": "Burnley",
    "CC": "Cardiff City",
    "CHE": "Chelsea",
    "CRY": "Crystal Palace",
    "EVE": "Everton",
    "FUL": "Fulham",
    "HUD": "Huddersfield Town",
    "LEI": "Leicester City",
    "LIV": "Liverpool",
    "MCI": "Manchester City",
    "MUN": "Manchester United",
    "NEW": "Newcastle United",
    "SOU": "Southampton",
    "TOT": "Tottenham Hotspur",
    "WAT": "Watford",
    "WHU": "West Ham United",
    "WLV": "Wolverhampton Wanderers"
})[team]

router.get('/assists', function(req, res) {
    url = 'https://www.worldfootball.net/assists/eng-premier-league-2018-2019/';

    request(url, function(error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            // $('.statsTable').filter(function() {
            $('.standard_tabelle').filter(function () {
                let data = $(this);
                console.log('All data', data.text());

                for (let i = 0; i < data.find("tr").length; i++) {
                    $(`tr`).eq(i).filter(function () {
                        let data = $(this);
                        console.log("data", data.find("a").eq(0).text());
                    })
                    
                }
            })
        }
        res.sendStatus(200);
    })
});

router.get('/goals', function(req, res) {
    console.log('In /goals');
    url = 'https://scores.nbcsports.com/epl/player_leaders.asp?category=202';

    request(url, function(error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            $('.shsTable').filter(function () {
                let data = $(this);
                let scorersArray = [];

                for (let i = 3; i < 23; i++) {
                    $(`tr`).eq(i).filter(function () {
                        let data = $(this);
                        
                        rank = null;
                        name = data.find("a").text().slice(0, -3);
                        team = data.find("a").eq(1).text();
                        nationality = null;
                        goals = data.find("td").eq(4).text();

                        teamLong = teamSwitch(team);

                        let scorer = new GoalsClass(rank, name, teamLong, nationality, goals);
                        console.log("Scorer", scorer);
                        scorersArray.push(scorer);
                    })
                    
                }
                res.send(scorersArray);
            })
        }
    })
})

// Exports 
module.exports = router;