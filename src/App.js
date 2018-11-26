import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import routes from './routes';
// import Nav

import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>{routes}</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
