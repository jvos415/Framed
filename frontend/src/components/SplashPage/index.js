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
        <Link id="splash-images-more" key={image.id} to={`/images/${image.id}`}>
          <img
            key={image.id}
            id="splash-images"
            src={`${image.imageUrl}`}
            onError={(e)=>{e.target.onerror = null; e.target.src="https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png"}}
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
          onError={(e)=>{e.target.onerror = null; e.target.src="https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png"}}
          alt={`${image.title}`}
          loading="lazy"
        ></img>
      );
    });
  }

  let footer = document.querySelector(".footer");
  if (footer) {
    footer.classList.remove("footer-position");
  }

  return (
    <div>
      <div className="welcome">
        <h2 id="welcome-title">Welcome to FRAMED!</h2>
        <p id="welcome-blurb">
          View users' favorite frames from around the world!
          Scroll the roll! As a logged in user, you can
          add an image of your liking to be viewed by the FRAMED community and
          comment on other members' photos. A logged in user can add images that
          that have posted to their personally crafted albums for quick access and organization.
        </p>
      </div>
      <div className="splash-container">{content}</div>
      <div className="back-to-top-container">
        <button id="back-to-top" onClick={() => window.scrollTo(0, 0)}>
          Back to the top ⇧
        </button>
      </div>
    </div>
  );
};

export default ImageScroll;
