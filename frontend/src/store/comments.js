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
    const comment = await response.json();
    dispatch(deleteComment(comment.id));
    return comment;
  }
};

/********************** REDUCER **************************/

const initialState = {}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const commentList = {};
      action.comments.forEach((comment) => {
        commentList[comment.id] = comment;
      });
      return {
        ...commentList
      };
      case ADD_COMMENT:
        if (!state[action.comment.id]) {
          const newState = {
            ...state,
            [action.comment.id]: action.comment
          };
          return newState;
      }
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          ...action.comment
        }
      };
      case DELETE_COMMENT:
        const newState = { ...state };
        delete newState[action.commentId];
        return newState;
      default:
        return state;
      };
    }

export default commentsReducer;
