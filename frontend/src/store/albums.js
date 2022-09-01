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
  
  const updateAlbum = (album) => ({
    type: UPDATE_ALBUM,
    payload: album,
  });
  
  const deleteAlbum = (albumId) => ({
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
        dispatch(addImage(newAlbum));
        return newAlbum;
    }
};  