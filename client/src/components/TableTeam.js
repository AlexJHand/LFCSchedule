import React from 'react';
import TeamImage from './TeamImage';

export default class TableTeam extends React.Component {
    constructor(props) {
        super(props);

        this.checkClass = this.checkClass.bind(this);
    }

    checkClass() {
        if (parseInt(this.props.position, 10) === 1) {
            return 'winnersSpot ';
        } else if (parseInt(this.props.position, 10) > 1 && parseInt(this.props.position, 10) < 5) {
            return 'clSpot ';
        } else if (parseInt(this.props.position, 10) === 5) {
            return 'elSpot ';
        } else if (parseInt(this.props.position, 10) > 17) {
            return 'relSpot ';
        } else {
            return "";
        }
    }
    
    render () {
        return (
            <tr className={this.checkClass() + "tableTeam"}>
                <td className='positionColumn'>{this.props.position}</td>
                <td className='logoColumn'>
                    <TeamImage
                        key={this.props.position}
                        name={this.props.name}
                        className='teamTableImage'
                    />
                </td>
                <td className='teamColumn'>{this.props.name}</td>
                <td className='playedColumn'>{this.props.played}</td>
                <td className='wonColumn'>{this.props.won}</td>
                <td className='drawnColumn'>{this.props.drawn}</td>
                <td className='lostColumn'>{this.props.lost}</td>
                <td className='gfColumn'>{this.props.gf}</td>
                <td className='gaColumn'>{this.props.ga}</td>
                <td className='gdColumn'>{this.props.gd}</td>
                <td className='pointsColumn'>{this.props.points}</td>
            </tr>
        )
    }
}