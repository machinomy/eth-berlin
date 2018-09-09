import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PeerDuck from './PeerDuck';
import Ingrid from './Ingrid';
import registerServiceWorker from './registerServiceWorker';

setTimeout(() => {
    if (window.location.href.match('ingrid')) {
        ReactDOM.render(<Ingrid />, document.getElementById('root'));
    } else {
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    registerServiceWorker();
}, 500)
