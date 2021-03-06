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
  const sessionUser = useSelector(state => state.session.user);
  const image = useSelector(state => state.images[imageId]);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showAddCommentButton, setShowAddCommentButton] = useState(true);

  useEffect(() => {
    if (!sessionUser) return history.push("/signup")
    if (sessionUser && image && image.userId === sessionUser.id) {
      setShowEditButton(true);
    }
  },[image, sessionUser, history])

  useEffect(() => {
    if (sessionUser && image && image.userId === sessionUser.id) {
      setShowDeleteButton(true);
    }
  },[image, sessionUser])

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
    setShowEditForm(true)
  };

  const handleAddComment = () => {
   setShowAddComment(true)
   setShowAddCommentButton(false)
  };

  let content = null;

  if (!showEditForm) {
    content = (
    <div className='image-details'>
      <h3 id="image-title">{image.title}</h3>
      {image.User && <h3 id="username">Image Posted by @{image.User.username}</h3>}
      <p id="image-description">{image.description}</p>
    </div>
    )
  } else {
    content = (
      <EditImageForm setShowEditForm={setShowEditForm} />
    )
  }

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.remove("footer-position");
  }

  return (
    <div className="image-detail">
      <img id='image-image' src={`${image.imageUrl}`} alt={image.title}></img>
      <div className="image-details-end">
        {content}
        {!showEditForm && showEditButton && <button id="image-edit-button" onClick={goToEditPage}>Edit Image</button>}
        {!showEditForm && showDeleteButton && <button type="button" onClick={handleDeleteImage}>Delete Image</button>}
        <CommentComponent />
        {!showEditForm && showAddCommentButton && <button id="add-comment-button" type="button" onClick={handleAddComment}>Add Comment</button>}
        {showAddComment && <AddCommentComponent setShowAddComment={setShowAddComment} setShowAddCommentButton={setShowAddCommentButton} />}
      </div>
    </div>
  );
}

export default ImageDetails;
