import React from 'react';

export default class AssistLeaders extends React.Component {
    render() {
        return (
            <tr className="assistLeader">
                <td className="assistsRank">{this.props.rank}</td>
                <td className="nameStatsColumn">{this.props.name}</td>
                <td className="assistsTeam">{this.props.team}</td>
                <td className="assistsScored">{this.props.assists}</td>
            </tr>
        )
    }
}