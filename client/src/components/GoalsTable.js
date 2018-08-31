import React from 'react';
import axios from 'axios';

import GoalScorers from './GoalScorers';

export default class GoalsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goalLeaders: null
        }

        this.buildGoalsTable = this.buildGoalsTable.bind(this);
        this.fetchGoalLeaders = this.fetchGoalLeaders.bind(this);
    }

    buildGoalsTable() {
        console.log('In buildGoalsTable');
        console.log('this.state.goalLeaders', this.state.goalLeaders);


        let goalsTableArray = [];

        for (let i = 0; i < this.state.goalLeaders.length; i++) {

            goalsTableArray.push(<GoalScorers
                key={i}
                rank={this.state.goalLeaders[i].rank}
                name={this.state.goalLeaders[i].name}
                team={this.state.goalLeaders[i].team}
                goals={this.state.goalLeaders[i].goals}
            />)

        }
        return goalsTableArray;
    }

    componentDidMount() {
        console.log('In componentDidMount');
        this.fetchGoalLeaders();
    }

    fetchGoalLeaders() {
        console.log('In fetchGoalLeaders');
        axios(`/stats/goals`)
            .then(goalLeaders => this.setState({goalLeaders: goalLeaders.data}))
            .catch(error => error);
    }

    render() {
        const goalScorersTable = (this.state || []);
        console.log('goalScorersTable', goalScorersTable);
        

        if (goalScorersTable.goalLeaders) {
            return (
                <div>
                    <div className="cardHeader"><span className="cardHeaderSpan">Goal Leaders Table</span></div>
                    <table>
                        <thead>
                            <tr>
                                <th className='rankGoalsColumn'>Rank</th>
                                <th className='nameGoalsColumn'>Name</th>
                                <th className='teamGoalsColumn'>Team</th>
                                <th className='goalsGoalsColumn'>Goals</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.buildGoalsTable()}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}