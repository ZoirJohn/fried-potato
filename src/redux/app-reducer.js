import {setUserData} from './auth-reducer';

const INIT_SUCCESS = 'app/INIT-SUCCESS';

let initialState = {
	initialized: false,
};
const app_reducer = (_state = initialState, action) => {
	switch (action.type) {
		case INIT_SUCCESS:
			return {
				..._state,
				initialized: true,
			};
		default:
			return {..._state};
	}
};
const setInitialized = () => ({type: INIT_SUCCESS});

const initializeApp = () => (dispatch) => {
	const promise = dispatch(setUserData());
	Promise.all([promise]).then(() => {
			dispatch(setInitialized());
		},
	);
};

export {app_reducer, initializeApp};