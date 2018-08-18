import React from 'react';
import TeamImage from './TeamImage';

export default class TableTeam extends React.Component {
    render () {
        return (
            <tr className="tableTeam">
                <td className='position'>{this.props.position}</td>
                <td className='teamName'>
                    <TeamImage
                        key={this.props.position}
                        name={this.props.name}
                    />
                    {this.props.name}
                </td>
                <td className='played'>{this.props.played}</td>
                <td className='won'>{this.props.won}</td>
                <td className='drawn'>{this.props.drawn}</td>
                <td className='lost'>{this.props.lost}</td>
                <td className='gf'>{this.props.gf}</td>
                <td className='ga'>{this.props.ga}</td>
                <td className='gd'>{this.props.gd}</td>
                <td className='points'>{this.props.points}</td>
            </tr>
        )
    }
}