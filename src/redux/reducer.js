// const axios = require('axios');
const SET_STATE = 'SET_STATE';
const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {
	username: '',
	profile_pic: ''
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_STATE:
			return Object.assign({}, state, { thing: action.payload });
		case UPDATE_USER:
			return Object.assign({}, state, action.payload);
		case CLEAR_USER:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

export function setState(thing) {
	return {
		type: SET_STATE,
		payload: thing
	};
}

export function updateUser(user) {
	return {
		type: UPDATE_USER,
		payload: user
	};
}
export function clearUser() {
	return {
		type: CLEAR_USER,
		payload: initialState
	};
}

export default reducer;
