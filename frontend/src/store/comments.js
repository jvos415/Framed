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
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: 'GET'
  })

  if (response.ok) {
    const comments = await response.json();
    dispatch(load(comments));
  }
}

export const getOneImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: 'GET'
  })

  if (response.ok) {
    const image = await response.json();
    //  console.log("\n\n", image, "\n\n");
    dispatch(addImage(image));
  }
}

export const createImage = (imageObj) => async dispatch => {
  const response = await csrfFetch(`/api/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageObj)
  })

  if (response.ok) {
    const newImage = await response.json();
    dispatch(addImage(newImage))
    return newImage;
  }
}

export const updateSingleImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image)
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(updateImage(image));
    return image;
  }
};

export const deleteSingleImage = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: 'DELETE'
    });

  if (response.ok) {
    const image = await response.json();
    dispatch(deleteImage(image.id));
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
