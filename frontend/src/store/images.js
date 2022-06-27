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

export const getOneImage = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${id}`, {
    method: 'GET',
  })

  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(image));
  }
}

// export const getOnePokemon = id => async dispatch => {
//   const response = await fetch(`/api/pokemon/${id}`);

//   if (response.ok) {
//     const pokemon = await response.json();
//     dispatch(addOnePokemon(pokemon));
//   }
// };

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




// //PHASE TWO
// //!!START SILENT
// export const getOnePokemon = id => async dispatch => {
//   const response = await fetch(`/api/pokemon/${id}`);

//   if (response.ok) {
//     const pokemon = await response.json();
//     dispatch(addOnePokemon(pokemon));
//   }
// };

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

// //PHASE 4
// export const updatePokemon = data => async dispatch => {
//   const response = await fetch(`/api/pokemon/${data.id}`, {
//     method: 'put',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   if (response.ok) {
//     const pokemon = await response.json();
//     dispatch(addOnePokemon(pokemon));
//     return pokemon;
//   }
// };
