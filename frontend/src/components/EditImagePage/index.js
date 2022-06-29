import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSingleImage } from '../../store/images';
import './EditImagePage.css';

const EditImageForm = ({ setShowEditForm }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const image = useSelector(state => state.images[imageId]);

  // console.log(image)

  const [imageUrl, setImageUrl] = useState(image.imageUrl);
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);

  if (!sessionUser) return history.push("/signup");

  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      updatedAt
    };

    // console.log(payload)

    let updatedImage = await dispatch(updateSingleImage(payload))

    // console.log("\n\n", updatedImage, "\n\n",);

    if (updatedImage) {
      setShowEditForm(false);
      // this should go to the details page without the edit form rendering
     return history.push(`/images/${imageId}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowEditForm(false);
    // this should go to the details page wihout the edit form rendering
    return history.push(`/images/${imageId}`);
  };

  return (
    <div className="edit-image-container">
      <h3 id="edit-image-title">Edit Your Image</h3>
      <form className="edit-image-form" onSubmit={handleSubmit}>
        <label>ImageUrl: </label>
          <input
          type="text"
          value={imageUrl}
          onChange={updateImageUrl} />
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={updateTitle} />
        <label>Description: </label>
        <textarea
          cols="30"
          rows="3"
          type="text"
          value={description}
          onChange={updateDescription} />
        <button type="submit">Submit Image Detail Edits</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </div>
  );
};

export default EditImageForm;
