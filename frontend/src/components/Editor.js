import React, { useContext } from 'react'
import '../styles/Editor.css'
import { CirclePicker, ChromePicker } from 'react-color';
import Canvas from './Canvas'
import Icon from './Icon'
import { ImageContext } from '../contexts/ImageContext';

function Editor() {

  const { selectedColor, handleColorChangeComplete, colorPalette, currentTool, setCurrentTool } = useContext(ImageContext);

  return (
    <div className='Editor'>
      
      <div className='editorLeftBar'>
        <button className={ currentTool === "PAINT" ? "tool-button tool-button selected" : "tool-button" } onClick={ () => {setCurrentTool("PAINT")} }>
          <Icon iconName="paint" />
        </button>
        <button className={ currentTool === "FILL" ? "tool-button tool-button selected" : "tool-button" } onClick={ () => {setCurrentTool("FILL")} }>
          <Icon iconName="bucket" />
        </button>
        <button className={ currentTool === "PICK" ? "tool-button tool-button selected" : "tool-button" } onClick={ () => {setCurrentTool("PICK")} }>
          <Icon iconName="dropper" />
        </button>
      </div>

      <div className='editorCanvasContainer'>
        <Canvas />
      </div>

      <div className='editorRightBar'>
        <ChromePicker color={ selectedColor } onChangeComplete={ handleColorChangeComplete } disableAlpha={ true } />
        <br/>
        <CirclePicker color={ selectedColor } onChangeComplete={ handleColorChangeComplete } colors={ colorPalette } />
      </div>

    </div>
  )
}

export default Editor