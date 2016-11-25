import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {

	componentWillMount(){
		// This will grab the token from the url store in the localstorage
		if (window.location.search.indexOf('token') !== -1) {
			const token = window.location.search.slice(7)
			window.localStorage.setItem('token', token)
			this.props.facebookAuth()
		}
	}


	render(){
		return (
			<div>
				<Header />
				{ this.props.children }
			</div>
		)
	}
}

export default connect(null, actions)(App);