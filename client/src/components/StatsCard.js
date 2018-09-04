import React from 'react';
import { Route, Switch } from 'react-router-dom'; 

import AssistsTable from './AssistsTable';
import GoalsTable from './GoalsTable';
import StatsNav from './StatsNav';
import CleanSheetsTable from './CleanSheetsTable';

const StatsMain = () => (
    <main>
        <Switch>
            <Route exact path='/stats' component={GoalsTable} />
            <Route path='/stats/assists' component={AssistsTable} />
            <Route path='/stats/cleansheets' component={CleanSheetsTable} />
        </Switch>
    </main>
)

export default class StatsCard extends React.Component {
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