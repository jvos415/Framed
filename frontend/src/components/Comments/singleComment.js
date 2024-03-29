import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "../../images/edit-icon-better.png";
import TrashCan from "../../images/trash-can.png";
import EditComment from "./EditComment";
import { deleteSingleComment } from "../../store/comments";
import "./comments.css";

const SingleCommentComponent = ({ comment }) => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showTrashCan, setShowTrashCan] = useState(false);
  const [showEditCommentForm, setShowEditCommentForm] = useState(false)
  

  useEffect(() => {
    if (comment && comment.userId === sessionUser.id) {
      setShowEditIcon(true);
      setShowTrashCan(true);
    }
  },[comment, sessionUser.id])

  const handleEditComment = () => {
    setShowEditCommentForm(true);
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();

    await dispatch(deleteSingleComment(comment.id));

    return history.push(`/images/${imageId}`);
  };

  return (
    <div className="single-comment-container">
        <p id="single-comment">{comment.comment}</p>
        {comment.User && <p id="commenting-user">Comment by @{comment.User.username}</p>}
        {showEditIcon && !showEditCommentForm && <button
          value={comment.id}
          onClick={handleEditComment}
          className="edit-pencil"
        >
          <img src={EditIcon} alt="Edit Icon"></img>
        </button>}
        {showEditCommentForm && (
          <EditComment comment={comment} setShowEditCommentForm={setShowEditCommentForm}/>
        )}
       {showTrashCan && !showEditCommentForm && <button
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
