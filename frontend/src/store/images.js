import { csrfFetch } from './csrf';

/********************** ACTION **************************/

const LOAD = 'images/LOAD';
const ADD_IMAGE = 'images/ADD_IMAGE';

/********************** ACTION CREATORS **************************/

const load = (images) => ({
  type: LOAD,
  images
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
});

/********************** THUNKS **************************/

export const getImages = () => async (dispatch) => {
  const response = await csrfFetch('/api/images', {
    method: 'GET',
  })

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images));
  }
}

export const createImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image)
  })

  if (response.ok) {
    const newImage = await response.json();
    dispatch(addImage(newImage))
    return newImage;
  }
}

/********************** REDUCER **************************/

const initialState = {}

const imagesReducer = (state = initialState, action) => {
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
      if (!state[action.images.id]) {
        const newState = {
          ...state,
          [action.images.id]: action.images
        };
        const imageList = newState.images.map((id) => newState[id]);
        imageList.push(action.images);
        return newState;
      }
      return {
        ...state,
        [action.images.id]: {
          ...state[action.images.id],
          ...action.images
        }
      };
      default:
        return state;
      };
    }


export default imagesReducer;
