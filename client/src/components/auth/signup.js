import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions'

class SignUp extends Component {

	handleSubmitForm({email, password, confirmPassword}){
		if (password === confirmPassword) {
			this.props.signUp({email, password});
			console.log(email, password, confirmPassword)
		}
	}

	render(){
		const { handleSubmit, fields: { email, password, confirmPassword } } = this.props;

		return(
			<div className='container'>
				<form onSubmit={ handleSubmit(this.handleSubmitForm.bind(this)) }>
					<fieldset className='form-group'>
						<label>Email:</label>
						<input {...email} className='form-control'/>
					</fieldset>
					<fieldset className='form-group'>
						<label>Password:</label>
						<input {...password} type='password' className='form-control'/>
					</fieldset>
					<fieldset className='form-group'>
						<label>Comfirm Password:</label>
						<input {...confirmPassword} type='password' className='form-control'/>
					</fieldset>
					<button action='submit' className='btn btn-primary'>Sign Up</button>
				</form>
			</div>
		);
	}
};


function mapStateToProps(state){
	return { errorMessage: state.auth.error };
};

function validate (formProps){
	const error = {}
	if (!formProps.email) {
		error.email = 'Enter an email';
	}
	if(!formProps.password){
		error.password = 'Enter a password';
	}
	if(!form.confirmPassword){
		error.confirmPassword = 'Enter a confirmation pasword';
	}
	if (form.confirmPassword !== form.password) {
		error.password = 'Enter a matching password'
	}
	return error;
}


export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'confirmPassword']
}, mapStateToProps,actions)(SignUp);