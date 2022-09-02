import React from "react";
import { useHistory } from "react-router-dom";
import "./myAlbumsPage.css"

const MyAlbumsPage = () => {
  const history = useHistory();

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
    </div>
  );
};

export default MyAlbumsPage;
