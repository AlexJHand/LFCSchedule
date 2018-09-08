import React from 'react';
import axios from 'axios';

import AssistLeaders from './AssistLeaders';

export default class AssistsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assistLeaders: null
        }

        this.buildAssistsTable = this.buildAssistsTable.bind(this);
        this.fetchAssistLeaders = this.fetchAssistLeaders.bind(this);
    }

    buildAssistsTable() {
        console.log('In buildAssistsTable');
        console.log('this.state.assistLeaders', this.state.assistLeaders);


        let assistsTableArray = [];

        for (let i = 0; i < this.state.assistLeaders.length; i++) {

            assistsTableArray.push(<AssistLeaders
                key={i}
                rank={this.state.assistLeaders[i].rank}
                name={this.state.assistLeaders[i].name}
                team={this.state.assistLeaders[i].team}
                assists={this.state.assistLeaders[i].assists}
            />)

        }
        return assistsTableArray;
    }

    componentDidMount() {
        this.fetchAssistLeaders();
    }

    fetchAssistLeaders() {
        console.log('In fetchAssistLeaders');
        axios(`/stats/assists`)
            .then(assistLeaders => this.setState({ assistLeaders: assistLeaders.data }))
            .catch(error => error);
    }

    render() {
        const assistsTableArray = (this.state || []);
        console.log('assistsTableArray', assistsTableArray);

        if (assistsTableArray.assistLeaders) {
            return (
                <div>
                    <div className="cardHeader"><span className="cardHeaderSpan">Assist Leaders Table</span></div>
                    <table className="statsTable assistsTable">
                        <thead>
                            <tr>
                                <th className='rankAssistsColumn'>Rank</th>
                                <th className='nameAssistsColumn'>Name</th>
                                <th className='teamAssistsColumn'>Team</th>
                                <th className='assistsScoredColumn'>Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.buildAssistsTable()}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}