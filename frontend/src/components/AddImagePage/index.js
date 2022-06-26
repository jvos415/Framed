import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { createImage } from '../../store/images';
import './AddImagePage.css';

const AddImageForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!sessionUser) return <Redirect to="/signup" />;

  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      imageUrl,
      title,
      description
    };

    let createdImage = await dispatch(createImage(payload))

    // console.log("CREATED IMAGE: ", createdImage)

    if (createdImage) {
      history.push(`/images/${createdImage.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();

    return (
      <Redirect to="/" />
    )
  };

  return (
    <div>
      <form className="add-image-form" onSubmit={handleSubmit}>
         <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={updateTitle} />
        <input
          type="text"
          placeholder="Image Description"
          value={description}
          onChange={updateDescription} />
        <button type="submit">Add Your Image</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};

export default AddImageForm;
