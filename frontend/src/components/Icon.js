import React from 'react'
import '../styles/Icon.css'

function Icon({iconName}) {
  return (
    <img className='Icon' src={process.env.PUBLIC_URL + '/icons/' + iconName + '.svg'} alt={iconName} />
  )
}

export default Icon