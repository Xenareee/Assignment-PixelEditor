import React, { useContext } from 'react'
import '../styles/TopBar.css'
import { UIContext } from '../contexts/UIContext';
import Icon from './Icon';

function TopBar(props) {

const { barTitle } = props;

  const { showEditor, CloseEditor, ShowNewImagePanel, SaveImage } = useContext(UIContext);

  return (
    <div className='TopBar'>

      { showEditor ?
      <button
        onClick={ SaveImage }
      ><Icon iconName="save" /></button>
      :
      <button className='plusButton'
      onClick={ ShowNewImagePanel }
      >New Image</button>
      }

      <div className='barTitle'>{barTitle}</div>

      { showEditor &&
      <button className='crossButton'
      onClick={ CloseEditor }
      >✖</button>
      }
    </div>
  )
}

export default TopBar