import React from 'react';
import axios from 'axios';

export default class TeamImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logo: null
        }

        this.fetchTeamImage = this.fetchTeamImage.bind(this);
    }

    componentDidMount() {
        this.fetchTeamImage();
    }

    fetchTeamImage() {
        axios.get(`/matches/images`, {
            params: {
                team: this.props.name
            }
        }).then(logo => {
            this.setState({logo: logo.data})
        }).catch(error => error);
    }

    render() {
        if (this.state.logo) {
            return (
                <img 
                    src={this.state.logo.imageUrl} 
                    alt={this.props.name}
                    className={this.props.className}
                />
            )
        } else {
            return <div></div>
        }
        
    }
}