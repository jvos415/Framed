import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSingleImage, getOneImage } from "../../store/images";
import "./EditImagePage.css";

const EditImageForm = ({ setShowEditForm }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const imageObj = useSelector((state) => state.images[imageId]);

  const [image, setImage] = useState(imageObj?.imageUrl);
  const [title, setTitle] = useState(imageObj.title);
  const [description, setDescription] = useState(imageObj.description);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return history.push("/signup");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const albumId = imageObj.albumId;
    const userId = sessionUser.id;
    const createdAt = imageObj.createdAt;
    const updatedAt = new Date();

    const payload = {
      id: imageId,
      albumId,
      userId,
      image,
      title,
      description,
      createdAt,
      updatedAt,
    };

    try {
      let updatedImage = await dispatch(updateSingleImage(payload));

      if (updatedImage) {
        setShowEditForm(false);
        dispatch(getOneImage(imageId));
        return history.push(`/images/${imageId}`);
      }
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowEditForm(false);
    return history.push(`/images/${imageId}`);
  };

  let errorList;

  if (errors.length > 0) {
    errorList = "errorList";
  } else {
    errorList = "";
  }

  return (
    <div className="edit-image-container">
      <h3 id="edit-image-title">Edit Your Image</h3>
      <form className="edit-image-form" onSubmit={handleSubmit}>
        <ul className={errorList}>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-box">
          
          <label className="label">Title</label>
          <input className="input-field" type="text" value={title} onChange={updateTitle} />
          <label className="label" id="file-upload">
            Upload Image Here
            <input id="upload-image" className="input-field" type="file" onChange={updateFile} />
          </label>
          <label className="label">Description</label>
          <textarea
            className="input-field"
            cols="30"
            rows="4"
            type="text"
            value={description}
            onChange={updateDescription}
          />
          <button id="button-update" type="submit">Submit Image Detail Edits</button>
          <button id="button-cancel-update" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditImageForm;
