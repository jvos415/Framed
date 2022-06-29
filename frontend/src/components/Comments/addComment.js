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

  const [commentText, setCommentText] = useState("");

  const updateCommentText = (e) => setCommentText(e.target.value);

  const handlePostComment = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id

    const commentObj = {
      userId,
      imageId,
      comment: commentText,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await dispatch(createComment(commentObj));

    setShowAddComment(false)
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
        <textarea type="text" placeholder="Add your comment here" cols="30" rows="3"
        value={commentText} onChange={updateCommentText} />
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
