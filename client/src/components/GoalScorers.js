import React from 'react';

export default class GoalScorers extends React.Component {
    render() {
        return (
            <tr className="goalScorer">
                <td className="goalsRank">{this.props.rank}</td>
                <td className="goalsName">{this.props.name}</td>
                <td className="goalsTeam">{this.props.team}</td>
                <td className="goalsScored">{this.props.goals}</td>
            </tr>
        )
    }
}