import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { getImages } from "../../store/images";
import { getAlbums } from "../../store/albums";
import "./singleAlbumPage.css";

const SingleAlbumPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const user = useSelector((state) => state.session.user);
  const album = Object.values(useSelector((state) => state.albums)).filter(
    (album) => {
      return album.id === +albumId;
    }
  );
  const images = Object.values(useSelector((state) => state.images)).filter(
    (image) => {
      return image.albumId === +albumId;
    }
  );

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
  }, [user, history]);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return history.push("/signup");
    }
    dispatch(getAlbums(user.id));
  }, [dispatch, user, history]);

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.add("footer-position");
  }

  return (
    <div>
      <h1 id="single-album-title">{album[0]?.title} Album</h1>
      {images.length > 0 ? (
        <div>
          <div className="album-image-container">
            {images.map((image) => {
              return (
                <Link
                  id="splash-images-more"
                  key={image.id}
                  to={`/images/${image.id}`}
                >
                  <img
                    key={image.id}
                    id="splash-images"
                    src={`${image.imageUrl}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png";
                    }}
                    alt={`${image.title}`}
                    loading="lazy"
                  ></img>
                </Link>
              );
            })}
          </div>
          <div className="back-to-top-container-album">
            <button id="back-to-top" onClick={() => window.scrollTo(0, 0)}>
              Back to the top ⇧
            </button>
          </div>
        </div>
      ) : (
        <h3 id="no-images-albums">There are no images in this album yet...</h3>
      )}
    </div>
  );
};

export default SingleAlbumPage;
