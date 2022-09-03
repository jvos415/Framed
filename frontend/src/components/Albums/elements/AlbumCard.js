import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteAlbum } from "../../../store/albums";
import EditAlbumForm from "../forms/EditAlbumForm";
import "./albumCard.css";

const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();
  const history =useHistory();

  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
  },[user, history])

  const [updateAlbumComp, setUpdateAlbumComp] = useState("");

  const updateAlbumComponent = () => {
    setUpdateAlbumComp(true)
  };

  const deleteAlbumFunc = () => {
    dispatch(deleteAlbum(album.id))
  };

  return (
    <div className="album-card-container">
      <div className="link-container">
        <Link style={{ textDecoration: 'none' }} exact="true" to={`/albums/${album.id}`}>
          <h2 id="album-title">{album.title}</h2>
        </Link>
      </div>
      <div>
        {!updateAlbumComp && (<button id="button-cancel-add" type="button" onClick={updateAlbumComponent}>
          Update Album Title
        </button>)}
        {updateAlbumComp && (
            <EditAlbumForm setUpdateAlbumComp={setUpdateAlbumComp} album={album}/>
        )}
        {!updateAlbumComp && (<button id="button-cancel-add" type="button" onClick={deleteAlbumFunc}>
          Delete Album
        </button>)}
      </div>
    </div>
  );
};

export default AlbumCard;
