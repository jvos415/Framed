import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAlbums } from "../../store/albums";
import AlbumCard from "./elements/AlbumCard";
import "./myAlbumsPage.css";

const MyAlbumsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
  },[user])

  useEffect(() => {
    dispatch(getAlbums(user.id));
  }, [dispatch, user.id]);

  const newAlbumPageFunc = () => {
    history.push("/add-album");
  };

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.add("footer-position");
  }

  return (
    <div className="my-albums-container">
      <h2>My Albums</h2>
      <div className="add-new-album">
        <button id="button-cancel-add" type="button" onClick={newAlbumPageFunc}>
          New Album
        </button>
      </div>
      {albums.length > 0 ? (<div className="all-albums">
      {albums.map((album) => {
        return (
          <AlbumCard key={album.id} album={album} />
        );
      })}
      </div>) : <div>
          <h2>You Do Not Have Any Albums Yet...</h2>
        </div>}
    </div>
  );
};

export default MyAlbumsPage;
