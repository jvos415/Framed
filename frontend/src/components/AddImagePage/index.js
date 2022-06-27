import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createImage, getImages } from '../../store/images';
import './AddImagePage.css';

const AddImageForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  // const allImages = useSelector(state => {
  //   return Object.values(state.images);
  // });

  // useEffect(()=> {
  //   dispatch(getImages())
  // }, [dispatch])

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!sessionUser) return <Redirect to="/signup" />;

  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id

    const payload = {
      userId,
      imageUrl,
      title,
      description
    };

    // console.log(allImages);
    // console.log(payload);

    // Anything after this line seems like it does not run
    let createdImage = await dispatch(createImage(payload))

    // const imageId = allImages[allImages.length - 1]
    // console.log(imageId)

    const photo = await JSON.parse(createdImage);

    console.log(photo);

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
    <div className="add-image-container">
      <h3 id="add-image-title">Add an image to FRAMED</h3>
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
