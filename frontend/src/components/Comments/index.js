import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SingleCommentComponent from "./singleComment";
import { getComments } from "../../store/comments";
import "./comments.css";

const CommentComponent = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments)

  useEffect(() => {
    dispatch(getComments(imageId));
  }, [dispatch, imageId]);

  return (
    <div className="comment-container">
      {commentsArray.length > 0 && <h3>Comments</h3>}
      {commentsArray && commentsArray.map((comment) => {
        return (
          <div key={comment.id}>
            <SingleCommentComponent comment={comment} />
          </div>
        )
      })}
    </div>
  );
};

export default CommentComponent;


// const updateCommentId = (e) => setCommentId(e.target.value);

//   useEffect(() => {
//     dispatch(getComments(imageId));
//   }, [dispatch, imageId]);

//   const handleDeleteComment = async (e) => {
//     e.preventDefault();

//     console.log(commentId);

//     await dispatch(deleteSingleComment(commentId))

//     return history.push(`/images/${imageId}`);
//   }


//   return (
//     <div className="comment-container">
//       {commentsArray.length > 0 && <h3>Comments</h3>}
//       {commentsArray && commentsArray.map((comment) => {
//         return (
//           <div key={comment.id}>
//             <p>{comment.comment}</p>
//             <button value={comment.id} onClick={updateCommentId && handleDeleteComment} className='trash-can'>
//               <img src={TrashCan} value={comment.id} alt="trash can"></img>
//             </button>
//           </div>
//         )
//       })}
//     </div>
//   );
// };
