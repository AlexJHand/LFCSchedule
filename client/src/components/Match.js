import React from 'react';

export default class Match extends React.Component {

    render() {

        return (
            <div className="matchCard">
                <div className="matchImages">
                    {this.props.image1

                        ? <img src={this.props.image1.imageUrl} alt={this.props.list.matches[0].team1} className="teamLogo" />
                        : <span></span>
                    }

                    <span className="vs">vs. </span>

                    {this.props.image2
                        ? <img src={this.props.image2.imageUrl} alt={this.props.list.matches[0].team2} className="teamLogo" />
                        : <span></span>
                    }
                </div>
                <div className="matchInfo">
                    <div className="matchTeams">
                        <span>{this.props.list.matches[0].team1} </span>
                        <span>vs. </span>
                        <span>{this.props.list.matches[0].team2} </span>
                    </div>

                    <div className="matchesComp">{this.props.comp}</div>
                    <div className="matchesWhen">{this.props.list.matches[0].when} </div>
                </div>
            </div>
        )
    }
}