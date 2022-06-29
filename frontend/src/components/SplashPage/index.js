import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './SplashPage.css'

import { getImages } from '../../store/images';

const ImageScroll = () => {
  const allImages = useSelector((state) => {
    return Object.values(state.images);
  });

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getImages())
  }, [dispatch])

  // brings you to top of page on all re-renders, not user friendly IMO
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])

  if (!allImages) {
    return null;
  }
  

  return (
    <div className='splash-container'>
      {allImages.map((image) => {
        return (
          <Link id="splash-images" key={image.id} to={`/images/${image.id}`}>
            <img key={image.id} id="splash-images"
            src={`${image.imageUrl}`}
            alt={`${image.title}`}
            loading="lazy"></img>
          </Link>
        )
      })}
      <button onClick={() => window.scrollTo(0, 0)}>Back to the top</button>
    </div>
  )
}

export default ImageScroll;
