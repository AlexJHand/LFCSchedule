import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
            <div className='navBar'>
                <div className='flexDiv'>
                <div className='linkDiv'><Link to='/'>Home</Link></div>
                <div className='linkDiv'><Link to='/table'>Table</Link></div>
                </div>
            </div>
        )
    }
}