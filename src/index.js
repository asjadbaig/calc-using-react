import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css';

ReactDOM.render((


	<Router>
		<Switch>
	 		<Route exact path="/" component={App} />
  			<Route path="/:themeName" component={App} />
		</Switch>
  	</Router>

),
  document.getElementById('root'));
