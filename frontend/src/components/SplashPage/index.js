import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./SplashPage.css";

import { getImages } from "../../store/images";

const ImageScroll = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const allImages = useSelector((state) => {
    return Object.values(state.images);
  });

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  if (!allImages) {
    return null;
  }

  let content = null;

  if (sessionUser) {
    content = allImages.map((image) => {
      return (
        <Link id="splash-images" key={image.id} to={`/images/${image.id}`}>
          <img
            key={image.id}
            id="splash-images"
            src={`${image.imageUrl}`}
            alt={`${image.title}`}
            loading="lazy"
          ></img>
        </Link>
      );
    });
  } else {
    content = allImages.map((image) => {
      return (
        <img
          key={image.id}
          id="splash-images"
          src={`${image.imageUrl}`}
          alt={`${image.title}`}
          loading="lazy"
        ></img>
      );
    });
  }

  return (
    <div>
      <div className="splash-container">
        {content}
      </div>
      <div className="back-to-top-container">
        <button id="back-to-top" onClick={() => window.scrollTo(0, 0)}>
          Back to the top ⇧
        </button>
      </div>
    </div>
  );
};

export default ImageScroll;
