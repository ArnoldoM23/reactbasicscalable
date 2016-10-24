import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
const ROOT_URL = 'http://localhost:3090'

class SignIn extends Component {

	handleFormSubmit({email, password}){
		this.props.signIn({ email, password });
	}

	handleFacebookLogin(){
		console.log(this.props)
		this.props.facebookLogin();
	}

	renderAlert(){
		if(this.props.errorMessage){
			return(
				<div>
					<strong>Ooop!!</strong>{this.props.errorMessage}
				</div>
			)
		}
	}

	render(){
		const { handleSubmit, fields: { email, password } } = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className='form-group'>
						<label>Email:</label>
						<input {...email } className='form-control' />
					</fieldset>
					<fieldset className='form-group'>
						<label>Password:</label>
						<input {...password } type='password' className='form-control' />
					</fieldset>
					<button action='submit' className='btn btn-primary'>Sign In</button>
				</form>
				<button onClick={this.handleFacebookLogin.bind(this)}>Facebook Login</button>
			</div>
		);
	}
};

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
},mapStateToProps, actions)(SignIn);