import { csrfFetch } from './csrf';

/********************** ACTION **************************/

const LOAD = 'images/LOAD';

/********************** ACTION CREATORS **************************/

const load = (images) => ({
  type: LOAD,
  images
});

/********************** THUNKS **************************/

export const getImages = () => (dispatch) => {
  const response = await csrfFetch('/api/images', {
    method: 'GET',
  })

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images));
  }
}

/********************** REDUCER **************************/

const initialState = {}

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const imageList = {};
      action.images.forEach(image => {
        imageList[image.id] = image;
      });
      return {
        ...imageList,
        ...state
      }
      default:
        return state;
      };
    }


export default imagesReducer;
