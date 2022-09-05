import { csrfFetch } from "./csrf";

/********************** ACTIONS **************************/

const LOAD = "images/LOAD";
const ADD_IMAGE = "images/ADD_IMAGE";
const UPDATE_IMAGE = "images/UPDATE_IMAGE";
const DELETE_IMAGE = "images/DELETE_ITEM";

/********************** ACTION CREATORS **************************/

const load = (images) => ({
  type: LOAD,
  images,
});

const addImage = (image) => ({
  type: ADD_IMAGE,
  image,
});

const updateImage = (image) => ({
  type: UPDATE_IMAGE,
  image,
});

const deleteImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId,
});

/********************** THUNKS **************************/

export const getImages = () => async (dispatch) => {
  const response = await csrfFetch("/api/images", {
    method: "GET",
  });

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images));
  }
};

export const getOneImage = (imageId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/images/${imageId}`, {
      method: "GET",
    });

    if (response.ok) {
      const image = await response.json();
      dispatch(addImage(image));
    }
  } catch (error) {
    const data = await error.json();
    return data;
  }
};

export const createImage = (imageObj) => async (dispatch) => {
    const { image, userId, title, description } = imageObj;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);

    if (image) formData.append("image", image);

    // for (let key of formData.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
		// }

    const response = await csrfFetch(`/api/images`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    if (response.ok) {
      const newImage = await response.json();
      dispatch(addImage(newImage));
      return newImage;
    }
};

export const updateSingleImage = (imageObj) => async (dispatch) => {
  const { image, id, albumId, userId, title, description, createdAt, updatedAt } = imageObj;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("albumId", albumId);
  formData.append("userId", userId);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("createdAt", createdAt);
  formData.append("updatedAt", updatedAt);

  if (image) formData.append("image", image);

  const response = await csrfFetch(`/api/images/${imageObj.id}`, {
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  if (response.ok) {
    const updatedImage = await response.json();
    dispatch(updateImage(updatedImage));
    return updatedImage;
  }
};

export const deleteSingleImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(deleteImage(image.id));
    return image;
  }
};

/********************** REDUCER **************************/

const initialState = {};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const imageList = {};
      action.images.forEach((image) => {
        imageList[image.id] = image;
      });
      return {
        ...imageList,
      };
    case ADD_IMAGE:
      if (!state[action.image.id]) {
        const newState = {
          ...state,
          [action.image.id]: action.image,
        };
        return newState;
      }
      return {
        ...state,
        [action.image.id]: {
          ...state[action.image.id],
          ...action.image,
        },
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        [action.image.id]: action.image,
      };
    case DELETE_IMAGE:
      const newState = { ...state };
      delete newState[action.imageId];
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;
