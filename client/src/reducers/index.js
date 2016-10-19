import { combineReducers } from 'redux';
import Authentication from './auth_reducer'; 

const rootReducer = combineReducers({
	auth: Authentication
});

export default rootReducer;