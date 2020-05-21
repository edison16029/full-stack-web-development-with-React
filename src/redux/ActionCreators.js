import * as ActionTypes from './ActionTypes';
import { baseUrl} from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchDishes = () => (dispatch) => { //This is a Thunk which performs following 3 reducer actions
	dispatch(dishesLoading(true));

	return fetch(baseUrl + 'dishes')
			.then(response => {
				if(response.ok)  {
					return response;
				}
				else {
					var error = new Error("Error " +  response.status + " : " + response.statusText);
					error.response = response;
					throw error;
				}
			}, error => {
				var error = new Error(error.message);
				throw error;
			})
			.then(response => response.json())
			.then(dishes => dispatch(addDishes(dishes)))
			.catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
	type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errMess
});

export const addDishes = (dishes) => ({
	type: ActionTypes.ADD_DISHES,
	payload: dishes
});

export const fetchPromotions = () => (dispatch) => { //This is a Thunk which performs following 3 reducer actions
	dispatch(promotionsLoading(true));

	return fetch(baseUrl + 'promotions')
			.then(response => {
				if(response.ok)  {
					return response;
				}
				else {
					var error = new Error("Error " +  response.status + " : " + response.statusText);
					error.response = response;
					throw error;
				}
			}, error => {
				var error = new Error(error.message);
				throw error;
			})
			.then(response => response.json())
			.then(promotions => dispatch(addPromotions(promotions)))
			.catch(error => dispatch(promotionsFailed(error.message)));
}

export const promotionsLoading = () => ({
	type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = (errMess) => ({
	type: ActionTypes.PROMOTIONS_FAILED,
	payload: errMess
});

export const addPromotions = (promotions) => ({
	type: ActionTypes.ADD_PROMOTIONS,
	payload: promotions
});

export const fetchComments = () => (dispatch) => { //This is a Thunk which performs following 3 reducer actions

		return fetch(baseUrl + 'comments')
			.then(response => {
				if(response.ok)  {
					return response;
				}
				else {
					var error = new Error("Error " +  response.status + " : " + response.statusText);
					error.response = response;
					throw error;
				}
			}, error => {
				var error = new Error(error.message);
				throw error;
			})		
			.then(response => response.json())
			.then(comments => dispatch(addComments(comments)))
			.catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errMess
});

export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENTS,
	payload: comments
});