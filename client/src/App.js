import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: null,
      images: []
    };
    this.fetchNextMatches = this.fetchNextMatches.bind(this);
    this.fetchNextMatchesImages = this.fetchNextMatchesImages.bind(this);
    this.setNextMatches = this.setNextMatches.bind(this);
  }

  componentDidMount() {
    // const {matches} = this.state;
    console.log('In componentDidMount');
    
    this.fetchNextMatches()
    // this.setState({matches});
  }

  fetchNextMatches() {
    axios(`/matches`)
      .then(matches => this.setNextMatches(matches.data))
      // .then(matches => this.fetchNextMatchesImages(matches.data))
      // .then(matches => this.setNextMatches(matches.data))
      .catch(error => error)
  }

  fetchNextMatchesImages(matches) {
    console.log("In fetchNextMatchesImages");
    let tempImages = [];
    
    for (let i = 0; i < matches.length; i++) {
      axios.get(`/matches/images`, {
        params: {
          team: matches[i].team1
        }
      })
        // .then(image => tempImages.push(image.data))
        .then(images => this.setNextImages(images.data))
        .catch(error => error)
      axios.get(`/matches/images`, {
        params: {
          team: matches[i].team2
        }
      })
        // .then(image => tempImages.push(image.data))
        // .then(tempImages => this.setNextImages(tempImages))
        .then(images => this.setNextImages(images.data))
        .catch(error => error)
    }
  }

  setNextImages(images) {
    console.log("images", images);
    
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
    console.log('matches in render', matches);
    console.log('this.state in render', this.state);
    console.log("list", list.matches);
    
    if (list.matches) {
      return (
        <div className="page">
          {list.matches.map(game =>
            <div key={game.objId}>
              <span>{game.team1} </span>
              <span>vs. </span>
              <span>{game.team2} </span>
              <span>{game.when} </span>
              <span>{game.competition}</span>
            </div>
          )}
        </div>
      );
    } else {
      return (<div></div>)
    }
    
  }
}

export default App;
