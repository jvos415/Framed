import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments, updateComment } from "../../store/comments";
import "./editComment.css";

const EditComment = ({ comment, setShowEditCommentForm }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const commentId = comment.id;
  const sessionUser = useSelector(state => state.session.user);

  const [commentText, setCommentText] = useState(comment.comment);
  const [errors, setErrors] = useState([]);

  const updateCommentText = (e) => setCommentText(e.target.value);

  const handleUpdateComment = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id

    const commentObj = {
      commentId,
      userId,
      imageId,
      comment: commentText,
      createdAt: comment.createdAt,
      updatedAt: new Date(),
    }

    try {
      await dispatch(updateComment(commentObj));

      setShowEditCommentForm(false);

      await dispatch(getComments(imageId));

      return history.push(`/images/${imageId}`);
    } catch (error) {
      const data = await error.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  const handleCancel = () => {
    setShowEditCommentForm(false);
  }

  let errorList;

  if (errors.length > 0) {
    errorList = "errorListComment";
  } else {
    errorList = "";
  }

  return (
    <div className="add-comment-container">
      <form onSubmit={handleUpdateComment}>
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
            <button onClick={handleUpdateComment} id="add-comment-button" type="sumbit">
              Update Comment
            </button>
          </div>
        </div>
        </form>
    </div>
  );
};

export default EditComment;