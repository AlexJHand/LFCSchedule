import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
// import axios from 'axios';
import './App.css';

import Header from './components/Header';
import MatchesCard from './components/MatchesCard';
import TableCard from './components/TableCard';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MatchesCard} />
      <Route path='/table' component={TableCard} />
    </Switch>
  </main>
)

class App extends Component {
  

  render() {

    
    return (
      <div className="container">
        <Header />
        <div className="card">
          <div className="matchesHeader"><span className="matchesHeaderSpan">Upcoming Matches</span></div>
          {/* <MatchesCard /> */}
          <Main />
        </div>
      </div>
    );
    
  }
}

export default App;
