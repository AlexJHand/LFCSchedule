import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends React.Component {
    
    render() {
        return (
            <div className='navBar'>
                <div className='flexDiv'>
                    <NavLink className='navBarLink' activeClassName='selectedLink' to='/' exact={true}>Home</NavLink>
                    <NavLink className='navBarLink' activeClassName='selectedLink' to='/table'>Table</NavLink>
                    <NavLink className='navBarLink' activeClassName='selectedLink' to='/stats'>Stats</NavLink>
                </div>
            </div>
        )
    }
}