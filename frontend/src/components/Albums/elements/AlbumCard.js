import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateSingleImage, getImages } from "../../../store/images";
import { deleteAlbum } from "../../../store/albums";
import EditAlbumForm from "../forms/EditAlbumForm";
import "./albumCard.css";

const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const images = Object.values(useSelector((state) => state.images)).filter((image) => {
    return image.albumId === album.id
  });
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
  },[user, history])

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const [updateAlbumComp, setUpdateAlbumComp] = useState("");

  const updateAlbumComponent = () => {
    setUpdateAlbumComp(true)
  };

  const allAlbumIdsToNull = () => {
    images.forEach(async (image) => {
      const imageId = image.id
      const userId = image.userId;
      const albumId = null;
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
        return history.push(`/my-albums/${user.id}`);
      }
    })
  };

  const deleteAlbumFunc = () => {
    allAlbumIdsToNull();
    dispatch(getImages());
    dispatch(deleteAlbum(album.id))
    // This delete needs to be in here twice for it to work!
    dispatch(deleteAlbum(album.id))
  };

  return (
    <div className="album-card-container">
      <div className="link-container">
        <Link style={{ textDecoration: 'none' }} exact="true" to={`/albums/${album.id}`}>
          <h2 id="album-title">{album.title}</h2>
        </Link>
      </div>
      <div>
        {!updateAlbumComp && (<button id="button-cancel-add" type="button" onClick={updateAlbumComponent}>
          Update Album Title
        </button>)}
        {!updateAlbumComp && (<button id="button-cancel-add" type="button" onClick={deleteAlbumFunc}>
          Delete Album
        </button>)}
        {updateAlbumComp && (
            <EditAlbumForm setUpdateAlbumComp={setUpdateAlbumComp} album={album}/>
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
