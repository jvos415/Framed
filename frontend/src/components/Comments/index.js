import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TrashCan from "../../images/trash-can.png"
import { getComments } from "../../store/comments";
import "./comments.css";

const CommentComponent = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments)

  // const [commentsSection, setCommentsSection] = useState(false)

  // useEffect(() => {
  //   setCommentsSection(true)
  // },[commentsArray])

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
      {commentsArray.length > 0 && <h3>Comments</h3>}
      {commentsArray && commentsArray.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <button>
              <img src={TrashCan} value={comment.id} alt="trash can"></img>
            </button>
          </div>
        )
      })}
    </div>
  );
};

export default CommentComponent;
