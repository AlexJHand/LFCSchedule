// Requires
const router = require('express').Router();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');


// Classes
class TeamClass {
    constructor(name, position, points) {
        this.name = name,
        this.position = position,
        this.points = points
    }
}

// Get
router.get('/', function (req, res) {
    url = 'https://www.premierleague.com/tables';

    request(url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            $(`[data-ui-tab='First Team']`).filter(function () {
                let data = $(this);
                let table = []

                teams = data.find("span.long").length;
                console.log('teams', teams);

                for (let i = 0; i < data.find("span.long").length; i++) {
                    name = data.find("span.long").eq(i).text();
                    position = data.find("span.value").eq(i).text();
                    points = data.find("td.points").eq(i).text();

                    let team = new TeamClass(name, position, points)

                    table.push(team);
                }
                fs.writeFile('leagueTable.json', JSON.stringify(table, null, 4), function (err) {
                    console.log('File successfully written - check your project directory for the output.json file.');
                });
            })
        }
    })

    res.send('Check your console.');
})

module.exports = router;