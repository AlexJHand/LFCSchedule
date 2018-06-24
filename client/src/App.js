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
    this.fetchNextMatches = this.fetchNextMatches.bind(this);
    this.fetchNextMatchesImages = this.fetchNextMatchesImages.bind(this);
    this.setNextMatches = this.setNextMatches.bind(this);
  }

  componentDidMount() {
    console.log('In componentDidMount');
    
    this.fetchNextMatches()
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
        <div className="page">
          <div key={list.matches[0].objId}>
            <div className="matchOneImages">
              {image1
                
                ? <img src={image1.imageUrl} alt={list.matches[0].team1} />
                : <span></span>
              }
              
              <span>vs. </span>
              
              {image2
                ? <img src={image2.imageUrl} alt={list.matches[0].team2} />
                : <span></span>
              }
            </div>
            <div className="matchOneInfo">
              <span>{list.matches[0].team1} </span>
              <span>vs. </span>
              <span>{list.matches[0].team2} </span>
              <span>{list.matches[0].when} </span>
              <span>{list.matches[0].competition}</span>
            </div>
          </div>
          <div key={list.matches[1].objId}>
            <div className="matchTwoImages">
              {image3
                ? <img src={image3.imageUrl} alt={list.matches[1].team1} />
                : <span></span>
              }
              
              <span>vs. </span>
              
              {image4
                ? <img src={image4.imageUrl} alt={list.matches[1].team1} />
                : <span></span>
              }
            </div>
            <div className="matchTwoInfo">
              <span>{list.matches[1].team1} </span>
              <span>vs. </span>
              <span>{list.matches[1].team2} </span>
              <span>{list.matches[1].when} </span>
              <span>{list.matches[1].competition}</span>
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
