import React from 'react';
import axios from 'axios';

export default class CleanSheetsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cleanSheetLeaders: null
        }

        this.fetchCleanSheetLeaders = this.fetchCleanSheetLeaders.bind(this);
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
        return(
            <div></div>
        )
    }
}