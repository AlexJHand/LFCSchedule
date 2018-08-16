import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    // <App />, 
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();

// Updates the page contents without performing a page refresh
if (module.hot) {
    module.hot.accept();
}
