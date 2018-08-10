import React from 'react';
import Match from './Match';

export default class MatchesCard extends React.Component {

    render() {
        
        return (
            <div className="matches">
                <Match 
                    key={this.props.list.matches[0].objId}
                    list={this.props.list.matches[0]}
                    image1={this.props.image1}
                    image2={this.props.image2}
                    comp={this.props.comp1}
                />
                <Match 
                    key={this.props.list.matches[1].objId} 
                    list={this.props.list.matches[1]}
                    image1={this.props.image3}
                    image2={this.props.image4}
                    comp={this.props.comp2}
                />
            </div>
        );
    }
}