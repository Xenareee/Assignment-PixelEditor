import React, { useState, useContext } from 'react'
import '../styles/Pixel.css'
import { ImageContext } from '../contexts/ImageContext'

function Pixel({ id }) {

  // Context
  const { imagePixels, handlePixelClick, handlePixelDrag, selectedColor, currentTool } = useContext(ImageContext);

  // State
  const [ displaySelectedColor, setDisplaySelectedColor ] = useState(false);


  // Functions
  function handleMouseEnter(buttons) {

    if (buttons > 0) { // mouse clicked
      handlePixelDrag(id);
    }

    if (currentTool === "PAINT" || currentTool === "FILL") {
      setDisplaySelectedColor(true); 
    }
       
  }

  function handleMouseLeave() {
    setDisplaySelectedColor(false);
  }


  // Contents  
  return (
    <div className='Pixel' style={{ backgroundColor: displaySelectedColor ? selectedColor : imagePixels[id] }} draggable='false' 
      onClick={ () => {handlePixelClick(id)} }
      onMouseEnter={ (e) => { handleMouseEnter(e.buttons) } }
      onMouseLeave={ handleMouseLeave }

      onDrag={e => { e.preventDefault() } }
      onDragOver={e => { e.preventDefault() } }
      onDragEnter={e => { e.preventDefault() } }
      onDragStart={e => { e.preventDefault() } }
      onDragEnd={e => { e.preventDefault() } }
      onDragLeave={e => { e.preventDefault() } }
      onDrop={e => { e.preventDefault() } }
    />
  )
}

export default Pixel