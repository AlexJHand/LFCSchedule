import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'; 

import AssistsTable from './AssistsTable';
import GoalsTable from './GoalsTable';

const StatsMain = () => (
    <main>
        <Switch>
            <Route exact path='/stats' component={GoalsTable} />
            <Route path='/stats/assists' component={AssistsTable} />
            {/* <Route path='/stats' component={StatsCard} /> */}
        </Switch>
    </main>
)

export default class StatsCard extends React.Component {
    constructor(props) {
        super(props);

        this.fetchGoalScorers = this.fetchGoalScorers.bind(this);
    }

    componentDidMount() {
        console.log('In componentDidMount');

        this.fetchGoalScorers();
    }

    fetchGoalScorers() {
        axios(`/stats/goals`)
            .then(scorers => console.log('scorers', scorers))
            .catch(error => error);
    }

    render() {
        return (
            <StatsMain />
        )
    }
}