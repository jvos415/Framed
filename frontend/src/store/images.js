import { csrfFetch } from './csrf';

/********************** ACTION **************************/

const LOAD = 'images/LOAD';
const ADD_IMAGE = 'images/ADD_IMAGE';
const UPDATE_IMAGE = "images/UPDATE_IMAGE";
const DELETE_IMAGE = "images/DELETE_ITEM";

/********************** ACTION CREATORS **************************/

const load = (images) => ({
  type: LOAD,
  images
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  image
});

const updateImage = (image) => ({
  type: UPDATE_IMAGE,
  image
});

const deleteImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId
});

/********************** THUNKS **************************/

export const getImages = () => async (dispatch) => {
  const response = await csrfFetch('/api/images', {
    method: 'GET'
  })

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images));
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

export const updateSingleImage = image => async dispatch => {
  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
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
    dispatch(deleteImage(image));
    return image;
  }
};

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
        return {
          ...state,
          [action.imageId]: {
            ...state[action.imageId]
          }
        };
      default:
        return state;
      };
    }

export default imagesReducer;

// case DELETE_IMAGE:
//         const newState = { ...state };
//         delete newState[action.imageId];
//         return newState;


// //PHASE 3
// export const createPokemon = data => async dispatch => {
//   try {
//     const response = await fetch(`/api/pokemon`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       let error;
//       if (response.status === 422) {
//         error = await response.json();
//         throw new ValidationError(error.errors, response.statusText);
//       }
//       else {
//         let errorJSON;
//         error = await response.text();
//         try {
//           // Check if the error is JSON, i.e., from the Pokemon server. If so,
//           // don't throw error yet or it will be caught by the following catch
//           errorJSON = JSON.parse(error);
//         }
//         catch {
//           // Case if server could not be reached
//           throw new Error(error);
//         }
//         throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
//       }
//     }

//     const pokemon = await response.json();
//     dispatch(addOnePokemon(pokemon));
//     return pokemon;
//   }
//   catch (error) {
//     throw error;
//   }
// };
