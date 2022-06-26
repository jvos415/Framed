import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import './SplashPage.css'

import { getImages } from '../../store/images';

const ImageScroll = () => {
  const allImages = useSelector(state => {
    return Object.values(state.images);
  });

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getImages())
  }, [dispatch])

  if (!allImages) {
    return null;
  }

  // console.log(allImages);
  // console.log(allImages[0].imageUrl);

  return (
    <div className='splash-container'>
      {allImages.map((image) => {
        return (
          <img key={image.id} id="splash-images" src={`${image.imageUrl}`} alt={`${image.title}`}></img>
        )
      })}
    </div>
  )
}

export default ImageScroll;
