import React from 'react'; 
import { NavLink } from 'react-router-dom';

export default class StatsNav extends React.Component {
    render () {
        return (
            <div className='statsNav'>
                <div className='flexDiv'>
                    <NavLink exact={true} activeClassName='selectedStatsLink' to='/stats'>Goals</NavLink>
                    <NavLink activeClassName='selectedStatsLink' to='/stats/assists'>Assists</NavLink>
                    {/* <NavLink activeClassName='selectedLink' to='/stats'>Stats</NavLink> */}
                </div>
            </div>
        )
    }
}