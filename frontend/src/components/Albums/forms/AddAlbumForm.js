import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbum } from "../../../store/albums";
import "./addAlbumForm.css"

const AddAlbumForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!user) {
      return history.push("/signup");
    }
  },[user, history])

  const submitAlbum = async (e) => {
    e.preventDefault();

    const userId = user.id;

    const albumObj = {
      userId,
      title
    };

    try {
      let createdAlbum = await dispatch(createAlbum(albumObj));

      if (createdAlbum) {
        return history.push(`/my-albums/${userId}`);
      }
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();

    return history.push(`/my-albums/${user.id}`);
  };

  let errorList;

  if (errors.length > 0) {
    errorList = "errorList";
  } else {
    errorList = "";
  }

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.add("footer-position");
  }

  return (
    <div className="add-album-container">
      <h3 id="add-album-title">Add an Photo Album</h3>
      <form className="add-album-form" onSubmit={submitAlbum}>
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
          <button id="button-add" type="submit">Create Album</button>
          <button  id="button-cancel-add" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
          </div>
      </form>
    </div>
  );
};

export default AddAlbumForm;
