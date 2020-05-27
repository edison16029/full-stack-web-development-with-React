import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments:[]}, action) => {
  console.log("inside comments");
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT:
      console.log("Got the comment : ",action.payload);
      // return {...state, errMess: "action.payload"};
      var newComment = {...action.payload, id : state.comments.length};
      console.log("New Comment : ",newComment);
      return {...state, comments : state.comments.concat(newComment)};

    default:
      return state;
  }
};