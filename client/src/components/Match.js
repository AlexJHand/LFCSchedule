import React from 'react';
import TeamImage from './TeamImage';

export default class Match extends React.Component {

    render() {

        return (
            <div className="matchCard">
                <div className="matchImages">
                    {this.props.list.team1

                        ? <TeamImage key={this.props.team1} name={this.props.list.team1}/>
                        : <span></span>
                    }

                    <span className="vs">vs. </span>

                    {this.props.list.team2
                        ? <TeamImage key={this.props.team2} name={this.props.list.team2} />
                        : <span></span>
                    }
                </div>
                <div className="matchInfo">
                    <div className="matchTeams">
                        <span>{this.props.list.team1} </span>
                        <span>vs. </span>
                        <span>{this.props.list.team2} </span>
                    </div>

                    <div className="matchesComp">{this.props.comp}</div>
                    <div className="matchesWhen">{this.props.list.when} </div>
                </div>
            </div>
        )
    }
}