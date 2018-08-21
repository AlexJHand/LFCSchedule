import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
            <div className='navBar'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/table'>Table</Link></li>
                </ul>
            </div>
        )
    }
}