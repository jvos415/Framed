import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getComments } from '../../store/comments';
import "./comments.css"

const CommentComponent = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const comments = useSelector(state => state.comment[imageId]);
}

useEffect(() => {
  dispatch(getComments(imageId));
}, [dispatch]);

const handleDeleteComment = async (e) => {
  e.preventDefault();

  await dispatch(deleteSingleComment(commentId))

  return history.push(`/images/${imageId}`);
};

return (
  <div className="comment-container">
     <p>this is where my comments will go</p>
  </div>
);

export default CommentComponent;
