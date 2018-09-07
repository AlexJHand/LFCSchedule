import React from 'react'; 
import { NavLink } from 'react-router-dom';

export default class StatsNav extends React.Component {
    render () {
        return (
            <div className='statsNav'>
                    <NavLink  className='statsNavLink' exact={true} activeClassName='selectedStatsLink' to='/stats'>Goals</NavLink>
                    <NavLink  className='statsNavLink' activeClassName='selectedStatsLink' to='/stats/assists'>Assists</NavLink>
                    <NavLink  className='statsNavLink' activeClassName='selectedStatsLink' to='/stats/cleansheets'>Clean Sheets</NavLink>
            </div>
        )
    }
}