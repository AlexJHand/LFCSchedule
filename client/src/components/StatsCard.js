import React from 'react';
import axios from 'axios';

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
            <div></div>
        )
    }
}