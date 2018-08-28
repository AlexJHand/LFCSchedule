import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Nav extends React.Component {
    
    render() {
        return (
            <div className='navBar'>
                <div className='flexDiv'>
                {/* <div className='linkDiv'><Link exact={true} activeClassName='selectedLink' to='/'>Home</Link></div>
                <div className='linkDiv'><Link activeClassName='selectedLink' to='/table'>Table</Link></div> */}
                    {/* <div className='linkDiv'><NavLink  exact={true} activeClassName='selectedLink' to='/'>Home</NavLink></div>
                    <div className='linkDiv'><NavLink activeClassName='selectedLink' to='/table'>Table</NavLink></div> */}
                    <NavLink exact={true} activeClassName='selectedLink' to='/'>Home</NavLink>
                    <NavLink activeClassName='selectedLink' to='/table'>Table</NavLink>
                </div>
            </div>
        )
    }
}