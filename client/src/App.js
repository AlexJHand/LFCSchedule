import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: null,
      images: null,
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
    // let tempImages = [];
    
    axios.get(`/matches/images`, {
      params: {
        team: matches[0].team1,
        key: 0
      }
    })
      // .then(image => tempImages.push(image.data))
      // .then(images => tempImages.push(images.data))
      // .then(images => this.setNextImages(tempImages))
      .then(images => this.setState({image1: images.data}))
      .catch(error => error)
      .then(
        axios.get(`/matches/images`, {
          params: {
            team: matches[0].team2,
            key: 1
          }
        })
          // .then(image => tempImages.push(image.data))
          // .then(tempImages => this.setNextImages(tempImages))
          // .then(images => tempImages.push(images.data))
          // .then(images => this.setNextImages(tempImages))
          .then(images => this.setState({ image2: images.data }))
          .catch(error => error))
          .then(
            axios.get(`/matches/images`, {
              params: {
                team: matches[1].team1,
                key: 2
              }
            })
              // .then(image => tempImages.push(image.data))
              // .then(images => tempImages.push(images.data))
              // .then(images => this.setNextImages(tempImages))
              .then(images => this.setState({ image3: images.data }))
              .catch(error => error))
              .then(
                axios.get(`/matches/images`, {
                  params: {
                    team: matches[1].team2,
                    key: 3
                  }
                })
                  // .then(image => tempImages.push(image.data))
                  // .then(tempImages => this.setNextImages(tempImages))
                  // .then(images => tempImages.push(images.data))
                  // .then(() => this.setNextImages(tempImages))
                  // .then(image => this.setState({image4: image}))
                  .then(images => this.setState({ image4: images.data }))
                  .catch(error => error))
  }

  // setNextImages(images) {
    
  //   // setTimeout(() => {
  //   //   console.log("setNextImages", images);
  //   //   images.sort(function (a, b) { return a.objId - b.objId });
  //   //   this.setState({ images: { images } });
  //   //   console.log("setNextImages sorted", images);
  //   // }, 500)
  //   // setTimeout(() => {
  //     console.log("setNextImages", images);
  //     let team1 = images.find(function (obj) { return obj.objId === "0"; });
  //     let team2 = images.find(function (obj) { return obj.objId === "1"; });
  //     let team3 = images.find(function (obj) { return obj.objId === "2"; });
  //     let team4 = images.find(function (obj) { return obj.objId === "3"; });
  //     console.log("team1", team1);
  //     // this.setState({ images: { images } });
  //     this.setState({
  //       image1: team1,
  //       image2: team2,
  //       image3: team3,
  //       image4: team4,
  //     }, () => {
  //       console.log('this.state  is: ', this.state)
  //     })
  //     console.log("setNextImages sorted", images);
  //     console.log("image1 -->", this.state.image1);
  //     console.log("image2 -->", this.state.image2);
  //     console.log("image3 -->", this.state.image3);
  //     console.log("image4 -->", this.state.image4);
      
  //   // }, 500)
  // }

  setNextMatches(matches) {
    this.fetchNextMatchesImages(matches)
    console.log('matches', matches);
    this.setState({matches: {matches}})
    console.log("this.state", this.state);
    
  }

  render() {
    const {matches} = this.state;
    const list = (matches || []);
    const imagesList = this.state.images;
    const image1 = this.state.image1;
    const image2 = this.state.image2;
    const image3 = this.state.image3;
    const image4 = this.state.image4;
    // let team1 = imagesList.images.find(function (obj) {return obj.objId === 1});
    // console.log("team1", team1);
    
    console.log('matches in render', matches);
    console.log('this.state in render', this.state);
    console.log("list", list.matches);
    console.log("imagesList", imagesList);
    
    if (list.matches) {
      return (
        <div className="page">
          <div key={list.matches[0].objId}>
            {image1
              // ? <img src={imagesList.images[0].imageUrl} alt={list.matches[0].team1} />
              ? <img src={image1.imageUrl} alt={list.matches[0].team1} />
              : <span></span>
            }
            <span>{list.matches[0].team1} </span>
            <span>vs. </span>
            
            {/* {imagesList && imagesList.images.length > 1 */}
            {/* {image2 ? (image2.team2 ? alert(JSON.stringify(image2.team2)+ ' is image2.team2') : (console.log(image2.team2, ' is image2.team2'), alert('image2.team2 is null? '+ JSON.stringify(image2.team2 === null)))) : null} */}
            {image2
              // ? <img src={imagesList.images[1].imageUrl} alt={list.matches[0].team2} />
              ? <img src={image2.imageUrl} alt={list.matches[0].team2} />
              : <span></span>
            }
            <span>{list.matches[0].team2} </span>
            <span>{list.matches[0].when} </span>
            <span>{list.matches[0].competition}</span>
          </div>
          <div key={list.matches[1].objId}>
            
            {/* {imagesList && imagesList.images.length > 2 */}
            {image3
              // ? <img src={imagesList.images[2].imageUrl} alt={list.matches[1].team1} />
              ? <img src={image3.imageUrl} alt={list.matches[1].team1} />
              : <span></span>
            }
            <span>{list.matches[1].team1} </span>
            <span>vs. </span>
            
            {/* {imagesList && imagesList.images.length > 3 */}
            {image4
              // ? <img src={imagesList.images[3].imageUrl} alt={list.matches[1].team2} />
              ? <img src={image4.imageUrl} alt={list.matches[1].team1} />
              : <span></span>
            }
            <span>{list.matches[1].team2} </span>
            <span>{list.matches[1].when} </span>
            <span>{list.matches[1].competition}</span>
          </div>
        </div>
      );
    } else {
      return (<div></div>)
    }
    
  }
}

export default App;
