import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteAlbum } from "../../../store/albums";
import EditAlbumForm from "../forms/EditAlbumForm";
import "./albumCard.css";

const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();

  const [updateAlbumComp, setUpdateAlbumComp] = useState("");

  const updateAlbumComponent = () => {
    setUpdateAlbumComp(true)
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
        {!updateAlbumComp && (<button id="button-cancel-add" type="button" onClick={updateAlbumComponent}>
          Update Album Title
        </button>)}
        {updateAlbumComp && (
            <EditAlbumForm setUpdateAlbumComp={setUpdateAlbumComp}/>
        )}
        {!updateAlbumComp && (<button id="button-cancel-add" type="button" onClick={deleteAlbumFunc}>
          Delete Album
        </button>)}
      </div>
    </div>
  );
};

export default AlbumCard;
