import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
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
    switch(comp) {
      case 'Premier League':
        return <img className="matchesCompLogo" src="./images/premier-league-logo-png-transparent.png" />;
      case 'FA Cup':
        return <img className="matchesCompLogo" src="./images/fa-cup.jpg" />;
      case 'Carabao Cup':
        return <img className="matchesCompLogo" src="./images/carabao-cup.jpeg" />;
      case 'Champions League':
        return <img className="matchesCompLogo" src="./images/champions-league.png" />;
      case 'Europa League':
        return <img className="matchesCompLogo" src="./images/Uefa_europa_league.png" />;
      case 'International Champions Cup':
        return <img className="matchesCompLogo" src="./images/international-champions-cup.jpg" />;
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
      .then(images => this.setState({image1: images.data}))
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
    this.setState({matches: {matches}})
    console.log("this.state", this.state);
    
  }

  render() {
    const {matches} = this.state;
    const list = (matches || []);
    const image1 = this.state.image1;
    const image2 = this.state.image2;
    const image3 = this.state.image3;
    const image4 = this.state.image4;
    
    console.log('matches in render', matches);
    console.log('this.state in render', this.state);
    console.log("list", list.matches);
    
    if (list.matches) {
      return (
        <div className="container">
          <div className="header">
            <span className="headerSpan"></span><img className="headerImage" src="http://b.thumbs.redditmedia.com/tOE7DOLFnhzUYjaDyNjt-aVCCFuLCNaKuqiKFQID0wI.png" />
            <div className="headerTitle">Liverpool FC Dashboard</div>
          </div>
          <div className="card">
            <div className="matchesHeader"><span className="matchesHeaderSpan">Upcoming Matches</span></div>
            <div className="matches">
              <div key={list.matches[0].objId} className="match1 matchCard">
                <div className="matchOneImages matchImages">
                  {image1
                    
                    ? <img src={image1.imageUrl} alt={list.matches[0].team1} className="teamLogo"/>
                    : <span></span>
                  }
                  
                  <span className="vs">vs. </span>
                  
                  {image2
                    ? <img src={image2.imageUrl} alt={list.matches[0].team2} className="teamLogo" />
                    : <span></span>
                  }
                </div>
                <div className="matchInfo matchOneInfo">
                  <div className="matchTeams">
                    <span>{list.matches[0].team1} </span>
                    <span>vs. </span>
                    <span>{list.matches[0].team2} </span>
                  </div>
                  
                  <div className="matchesComp">{this.displayCompetitionImage(list.matches[0].competition)}</div>
                  <div className="matchesWhen">{list.matches[0].when} </div>
                </div>
              </div>
              <div key={list.matches[1].objId} className="match2 matchCard">
                <div className="matchTwoImages matchImages">
                  {image3
                    ? <img src={image3.imageUrl} alt={list.matches[1].team1} className="teamLogo"/>
                    : <span></span>
                  }
                  
                  <span className="vs">vs. </span>
                  
                  {image4
                    ? <img src={image4.imageUrl} alt={list.matches[1].team1} className="teamLogo"/>
                    : <span></span>
                  }
                </div>
                <div className="matchInfo matchTwoInfo">
                  <div className="matchTeams">
                    <span>{list.matches[1].team1} </span>
                    <span>vs. </span>
                    <span>{list.matches[1].team2} </span>
                  </div>
                  
                  <div className="matchesComp">{this.displayCompetitionImage(list.matches[0].competition)}</div>
                  <div className="matchesWhen">{list.matches[1].when} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}

export default App;
