import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createImage } from "../../store/images";
import "./AddImagePage.css";

const AddImageForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return history.push("/signup");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const userId = sessionUser.id;

    const payload = {
      userId,
      image,
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

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();

    return history.push("/");
  };

  let errorList;

  if (errors.length > 0) {
    errorList = "errorList";
  } else {
    errorList = "";
  }

  let footer = document.querySelector(".footer")
  if (footer) {
    footer.classList.add("footer-position")
  }

  return (
    <div className="add-image-container">
      <h3 id="add-image-title">Add an Image to FRAMED</h3>
      <form className="add-image-form" onSubmit={handleSubmit}>
        <ul className={errorList}>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-box">
          <label className="label">Upload Image</label>
          <label>
            <input id="upload-image" className="input-field" type="file" onChange={updateFile} />
          </label>
          <label className="label">Title</label>
          <input className="input-field"
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={updateTitle}
          />
          <label className="label">Description</label>
          <textarea className="input-field"
            cols="30"
            rows="4"
            type="text"
            placeholder="Image Description"
            value={description}
            onChange={updateDescription}
          />
          <button id="button-add" type="submit">Add Your Image</button>
          <button  id="button-cancel-add" type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImageForm;
