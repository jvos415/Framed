import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAlbums } from "../../store/albums";
import AlbumCard from "./elements/AlbumCard";
import "./myAlbumsPage.css";

const MyAlbumsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
  },[user, history])

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
    if (user.id !== userId) {
      return history.push(`/my-albums/${user.id}`);
    }
  },[user, history, userId])

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
    dispatch(getAlbums(user.id));
  }, [dispatch, user, history]);

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
          <h3>*You can only add images you posted to your albums</h3>
        </div>}
    </div>
  );
};

export default MyAlbumsPage;
