import React from 'react';

export default class Match extends React.Component {

    render() {
        
        return (
            <div className="matches">
                <div key={this.props.list.matches[0].objId} className="match1 matchCard">
                    <div className="matchOneImages matchImages">
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
                    <div className="matchInfo matchOneInfo">
                        <div className="matchTeams">
                            <span>{this.props.list.matches[0].team1} </span>
                            <span>vs. </span>
                            <span>{this.props.list.matches[0].team2} </span>
                        </div>

                        <div className="matchesComp">{this.props.comp1}</div>
                        <div className="matchesWhen">{this.props.list.matches[0].when} </div>
                    </div>
                </div>
                <div key={this.props.list.matches[1].objId} className="match2 matchCard">
                    <div className="matchTwoImages matchImages">
                        {this.props.image3
                            ? <img src={this.props.image3.imageUrl} alt={this.props.list.matches[1].team1} className="teamLogo" />
                            : <span></span>
                        }

                        <span className="vs">vs. </span>

                        {this.props.image4
                            ? <img src={this.props.image4.imageUrl} alt={this.props.list.matches[1].team1} className="teamLogo" />
                            : <span></span>
                        }
                    </div>
                    <div className="matchInfo matchTwoInfo">
                        <div className="matchTeams">
                            <span>{this.props.list.matches[1].team1} </span>
                            <span>vs. </span>
                            <span>{this.props.list.matches[1].team2} </span>
                        </div>

                        <div className="matchesComp">{this.props.comp2}</div>
                        <div className="matchesWhen">{this.props.list.matches[1].when} </div>
                    </div>
                </div>
            </div>
        );
    }
}