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

router.get('/goals', function(req, res) {
    url = 'https://www.premierleague.com/stats/top/players/goals';

    request(url, function(error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            $('.statsTable').filter(function() {
                let data = $(this);

                console.log('data', data);
            })
        }
    })
})

// Exports 
module.exports = router;