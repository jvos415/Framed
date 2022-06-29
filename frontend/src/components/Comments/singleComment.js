import { useEffect, useState } from "react";
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

  const [commentId, setCommentId] = useState("");

  const handleDeleteComment = (e) => {
    e.preventDefault();

    dispatch(deleteSingleComment(comment.id));

    return history.push(`/images/${imageId}`);
  };

  return (
    <div className="single-comment-container">
        <p>{comment.comment}</p>
        <button
          value={comment.id}
          onClick={handleDeleteComment}
          className="trash-can"
        >
          <img src={TrashCan} alt="trash can"></img>
        </button>
      </div>
  );
};

export default SingleCommentComponent;
