import React from 'react';
import TeamImage from './TeamImage';

export default class TableTeam extends React.Component {
    render () {
        return (
            <tr className="tableTeam">
                <td className='position'>{this.props.position}</td>
                <td className='image'>
                    <TeamImage
                        key={this.props.position}
                        name={this.props.name}
                    />
                </td>
                <td className='teamName'>{this.props.name}</td>
                <td className='points'>{this.props.points}</td>
            </tr>
        )
    }
}