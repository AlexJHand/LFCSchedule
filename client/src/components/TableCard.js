import React from 'react';
import TableTeam from './TableTeam';
import axios from 'axios';

export default class TableCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            table: null
        }
    }

    componentDidMount() {
        console.log('In componentDidMount');
        this.fetchTable();
    }

    fetchTable() {
        console.log('In fetchTable');
        axios(`table`)
            .then(table => this.setState({table: table.data}))
            .catch(error => error);
    }

    render () {
        const leagueTable = (this.state || [])
        console.log('leagueTable', leagueTable);
        

        if (leagueTable.table) {
            return (
                <table>
                    <tbody>
                        <TableTeam
                            key={leagueTable.table[0].position}
                            position={leagueTable.table[0].position}
                            name={leagueTable.table[0].name}
                            points={leagueTable.table[0].points}
                        />
                    </tbody>
                </table>
            )
        } else {
            return <div></div>
        }
    }
}