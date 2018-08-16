import React from 'react';
import TableTeam from './TableTeam';
import axios from 'axios';

export default class TableCard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('In componentDidMount');
        this.fetchTable();
    }

    fetchTable() {
        console.log('In fetchTable');
        axios(`table`)
            .then(table => console.log('table data', table))
            .catch(error => error);
    }

    render () {
        return <div></div>
    }
}