import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createComment } from "../../store/comments";
import "./addComments.css";

const AddCommentComponent = ({ setShowAddComment }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  // const comments = useSelector((state) => state.comments);

  const handlePostComment = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id

    const commentObj = {
     
    }

    await dispatch(createComment(commentObj));

    return history.push(`/images/${imageId}`);
  };

  // const handleDeleteComment = async (e) => {
  //   e.preventDefault();

  //   await dispatch(deleteSingleComment(commentId))

  //   return history.push(`/images/${imageId}`);
  // }

  const handleCancel = () => {
    setShowAddComment(false)
  }

  return (
    <div className="add-comment-container">
      <form onSubmit={handlePostComment}>
        <label>Comment</label>
        <input type="text" placeholder="Add your comment here"></input>
        <button onClick={handlePostComment} id="add-comment-button" type="sumbit">
          Post Comment
        </button>
      </form>
      <button onClick={handleCancel} id="add-comment-button" type="sumbit">
        Cancel
      </button>
    </div>
  );
};

export default AddCommentComponent;
