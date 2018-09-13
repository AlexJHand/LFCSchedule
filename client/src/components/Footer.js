import React from 'react';

export default class Footer extends React.Component {
    render () {
        return (
            <div className="footer">
                <p className="copyright">&copy;2018 Alex J Hand </p>
                <p className="contact">For contact information visit: <a  className="contactLink" href='http://www.alexjhand.com'>AlexJHand.com</a></p>
            </div>
        )
    }
}