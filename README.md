# LFC Schedule App
As a huge fan of Liverpool Football Club living in the Minnesota, I've found that the accuracy of various sports websites and apps is spotty at best when it comes to converting kick-off times to my local time. Since the games are generally quite early in the morning, it's very annoying to wake up an hour too early or too late to watch the match on tv.

This app goes [LiverpoolFC.com](http://www.liverpoolfc.com/match/2017-18/first-team/fixtures-and-results), and grabs the date and posted kick-off time of the next game, as well as who is playing, and what competition it is. The application then converts that time into Central time (taking Daylight Savings Time and British Summer Time into account, depending on the time of year). It also dynamically fetches the team logo from Wikipedia and displays all of the information on the page.

In addition to match times, it also goes to [PremierLeague.com](https://www.premierleague.com/tables), and collects the current Premier League table and all of the data regarding standings, wins/losses/draws, goal differences, and points.

## Built With
React.js, Node.js, Express.js, FS, Request, and Cheerio.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Clone these files to your local machine and make sure to install the required dependencies via Node.js.


### Prerequisites
- Node.js
- Dependencies
	- cheerio
	- express
	- fs
	- jest
	- request
	- react
	- react-dom

### Installing
After the dependencies are installed, use npm start to start the server, which will run on port 3000.  

## Next Steps
- Add some unit tests
- Deploy to Heroku
- Add league table
- Get Premier League goal scorers list
- Use react router to add goal scorers page

## Author
Alex Hand

## Acknowledgements
Thanks to Liverpool FC. YNWA