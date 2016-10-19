import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
	class Authentication extends Component {
		static contextType =  {
			router: React.PropType.object
		}

		componentDidMount(){
			if (!this.props.authenticated) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(){
			if(!this.props.authenticated){
				this.context.router.push('/');
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

	return connect(mapStateToProps)(Authentication);
}