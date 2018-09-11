import React from 'react';
import Match from './Match';
import axios from 'axios';

export default class MatchesCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: null,
            timeZone: 'central'
        };
        this.displayCompetitionImage = this.displayCompetitionImage.bind(this);
        this.fetchNextMatches = this.fetchNextMatches.bind(this);
        this.selectTimeZone = this.selectTimeZone.bind(this);
        this.setNextMatches = this.setNextMatches.bind(this);
    }

    componentDidMount() {
        console.log('In componentDidMount');

        this.fetchNextMatches()
    }

    displayCompetitionImage(comp) {
        switch (comp) {
            case 'Premier League':
                return <img className="matchesCompLogo" src="./images/premier-league-logo-png-transparent.png" alt="Premier League logo" />;
            case 'FA Cup':
                return <img className="matchesCompLogo" src="./images/fa-cup.jpg" alt="FA Cup logo" />;
            case 'Carabao Cup':
                return <img className="matchesCompLogo" src="./images/carabao-cup.jpeg" alt="Carabao Cup logo" />;
            case 'UEFA Champions League':
                return <img className="matchesCompLogo" src="./images/champions-league.png" alt="Champions League logo" />;
            case 'Europa League':
                return <img className="matchesCompLogo" src="./images/Uefa_europa_league.png" alt="Europa League logo" />;
            case 'International Champions Cup':
                return <img className="matchesCompLogo" src="./images/international-champions-cup.jpg" alt="International Champions Cup logo" />;
            default:
                return <span>Friendly</span>;
        }
    }

    fetchNextMatches() {
        axios(`/matches`)
            .then(matches => this.setNextMatches(matches.data))
            .catch(error => error)
    }

    selectTimeZone(event) {
        this.setState({
            timeZone: event.target.value
        })
        let selectedTZ = event.target.value;

        // axios({
        //     method: 'get',
        //     url: '/matches/timeZone',
        //     params: {
        //         timeZone: selectedTZ
        //     }
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        axios.get(`/matches/timeZone`, {
            params: {
                timeZone: selectedTZ
            }
        })
            .then(response => console.log(response))
            .catch(error => error);
        
    }

    setNextMatches(matches) {
        console.log('matches', matches);
        this.setState({ matches: { matches } })
        console.log("this.state", this.state);
    }


    render() {
        const { matches } = this.state;
        const list = (matches || []);

        console.log('matches in render', matches);
        console.log('this.state in render', this.state);
        console.log("list", list.matches);

        if (list.matches) {
            return (
                <div>
                    <div className="cardHeader">
                        <span className="cardHeaderSpan">Upcoming Matches</span>
                        <div>
                            <select name="timeZone" id="timeZone" value={this.state.timeZone} onChange={this.selectTimeZone}>
                                <option value="eastern">Eastern</option>
                                <option value="central">Central</option>
                                <option value="mountain">Mountain</option>
                                <option value="pacific">Pacific</option>
                            </select>    
                        </div>    
                    </div>
                    <div className="matches">
                    <Match
                        key={list.matches[0].objId}
                        list={list.matches[0]}
                        comp={this.displayCompetitionImage(list.matches[0].competition)}
                    />
                    <Match
                        key={list.matches[1].objId}
                        list={list.matches[1]}
                        comp={this.displayCompetitionImage(list.matches[1].competition)}
                    />
                    </div>
                </div>
            );
        } else {
            return (<div></div>)
        }


    }
}



