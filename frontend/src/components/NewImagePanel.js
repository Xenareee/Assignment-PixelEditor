import React, { useContext } from 'react'
import '../styles/NewImagePanel.css'
import { ImageContext } from '../contexts/ImageContext';
import { UIContext } from '../contexts/UIContext';

function NewImagePanel() {

  const { 
    imageWidth, setImageWidth,
    imageHeight, setImageHeight,
    imageName, setImageName 
  } = useContext(ImageContext);
  const { CreateNewImage, HideNewImagePanel } = useContext(UIContext);

  return (
    <div className='NewImagePanel'>
      <div className='numberOption'>
        <div>Width</div>
        <input type='number' defaultValue={ imageWidth } onChange={ (e) => {setImageWidth(e.target.value)} }></input>
      </div>
      <div className='numberOption'>
        <div>Height</div>
        <input type='number' defaultValue={ imageHeight } onChange={ (e) => {setImageHeight(e.target.value)} }></input>
      </div>
      <div className='textOption'>
        <div>Name</div>
        <input type='text' defaultValue={ imageName } onChange={ (e) => {setImageName(e.target.value)} }></input>
      </div>
      <br/>
      <button onClick={CreateNewImage}>Create a New Image</button>
      <br/><br/>
      <button onClick={HideNewImagePanel}>Cancel</button>
    </div>
  )
}

export default NewImagePanel