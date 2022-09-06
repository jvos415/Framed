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
  const imageObj = useSelector((state) => state.images[imageId]);
  const albums = Object.values(useSelector((state) => state.albums));

  const [image, setImage] = useState(imageObj?.imageUrl);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showAddCommentButton, setShowAddCommentButton] = useState(true);
  const [albumIdentifier, setAlbumIdentifier] = useState(imageObj?.albumId);
  const [verifyUser, setVerifyUser] = useState(false);

  useEffect(() => {
    if (!sessionUser) return history.push("/signup");
    if (sessionUser && imageObj && imageObj.userId === sessionUser.id) {
      setShowEditButton(true);
    }
  }, [imageObj, sessionUser, history]);

  useEffect(() => {
    if (sessionUser && imageObj && imageObj.userId === sessionUser.id) {
      setShowDeleteButton(true);
      setVerifyUser(true);
    }
  }, [imageObj, sessionUser]);

  useEffect(() => {
    dispatch(getOneImage(imageId));
  }, [dispatch, imageId]);

  useEffect(() => {
    if (!sessionUser) return history.push("/signup");
    dispatch(getAlbums(sessionUser.id));
  }, [dispatch, sessionUser, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!imageObj) {
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
    const albumTitle = e.target.value;
    const singleAlbum = albums.filter((album) => {
      return album.title === albumTitle;
    });
    setAlbumIdentifier(singleAlbum[0].id);
  };

  const handleAddComment = () => {
    setShowAddComment(true);
    setShowAddCommentButton(false);
  };

  const handleSubmitAddAlbum = async (e) => {
    e.preventDefault();

    const userId = imageObj.userId;
    const albumId = albumIdentifier;
    const title = imageObj.title;
    const description = imageObj.description;
    const createdAt = imageObj.createdAt;
    const updatedAt = new Date();

    const payload = {
      id: imageId,
      albumId,
      userId,
      image,
      title,
      description,
      createdAt,
      updatedAt,
    };

    let updatedImage = await dispatch(updateSingleImage(payload));

    if (updatedImage) {
      setShowEditForm(false);
      dispatch(getOneImage(imageId));
      return history.push(`/my-albums/${userId}`);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  let content = null;

  if (!showEditForm) {
    content = (
      <div className="image-details">
        <div className="title-and-poster">
          <h3 id="image-title">{imageObj.title}</h3>
          {imageObj.User && (
            <h3 id="username">Image Posted by @{imageObj.User.username}</h3>
          )}
        </div>
        <div className="image-description-container">
          <p id="image-description">{imageObj.description}</p>
          {albums.length > 0 && verifyUser && (
            <div className="add-to-album">
              <h4 className="add-image-label">Add Your Image to an Album</h4>
              <form className="album-id-form" onSubmit={handleSubmitAddAlbum}>
                <select type="text" onChange={updateAlbumIdentifier}>
                  <option value="" selected disabled hidden>
                    Choose Album...
                  </option>
                  {albums.map((album) => {
                    return <option key={album.id}>{album.title}</option>;
                  })}
                </select>
                <button id="button-update" type="submit">
                  Add Image to Album
                </button>
                <label id="hide-me">
                  <input
                    id="upload-image"
                    className="input-field"
                    type="file"
                    onChange={updateFile}
                  />
                </label>
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
          src={`${imageObj.imageUrl}`}
          alt={imageObj.title}
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
