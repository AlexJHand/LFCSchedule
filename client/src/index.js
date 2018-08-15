import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Header from './components/Header';

ReactDOM.render(
    // <App />, 
    <BrowserRouter >
        <Route path="/" component={Header}>
        
        </Route>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();

// Updates the page contents without performing a page refresh
if (module.hot) {
    module.hot.accept();
}
