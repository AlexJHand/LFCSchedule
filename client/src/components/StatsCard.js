import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'; 

import AssistsTable from './AssistsTable';
import GoalsTable from './GoalsTable';
import StatsNav from './StatsNav';

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
    }

    componentDidMount() {
        console.log('In componentDidMount');
    }

    render() {
        return (
            <div>
                <StatsNav />
                <StatsMain />
            </div>
        )
    }
}