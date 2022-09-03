import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSingleImage,
  getOneImage,
  updateSingleImage,
} from "../../store/images";
import { getAlbums } from "../../store/albums";
import EditImageForm from "../EditImagePage";
import CommentComponent from "../Comments";
import AddCommentComponent from "../Comments/addComment";
import "./ImageDetails.css";

const ImageDetails = () => {
  const { imageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const image = useSelector((state) => state.images[imageId]);
  const albums = Object.values(useSelector((state) => state.albums));

  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showAddCommentButton, setShowAddCommentButton] = useState(true);
  const [albumIdentifier, setAlbumIdentifier] = useState(image?.albumId);

  useEffect(() => {
    if (!sessionUser) return history.push("/signup");
    if (sessionUser && image && image.userId === sessionUser.id) {
      setShowEditButton(true);
    }
  }, [image, sessionUser, history]);

  useEffect(() => {
    if (sessionUser && image && image.userId === sessionUser.id) {
      setShowDeleteButton(true);
    }
  }, [image, sessionUser]);

  useEffect(() => {
    dispatch(getOneImage(imageId));
  }, [dispatch, imageId]);

  useEffect(() => {
    dispatch(getAlbums(sessionUser.id));
  }, [dispatch, sessionUser.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!image) {
    return null;
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault();

    await dispatch(deleteSingleImage(imageId));

    return history.push(`/`);
  };

  const goToEditPage = () => {
    setShowEditForm(true);
  };

  const updateAlbumIdentifier = (e) => {
    const albumTitle = e.target.value
    const singleAlbum = albums.filter((album) => {
      return album.title === albumTitle
    })
    setAlbumIdentifier(singleAlbum[0].id);
  };

  const handleAddComment = () => {
    setShowAddComment(true);
    setShowAddCommentButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = image.userId;
    const albumId = albumIdentifier;
    const imageUrl = image.imageUrl;
    const title = image.title;
    const description = image.description;
    const createdAt = image.createdAt;
    const updatedAt = new Date();

    const payload = {
      id: imageId,
      albumId,
      userId,
      imageUrl,
      title,
      description,
      createdAt,
      updatedAt,
    };

    let updatedImage = await dispatch(updateSingleImage(payload));

    if (updatedImage) {
      setShowEditForm(false);
      dispatch(getOneImage(imageId));
      return history.push(`/images/${imageId}`);
    }
  };

  let content = null;

  if (!showEditForm) {
    content = (
      <div className="image-details">
        <div className="title-and-poster">
          <h3 id="image-title">{image.title}</h3>
          {image.User && (
            <h3 id="username">Image Posted by @{image.User.username}</h3>
          )}
        </div>
        <div className="image-description-container">
          <p id="image-description">{image.description}</p>
          {albums.length > 0 && (
            <div className="add-to-album">
              <h4 className="add-image-label">Add Image to Album</h4>
              <form className="album-id-form" onSubmit={handleSubmit}>
                <select
                  type="text"
                  onChange={updateAlbumIdentifier}
                >
                  <option value="" selected disabled hidden>Choose Album...</option>
                  {albums.map((album) => {
                    return <option key={album.id}>{album.title}</option>;
                  })}
                </select>
                <button id="button-update" type="submit">
                  Add Image to Album
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    content = <EditImageForm setShowEditForm={setShowEditForm} />;
  }

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.remove("footer-position");
  }

  return (
    <div className="image-detail">
      <div className="image-image-container">
        <img
          id="image-image"
          src={`${image.imageUrl}`}
          alt={image.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png";
          }}
        ></img>
      </div>
      <div className="image-details-end">
        {content}
        {!showEditForm && showEditButton && (
          <button id="image-edit-button" onClick={goToEditPage}>
            Edit Image
          </button>
        )}
        {!showEditForm && showDeleteButton && (
          <button type="button" onClick={handleDeleteImage}>
            Delete Image
          </button>
        )}
        <CommentComponent />
        {!showEditForm && showAddCommentButton && (
          <button
            id="add-comment-button"
            type="button"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        )}
        {showAddComment && (
          <AddCommentComponent
            setShowAddComment={setShowAddComment}
            setShowAddCommentButton={setShowAddCommentButton}
          />
        )}
      </div>
    </div>
  );
};

export default ImageDetails;
