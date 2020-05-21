import * as ActionTypes from './ActionTypes';


export const Promotions =  (state = {
		isLoading : false,
		errMess : null,
		promotions : []
	}, action) => {
	
	switch(action.type) {

		case ActionTypes.ADD_PROMOTIONS:
			return {...state, isLoading : false, errMess : null, promotions : action.payload};

		case ActionTypes.PROMOTIONS_LOADING:
			return { ...state, isLoading : true, errMess:null, promotions:[] } //takes whatever the state is and add the second parameter.

		case ActionTypes.PROMOTIONS_FAILED:
			return { ...state, isLoading : false, errMess: action.payload, promotions:[]};

		default :
			return state;
			
	}
}