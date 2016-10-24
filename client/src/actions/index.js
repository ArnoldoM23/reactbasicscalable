import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

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

export function facebookLogin(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/auth/facebook`)
			.then(response=> {
				handleResponse(response, dispatch);
			})
	}
}
 
export function fetchMesssages(){
	return function(dispatch){
		const token = localStorage.getItem('token');
		axios.get(ROOT_URL, {
			headers: { authorization: token}
		})
			.then(response =>{
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
				});
			})
	}
}



export function signoutUser(){
	localStorage.removeItem('token')
	return {type: UNAUTH_USER};
}

function handleResponse(response, dispatch){
	dispatch({type: AUTH_USER})
	localStorage.setItem('token', response.data.token);
	browserHistory.push('/feature')
};