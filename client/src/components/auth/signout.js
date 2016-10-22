import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {
	componentWillMount(){
		this.props.signoutUser();
	}

	render(){
		return (
			<div>Make sure to comeback to our store</div>
		)
	}
}

export default connect(null, actions)(SignOut)