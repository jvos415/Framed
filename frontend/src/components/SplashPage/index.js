import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import './SplashPage.css'

import { getImages } from '../../store/images';

const ImageScroll = () => {
  // const allImages = useSelector(state => {
  //   return Object.values(state.images);
  // });

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getImages())
  }, [dispatch])


  return (
    <div>
      <p>Rendering something</p>
      <p>Rendering something</p>
      <p>Rendering something</p>
      <p>Rendering something</p>
    </div>
  )
}

export default ImageScroll;
