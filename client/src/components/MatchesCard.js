import React from 'react';
import Match from './Match';
import axios from 'axios';

// export default class MatchesCard extends React.Component {

//     render() {
        
//         return (
//             <div className="matches">
//                 <Match 
//                     key={this.props.list.matches[0].objId}
//                     list={this.props.list.matches[0]}
//                     image1={this.props.image1}
//                     image2={this.props.image2}
//                     comp={this.props.comp1}
//                 />
//                 <Match 
//                     key={this.props.list.matches[1].objId} 
//                     list={this.props.list.matches[1]}
//                     image1={this.props.image3}
//                     image2={this.props.image4}
//                     comp={this.props.comp2}
//                 />
//             </div>
//         );
//     }
// }
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

export default class MatchesCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: null,
            image1: null,
            image2: null,
            image3: null,
            image4: null
        };
        this.displayCompetitionImage = this.displayCompetitionImage.bind(this);
        this.fetchNextMatches = this.fetchNextMatches.bind(this);
        this.fetchNextMatchesImages = this.fetchNextMatchesImages.bind(this);
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
            case 'Champions League':
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

    fetchNextMatchesImages(matches) {
        console.log("In fetchNextMatchesImages");

        axios.get(`/matches/images`, {
            params: {
                team: matches[0].team1,
                key: 0
            }
        })
            .then(images => this.setState({ image1: images.data }))
            .catch(error => error)
            .then(
                axios.get(`/matches/images`, {
                    params: {
                        team: matches[0].team2,
                        key: 1
                    }
                })
                    .then(images => this.setState({ image2: images.data }))
                    .catch(error => error))
            .then(
                axios.get(`/matches/images`, {
                    params: {
                        team: matches[1].team1,
                        key: 2
                    }
                })
                    .then(images => this.setState({ image3: images.data }))
                    .catch(error => error))
            .then(
                axios.get(`/matches/images`, {
                    params: {
                        team: matches[1].team2,
                        key: 3
                    }
                })
                    .then(images => this.setState({ image4: images.data }))
                    .catch(error => error))
    }

    setNextMatches(matches) {
        this.fetchNextMatchesImages(matches)
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
                <div className="matches">
                    <Match
                        key={list.matches[0].objId}
                        list={list.matches[0]}
                        image1={this.state.image1}
                        image2={this.state.image2}
                        comp={this.displayCompetitionImage(list.matches[0].competition)}
                    />
                    <Match
                        key={list.matches[1].objId}
                        list={list.matches[1]}
                        image1={this.state.image3}
                        image2={this.state.image4}
                        comp={this.displayCompetitionImage(list.matches[1].competition)}
                    />
                </div>
            );
        } else {
            return (<div></div>)
        }


    }
}



