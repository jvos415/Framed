import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSingleImage, getOneImage } from '../../store/images';
import EditImageForm from "../EditImagePage"
import CommentComponent from '../Comments';
import AddCommentComponent from '../Comments/addComment';
import "./ImageDetails.css"

const ImageDetails = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const image = useSelector(state => state.images[imageId]);

  const [showEditForm, setShowEditForm] = useState(false)

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
    setShowEditForm(true);
  }

  const handleAddComment = () => {
   // This will open up the add comment component
  }

  let content = null;

  if (!showEditForm) {
    content = (
    <div className='image-details'>
      <img id='image-image' src={`${image.imageUrl}`} alt={image.title}></img>
      <h3 id="image-title">{image.title}</h3>
      <p id="image-description">{image.description}</p>
    </div>
    )
  } else {
    content = (
      <EditImageForm setShowEditForm={setShowEditForm} />
    )
  }

  return (
    <div className="image-detail">
      {content}
        <>
          {!showEditForm && <button id="image-edit-button" onClick={goToEditPage}>Edit</button>}
          <button type="button" onClick={handleAddComment}>Add Comment</button>
          {!showEditForm && <button type="button" onClick={handleDeleteImage}>Delete Image</button>}
          <CommentComponent />
          <AddCommentComponent />
        </>
    </div>
  );
}

export default ImageDetails;
