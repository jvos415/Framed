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

useEffect(() => {
  window.scrollTo(0, 0)
}, [])

if (!comments) {
  return null;
}

const handleDeleteComment = async (e) => {
  e.preventDefault();

  await dispatch(deleteSingleImage(imageId))

  return history.push(`/`);
};

export default CommentComponent;
