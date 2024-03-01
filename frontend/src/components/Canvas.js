import React, { useContext } from 'react'
import '../styles/Canvas.css'
import { ImageContext } from '../contexts/ImageContext'
import Pixel from './Pixel';

function Canvas() {

    const { imagePixels, imageWidth, imageHeight } = useContext(ImageContext);

  return (
    <div className='Canvas' style={{
        gridTemplateColumns:  "repeat(" + imageWidth + ", 1fr)",
        gridTemplateRows:  "repeat(" + imageHeight + ", 1fr)",
        aspectRatio: imageWidth + "/" + imageHeight,
        width: imageWidth >= imageHeight ? "800px" : "auto",
        height: imageWidth < imageHeight ? "800px" : "auto"
    }}>
        { imagePixels.map((pixel, i) => <Pixel id={i} key={i} />) }
    </div>
  )
}

export default Canvas