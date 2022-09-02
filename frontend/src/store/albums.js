import { csrfFetch } from './csrf';

/********************** ACTIONS **************************/

const LOAD = "albums/LOAD";
const ADD_ALBUM = "albums/ADD_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

/********************** ACTION CREATORS **************************/

const load = (albums) => ({
    type: LOAD,
    payload: albums,
  });
  
  const addAlbum = (album) => ({
    type: ADD_ALBUM,
    payload: album,
  });
  
  const editAlbum = (album) => ({
    type: UPDATE_ALBUM,
    payload: album,
  });
  
  const removeAlbum = (albumId) => ({
    type: DELETE_ALBUM,
    payload: albumId,
  });

/***************************** THUNKS ***************************************/  

export const getAlbums = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/my-albums/${userId}`, {
      method: "GET",
    });
  
    if (response.ok) {
      const albums = await response.json();
      dispatch(load(albums));
    }
};

export const createAlbum = (albumObj) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(albumObj),
    });

    if (response.ok) {
        const newAlbum = await response.json();
        dispatch(addAlbum(newAlbum));
        return newAlbum;
    }
};  

export const updateAlbum = (albumObj) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumObj.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(albumObj),
    });
  
    if (response.ok) {
      const album = await response.json();
      dispatch(editAlbum(album));
      return album;
    }
};

export const deleteAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      const album = await response.json();
      dispatch(removeAlbum(album.id));
      return album;
    }
};

/********************** REDUCER **************************/

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case ADD_ALBUM:
      const album = action.payload;
      newState[album.id] = album;
      return newState;
    case LOAD:
      newState = {};
      action.payload.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;
    case UPDATE_ALBUM:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_ALBUM:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};