import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createComment } from "../../store/comments";
import "./addComments.css";

const AddCommentComponent = ({ setShowAddComment }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState([]);

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

    try {
      await dispatch(createComment(commentObj));

      setShowAddComment(false)
      return history.push(`/images/${imageId}`);
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleCancel = () => {
    setShowAddComment(false)
  }

  let errorList;

  if (errors.length > 0) {
    errorList = "errorListComment";
  } else {
    errorList = "";
  }

  return (
    <div className="add-comment-container">
      <form onSubmit={handlePostComment}>
        <ul className={errorList}>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="form-box-comment">
          <textarea id="comment-zone" className="input-field-comments" type="text" placeholder="Add your comment here" cols="30" rows="4"
          value={commentText} onChange={updateCommentText} />
          <div>
            <button onClick={handleCancel} id="cancel-comment-button">
              Cancel
            </button>
            <button onClick={handlePostComment} id="add-comment-button" type="sumbit">
              Post Comment
            </button>
          </div>
        </div>
        </form>
    </div>
  );
};

export default AddCommentComponent;
