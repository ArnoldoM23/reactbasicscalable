import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default function(ComposedComponent){
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount(){
			// This will grab the token from the url store in the localstorage
			if (window.location.search.indexOf('token') !== -1) {
				const token = window.location.search.slice(7)
				window.localStorage.setItem('token', token)
				this.props.facebookAuth()
			}
		}

		componentDidMount(){
			if (!this.props.authenticated) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps){
			if (!nextProps.authenticated) {
				this.context.router.push('/')
			}
		}

		render(){
			return (
				<ComposedComponent {...this.props} />
			)
		}
	}

	function mapStateToProps(state){
		return { authenticated: state.auth.authenticated };
	}

	return connect(mapStateToProps, actions)(Authentication);
}