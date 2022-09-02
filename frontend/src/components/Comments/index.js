import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SingleCommentComponent from "./singleComment";
import { getComments } from "../../store/comments";
import "./comments.css";

const CommentComponent = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const commentsArray = Object.values(comments);

  useEffect(() => {
    dispatch(getComments(imageId));
  }, [dispatch, imageId]);

  return (
    <div className="comment-container">
      {commentsArray.length > 0 && <h3>Comments</h3>}
      {commentsArray &&
        commentsArray.map((comment) => {
          return (
            <div key={comment.id}>
              <SingleCommentComponent
                comment={comment}
              />
            </div>
          );
        })}
    </div>
  );
};

export default CommentComponent;
