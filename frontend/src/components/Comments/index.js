import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getComments } from "../../store/comments";
import "./comments.css";

const CommentComponent = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments)

  useEffect(() => {

  },[comments])

  useEffect(() => {
    dispatch(getComments(imageId));
  }, [dispatch, imageId]);

  // const handleDeleteComment = async (e) => {
  //   e.preventDefault();

  //   await dispatch(deleteSingleComment(commentId))

  //   return history.push(`/images/${imageId}`);
  // }

  return (
    <div className="comment-container">
      <h3>Comments</h3>
      {commentsArray && commentsArray.map((comment) => {
        return <p key={comment.id}>{comment.comment}</p>
      })}
    </div>
  );
};

export default CommentComponent;
