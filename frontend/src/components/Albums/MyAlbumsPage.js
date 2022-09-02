import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAlbums } from "../../store/albums";
import "./myAlbumsPage.css";

const MyAlbumsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));

  useEffect(() => {
    dispatch(getAlbums(user.id));
  }, [dispatch]);

  const newAlbumPageFunc = () => {
    history.push("/add-album");
  };

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.add("footer-position");
  }

  return (
    <div className="my-albums-container">
      <h2>My Photo Albums</h2>
      <div className="add-new-album">
        <button id="button-cancel-add" type="button" onClick={newAlbumPageFunc}>
          New Photo Album
        </button>
      </div>
      <div className="all-albums">
      {albums.map((album) => {
        return (
          <div>
            <NavLink exact to={`/albums/${album.id}`}>
            <h2>{album.title}</h2>
            </NavLink>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default MyAlbumsPage;
