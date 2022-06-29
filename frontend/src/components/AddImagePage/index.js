import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createImage } from "../../store/images";
import "./AddImagePage.css";

const AddImageForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return history.push("/signup");

  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const userId = sessionUser.id;

    const payload = {
      userId,
      imageUrl,
      title,
      description,
    };

    try {
      let createdImage = await dispatch(createImage(payload));

      if (createdImage) {
        return history.push(`/images/${createdImage.id}`);
      }
    } catch (error) {
      const data = await error.json();
        if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();

    return history.push("/");
  };

  return (
    <div className="add-image-container">
      <h3 id="add-image-title">Add an image to FRAMED</h3>
      <form className="add-image-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>ImageUrl: </label>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
        />
        <label>Title: </label>
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={updateTitle}
        />
        <label>Description: </label>
        <textarea
          cols="30"
          rows="3"
          type="text"
          placeholder="Image Description"
          value={description}
          onChange={updateDescription}
        />
        <button type="submit">Add Your Image</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddImageForm;
