import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <span className="headerSpan"></span><img className="headerImage" src="http://b.thumbs.redditmedia.com/tOE7DOLFnhzUYjaDyNjt-aVCCFuLCNaKuqiKFQID0wI.png" />
                <div className="headerTitle">Liverpool FC Dashboard</div>
            </div>
        )
    }
}