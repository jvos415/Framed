import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOneImage } from '../../store/images';

const ImageDetails = () => {
  const { imageId } = useParams();
  const image = useSelector(state => state.images[imageId]);

  // console.log("\n\n", imageId, "\n\n");
  // console.log("\n\n", image, "\n\n");

  const dispatch = useDispatch();

  const [showEditImageForm, setShowEditImageForm] = useState(false);

  useEffect(() => {
    dispatch(getOneImage(imageId));
    setShowEditImageForm(false);
  }, [dispatch, imageId]);

  if (!image) {
    return null;
  }

  let content = null;

  if (showEditImageForm) {
    // content = (
    //   <EditImageForm image={image}
    //   hideForm={() => setShowEditImageForm(false)}
    //   />
    // )
  } else {
    content = (
    <div className='image-details'>
      <img src={`${image.imageUrl}`} alt={image.title}></img>
      <h3>{image.title}</h3>
      <p>{image.description}</p>
    </div>
    )
  }

  return (
    <div className="image-detail">
      {content}
      {(!showEditImageForm &&
        <button onClick={() => setShowEditImageForm(true)}>Edit</button>
      )}
    </div>
  );

}

export default ImageDetails;
