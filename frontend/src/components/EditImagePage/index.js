import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSingleImage } from "../../store/images";
import "./EditImagePage.css";

const EditImageForm = ({ setShowEditForm }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const image = useSelector((state) => state.images[imageId]);

  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return history.push("/signup");

  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const userId = sessionUser.id;
    const createdAt = image.createdAt;
    const updatedAt = new Date();

    const payload = {
      id: imageId,
      userId,
      imageUrl,
      title,
      description,
      createdAt,
      updatedAt,
    };

    try {
      let updatedImage = await dispatch(updateSingleImage(payload));

      if (updatedImage) {
        setShowEditForm(false);
        return history.push(`/images/${imageId}`);
      }
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowEditForm(false);
    return history.push(`/images/${imageId}`);
  };

  return (
    <div className="edit-image-container">
      <h3 id="edit-image-title">Edit Your Image</h3>
      <form className="edit-image-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>ImageUrl: </label>
        <input type="text" value={imageUrl} onChange={updateImageUrl} />
        <label>Title: </label>
        <input type="text" value={title} onChange={updateTitle} />
        <label>Description: </label>
        <textarea
          cols="30"
          rows="3"
          type="text"
          value={description}
          onChange={updateDescription}
        />
        <button type="submit">Submit Image Detail Edits</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditImageForm;
