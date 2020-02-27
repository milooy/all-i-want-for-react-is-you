import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting';
import post from './post';

export default combineReducers({
	counter,
	waiting,
	post,
});
