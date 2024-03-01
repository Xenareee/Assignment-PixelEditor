import React, { useContext } from 'react'
import '../styles/Gallery.css'
import NewImagePanel from './NewImagePanel'
import ImageCard from './ImageCard'
import { UIContext } from '../contexts/UIContext'
import { ImageContext } from '../contexts/ImageContext'

function Gallery() {

  const { showNewImagePanel } = useContext(UIContext);
  const { images } = useContext(ImageContext);

  const sortedImages = images.sort((a, b) => b.id - a.id);

  return (
    <div className='galleryContainer'>
      <div className='Gallery' style={{
        paddingLeft: showNewImagePanel ? "300px" : "50px" 
      }}>

        { showNewImagePanel && < NewImagePanel/> }

        { sortedImages.map((image, i) => <ImageCard key={i} image={image} />) }
        
      </div>
      <div className='footer'>
        <a href="https://github.com/Xenareee">Xenareee</a> 2024 <span className='spacer' /> ◼ <span className='spacer' /> Icons provided by <a href="https://home.streamlinehq.com/">Streamline</a>
      </div>
    </div>   
  )
}

export default Gallery