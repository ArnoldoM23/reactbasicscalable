import { combineReducers } from 'redux';
import Authentication from './auth_reducer';
import {reducer as form} from 'redux-form'; 

const rootReducer = combineReducers({
	form,
	auth: Authentication
});

export default rootReducer;