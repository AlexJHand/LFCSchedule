// Requires
const router = require('express').Router();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');


// Classes
class TeamClass {
    constructor(name, position, won, drawn, lost, gf, ga, gd, points) {
        this.name = name,
        this.position = position,
        this.won = won,
        this.drawn = drawn,
        this.lost = lost,
        this.gf = gf,
        this.ga = ga,
        this.gd = gd,
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

                for (let i = 1; i < data.find("tr").length; i++) {
                    $(`tr`).eq(i).filter(function () {
                        let data = $(this);
                        if (data.find("td").eq(4).text() != "") {
                            name = data.find("span.long").text();
                            position = data.find("span.value").text();
                            played = data.find("td").eq(3).text();
                            won = data.find("td").eq(4).text();
                            drawn = data.find("td").eq(5).text();
                            lost = data.find("td").eq(6).text();
                            gf = data.find("td").eq(7).text();
                            ga = data.find("td").eq(8).text();
                            gd = data.find("td").eq(9).text();
                            gd = gd.trim();
                            points = data.find("td.points").text();

                            let team = new TeamClass(name, position, played, won, drawn, lost, gf, ga, gd, points)
                            // console.log("team", team);
                            table.push(team);
                        }
                    })
                }
                res.send(table);
            })
        }
    })    
})

module.exports = router;