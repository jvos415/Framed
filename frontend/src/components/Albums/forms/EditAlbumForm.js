import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateAlbum } from "../../../store/albums";
import "./editAlbumForm.css"

const EditAlbumForm = ({ setUpdateAlbumComp, album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const albumId = album.id

  const [title, setTitle] = useState(album.title);
  const [errors, setErrors] = useState([]);

  const submitAlbum = async (e) => {
    e.preventDefault();

    const userId = user.id;

    const albumObj = {
      albumId,  
      userId,
      title
    };

    try {
      let updatedAlbum = await dispatch(updateAlbum(albumObj));

      if (updatedAlbum) {
        return history.push(`/my-albums/${userId}`);
      }
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setUpdateAlbumComp(false);
    return history.push(`/my-albums/${user.id}`);
  };

  let errorList;

  if (errors.length > 0) {
    errorList = "errorList";
  } else {
    errorList = "";
  }

  return (
    <div className="edit-album-container">
      <h3 id="edit-album-title">Update Your Photo Album</h3>
      <form className="edit-album-form" onSubmit={submitAlbum}>
        <ul className={errorList}>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-box">
          <label className="label">Album Title</label>
          <input className="input-field"
            type="text"
            placeholder="Album Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button id="button-add" type="submit">Update Album</button>
          <button  id="button-cancel-add" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
          </div>
      </form>
    </div>
  );
};

export default EditAlbumForm;