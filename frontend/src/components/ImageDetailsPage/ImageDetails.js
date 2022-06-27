import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSingleImage, getOneImage } from '../../store/images';
import "./ImageDetails.css"

const ImageDetails = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const image = useSelector(state => state.images[imageId]);

  const [showEditImageForm, setShowEditImageForm] = useState(false);

  useEffect(() => {
    dispatch(getOneImage(imageId));
    setShowEditImageForm(false);
  }, [dispatch, imageId]);

  if (!image) {
    return null;
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault();

    await dispatch(deleteSingleImage(imageId))

    return history.push(`/`);
  };

  let content = null;

  if (showEditImageForm) {
    // content = (
    //   <EditImageForm image={image}
    //   hideForm={() => setShowEditImageForm(false)}
    //   />
    // )
  } else {
    content = (
    <div className='image-details'>
      <img id='image-image' src={`${image.imageUrl}`} alt={image.title}></img>
      <h3 id="image-title">{image.title}</h3>
      <p id="image-description">{image.description}</p>
    </div>
    )
  }

  return (
    <div className="image-detail">
      {content}
      {(!showEditImageForm &&
        <>
          <button id="image-edit-button" onClick={() => setShowEditImageForm(true)}>Edit</button>
          <button type="button" onClick={handleDeleteImage}>Delete Image</button>
        </>
      )}
    </div>
  );
}

export default ImageDetails;
