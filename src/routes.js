import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

export default (
	<Switch>
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/posts" component={Posts} />
		<Route path="/form" component={Form} />
		<Route exact path="/" component={Auth} />
	</Switch>
);
