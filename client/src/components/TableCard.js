import React from 'react';
import TableTeam from './TableTeam';
import axios from 'axios';

export default class TableCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            table: null
        }
        this.buildTable = this.buildTable.bind(this);
        this.fetchTable = this.fetchTable.bind(this);
    }

    buildTable() {
        console.log('In buildTable');
        console.log('this.state.table', this.state.table);
        
        
        let tableArray = [];

        for (let i = 0; i < this.state.table.length; i++) {
            
            tableArray.push(<TableTeam
                key={this.state.table[i].position}
                position={this.state.table[i].position}
                name={this.state.table[i].name}
                played={this.state.table[i].played}
                won={this.state.table[i].won}
                drawn={this.state.table[i].drawn}
                lost={this.state.table[i].lost}
                gf={this.state.table[i].gf}
                ga={this.state.table[i].ga}
                gd={this.state.table[i].gd}
                points={this.state.table[i].points}
            />)
            
        }
        return tableArray;
    }

    componentDidMount() {
        console.log('In componentDidMount');
        this.fetchTable();
    }

    fetchTable() {
        console.log('In fetchTable');
        axios(`table`)
            .then(table => this.setState({table: table.data}))
            .catch(error => error)
    }

    render () {
        const leagueTable = (this.state || [])
        console.log('leagueTable', leagueTable);
        

        if (leagueTable.table) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th className='positionColumn'>Position</th>
                            <th className='logoColumn'>Team</th>
                            <th className='teamColumn'></th>
                            <th className='playedColumn'>Played</th>
                            <th className='wonColumn'>Won</th>
                            <th className='drawnColumn'>Drawn</th>
                            <th className='lostColumn'>Lost</th>
                            <th className='gfColumn'>GF</th>
                            <th className='gaColumn'>GA</th>
                            <th className='gdColumn'>GD</th>
                            <th className='pointsColumn'>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.buildTable()}
                    </tbody>
                </table>
            )
        } else {
            return <div></div>
        }
    }
}