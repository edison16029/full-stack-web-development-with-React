import * as ActionTypes from './ActionTypes';
import { COMMENTS } from '../shared/comments';

export const Comments =  (state = COMMENTS, action) => {
	switch(action.type) {
		case ActionTypes.ADD_COMMENT:
			var comment = action.payload;
			console.log("Adding Comment : ",comment);
			comment.id = state.length;
			comment.date = new Date().toISOString();
			return state.concat(comment);
		default :
			return state;
			
	}
}