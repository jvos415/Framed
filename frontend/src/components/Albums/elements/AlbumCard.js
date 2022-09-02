import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateAlbum, deleteAlbum } from "../../../store/albums";
import "./albumCard.css";

const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();

  const updateAlbumFunc = () => {
    dispatch(updateAlbum(album))
  };

  const deleteAlbumFunc = () => {
    dispatch(deleteAlbum(album.id))
  };

  return (
    <div className="album-card-container">
      <div>
        <NavLink exact to={`/albums/${album.id}`}>
          <h2>{album.title}</h2>
        </NavLink>
      </div>
      <div>
        <button id="button-cancel-add" type="button" onClick={updateAlbumFunc}>
          Update Album Title
        </button>
        <button id="button-cancel-add" type="button" onClick={deleteAlbumFunc}>
          Delete Album
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
