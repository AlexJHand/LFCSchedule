import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
// import axios from 'axios';
import './App.css';

import Header from './components/Header';
import MatchesCard from './components/MatchesCard';
import Nav from './components/Nav';
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
        <Nav />
        <div className="card">
          <Main />
        </div>
      </div>
    );
    
  }
}

export default App;
