import React from 'react';

export default class GoalScorers extends React.Component {
    render() {
        return (
            <tr className="goalScorer">
                <td className="goalsRank">{this.props.rank}</td>
                <td className="nameStatsColumn">{this.props.name}</td>
                <td className="teamStatsColumn">{this.props.team}</td>
                <td className="goalsScored">{this.props.goals}</td>
            </tr>
        )
    }
}