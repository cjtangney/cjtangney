import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
		<Router hashType='slash' basename={process.env.PUBLIC_URL}>
			<App />
		</Router>, document.getElementById('root'));
