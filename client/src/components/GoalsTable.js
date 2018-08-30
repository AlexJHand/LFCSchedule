import React from 'react';
import axios from 'axios';

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

            // goalsTableArray.push(<TableTeam
            //     key={this.state.table[i].position}
            //     position={this.state.table[i].position}
            //     name={this.state.table[i].name}
            //     played={this.state.table[i].played}
            //     won={this.state.table[i].won}
            //     drawn={this.state.table[i].drawn}
            //     lost={this.state.table[i].lost}
            //     gf={this.state.table[i].gf}
            //     ga={this.state.table[i].ga}
            //     gd={this.state.table[i].gd}
            //     points={this.state.table[i].points}
            // />)

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
}