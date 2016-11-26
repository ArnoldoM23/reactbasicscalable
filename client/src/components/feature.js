import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';

class Feature extends Component {
	componentWillMount(){
		this.props.fetchMesssages();
	}

	renderMessage(){
		if(this.props.message){
			return this.props.message;
		}
	}

	render(){
		return(
			<div>This is that dope feature
			<p>{this.renderMessage() }</p>
			</div>
		)
	}
};


function mapStateToProps(state){
	return {message: state.auth.message}
}

export default connect(mapStateToProps, actions)(Feature);