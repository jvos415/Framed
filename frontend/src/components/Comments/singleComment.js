import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TrashCan from "../../images/trash-can.png";
import { deleteSingleComment } from "../../store/comments";
import "./comments.css";

const SingleCommentComponent = ({ comment }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [showTrashCan, setShowTrashCan] = useState(false);

  useEffect(() => {
    if (comment && comment.userId === sessionUser.id) {
      setShowTrashCan(true);
    }
  },[comment, sessionUser.id])

  const handleDeleteComment = async (e) => {
    e.preventDefault();

    await dispatch(deleteSingleComment(comment.id));

    return history.push(`/images/${imageId}`);
  };

  return (
    <div className="single-comment-container">
        <p id="single-comment">{comment.comment}</p>
        {comment.User && <p id="commenting-user">Comment by @{comment.User.username}</p>}
       {showTrashCan && <button
          value={comment.id}
          onClick={handleDeleteComment}
          className="trash-can"
        >
          <img src={TrashCan} alt="trash can"></img>
        </button>}
      </div>
  );
};

export default SingleCommentComponent;
