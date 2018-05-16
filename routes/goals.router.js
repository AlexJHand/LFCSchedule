// // Requires
const router = require('express').Router();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

class ScorersClass {
    constructor(name, team, goals) {
        this.name = name,
        this.team = team,
        this.goals = goals
    }
}

router.get('/', function(req, res) {
    url = 'https://www.premierleague.com/stats';
})

// Exports 
module.exports = router;