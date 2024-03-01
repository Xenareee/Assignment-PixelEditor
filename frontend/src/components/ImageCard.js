import React, { useContext } from 'react'
import '../styles/ImageCard.css'
import { UIContext } from '../contexts/UIContext'
import Preview from './Preview';

function ImageCard({ image }) {

    const { EditImage, DeleteImage } = useContext(UIContext);

    return (
    <div className='ImageCard'>

        <div className='previewContainer'>
            <Preview image={image} />
        </div>
        <div className='imageCardName'>{image.name}</div>
        <div className='imageCardDimensions'>{image.width} x {image.height}</div>
        <div className='previewButtonContainer'>
            <button onClick={ () => {EditImage(image)} }>Edit</button>
            <button onClick={ () => {DeleteImage(image)} }>Delete</button>
        </div>   

    </div>
  )
}

export default ImageCard