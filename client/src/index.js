import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, indexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Reducers from './reducers/index';
import Authenticate from './components/auth/require_auth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(Reducers)
 //<indexRoute component={} /> 
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App} >
				
			</Route>
		</Router>
	</Provider>, document.querySelector('.container'));