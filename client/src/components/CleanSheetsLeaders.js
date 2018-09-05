import React from 'react';

export default class CleanSheetsLeaders extends React.Component {
    render() {
        return (
            <tr className="cleanSheetsLeader">
                <td className="cleanSheetsRank">{this.props.rank}</td>
                <td className="cleanSheetsName">{this.props.name}</td>
                <td className="cleanSheetsTeam">{this.props.team}</td>
                <td className="cleanSheetsAchieved">{this.props.cleanSheets}</td>
            </tr>
        )
    }
}