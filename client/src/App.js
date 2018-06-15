import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // matches: null
      matches: null
    };
    this.fetchNextMatches = this.fetchNextMatches.bind(this);
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
      .catch(error => error)
  }

  setNextMatches(matches) {
    console.log('matches', matches);
    this.setState({matches: {matches}});
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
