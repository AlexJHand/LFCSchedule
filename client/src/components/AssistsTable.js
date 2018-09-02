import React from 'react';
import axios from 'axios';

export default class AssistsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assistLeaders: null
        }

        this.fetchAssistLeaders = this.fetchAssistLeaders.bind(this);
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
        console.log(this.state.assistLeaders);
        
        return (
            <div></div>
        )
    }
}