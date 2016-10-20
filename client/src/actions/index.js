import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090'

export function signIn({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				handleResponse(response, dispatch)
			})
	};
};

export function signUp({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				handleResponse(response, dispatch);
			})
	};
};

function handleResponse(response, dispatch){
	dispatch({type: AUTH_USER})
	browserHistory.push('/')
	console.log(response.data)
};