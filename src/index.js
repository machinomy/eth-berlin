import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PeerDuck from './PeerDuck';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PeerDuck />, document.getElementById('root'));
registerServiceWorker();
