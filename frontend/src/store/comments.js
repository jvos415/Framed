import { csrfFetch } from './csrf';

/********************** ACTION **************************/

const LOAD = 'comments/LOAD';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const DELETE_COMMENT = "comments/DELETE_COMMENT";

/********************** ACTION CREATORS **************************/

const load = (comments) => ({
  type: LOAD,
  comments
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
});

/********************** THUNKS **************************/

export const getComments = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}/comments`, {
    method: 'GET'
  })

  if (response.ok) {
    const comments = await response.json();
    dispatch(load(comments));
  }
}

export const createComment = (commentObj, imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentObj, imageId)
  })

  if (response.ok) {
    const newComment = await response.json();
    dispatch(addComment(newComment))
    return newComment;
  }
}

export const deleteSingleComment = (commentId) => async dispatch => {
  const response = await csrfFetch(`/api/images/comments/${commentId}`, {
    method: 'DELETE'
    });

  if (response.ok) {
    const image = await response.json();
    dispatch(deleteComment(image.id));
    return image;
  }
};

/********************** REDUCER **************************/

const initialState = {}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const imageList = {};
      action.images.forEach((image) => {
        imageList[image.id] = image;
      });
      return {
        ...imageList,
        ...state
      };
      case ADD_IMAGE:
        if (!state[action.image.id]) {
          const newState = {
            ...state,
            [action.image.id]: action.image
          };
          return newState;
      }
      return {
        ...state,
        [action.image.id]: {
          ...state[action.image.id],
          ...action.image
        }
      };
      case UPDATE_IMAGE:
        return {
          ...state,
          [action.image.id]: action.image
        };
      case DELETE_IMAGE:
        const newState = { ...state };
        delete newState[action.imageId];
        return newState;
      default:
        return state;
      };
    }

export default commentsReducer;
