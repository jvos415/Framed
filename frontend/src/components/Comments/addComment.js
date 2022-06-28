import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createComment } from "../../store/comments";
import "./addComments.css";

const AddCommentComponent = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const comments = useSelector((state) => state.comment[imageId]);

  // const handlePostComment = async (e) => {
  //   e.preventDefault();

  //   await dispatch(createComment(commentId));

  //   return history.push(`/images/${imageId}`);
  // };

  // const handleDeleteComment = async (e) => {
  //   e.preventDefault();

  //   await dispatch(deleteSingleComment(commentId))

  //   return history.push(`/images/${imageId}`);
  // }

  return (
    <div className="add-comment-container">
      <p>this is the add comment component</p>
      <button typ="sumbit">
        Post Comment
      </button>
    </div>
  );
};

export default AddCommentComponent;
