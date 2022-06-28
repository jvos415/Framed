import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSingleImage, getOneImage } from '../../store/images';
import "./ImageDetails.css"

const ImageDetails = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const image = useSelector(state => state.images[imageId]);

  useEffect(() => {
    dispatch(getOneImage(imageId));
  }, [dispatch, imageId]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!image) {
    return null;
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault();

    await dispatch(deleteSingleImage(imageId))

    return history.push(`/`);
  };

  const goToEditPage = () => {
    return history.push(`/edit`)
  }

  let content = null;

    content = (
    <div className='image-details'>
      <img id='image-image' src={`${image.imageUrl}`} alt={image.title}></img>
      <h3 id="image-title">{image.title}</h3>
      <p id="image-description">{image.description}</p>
    </div>
    )

  return (
    <div className="image-detail">
      {content}
        <>
          <button id="image-edit-button" onClick={goToEditPage}>Edit</button>
          <button type="button" onClick={handleDeleteImage}>Delete Image</button>
        </>
    </div>
  );
}

export default ImageDetails;
