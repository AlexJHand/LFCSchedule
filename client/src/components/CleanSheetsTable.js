import React from 'react';
import axios from 'axios';

import CleanSheetLeaders from './CleanSheetsLeaders';

export default class CleanSheetsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cleanSheetLeaders: null
        }

        this.buildCleanSheetsTable = this.buildCleanSheetsTable.bind(this);
        this.fetchCleanSheetLeaders = this.fetchCleanSheetLeaders.bind(this);
    }

    buildCleanSheetsTable() {
        console.log('In cleanSheetsTable');
        console.log('this.state.cleanSheetLeaders', this.state.cleanSheetLeaders);


        let cleanSheetsTableArray = [];

        for (let i = 0; i < this.state.cleanSheetLeaders.length; i++) {

            cleanSheetsTableArray.push(<CleanSheetLeaders
                key={i}
                rank={this.state.cleanSheetLeaders[i].rank}
                name={this.state.cleanSheetLeaders[i].name}
                team={this.state.cleanSheetLeaders[i].team}
                cleanSheets={this.state.cleanSheetLeaders[i].cleanSheets}
            />)

        }
        return cleanSheetsTableArray;
    }

    componentDidMount() {
        this.fetchCleanSheetLeaders();
    }

    fetchCleanSheetLeaders() {
        console.log('In fetchCleanSheetLeaders');
        axios(`/stats/cleanSheets`)
            .then(cleanSheetLeaders => this.setState({cleanSheetLeaders: cleanSheetLeaders.data}))
            .catch(error => error);
    }
    
    render() {
        const cleanSheetsTableArray = (this.state || []);
        console.log('cleanSheetsTableArray', cleanSheetsTableArray);
        
        if (cleanSheetsTableArray.cleanSheetLeaders) {
            return (
                <div>
                    <div className="cardHeader"><span className="cardHeaderSpan">Clean Sheet Leaders Table</span></div>
                    <table className="statsTable cleanSheetsTable">
                        <thead>
                            <tr>
                                <th className='rankSheetsColumn'>Rank</th>
                                <th className='nameSheetsColumn'>Name</th>
                                <th className='teamSheetsColumn'>Team</th>
                                <th className='cleanSheetsScoredColumn'>Clean Sheets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.buildCleanSheetsTable()}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}