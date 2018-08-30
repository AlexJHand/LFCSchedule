import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends React.Component {
    
    render() {
        return (
            <div className='navBar'>
                <div className='flexDiv'>
                    <NavLink exact={true} activeClassName='selectedLink' to='/'>Home</NavLink>
                    <NavLink activeClassName='selectedLink' to='/table'>Table</NavLink>
                    <NavLink activeClassName='selectedLink' to='/stats'>Stats</NavLink>
                </div>
            </div>
        )
    }
}