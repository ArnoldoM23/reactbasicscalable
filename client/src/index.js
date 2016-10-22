import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import FrontPage from './components/frontpage';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import SignOut from './components/auth/signout';
import Feature from './components/feature';
import Reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import Authenticate from './components/auth/require_auth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(Reducers)
const token = localStorage.getItem('token');

if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={App} >
				<IndexRoute component={FrontPage} />
				<Route path='/signin' component={SignIn} />
				<Route path='/signup' component={SignUp}/>
				<Route path='/signout' component={SignOut}/>
				<Route path='/feature' component={Authenticate(Feature)} />
			</Route>
		</Router>
	</Provider>, document.querySelector('.container'));